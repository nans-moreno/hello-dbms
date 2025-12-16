# Démarrage rapide

Bienvenue ! Voici comment lancer ce projet en 2 minutes.

## Option 1 : Lancer l'app web

**Sur Windows :**
```powershell
cd carbon-footprint
pip install -r requirements.txt
python app.py
```

**Sur Mac/Linux :**
```bash
cd carbon-footprint
pip install -r requirements.txt
python app.py
```

Puis va sur **http://127.0.0.1:5000** dans ton navigateur.

---

## 📚 Structure du projet

```
hello-dbms/
├── README.md           ← Veille théorique (1500+ lignes)
├── PROJECT_STATUS.md   ← État actuel du projet
├── OVERVIEW.md         ← Vue d'ensemble complète
├── START.sh           ← Script de démarrage
│
├── /sql/              ← 9 jobs SQL progressifs
│   ├── job1.sql       ← SELECT simple
│   ├── job2.sql       ← WHERE et LIKE
│   ├── ... (jobs 3-9)
│   ├── SQL_GUIDE.sql  ← Guide pédagogique
│   └── README.md
│
└── /carbon-footprint/ ← Application Flask complète
    ├── app.py         ← Backend Flask + API
    ├── database.sql   ← Schéma et données
    ├── requirements.txt
    ├── README.md
    ├── /templates/
    │   ├── index.html
    │   └── about.html
    └── /static/
        ├── style.css
        └── script.js
```

---

## 🎯 Utilisation recommandée

### Phase 1 : Théorie (30 min)
1. Lire `README.md` (sections 1-3)
2. Comprendre les concepts de base

### Phase 2 : SQL (2 heures)
1. Ouvrir `sql/job1.sql`
2. Exécuter dans SQLite/MySQL/PostgreSQL
3. Progresser jusqu'à job9.sql

### Phase 3 : Application (30 min)
1. Installer dépendances : `pip install -r requirements.txt`
2. Lancer : `python app.py`
3. Tester le calculateur à http://127.0.0.1:5000

---

## 📖 Ressources

| Ressource | Lien/Localisation |
|-----------|------------------|
| **Théorie BD** | `README.md` (chapitres 1-10) |
| **Jobs SQL** | `/sql/job1.sql` à `/sql/job9.sql` |
| **Guide SQL** | `/sql/SQL_GUIDE.sql` |
| **App source** | `/carbon-footprint/app.py` |
| **Frontend** | `/carbon-footprint/templates/` |
| **Styles** | `/carbon-footprint/static/style.css` |
| **Logique JS** | `/carbon-footprint/static/script.js` |

---

## ✅ Checklist de vérification

- [ ] Python 3.8+ installé
- [ ] Dépendances Flask installées
- [ ] Application démarre sans erreur
- [ ] http://127.0.0.1:5000 accessible
- [ ] Calculateur fonctionne
- [ ] SQL jobs s'exécutent

---

## 🐛 Dépannage

**Erreur : "Module 'flask' not found"**
```bash
pip install -r requirements.txt
```

**Erreur : "Port 5000 already in use"**
- Modifier `app.run(port=5001)` dans `app.py`

**Base de données corrompue**
```bash
rm carbon-footprint/footprint.db
python app.py  # Relancer pour recréer
```

---

## 🚀 Prochaines étapes

1. ✅ Télécharger et explorer le projet
2. ✅ Lire la veille théorique
3. ✅ Compléter les 9 jobs SQL
4. ✅ Lancer l'application Flask
5. ✅ Modifier et améliorer le code

---

**Bon apprentissage ! 🌍**

*Créé par : Assistant Expert DBMS*  
*Décembre 2024*
