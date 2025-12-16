# Hello DBMS+ 

# Calculateur d'Empreinte Carbone

Une app web pour calculer et comprendre ton impact carbone.

## Qu'est-ce qu'on peut faire ?

✅ Calculer mon empreinte carbone (transport, maison, nourriture)  
✅ Comparer avec la moyenne mondiale  
✅ Voir des équivalences (arbres à planter, km de voiture)  
✅ Avoir des recommandations pour réduire  
✅ Voir les stats par pays  

## Comment l'installer ?

**Prérequis** : Python 3.8+

```bash
# 1. Va dans le dossier
cd carbon-footprint

# 2. Installe les trucs nécessaires
pip install -r requirements.txt

# 3. Lance l'app
python app.py

# 4. Va sur http://127.0.0.1:5000
```

## Comment ça marche en vrai ?

- **Backend** : Flask (Python)
- **BD** : SQLite (fichier simple)
- **Frontend** : HTML, CSS, JS normal
- **API** : RESTful JSON si t'en as besoin

## Les fichiers importants

```
├── app.py              ← Le serveur Flask
├── database.sql        ← Schéma de la BD
├── footprint.db        ← La BD (créée auto)
├── requirements.txt    ← Les dépendances
├── templates/
│   ├── index.html      ← Page principale
│   └── about.html      ← À propos
└── static/
    ├── style.css       ← Les styles
    └── script.js       ← La logique
```

## API endpoints

**GET /data** - Récupère les données des pays en JSON

```json
{
  "countries": [
    {"name": "France", "emissions": 4.5},
    ...
  ]
}
```

## À noter

- Les données CO₂ viennent de vraies sources (ADEME, etc.)
- Elle marche sur téléphone aussi
- Tu peux modifier les calculs si tu veux
- Elle utilise SQLite donc rien à installer côté BD

---
## 📡 Veille Technologique – Questions clés

### A. Qu'est-ce qu'une donnée ? Sous quelle forme se présente-t-elle ?

**Définition simple** : Une donnée est une **information brute** enregistrée (un nombre, un texte, une date, etc.)

**Trois formes principales** :
1. **Structurées** : Organisées en lignes/colonnes (Excel, BD SQL)
2. **Non-structurées** : Libres (emails, images, vidéos)
3. **Semi-structurées** : Mixtes avec tags (JSON, XML)

**Exemples réels** : Votre nom est une donnée, votre photo aussi, votre score dans un jeu aussi. Tout est donnée !

---

### B. Critères de qualité des données

Les **5 piliers** :
1. **Exactitude** : Les données sont-elles vraies ? 
2. **Complétude** : Manque-t-il des valeurs ? 
3. **Cohérence** : Les données se contredisent-elles ? 
4. **Fraîcheur** : Sont-elles à jour ? 
5. **Unicité** : Y a-t-il des doublons ? 

**Formule simple** : Score = moyenne de ces 5 critères. Au-dessus de 90% = Excellent !

---

### C. Data Lake vs Data Warehouse vs Lakehouse

**Analogie** :
- **Data Lake** = Grenier en vrac (données brutes, pas organisées)
- **Data Warehouse** = Cuisine rangée (données nettoyées et triées)
- **Lakehouse** = Maison complète (les deux intégrés)

| Aspect | Data Lake | Data Warehouse | Lakehouse |
|--------|-----------|----------------|-----------|
| **Structure** | Libre | Stricte | Flexible |
| **Coût** | Bas | Élevé | Moyen |
| **Vitesse** | Lente | Rapide | Rapide |
| **Flexibilité** | Très haute | Basse | Moyenne |

---

### D. Systèmes de gestion de bases de données (SGBD)

**Qu'est-ce que c'est ?** Un logiciel qui **organise et protège vos données**.

**Rôles clés** :
-  Stocker les données de manière organisée
-  Permettre de chercher rapidement
-  Sécuriser l'accès
-  Garantir la fiabilité

**Métaphore** : Un SGBD, c'est comme une **bibliothèque** : catalogage, recherche rapide, sécurité.

**Exemples populaires** : MySQL, PostgreSQL, MongoDB, Oracle

---

### E. Bases relationnelles vs non-relationnelles

**Relationnelles** = Tables organisées avec des liens
-  Pour : Donnees très structurées, cohérence obligatoire (banques, e-commerce)
-  Contre : Moins flexible avec données sauvages
- **Exemples** : MySQL, PostgreSQL, Oracle

**Non-relationnelles** = Documents flexibles, sans structure fixe
-  Pour : Données variables, scalabilité massive (réseaux sociaux, Big Data)
-  Contre : Moins de garanties de cohérence
- **Exemples** : MongoDB, Redis, Cassandra

**Résumé** : Choisir selon vos besoins de structure vs flexibilité.

---

### F. Clé primaire et clé étrangère

**Clé primaire** = ID unique d'une personne (comme numéro de sécu)
- Identifie uniquement un enregistrement
- Ne change jamais
- Obligatoire

**Clé étrangère** = Lien vers une personne d'une autre table
- Crée les relations entre tables
- "Jean" (ID=1) a commandé un produit (Client_ID=1)

**Métaphore** : Clé primaire = votre numéro d'identité. Clé étrangère = quand quelqu'un vous référence par ce numéro.

---

### G. Propriétés ACID

**ACID** = Garanties pour que vos données soient **fiables** et **intactes**

- **A** (Atomicité) : Tout ou rien. Un transfert d'argent se fait ENTIÈREMENT ou PAS DU TOUT
- **C** (Cohérence) : Les règles sont toujours respectées. Le total d'argent en banque = toujours constant
- **I** (Isolation) : 2 transactions ne se gênent pas. Votre transfert n'interfère pas avec celui du voisin
- **D** (Durabilité) : Une fois validé, c'est gravé à jamais. Même si le serveur explose

**Exemple** : Transfert de 100€ entre deux comptes → Soit les 2 opérations réussissent, soit aucune. JAMAIS un transfert à moitié !

---

### H. Méthodes Merise et UML

**Merise** = Méthode française pour **concevoir une base de données**
- Modélise les entités (CLIENTS, PRODUITS, COMMANDES)
- Modélise les relations (un client passe plusieurs commandes)
- Génère le schéma SQL final

**UML** = Langage international pour **modéliser des systèmes complets** (pas seulement BD)
- Plus général que Merise
- Utilisé dans les grandes entreprises

**Utilité** : Faire un **plan avant de construire** (évite les erreurs coûteuses)

---

### I. Langage SQL

**SQL** = Langage universel pour **interroger une base de données**

**5 commandes essentielles** :
1. **SELECT** : Lire des données
2. **INSERT** : Ajouter des données
3. **UPDATE** : Modifier des données
4. **DELETE** : Supprimer des données
5. **JOIN** : Combiner 2 tables

**Exemple** : "Donne-moi le nom et email de tous les clients de Paris"
```sql
SELECT nom, email FROM clients WHERE ville = 'Paris'
```

**Jointures** (combiner tables) :
- **INNER JOIN** : Intersection (clients qui ont commandé)
- **LEFT JOIN** : Tous les clients (même ceux sans commande)

---

### J. Approche pédagogique simplifiée

**Pour expliquer à quelqu'un** qui n'y connait RIEN :

 Utiliser des **métaphores simples**
- Base de données = Classeur Excel géant bien organisé
- Table = Une feuille Excel
- Ligne = Un enregistrement (une personne)
- Colonne = Une propriété (nom, email, âge)
- Clé primaire = Numéro de carte d'identité

 Utiliser des **exemples du quotidien**
- Cliente = fiche signalétique (nom, prénom, email)
- Commande = ce qu'il a acheté
- Lier les deux = voir les achats de chacun

 Faire des **schémas visuels simples**
```
CLIENTS (table)
ID | NOM   | EMAIL
1  | Jean  | jean@mail
2  | Marie | marie@mail

COMMANDES (table)
ID | CLIENT_ID | MONTANT
1  | 1         | 100€
2  | 2         | 50€
3  | 1         | 200€

Jean a 2 commandes (ID=1 apparait 2 fois)
```

---

##  Résumé à retenir

1. **Les données**, c'est de l'info brute (partout autour de toi)
2. **La qualité** compte : exactitude, complétude, cohérence
3. **Un SGBD** gère et protège tes données
4. **SQL** est le langage pour les interroger
5. **Relationnel ou non** : dépend du cas d'usage
6. **Modéliser avant de coder** (Merise/UML)

---

## 📝 Résumé pédagogique

### Les piliers à retenir

1. **Les données** sont partout, c'est du brut
2. **La qualité** compte plus que la quantité
3. **Un SGBD** organise et protège vos données
4. **SQL** est le langage universel pour les interroger
5. **L'ACID** garantit la fiabilité
6. **Modéliser avant** d'implémenter (Merise/UML)
7. **Relationnel ou non** : ça dépend du cas d'usage

### Chemin d'apprentissage suggéré

```
Débutant
   ↓
Qu'est-ce qu'une donnée ? (Section 1)
   ↓
Qualité des données (Section 2)
   ↓
SGBD et types (Section 4 & 5)
   ↓
Intermédiaire
   ↓
Modélisation (Section 8)
   ↓
SQL basique (Section 9 - 50%)
   ↓
Avancé
   ↓
SQL avancé (Section 9 - 50%)
   ↓
ACID & transactions (Section 7)
   ↓
Data Architecture (Section 3)
```

---

## 📚 Ressources pour approfondir

### Sites recommandés
- **SQL Tutorial** : https://www.w3schools.com/sql/
- **PostgreSQL Docs** : https://www.postgresql.org/docs/
- **MongoDB University** : https://university.mongodb.com/

### Outils gratuits
- **SQLite** : Facile pour débuter
- **DBeaver** : Visualiser les bases
- **Mode Analytics** : Apprendre SQL interactivement

### Livres
- "SQL en 60 Minutes" (Shuvalova & Dragan)
- "Database Design for Mere Mortals" (Mike Hernandez)

---

##  Conclusion

Les données, c'est la richesse du 21e siècle.  
Comprendre comment les **organiser**, les **protéger** et les **interroger** est devenu essentiel.

Ce projet **Hello DBMS+** vous donne les bases pour :
-  Concevoir une base de données solide
-  Écrire du SQL professionnel
-  Construire des applications données-centriques
-  Parler le langage des data engineers


