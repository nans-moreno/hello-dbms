/**
 * Calculateur d'Empreinte Carbone - JavaScript
 * Gère les calculs, requêtes API et mise à jour du DOM
 */

// ============================================================================
// Utilitaires
// ============================================================================

/**
 * Effectuer une requête fetch avec gestion d'erreur
 */
async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur API:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
        return null;
    }
}

/**
 * Formater un nombre avec des décimales
 */
function formatNumber(num, decimals = 2) {
    return num.toFixed(decimals);
}

/**
 * Formater un nombre avec séparateurs de milliers
 */
function formatDisplay(num) {
    return num.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ============================================================================
// Gestion du pays
// ============================================================================

/**
 * Mettre à jour les données du pays sélectionné
 */
async function updateCountry() {
    const countryCode = document.getElementById('country').value;
    
    const data = await fetchAPI(`/api/country-intensity/${countryCode}`);
    
    if (data && data.success) {
        const intensity = data.co2_intensity;
        document.getElementById('intensity').textContent = formatNumber(intensity, 3);
        
        // Mettre à jour le placeholder des champs de chauffage
        const heatingLabel = document.querySelector('label[for="heating_kwh"]');
        heatingLabel.innerHTML = `
            Chauffage <small>(kWh) - ${data.name}</small>
        `;
    }
}

// ============================================================================
// Calcul de l'empreinte carbone
// ============================================================================

/**
 * Calculer l'empreinte carbone
 */
async function calculateFootprint() {
    // Récupérer les valeurs du formulaire
    const country_code = document.getElementById('country').value;
    const formData = {
        country_code: country_code,
        car_km: parseFloat(document.getElementById('car_km').value) || 0,
        bus_km: parseFloat(document.getElementById('bus_km').value) || 0,
        train_km: parseFloat(document.getElementById('train_km').value) || 0,
        flight_km: parseFloat(document.getElementById('flight_km').value) || 0,
        heating_kwh: parseFloat(document.getElementById('heating_kwh').value) || 0,
        electricity_kwh: parseFloat(document.getElementById('electricity_kwh').value) || 0,
        water_m3: parseFloat(document.getElementById('water_m3').value) || 0,
        meat_kg: parseFloat(document.getElementById('meat_kg').value) || 0,
        dairy_kg: parseFloat(document.getElementById('dairy_kg').value) || 0,
        vegetables_kg: parseFloat(document.getElementById('vegetables_kg').value) || 0
    };
    
    // Effectuer la requête
    const response = await fetchAPI('/api/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    
    if (!response || !response.success) {
        alert('Erreur lors du calcul');
        return;
    }
    
    // Afficher les résultats
    displayResults(response.results);
    
    // Charger les recommandations
    await loadRecommendations(response.results);
    
    // Scroller vers les résultats
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Afficher les résultats
 */
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    
    // Totals
    const annualKg = results.totals.annual;
    const annualTonnes = (annualKg / 1000).toFixed(2);
    
    document.getElementById('annual-total').textContent = annualTonnes;
    document.getElementById('comparison').textContent = 
        (results.totals.vs_global > 0 ? '+' : '') + results.totals.vs_global + '%';
    
    // Par catégorie (en kg)
    const totalEmissions = annualKg;
    
    const transportKg = (results.transport.total * 12);
    const habitatKg = (results.habitat.total * 12);
    const foodKg = (results.food.total * 12);
    
    const transportTonnes = (transportKg / 1000).toFixed(2);
    const habitatTonnes = (habitatKg / 1000).toFixed(2);
    const foodTonnes = (foodKg / 1000).toFixed(2);
    
    document.getElementById('transport-total').textContent = transportTonnes;
    document.getElementById('habitat-total').textContent = habitatTonnes;
    document.getElementById('food-total').textContent = foodTonnes;
    
    // Pourcentages
    const transportPercent = totalEmissions > 0 ? ((transportKg / totalEmissions) * 100).toFixed(0) : 0;
    const habitatPercent = totalEmissions > 0 ? ((habitatKg / totalEmissions) * 100).toFixed(0) : 0;
    const foodPercent = totalEmissions > 0 ? ((foodKg / totalEmissions) * 100).toFixed(0) : 0;
    
    document.getElementById('transport-percent').textContent = transportPercent + '%';
    document.getElementById('habitat-percent').textContent = habitatPercent + '%';
    document.getElementById('food-percent').textContent = foodPercent + '%';
    
    // Équivalences
    document.getElementById('trees-needed').textContent = 
        Math.round(results.totals.trees_needed);
    document.getElementById('flights-equiv').textContent = 
        results.totals.flights_equivalent.toFixed(1);
    document.getElementById('cars-equiv').textContent = 
        Math.round(results.totals.cars_km).toLocaleString('fr-FR');
    
    // Afficher la section résultats
    resultsDiv.style.display = 'block';
}

/**
 * Charger et afficher les recommandations
 */
async function loadRecommendations(results) {
    const response = await fetchAPI('/api/recommendations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ results: results })
    });
    
    if (!response || !response.success) return;
    
    const recoDiv = document.getElementById('recommendations');
    recoDiv.innerHTML = '<h4>💡 Recommandations personnalisées</h4>';
    
    response.recommendations.forEach(reco => {
        const card = document.createElement('div');
        card.className = `recommendation-card ${reco.priority}`;
        
        let actionsHTML = '<ul>';
        reco.actions.forEach(action => {
            actionsHTML += `<li>${action}</li>`;
        });
        actionsHTML += '</ul>';
        
        card.innerHTML = `
            <h5>
                ${reco.category}
                <span class="priority ${reco.priority}">${reco.priority}</span>
            </h5>
            <p>${reco.suggestion}</p>
            ${actionsHTML}
            <div class="impact">${reco.impact}</div>
        `;
        
        recoDiv.appendChild(card);
    });
}

// ============================================================================
// Statistiques
// ============================================================================

/**
 * Charger les statistiques
 */
async function loadStatistics() {
    const response = await fetchAPI('/api/statistics');
    
    if (!response || !response.success) return;
    
    const statsDiv = document.getElementById('stats-content');
    const loadingDiv = document.getElementById('stats-loading');
    
    let html = '';
    
    // Régions
    html += '<h4>📍 Émissions par région</h4>';
    html += '<table class="stats-table"><tr><th>Région</th><th>Pays</th><th>Moyenne</th><th>Min</th><th>Max</th></tr>';
    response.regions.forEach(region => {
        html += `
            <tr>
                <td>${region.region}</td>
                <td>${region.countries_count}</td>
                <td>${(region.avg_intensity * 1000).toFixed(0)} g CO₂/kWh</td>
                <td>${(region.min_intensity * 1000).toFixed(0)} g CO₂/kWh</td>
                <td>${(region.max_intensity * 1000).toFixed(0)} g CO₂/kWh</td>
            </tr>
        `;
    });
    html += '</table>';
    
    // Pays les plus propres
    html += '<h4>🌱 Pays les plus propres</h4>';
    html += '<div class="countries-list">';
    response.cleanest.forEach(country => {
        html += `
            <div class="country-item">
                <strong>${country.name}</strong>
                <span>${(country.co2_intensity * 1000).toFixed(0)} g CO₂/kWh</span>
            </div>
        `;
    });
    html += '</div>';
    
    // Pays les plus polluants
    html += '<h4>🌍 Pays les plus polluants</h4>';
    html += '<div class="countries-list">';
    response.most_polluting.forEach(country => {
        html += `
            <div class="country-item">
                <strong>${country.name}</strong>
                <span>${(country.co2_intensity * 1000).toFixed(0)} g CO₂/kWh</span>
            </div>
        `;
    });
    html += '</div>';
    
    // Sources d'énergie
    html += '<h4>⚡ Sources d\'énergie</h4>';
    html += '<table class="energy-table"><tr><th>Source</th><th>Émissions</th><th>Type</th></tr>';
    response.energy_sources.forEach(source => {
        const type = source.co2_per_kwh > 0.5 ? '🔴 Fossile' : 
                     source.co2_per_kwh > 0.2 ? '🟡 Moyen' : '🟢 Propre';
        html += `
            <tr>
                <td>${source.name}</td>
                <td>${(source.co2_per_kwh * 1000).toFixed(0)} g CO₂/kWh</td>
                <td>${type}</td>
            </tr>
        `;
    });
    html += '</table>';
    
    statsDiv.innerHTML = html;
    loadingDiv.style.display = 'none';
    statsDiv.style.display = 'block';
}

// ============================================================================
// Navigation
// ============================================================================

/**
 * Gérer la navigation fluide
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le pays
    updateCountry();
    
    // Charger les stats au clic
    document.querySelectorAll('a[href="#statistics"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('statistics').scrollIntoView({ behavior: 'smooth' });
            loadStatistics();
        });
    });
    
    // Marquer le lien actif
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// ============================================================================
// Utilitaires d'affichage
// ============================================================================

// CSS pour les tableaux dynamiques
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .stats-table, .energy-table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
        background: white;
    }
    
    .stats-table th, .energy-table th {
        background: #ecf0f1;
        padding: 0.75rem;
        text-align: left;
        font-weight: bold;
        border-bottom: 2px solid #2ecc71;
    }
    
    .stats-table td, .energy-table td {
        padding: 0.75rem;
        border-bottom: 1px solid #ecf0f1;
    }
    
    .stats-table tr:hover, .energy-table tr:hover {
        background: #f8f9fa;
    }
    
    .countries-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .country-item {
        background: white;
        padding: 1rem;
        border-radius: 5px;
        border-left: 4px solid #2ecc71;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .country-item strong {
        color: #2c3e50;
    }
    
    .country-item span {
        background: #ecf0f1;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: bold;
        color: #2ecc71;
    }
`;
document.head.appendChild(styleSheet);
