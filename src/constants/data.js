export const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#experience", label: "Expériences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: "3+", label: "Années d'expérience" },
  { value: "10+", label: "Projets livrés" },
  { value: "20+", label: "Technologies" },
  { value: "2", label: "Certifications Cloud" },
];

export const aboutExtras = [
  { icon: "globe", label: "Volontariat", text: "Préservation des tortues au Costa Rica" },
  { icon: "dumbbell", label: "Sports", text: "Musculation, course à pied, kickboxing" },
  { icon: "bitcoin", label: "Intérêt", text: "Écosystème crypto & blockchain" },
  { icon: "languages", label: "Langues", text: "Français (natif) · Anglais (courant)" },
];

export const skillCategories = [
  {
    title: "Langages",
    icon: "code",
    skills: ["Python", "SQL", "Java", "C#", "Rust", "Solidity"],
  },
  {
    title: "Data Engineering",
    icon: "database",
    skills: ["PySpark", "Hadoop", "Hive", "ETL/ELT", "Apache Airflow", "dbt"],
  },
  {
    title: "Google Cloud (GCP)",
    icon: "cloud",
    skills: [
      "BigQuery", "Dataflow", "Pub/Sub", "Cloud Storage",
      "Dataproc", "Cloud Composer", "Cloud SQL", "Bigtable",
      "Looker Studio", "Data Catalog",
    ],
  },
  {
    title: "Microsoft Azure",
    icon: "cloud",
    skills: ["Azure Fundamentals", "Blob Storage", "Azure SQL", "Azure Functions"],
  },
  {
    title: "DevOps / CI-CD",
    icon: "rocket",
    skills: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "SonarQube", "Terraform"],
  },
  {
    title: "Data Analytics & ML",
    icon: "brain",
    skills: ["Pandas", "scikit-learn", "BigQuery ML", "Vertex AI", "Looker", "Dataplex"],
  },
  {
    title: "Web",
    icon: "globe",
    skills: ["PHP", "HTML", "JavaScript", "ReactJS", "NodeJS"],
  },
  {
    title: "Blockchain",
    icon: "link",
    skills: ["Ethereum", "Polygon", "Solana", "Bitcoin"],
  },
  {
    title: "Outils",
    icon: "wrench",
    skills: ["Git", "Jira", "Confluence", "Bitbucket"],
  },
];

export const experiences = [
  {
    title: "Business Analyst & Developer",
    company: "BNP Paribas CIB",
    location: "Paris",
    period: "Mars – Sept. 2025",
    context: "Intégration des tests automatisés au sein des modules Cockpit ALM Treasury (Finance de marché, Regulatory Services).",
    missions: [
      "Conception et implémentation de tests d'intégration BDD (Gherkin / SpecFlow) pour la validation de rapports réglementaires critiques (Daily & Monthly Reports)",
      "Développement C# / .NET 8 : codage des Step Definitions et intégration dans l'architecture micro-services existante",
      "Mocking avancé (Moq) : simulation de dépendances complexes (bases SQL, services de messagerie, logs) pour l'isolement et la fiabilité des tests",
      "Requêtes SQL Server complexes pour l'identification des critères d'exclusion réglementaires et la validation des jeux de données",
      "Réduction de la dette technique via SonarQube : suppression de duplication de code et amélioration de la maintenabilité",
      "CI/CD : intégration des tests dans la chaîne de déploiement continu via Jenkins, versioning Git / Bitbucket",
      "Création de dashboards Kibana (ElasticSearch) pour le monitoring temps réel des erreurs, performances et volumes de données",
    ],
    highlights: [
      { metric: "6", label: "scénarios majeurs automatisés", detail: "Trading Obligation, Clearing Obligation, éligibilité" },
      { metric: "5", label: "zones géographiques couvertes", detail: "Europe, APAC, Pologne, Fortis, NAR" },
      { metric: "100 %", label: "conformité production", detail: "Seuils de qualité stricts atteints pour le déploiement" },
    ],
    stack: ["C#", ".NET 8", "SpecFlow", "Gherkin", "SQL Server", "Moq", "Jenkins", "SonarQube", "Kibana", "ElasticSearch", "Git", "Bitbucket", "Jira"],
  },
  {
    title: "Data Analyst",
    company: "ISEG Strasbourg",
    location: "Strasbourg",
    period: "Déc. 2023 – Avr. 2024",
    context: "Traitement des bases de données prospects sur Salesforce en profilage client.",
    missions: [
      "Administration et manipulation de données prospects sur Salesforce (nettoyage, filtrage, catégorisation)",
      "Analyses statistiques & Data Mining : études descriptives sur cohorte pour identifier tendances émergentes et corrélations entre profils",
      "Profilage client (segmentation) : division de la base en segments homogènes sur critères démographiques et comportementaux pour personnaliser les campagnes marketing",
      "Analyse prédictive : modèles statistiques pour anticiper les taux de conversion et la participation aux événements",
      "Data Visualization : rapports personnalisés et tableaux de bord dynamiques pour le suivi des KPI",
      "Standardisation des données : processus de nettoyage, validation et homogénéisation de données hétérogènes multi-sources (Web, salons, JPO)",
    ],
    highlights: [
      { metric: "2 000+", label: "prospects traités et analysés", detail: "Nettoyage, segmentation et profilage de la base complète" },
      { metric: "12 ans", label: "d'historique analysé", detail: "Évolution des effectifs étudiants de 2012 à 2024" },
      { metric: "+55 %", label: "croissance identifiée", detail: "Hausse des effectifs globaux, dont +67 % pour la Grande École" },
      { metric: "CSP", label: "corrélation établie", detail: "Lien entre catégorie socio-professionnelle des parents et réussite scolaire" },
    ],
    stack: ["Python", "Salesforce", "Pandas", "Data Mining", "Data Visualization", "Excel"],
  },
  {
    title: "Développeur Junior",
    company: "ESPRIT TECH",
    location: "Tunisie",
    period: "Juill. – Août 2021",
    context: "Optimisation d'algorithmes de recherche et développement d'une plateforme de billetterie e-commerce.",
    missions: [
      "Conception d'algorithmes de recherche optimisés (Pattern Matching) pour l'affichage instantané de films et d'acteurs dans la base de données",
      "Développement Web Full-Stack PHP en architecture MVC : séparation claire entre logique métier et interface utilisateur",
      "Modélisation et administration de la base de données MySQL (phpMyAdmin) : tables, relations, clés étrangères (films, séances, utilisateurs, réservations)",
      "Sécurisation des transactions : sessions utilisateurs sécurisées et gestion des droits d'accès pour les réservations en ligne",
      "Interface dynamique HTML/CSS intégrée avec PHP pour l'affichage temps réel des places disponibles par salle",
    ],
    highlights: [
      { metric: "~0 s", label: "temps de recherche", detail: "Réduction de la complexité temporelle via Pattern Matching optimisé" },
      { metric: "E2E", label: "tunnel d'achat complet", detail: "Sélection du film → réservation → génération de billet unique" },
      { metric: "10+", label: "tables interdépendantes", detail: "Base de données optimisée garantissant l'intégrité des données de vente" },
      { metric: "0", label: "conflit de placement", detail: "Gestion de la concurrence sur les réservations simultanées" },
    ],
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "phpMyAdmin", "MVC", "Algorithms"],
  },
];

export const projects = [
  {
    title: "BNP Paribas – Regulatory Services",
    period: "2025",
    description:
      "Tests automatisés BDD pour rapports réglementaires bancaires. Validation des flux de données critiques en environnement de finance de marché.",
    stack: ["C#", "SpecFlow", "Gherkin", "Jenkins", "SQL Server", "Elasticsearch"],
  },
  {
    title: "Signo'Lib",
    period: "Nov. 2024 – Févr. 2025",
    description:
      "Application mobile inclusive pour la mise en relation des sourds et malentendants avec des interprètes LSF. Projet Agile en équipe de 5.",
    stack: ["React Native", "Node.js", "Express", "Agile"],
  },
  {
    title: "CI/CD Automation",
    period: "Nov. 2024",
    description:
      "Pipeline CI/CD complet : build, test, déploiement automatisé avec conteneurisation et orchestration.",
    stack: ["Docker", "Kubernetes", "GitHub Actions", "Ansible", "Maven"],
  },
  {
    title: "Machine Learning Project",
    period: "Avr. 2024",
    description:
      "Préparation de datasets, sélection et entraînement de modèles ML. Classification et régression sur données réelles.",
    stack: ["Python", "Pandas", "scikit-learn", "Random Forest", "kNN"],
  },
];

// Chronological order (oldest first)
export const formations = [
  {

    title: "Diplôme Ingénieur Bac+5 Data Science",
    school: "EFREI Paris",
    period: "2022 – 2025",
    year: 2025,
  },
  {
    title: "Mobilité internationale",
    school: "Asia Pacific University, Kuala Lumpur",
    period: "Janv. – Mai 2023",
    year: 2023,
  },
  {
    title: "Prépa Intégrée",
    school: "ESPRIT, Tunis",
    period: "2020 – 2022",
    year: 2020,

  },
];

export const certifications = [
  { name: "Microsoft Azure Fundamentals AZ-900", issuer: "Microsoft", status: "obtained", badge: "Azure AZ-900" },
  { name: "Google Cloud – Associate Data Practitioner", issuer: "Google", status: "obtained", badge: "GCP Data Practitioner" },
];

export const contactInfo = {
  email: "mendesvoufo.pro@gmail.com",
  location: "Marne-La-Vallée, 77700",
};
