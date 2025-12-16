# 📚 Documentation Complète des Jobs SQL

Ce fichier explique chaque job : son objectif, pourquoi c'est important, et comment il a été construit.

---

## 🎯 Philosophie Générale

Les 9 jobs suivent une **progression pédagogique**. Chaque job s'appuie sur les précédents, en ajoutant progressivement des notions complexes de SQL. C'est comme apprendre à marcher avant de courir.

**Durée totale** : ~45 minutes  
**Format** : Jupyter Notebooks (tu exécutes du code, tu vois les résultats)

---

## Job 1️⃣ - SELECT : Ma première requête

### 🎯 Objectif
Apprendre à **récupérer des données** avec SELECT. C'est la base absolue de SQL.

### 📖 Concepts couverts
- Créer une table simple
- SELECT * (récupérer tout)
- SELECT avec colonnes spécifiques
- Comprendre la structure des données

### 🛠️ Pourquoi ça comme ça ?
- On crée une petite table `world` avec des pays
- On montre le SELECT * (pour voir toutes les données)
- On filtre les colonnes (pour voir seulement ce qu'on veut)
- **Métaphore** : "C'est comme ouvrir un classeur et lire une fiche"

### ⏱️ Durée
~5 minutes

### 📝 Exemple
```sql
SELECT nom, population FROM world;
```

---

## Job 2️⃣ - WHERE : Filtrer les données

### 🎯 Objectif
Apprendre à **filtrer les données**. Au lieu de récupérer tout, tu dis "Je veux juste les pays en Europe" ou "Les salaires > 3000€".

### 📖 Concepts couverts
- WHERE avec conditions simples (=, >, <)
- Opérateurs logiques (AND, OR)
- Comprendre pourquoi filtrer est utile

### 🛠️ Pourquoi ça comme ça ?
- On reprend les données du Job 1
- On ajoute des conditions avec WHERE
- On montre les différences : avec/sans filtre
- **Métaphore** : "C'est comme dire à la bibliothèque : 'Je veux juste les livres sur Python'"

### ⏱️ Durée
~5 minutes

### 📝 Exemple
```sql
SELECT nom FROM world WHERE population > 1000000;
```

---

## Job 3️⃣ - ORDER BY : Trier les données

### 🎯 Objectif
Apprendre à **trier les résultats**. Qui gagne le plus ? Quel pays est le plus peuplé ?

### 📖 Concepts couverts
- ORDER BY ASC (du plus petit au plus grand)
- ORDER BY DESC (du plus grand au plus petit)
- Trier par plusieurs colonnes

### 🛠️ Pourquoi ça comme ça ?
- On reprend les données filtrées du Job 2
- On ajoute ORDER BY
- On compare ASC vs DESC
- **Métaphore** : "C'est comme ranger ta bibliothèque : par auteur, par date, par épaisseur"

### ⏱️ Durée
~5 minutes

### 📝 Exemple
```sql
SELECT nom, salaire FROM employes ORDER BY salaire DESC;
```

---

## Job 4️⃣ - AGGREGATE : Compter, faire des calculs

### 🎯 Objectif
Apprendre à **résumer les données**. Au lieu de voir chaque ligne, tu veux des statistiques : combien ? combien en moyenne ? le max ?

### 📖 Concepts couverts
- COUNT (compter)
- SUM (additionner)
- AVG (moyenne)
- MIN / MAX (plus petit / plus grand)
- GROUP BY (grouper par catégorie)

### 🛠️ Pourquoi ça comme ça ?
- On crée une table avec plusieurs lignes
- On montre COUNT / SUM / AVG seuls (ça résume tout)
- On ajoute GROUP BY (pour résumer **par catégorie**)
- **Métaphore** : "C'est comme compter les devs vs les managers dans l'entreprise"

### ⏱️ Durée
~7 minutes

### 📝 Exemple
```sql
SELECT fonction, COUNT(*) as nombre, AVG(salaire) as salaire_moyen
FROM employes
GROUP BY fonction;
```

---

## Job 5️⃣ - JOIN : Combiner des tables

### 🎯 Objectif
Apprendre à **combiner plusieurs tables**. Par exemple : joindre la table "clients" avec la table "commandes".

### 📖 Concepts couverts
- INNER JOIN (intersection)
- LEFT JOIN (avec tous les éléments de gauche)
- Clés étrangères (comment elles relient les tables)

### 🛠️ Pourquoi ça comme ça ?
- On crée 2 tables : `employes` et `departements`
- On les relie avec une clé étrangère
- On montre INNER JOIN vs LEFT JOIN
- **Métaphore** : "C'est comme coller deux feuilles ensemble : qui a des infos des deux côtés ?"

### ⏱️ Durée
~8 minutes

### 📝 Exemple
```sql
SELECT employes.nom, departements.nom
FROM employes
INNER JOIN departements ON employes.dept_id = departements.id;
```

---

## Job 6️⃣ - SUBQUERIES : Les requêtes imbriquées

### 🎯 Objectif
Apprendre à **faire une requête dans une requête**. Ça permet de résoudre des problèmes complexes en étapes.

### 📖 Concepts couverts
- Subqueries dans WHERE
- Subqueries dans SELECT
- IN / EXISTS
- Comprendre l'ordre d'exécution

### 🛠️ Pourquoi ça comme ça ?
- On prend des données du Job 5
- On montre un problème : "Affiche les devs qui gagnent plus que la moyenne"
- On montre comment une subquery résout ça
- **Métaphore** : "C'est comme demander d'abord 'Quel est le salaire moyen ?' puis 'Qui gagne plus que ça ?'"

### ⏱️ Durée
~8 minutes

### 📝 Exemple
```sql
SELECT nom FROM employes
WHERE salaire > (SELECT AVG(salaire) FROM employes);
```

---

## Job 7️⃣ - CASE : La logique conditionnelle

### 🎯 Objectif
Apprendre à **créer des colonnes conditionnelles**. "Si le salaire < 3000, c'est 'junior', sinon 'senior'".

### 📖 Concepts couverts
- CASE WHEN ... THEN ... ELSE ... END
- Créer des catégories
- Niveaux multiples

### 🛠️ Pourquoi ça comme ça ?
- On reprend les données des emplois
- On ajoute une colonne CASE pour catégoriser
- On montre comment c'est plus lisible qu'avec WHERE
- **Métaphore** : "C'est comme un test 'SI... ALORS... SINON' en Excel"

### ⏱️ Durée
~6 minutes

### 📝 Exemple
```sql
SELECT nom, salaire,
  CASE 
    WHEN salaire < 3000 THEN 'Junior'
    WHEN salaire < 4000 THEN 'Senior'
    ELSE 'Lead'
  END as niveau
FROM employes;
```

---

## Job 8️⃣ - WINDOW FUNCTIONS : Les calculs en fenêtre

### 🎯 Objectif
Apprendre à **faire des calculs en gardant les lignes originales**. Par exemple : chaque emploi voit le salaire moyen de sa fonction à côté.

### 📖 Concepts couverts
- ROW_NUMBER() OVER (PARTITION BY ...)
- SUM() OVER (...)
- AVG() OVER (...)
- RANK()

### 🛠️ Pourquoi ça comme ça ?
- C'est plus complexe, donc on montre un cas réel
- On crée un classement par fonction
- On calcule le salaire moyen **par fonction** visible dans chaque ligne
- **Métaphore** : "C'est comme voir, pour chaque emploi, le contexte de sa fonction"

### ⏱️ Durée
~8 minutes

### 📝 Exemple
```sql
SELECT nom, fonction, salaire,
  AVG(salaire) OVER (PARTITION BY fonction) as salaire_moyen_fonction
FROM employes;
```

---

## Job 9️⃣ - FINAL PROJECT : Analyse complète

### 🎯 Objectif
**Assembler tout ce qu'on a appris** pour résoudre un vrai problème.

### 📖 Concepts couverts
- Combiner SELECT, WHERE, JOIN, GROUP BY, CASE, WINDOW FUNCTIONS
- Optimiser une requête
- Penser à la logique d'abord

### 🛠️ Pourquoi ça comme ça ?
- On pose un vrai problème : "Affiche pour chaque emploi: nom, salaire, fonction, salaire moyen de sa fonction, et un label 'Au-dessus/En-dessous de la moyenne'"
- On doit utiliser : JOIN, CASE, WINDOW FUNCTIONS
- **Métaphore** : "C'est comme monter un meuble IKEA : tu dois assembler toutes les pièces"

### ⏱️ Durée
~10 minutes

### 📝 Exemple
```sql
SELECT 
  employes.nom,
  employes.salaire,
  departements.nom as fonction,
  AVG(employes.salaire) OVER (PARTITION BY departements.id) as salaire_moyen,
  CASE 
    WHEN employes.salaire > AVG(employes.salaire) OVER (PARTITION BY departements.id)
    THEN 'Au-dessus'
    ELSE 'En-dessous'
  END as comparaison
FROM employes
JOIN departements ON employes.dept_id = departements.id;
```

---

## 📊 Progression Visuelle

```
Job 1: SELECT
  └─ Job 2: WHERE (filtrer)
      └─ Job 3: ORDER BY (trier)
          └─ Job 4: AGGREGATE (résumer)
              └─ Job 5: JOIN (combiner tables)
                  └─ Job 6: SUBQUERIES (requêtes imbriquées)
                      └─ Job 7: CASE (conditions)
                          └─ Job 8: WINDOW FUNCTIONS (calculs avancés)
                              └─ Job 9: FINAL PROJECT (assembler tout)
```

Chaque Job dépend des précédents. Tu **dois** les faire dans l'ordre.

---

## 🚀 Comment utiliser ces Jobs

### Step 1: Installer les dépendances
```bash
pip install jupyter pandas sqlite3
```

### Step 2: Lancer Jupyter
```bash
jupyter notebook
```

### Step 3: Ouvrir les Jobs
- Ouvre `sql/job1.ipynb`
- Lis le texte (en Markdown)
- Exécute chaque cellule de code (Shift + Enter)
- Essaie de modifier le code pour expérimenter

### Step 4: Passer au Job suivant
Quand tu as compris un job, passe au suivant.

---

## 💡 Conseils pour apprendre

1. **Ne saute pas les explications** : Lis le texte avant d'exécuter le code
2. **Expérimente** : Modifie les requêtes, vois ce qu'il se passe
3. **Essaie de casser** : Fais des erreurs intentionnelles, lis les messages d'erreur
4. **Prends des notes** : Écris les concepts clés dans ta tête ou sur papier
5. **Reviens en arrière** : Si tu es coincé au Job 7, refais le Job 6

---

## 🔗 Relation avec le site Flask

Le site "Carbon Footprint Calculator" utilise ces concepts :
- **SELECT** pour récupérer les données d'un pays
- **WHERE** pour filtrer par code pays
- **JOIN** pour combiner pays + intensité carbone
- **GROUP BY** pour faire des statistiques par région

Donc en maîtrisant ces 9 jobs, tu comprendra exactement comment fonctionne l'app Flask ! 🎉

---

## 📞 Questions fréquentes

**Q: Je peux faire les jobs hors ordre ?**  
R: Non, vraiment pas. Chaque job s'appuie sur le précédent.

**Q: Combien de temps pour tout finir ?**  
R: ~45 minutes si tu vas vite, ~2 heures si tu vraiment comprendre.

**Q: C'est quoi le meilleur SQL pour apprendre ?**  
R: SQLite (c'est ce qu'on utilise). C'est simple et ça marche partout.

**Q: Après les 9 jobs, je peux faire quoi ?**  
R: Essayer des vrais datasets avec Pandas + SQL. Ou apprendre PostgreSQL (SQL professionnel).

---

**Bonne chance ! 🎓**
