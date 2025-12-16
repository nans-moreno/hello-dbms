# 📚 SQL Scripts - Hello DBMS+

Bienvenue dans la section SQL du projet Hello DBMS+!

## 🎯 Objectif

Apprendre SQL **progressivement** avec 9 jobs de complexité croissante.  
De **zéro** à **expert** en ~95 minutes.

---

## 📋 Les 9 Jobs

### ⭐ Job 1 : SELECT Simple (5 min)
**Fichier** : `job1.sql`

Apprendre à lire une base de données avec SELECT.

```sql
SELECT * FROM EMPLOYES;
SELECT nom, prenom AS 'Prénom' FROM EMPLOYES;
```

**Concepts** : SELECT, AS, créer table, insérer données

---

### ⭐ Job 2 : WHERE et LIKE (10 min)
**Fichier** : `job2.sql`

Filtrer les données avec des conditions.

```sql
SELECT * FROM EMPLOYES WHERE ville = 'Paris';
SELECT * FROM EMPLOYES WHERE nom LIKE 'D%';
```

**Concepts** : WHERE, AND, OR, IN, LIKE, opérateurs

---

### ⭐⭐ Job 3 : Agrégations (10 min)
**Fichier** : `job3.sql`

Faire des calculs sur les données (somme, moyenne, etc.)

```sql
SELECT fonction, COUNT(*), AVG(salaire)
FROM EMPLOYES
GROUP BY fonction
HAVING COUNT(*) >= 2;
```

**Concepts** : COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING

---

### ⭐⭐ Job 4 : Sous-requêtes (10 min)
**Fichier** : `job4.sql`

Imbriquer des requêtes pour la logique complexe.

```sql
SELECT nom FROM EMPLOYES
WHERE salaire > (SELECT AVG(salaire) FROM EMPLOYES);
```

**Concepts** : Sous-requête, IN, imbrication

---

### ⭐⭐ Job 5 : Jointures (15 min)
**Fichier** : `job5.sql`

Combiner plusieurs tables entre elles.

```sql
SELECT e.nom, d.nom AS 'Département'
FROM EMPLOYES e
INNER JOIN DEPARTMENTS d ON e.dept_id = d.id;
```

**Concepts** : INNER JOIN, LEFT JOIN, RIGHT JOIN, aliasing

---

### ⭐⭐ Job 6 : GROUP BY & HAVING (10 min)
**Fichier** : `job6.sql`

Maîtriser les regroupements avancés.

```sql
SELECT fonction, COUNT(*), SUM(salaire)
FROM EMPLOYES
GROUP BY fonction
HAVING SUM(salaire) > 7000;
```

**Concepts** : GROUP BY multi-colonnes, HAVING, DISTINCT

---

### ⭐ Job 7 : ORDER BY & LIMIT (8 min)
**Fichier** : `job7.sql`

Trier et paginer les résultats.

```sql
SELECT nom, salaire FROM EMPLOYES
ORDER BY salaire DESC
LIMIT 5;
```

**Concepts** : ORDER BY, DESC, LIMIT, OFFSET, pagination

---

### ⭐⭐ Job 8 : UNION (10 min)
**Fichier** : `job8.sql`

Combiner les résultats de plusieurs SELECT.

```sql
SELECT nom, 'Employé' AS type FROM EMPLOYES
UNION
SELECT nom, 'Consultant' AS type FROM CONSULTANTS;
```

**Concepts** : UNION, UNION ALL, fusion de requêtes

---

### ⭐⭐⭐ Job 9 : Cas Réel Complexe (20 min)
**Fichier** : `job9.sql`

**Scénario** : Agence de voyage avec analyse complète

15 exercices réalistes incluant :
- Revenu par destination
- Clients fidèles
- Tendances temporelles
- Projections

**Concepts** : Tous les précédents + CASE WHEN, COALESCE, DATE

---

## 🎓 Comment utiliser ces fichiers

### 1️⃣ **Exécution complète**
```bash
# Dans votre client SQL (SQLite, MySQL, PostgreSQL, etc.)
# Ouvrir job1.sql et exécuter tout le fichier
```

### 2️⃣ **Progression recommandée**

```
Jour 1 (30 min) : Job 1 + Job 2
Jour 1 (30 min) : Job 3 + Job 4
Jour 1 (25 min) : Job 5 + Job 6 + Job 7
Jour 2 (20 min) : Job 8 + Job 9
```

### 3️⃣ **Pratique personnelle**

Après chaque job, créez vos propres requêtes :

- **Job 1** : Sélectionner différentes colonnes
- **Job 2** : Inventer des filtres complexes
- **Job 3** : Grouper par d'autres colonnes
- **Job 4** : Combiner WHERE et sous-requête
- **Job 5** : Joindre 3+ tables
- **Job 6** : Filtrer les groupes différemment
- **Job 7** : Paginer différemment
- **Job 8** : Fusionner d'autres sources
- **Job 9** : Répondre à des questions métier

---

## 📊 Guide d'apprentissage

| Job | Durée | Niveau | Prérequis | Focus |
|-----|-------|--------|-----------|-------|
| 1 | 5 min | ⭐ | Aucun | SELECT de base |
| 2 | 10 min | ⭐ | Job 1 | Filtrer |
| 3 | 10 min | ⭐⭐ | Job 1-2 | Statistiques |
| 4 | 10 min | ⭐⭐ | Job 1-3 | Sous-requêtes |
| 5 | 15 min | ⭐⭐ | Job 1-3 | Jointures |
| 6 | 10 min | ⭐⭐ | Job 3,5 | GROUP BY avancé |
| 7 | 8 min | ⭐ | Job 1-2 | Tri & pagination |
| 8 | 10 min | ⭐⭐ | Job 1-2 | UNION |
| 9 | 20 min | ⭐⭐⭐ | Job 1-8 | Cas réel |

---

## 💡 Conseils

### ✅ Faites
- ✅ Tapez vous-même (pas de copier-coller)
- ✅ Modifiez les requêtes et observez
- ✅ Combinez les concepts
- ✅ Écrivez vos propres requêtes
- ✅ Testez les cas limites (NULL, vides, etc.)

### ❌ Évitez
- ❌ Copier-coller sans comprendre
- ❌ Sauter les jobs
- ❌ Ignorer les erreurs SQL
- ❌ Faire trop vite

---

## 🛠️ Outils recommandés

### Gratuits
- **SQLite** : Très simple, pas d'installation
  ```bash
  sqlite3 mydb.db < job1.sql
  ```

- **DBeaver** : Interface graphique gratuite
- **SQL Online** : https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all

### Payants
- **DataGrip** : JetBrains (excellent mais payant)
- **MySQL Workbench** : Pour MySQL
- **pgAdmin** : Pour PostgreSQL

---

## 📚 Ressources supplémentaires

### En ligne
- W3Schools SQL : https://www.w3schools.com/sql/
- Mode Analytics : https://mode.com/sql-tutorial/
- SQLFiddle : http://sqlfiddle.com/

### Livres
- "SQL en 10 Minutes" - Ben Forta
- "Learning SQL" - Alan Beaulieu

---

## 🚀 Après les 9 Jobs

Vous êtes prêt pour :
1. **Big Job** : Application Flask d'empreinte carbone
2. **Production** : Utiliser SQL dans des vrais projets
3. **Avancé** : Optimisation, index, transactions ACID

---

## ❓ FAQ

**Q: Par où commencer ?**  
A: Par Job 1, dans l'ordre.

**Q: Combien de temps ça prend ?**  
A: ~95 minutes si vous suivez progressivement.

**Q: Je peux sauter des jobs ?**  
A: Non, chaque job dépend du précédent.

**Q: Quelle base de données utiliser ?**  
A: SQLite (gratuit, zéro config) ou MySQL/PostgreSQL.

**Q: Les jobs utilisent les mêmes tables ?**  
A: Oui, elles persistent d'un job à l'autre.

**Q: Je peux modifier les exemples ?**  
A: Oui, c'est recommandé !

---

## 📝 Fichiers du dossier

```
/sql/
├── job1.sql        ← SELECT simple
├── job2.sql        ← WHERE et LIKE
├── job3.sql        ← Agrégations
├── job4.sql        ← Sous-requêtes
├── job5.sql        ← Jointures
├── job6.sql        ← GROUP BY/HAVING
├── job7.sql        ← ORDER BY/LIMIT
├── job8.sql        ← UNION
├── job9.sql        ← Cas réel
├── SQL_GUIDE.sql   ← Guide complet
└── README.md       ← Ce fichier
```

---

## 🎯 Objectifs pédagogiques

À la fin des 9 jobs, vous saurez :

- ✅ Lire une base de données (SELECT)
- ✅ Filtrer les données (WHERE, LIKE)
- ✅ Faire des statistiques (COUNT, AVG, GROUP BY)
- ✅ Combiner les tables (JOIN)
- ✅ Imbriquer les requêtes (sous-requête)
- ✅ Fusionner les résultats (UNION)
- ✅ Trier et paginer (ORDER BY, LIMIT)
- ✅ Analyser une base réelle (job9)

---

## 📞 Besoin d'aide ?

1. Relisez le commentaire du job concerné
2. Vérifiez votre syntaxe (point-virgule `;`)
3. Testez chaque partie séparément
4. Consultez SQL_GUIDE.sql pour la théorie
5. Cherchez en ligne le message d'erreur

---

**Bon apprentissage ! 🚀**

*Créé par : Assistant Expert DBMS*  
*Décembre 2024*
