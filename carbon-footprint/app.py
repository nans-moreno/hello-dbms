"""
Calculateur d'Empreinte Carbone - Application Flask

Une app pour calculer ton impact carbone.

Features:
- Choisir ton pays
- Calculer ton empreinte (transport, maison, nourriture)
- Voir les stats mondiales
- Avoir des conseils pour réduire

Date: Décembre 2024
"""

from flask import Flask, render_template, request, jsonify
import sqlite3
import os
from datetime import datetime

# Setup
app = Flask(__name__)
app.config['DATABASE'] = os.path.join(os.path.dirname(__file__), 'footprint.db')

# Connexion à la BD
def get_db_connection():
    """Se connecter à SQLite"""
    conn = sqlite3.connect(app.config['DATABASE'])
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Créer la BD si elle existe pas"""
    if not os.path.exists(app.config['DATABASE']):
        conn = get_db_connection()
        with app.open_resource('database.sql', mode='r') as f:
            conn.cursor().executescript(f.read())
        conn.commit()
        conn.close()

# Initialiser la BD au démarrage
init_db()

@app.route('/')
def index():
    """Page d'accueil"""
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Récupérer les pays pour le dropdown
    cursor.execute('SELECT code, name, region FROM countries ORDER BY name')
    countries = cursor.fetchall()
    
    # Stats mondiales
    cursor.execute('''
        SELECT 
            AVG(co2_intensity) as global_avg,
            MIN(co2_intensity) as min_intensity,
            MAX(co2_intensity) as max_intensity
        FROM countries
    ''')
    stats = cursor.fetchone()
    
    conn.close()
    
    return render_template('index.html', 
                         countries=countries,
                         global_avg=stats['global_avg'],
                         min_intensity=stats['min_intensity'],
                         max_intensity=stats['max_intensity'])

@app.route('/api/country-intensity/<code>')
def get_country_data(code):
    """Récupérer l'intensité carbone d'un pays"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM countries WHERE code = ?', (code,))
    country = cursor.fetchone()
    
    if country:
        result = {
            'success': True,
            'name': country['name'],
            'code': country['code'],
            'co2_intensity': country['co2_intensity'],
            'region': country['region']
        }
    else:
        result = {
            'success': False,
            'message': 'Pays non trouvé'
        }
    
    conn.close()
    return jsonify(result)

@app.route('/api/calculate', methods=['POST'])
def calculate_footprint():
    """Calculer l'empreinte carbone"""
    data = request.json
    country_code = data.get('country_code', 'FR')
    
    # Données de l'utilisateur (par mois)
    transport = {
        'voiture_km': data.get('car_km', 0),
        'bus_km': data.get('bus_km', 0),
        'train_km': data.get('train_km', 0),
        'avion_km': data.get('flight_km', 0)
    }
    
    habitat = {
        'heating_kwh': data.get('heating_kwh', 0),
        'electricity_kwh': data.get('electricity_kwh', 0),
        'water_m3': data.get('water_m3', 0)
    }
    
    food = {
        'meat_kg': data.get('meat_kg', 0),
        'dairy_kg': data.get('dairy_kg', 0),
        'vegetables_kg': data.get('vegetables_kg', 0)
    }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Récupérer le facteur d'émission du pays
    cursor.execute('SELECT co2_intensity FROM countries WHERE code = ?', (country_code,))
    country = cursor.fetchone()
    
    if not country:
        return jsonify({
            'success': False,
            'message': 'Pays non trouvé'
        }), 400
    
    co2_intensity = country['co2_intensity']
    
    # Récupérer les facteurs d'émission
    cursor.execute('SELECT * FROM emission_factors')
    factors = {row['activity']: row['co2_emissions'] for row in cursor.fetchall()}
    
    conn.close()
    
    # Structure de résultats
    results = {
        'transport': {'car': 0, 'bus': 0, 'train': 0, 'flight': 0, 'total': 0},
        'habitat': {'heating': 0, 'electricity': 0, 'water': 0, 'total': 0},
        'food': {'meat': 0, 'dairy': 0, 'vegetables': 0, 'total': 0},
        'totals': {'monthly': 0, 'annual': 0, 'trees_needed': 0, 'flights_equivalent': 0, 'cars_km': 0, 'vs_global': 0}
    }
    
    # Transport (kg CO₂/mois)
    results['transport']['car'] = transport['voiture_km'] * factors.get('Voiture essence', 0.21)
    results['transport']['bus'] = transport['bus_km'] * factors.get('Bus', 0.089)
    results['transport']['train'] = transport['train_km'] * factors.get('Train', 0.041)
    results['transport']['flight'] = transport['avion_km'] * factors.get('Avion domestique', 0.255)
    results['transport']['total'] = sum(results['transport'].values())
    
    # Habitat (kg CO₂/mois)
    results['habitat']['heating'] = habitat['heating_kwh'] * co2_intensity
    results['habitat']['electricity'] = habitat['electricity_kwh'] * co2_intensity
    results['habitat']['water'] = habitat['water_m3'] * 0.2
    results['habitat']['total'] = sum(results['habitat'].values())
    
    # Alimentation (kg CO₂/mois)
    results['food']['meat'] = food['meat_kg'] * factors.get('Boeuf', 27.0)
    results['food']['dairy'] = food['dairy_kg'] * factors.get('Fromage', 13.5)
    results['food']['vegetables'] = food['vegetables_kg'] * factors.get('Légumes', 0.5)
    results['food']['total'] = sum(results['food'].values())
    
    # Totaux
    monthly_total = (results['transport']['total'] + 
                    results['habitat']['total'] + 
                    results['food']['total'])
    
    results['totals']['monthly'] = round(monthly_total, 2)
    results['totals']['annual'] = round(monthly_total * 12, 2)
    
    # Équivalences
    results['totals']['trees_needed'] = round(results['totals']['annual'] / 20, 1)
    results['totals']['flights_equivalent'] = round(results['totals']['annual'] / 700, 1)
    results['totals']['cars_km'] = round(results['totals']['annual'] / 0.21, 0)
    
    # Comparaison mondiale
    global_annual = 4.8 * 1000
    results['totals']['vs_global'] = round((results['totals']['annual'] / global_annual - 1) * 100, 1)
    
    return jsonify({
        'success': True,
        'results': results,
        'country_code': country_code,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/statistics')
def get_statistics():
    """Récupérer les statistiques"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Émissions par région
    cursor.execute('SELECT * FROM emissions_by_region')
    regions = [dict(row) for row in cursor.fetchall()]
    
    # Top 10 polluants
    cursor.execute('SELECT name, co2_intensity FROM countries ORDER BY co2_intensity DESC LIMIT 10')
    most_polluting = [dict(row) for row in cursor.fetchall()]
    
    # Top 10 propres
    cursor.execute('SELECT name, co2_intensity FROM countries ORDER BY co2_intensity ASC LIMIT 10')
    cleanest = [dict(row) for row in cursor.fetchall()]
    
    # Sources d'énergie
    cursor.execute('SELECT name, co2_per_kwh, description FROM energy_sources ORDER BY co2_per_kwh ASC')
    energy_sources = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify({
        'success': True,
        'regions': regions,
        'most_polluting': most_polluting,
        'cleanest': cleanest,
        'energy_sources': energy_sources
    })

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """Générer des recommandations personnalisées"""
    data = request.json.get('results', {})
    recommendations = []
    
    # Analyse du transport
    transport_total = data.get('transport', {}).get('total', 0)
    if transport_total > 50:
        recommendations.append({
            'category': '🚗 Transport',
            'priority': 'high',
            'suggestion': 'Ton transport génère beaucoup d\'émissions',
            'actions': [
                'Utilise les transports en commun',
                'Covoiture pour le travail',
                'Envisage un vélo ou e-bike'
            ],
            'impact': 'Réduction possible: -40% de tes émissions'
        })
    
    # Analyse de l'alimentation
    food_total = data.get('food', {}).get('total', 0)
    if food_total > 30:
        recommendations.append({
            'category': '🍖 Alimentation',
            'priority': 'medium',
            'suggestion': 'Ta consommation de viande est importante',
            'actions': [
                'Réduis la viande rouge (plus polluante)',
                'Essaie des alternatives végétales 2-3 fois par semaine',
                'Privilégie les produits locaux et de saison'
            ],
            'impact': 'Réduction possible: -30% de tes émissions'
        })
    
    # Analyse du logement
    habitat_total = data.get('habitat', {}).get('total', 0)
    if habitat_total > 40:
        recommendations.append({
            'category': '🏠 Logement',
            'priority': 'medium',
            'suggestion': 'Ton logement consomme beaucoup d\'énergie',
            'actions': [
                'Améliore l\'isolation de ton logement',
                'Utilise des ampoules LED',
                'Baisse d\'1°C diminue de 7% ta consommation'
            ],
            'impact': 'Réduction possible: -25% de tes émissions'
        })
    
    if not recommendations:
        recommendations.append({
            'category': '🌟 Bravo!',
            'priority': 'low',
            'suggestion': 'Ton empreinte est faible, continue comme ça!',
            'actions': [
                'Tu es un exemple environnemental',
                'Partage tes bonnes pratiques autour de toi'
            ],
            'impact': 'Impacte les autres positivement'
        })
    
    return jsonify({
        'success': True,
        'recommendations': recommendations
    })

@app.route('/api/countries')
def get_all_countries():
    """Récupérer tous les pays"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT code, name, co2_intensity, region FROM countries ORDER BY name')
    countries = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify({
        'success': True,
        'countries': countries
    })

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
