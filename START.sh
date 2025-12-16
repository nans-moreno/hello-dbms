#!/bin/bash
# Script de démarrage du calculateur d'empreinte carbone
# Compatible : Windows (PowerShell), Mac/Linux (bash)

echo "=================================================="
echo "🌍 Calculateur d'Empreinte Carbone - Hello DBMS+"
echo "=================================================="
echo ""

# Vérifier Python
echo "✓ Vérification de Python..."
python --version
if [ $? -ne 0 ]; then
    echo "❌ Python n'est pas installé!"
    exit 1
fi

# Aller au dossier carbon-footprint
echo "✓ Accès au dossier de l'application..."
cd carbon-footprint
if [ $? -ne 0 ]; then
    echo "❌ Impossible d'accéder à carbon-footprint!"
    exit 1
fi

# Installer les dépendances
echo "✓ Installation des dépendances..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation!"
    exit 1
fi

# Lancer l'application
echo ""
echo "=================================================="
echo "✅ Application prête!"
echo "=================================================="
echo ""
echo "🚀 Démarrage du serveur..."
echo "📍 L'application sera disponible sur :"
echo "   http://127.0.0.1:5000"
echo ""
echo "📌 Contrôles:"
echo "   - Appuyez sur CTRL+C pour arrêter le serveur"
echo ""
echo "=================================================="
echo ""

python app.py
