-- ============================================================================
-- Base de Données - Calculateur d'Empreinte Carbone
-- ============================================================================
-- Données d'émissions CO₂ par source énergétique (kg CO₂/kWh)
-- Sources : ADEME, IEA, Global Carbon Atlas
-- ============================================================================

-- Table COUNTRIES - Informations des pays
CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    region TEXT,
    co2_intensity REAL  -- kg CO₂ par kWh moyen du pays
);

-- Table ENERGY_SOURCES - Sources d'énergie
CREATE TABLE IF NOT EXISTS energy_sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    co2_per_kwh REAL,  -- kg CO₂ par kWh
    description TEXT
);

-- Table EMISSION_FACTORS - Facteurs d'émission par activité
CREATE TABLE IF NOT EXISTS emission_factors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    activity TEXT UNIQUE NOT NULL,
    unit TEXT,
    co2_emissions REAL,  -- kg CO₂ par unité
    description TEXT
);

-- ============================================================================
-- Insérer les sources d'énergie
-- ============================================================================
INSERT INTO energy_sources (name, co2_per_kwh, description) VALUES
-- Énergies fossiles (polluantes)
('Charbon', 0.95, 'Très polluant - Émissions très élevées'),
('Gaz naturel', 0.49, 'Moyen polluant - Émissions modérées'),
('Pétrole', 0.73, 'Très polluant - Émissions élevées'),

-- Énergies fossiles (moins polluantes)
('Gaz de schiste', 0.52, 'Polluant - Émissions modérées'),

-- Énergies renouvelables (propres)
('Énergie solaire', 0.05, 'Très propre - Minimal'),
('Énergie éolienne', 0.11, 'Très propre - Minimal'),
('Énergie hydroélectrique', 0.04, 'Très propre - Minimal'),
('Géothermie', 0.38, 'Propre - Émissions basses'),

-- Énergies alternatives
('Nucléaire', 0.12, 'Propre - Faibles émissions'),
('Biomasse', 0.23, 'Renouvelable - Émissions basses');

-- ============================================================================
-- Insérer les pays (données réelles 2023)
-- ============================================================================
INSERT INTO countries (code, name, region, co2_intensity) VALUES
-- Europe
('FR', 'France', 'Europe', 0.055),
('DE', 'Allemagne', 'Europe', 0.380),
('GB', 'Royaume-Uni', 'Europe', 0.200),
('IT', 'Italie', 'Europe', 0.280),
('ES', 'Espagne', 'Europe', 0.195),
('PL', 'Pologne', 'Europe', 0.650),
('NL', 'Pays-Bas', 'Europe', 0.280),
('BE', 'Belgique', 'Europe', 0.180),
('SE', 'Suède', 'Europe', 0.085),
('NO', 'Norvège', 'Europe', 0.015),
('CH', 'Suisse', 'Europe', 0.140),
('AT', 'Autriche', 'Europe', 0.160),

-- Asie
('CN', 'Chine', 'Asie', 0.570),
('IN', 'Inde', 'Asie', 0.650),
('JP', 'Japon', 'Asie', 0.485),
('KR', 'Corée du Sud', 'Asie', 0.420),
('TH', 'Thaïlande', 'Asie', 0.450),
('VN', 'Viêt Nam', 'Asie', 0.520),
('ID', 'Indonésie', 'Asie', 0.800),
('PH', 'Philippines', 'Asie', 0.550),
('SG', 'Singapour', 'Asie', 0.380),

-- Amérique du Nord
('US', 'États-Unis', 'Amérique du Nord', 0.395),
('CA', 'Canada', 'Amérique du Nord', 0.150),
('MX', 'Mexique', 'Amérique du Nord', 0.450),

-- Amérique du Sud
('BR', 'Brésil', 'Amérique du Sud', 0.080),
('AR', 'Argentine', 'Amérique du Sud', 0.180),
('CL', 'Chili', 'Amérique du Sud', 0.280),
('CO', 'Colombie', 'Amérique du Sud', 0.140),
('PE', 'Pérou', 'Amérique du Sud', 0.220),

-- Afrique
('ZA', 'Afrique du Sud', 'Afrique', 0.950),
('EG', 'Égypte', 'Afrique', 0.520),
('NG', 'Nigéria', 'Afrique', 0.650),
('KE', 'Kenya', 'Afrique', 0.550),
('MA', 'Maroc', 'Afrique', 0.420),

-- Océanie
('AU', 'Australie', 'Océanie', 0.740),
('NZ', 'Nouvelle-Zélande', 'Océanie', 0.180);

-- ============================================================================
-- Insérer les facteurs d'émission par activité
-- ============================================================================
INSERT INTO emission_factors (activity, unit, co2_emissions, description) VALUES
-- Transport
('Voiture essence', 'km', 0.21, 'Émissions moyennes voiture 1.5L'),
('Voiture diesel', 'km', 0.19, 'Légèrement moins que essence'),
('Voiture électrique', 'km', 0.05, 'Très bas si électricité verte'),
('Bus', 'km', 0.089, 'Par passager - très efficace'),
('Avion domestique', 'km', 0.255, 'Par passager - long courrier plus bas'),
('Train', 'km', 0.041, 'Par passager - très efficace'),
('Vélo', 'km', 0.005, 'Production + entretien seulement'),

-- Habitat
('Chauffage gaz naturel', 'kWh', 0.49, 'Chauffage classique'),
('Chauffage électrique', 'kWh', 0.055, 'En France (électricité bas carbone)'),
('Chauffage charbon', 'kWh', 0.95, 'Très polluant'),
('Eau chaude gaz', 'kWh', 0.49, 'Standard'),
('Eau chaude électrique', 'kWh', 0.055, 'En France'),

-- Alimentation
('Boeuf', 'kg', 27.0, 'Très énergivore - production'),
('Agneau', 'kg', 24.0, 'Très énergivore'),
('Porc', 'kg', 12.1, 'Modéré'),
('Poulet', 'kg', 6.9, 'Faible'),
('Poisson', 'kg', 12.5, 'Selon la méthode de pêche'),
('Fromage', 'kg', 13.5, 'Lait = énergivore'),
('Riz', 'kg', 2.7, 'Bas carbone'),
('Pâtes', 'kg', 1.3, 'Bas carbone'),
('Légumes', 'kg', 0.5, 'Très bas'),
('Fruits', 'kg', 0.8, 'Très bas');

-- ============================================================================
-- Créer une vue pour statistiques
-- ============================================================================
CREATE VIEW IF NOT EXISTS country_energy_mix AS
SELECT 
    c.code,
    c.name,
    c.region,
    c.co2_intensity,
    CASE 
        WHEN c.co2_intensity < 0.10 THEN 'Très propre'
        WHEN c.co2_intensity < 0.25 THEN 'Propre'
        WHEN c.co2_intensity < 0.50 THEN 'Modéré'
        ELSE 'Polluant'
    END AS category,
    ROUND(c.co2_intensity * 1000) AS g_co2_per_kwh
FROM countries c
ORDER BY c.co2_intensity ASC;

-- ============================================================================
-- Créer une vue pour émissions par région
-- ============================================================================
CREATE VIEW IF NOT EXISTS emissions_by_region AS
SELECT 
    region,
    COUNT(*) AS countries_count,
    ROUND(AVG(co2_intensity), 3) AS avg_intensity,
    MIN(co2_intensity) AS min_intensity,
    MAX(co2_intensity) AS max_intensity
FROM countries
GROUP BY region
ORDER BY avg_intensity DESC;

-- ============================================================================
-- Vérifier les insertions
-- ============================================================================
SELECT 'Countries' as table_name, COUNT(*) as count FROM countries
UNION ALL
SELECT 'Energy Sources', COUNT(*) FROM energy_sources
UNION ALL
SELECT 'Emission Factors', COUNT(*) FROM emission_factors;
