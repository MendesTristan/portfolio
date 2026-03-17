export const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#experience", label: "Expériences" },
  { href: "#projects", label: "Projets" },
  { href: "#hackathons", label: "Hackathons" },
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
    type: "Finance de Marché",
    period: "2025",
    description:
      "Architecture et automatisation de 6 scénarios de tests BDD critiques (SpecFlow/Gherkin) pour les rapports réglementaires. Couverture de 5 zones géographiques (Europe, APAC, NAR), monitoring Kibana temps réel, qualité validée en chaîne CI/CD Jenkins.",
    impact: "100% conformité production",
    stack: ["C#", ".NET 8", "SpecFlow", "Gherkin", "Jenkins", "SQL Server", "Elasticsearch", "Kibana"],
  },
  {
    title: "Signo'Lib",
    type: "Application Mobile",
    period: "Nov. 2024 – Févr. 2025",
    description:
      "Application mobile inclusive connectant les sourds et malentendants avec des interprètes LSF certifiés en temps réel. Architecture full-stack React Native + API REST Node.js, authentification sécurisée, sprints Agile en équipe de 5.",
    impact: "MVP livré en 4 mois",
    stack: ["React Native", "Node.js", "Express", "MongoDB", "Agile"],
  },
  {
    title: "Pipeline CI/CD End-to-End",
    type: "DevOps & Cloud",
    period: "Nov. 2024",
    description:
      "Pipeline d'intégration et déploiement continu complet : conteneurisation Docker multi-stage, orchestration Kubernetes, provisionnement Ansible, tests automatisés. Élimination des erreurs manuelles et déploiement en 1 clic.",
    impact: "−80% temps déploiement",
    stack: ["Docker", "Kubernetes", "GitHub Actions", "Ansible", "Maven", "Terraform"],
  },
  {
    title: "Modèle ML – Prédiction & Classification",
    type: "Data Science",
    period: "Avr. 2024",
    description:
      "Benchmark de modèles supervisés (Random Forest, kNN, SVM) sur datasets réels. Feature engineering avancé, cross-validation stratifiée, tuning hyperparamètres par grid search. Analyse d'importance des features et interprétabilité.",
    impact: "R² > 0.85 atteint",
    stack: ["Python", "Pandas", "scikit-learn", "Random Forest", "kNN", "Matplotlib"],
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

export const hackathons = [
  {
    theme: "google",
    title: "Hackathon Deloitte x Google Cloud",
    date: "28 novembre 2024",
    location: "La Défense – Tour Majunga, Paris",
    description: "Challenge tech d'une journée autour du Cloud, de l'IA et de la Data. Résolution de cas métier réels via la création d'agents IA de bout en bout sur Google Cloud avec l'Agent Development Kit (ADK) de Google : un agent de gestion de campagnes Marketing et un agent de prédiction du taux de change de devises internationales basé sur des données temps réel du web.",
    highlights: [
      "Cas métier : conception d'un agent IA de gestion de campagnes Marketing (ciblage, personnalisation, optimisation budgétaire)",
      "Cas métier : développement d'un agent IA de prédiction du taux de change multi-devises à partir de données web temps réel",
      "Utilisation de l'Agent Development Kit (ADK) de Google pour orchestrer les agents de bout en bout",
      "Pitch final et remise des prix devant un jury d'experts Deloitte & Google Cloud",
    ],
    stack: ["Google Cloud", "Agent Development Kit (ADK)", "Vertex AI", "BigQuery", "Gemini", "Python", "Cloud Functions"],
    photos: [
      "/assets/hackathons/deloitte-gcloud-1.png",
      "/assets/hackathons/deloitte-gcloud-2.png",
      "/assets/hackathons/deloitte-gcloud-3.png",
      "/assets/hackathons/deloitte-gcloud-4.png",
      "/assets/hackathons/deloitte-gcloud-5.png",
      "/assets/hackathons/deloitte-gcloud-6.png",
    ],
    organizers: ["Deloitte", "Google Cloud"],
  },
  {
    theme: "ey",
    title: "Open Science AI & Data Challenge 2026",
    date: "Janvier – Mars 2026",
    location: "Full Remote – Compétition mondiale",
    description: "Challenge international Data & IA organisé par EY en partenariat avec Snowflake. Objectif : développer un modèle de Machine Learning capable de prédire la qualité de l'eau dans les rivières d'Afrique du Sud, afin de garantir un accès équitable et durable à l'eau potable pour les populations vulnérables.",
    highlights: [
      "Développement d'un modèle ML de prédiction de 3 paramètres de qualité de l'eau (alcalinité, conductance, phosphore dissous)",
      "Feature engineering avancé à partir de données géospatiales, satellites Landsat et TerraClimate",
      "Entraînement et optimisation sur ~200 sites de rivières sud-africaines (2011-2015), validation sur des régions inédites",
      "Score évalué sur le R² moyen des 3 paramètres – classement mondial face à des étudiants du monde entier",
    ],
    stack: ["Python", "Snowflake", "scikit-learn", "Landsat", "TerraClimate", "Pandas", "Machine Learning"],
    photos: [
      "/assets/hackathons/ey-challenge-banner.png",
    ],
    organizers: ["EY", "Snowflake"],
  },
];

export const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/tristanmendes-v/", color: "#0A66C2" },
  { name: "GitHub", url: "https://github.com/MendesTristan", color: "#8b5cf6" },
  { name: "Email", url: "mailto:mendesvoufo.pro@gmail.com", color: "#ea4335" },
];

export const contactInfo = {
  email: "mendesvoufo.pro@gmail.com",
  location: "Paris, France",
};
