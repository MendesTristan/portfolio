const translations = {
  fr: {
    navLinks: [
      { href: "#about", label: "À propos" },
      { href: "#skills", label: "Compétences" },
      { href: "#experience", label: "Expériences" },
      { href: "#projects", label: "Projets" },
      { href: "#hackathons", label: "Hackathons" },
      { href: "#contact", label: "Contact" },
    ],

    hero: {
      label: "Data Engineering & Cloud Architecture",
      roles: ["Data Engineer", "AI Builder", "Future Founder"],
      description:
        "Passionné par l'innovation technologique, j'utilise l'IA et l'automatisation des pipelines de données pour résoudre des problèmes complexes et livrer des solutions fiables.",
      cta: "Voir mes projets",
      ctaSecondary: "Me contacter",
      scroll: "Scroll",
    },

    stats: [
      { value: "3+", label: "Années d'expérience" },
      { value: "10+", label: "Projets livrés" },
      { value: "20+", label: "Technologies" },
      { value: "2", label: "Certifications Cloud" },
    ],

    about: {
      title: "À propos",
      subtitle: "Data Engineering, cloud et bien plus.",
      bio: [
        'Ingénieur <hl>Data & Cloud</hl> (EFREI Paris, Bac+5), je conçois et industrialise des <hl>pipelines ETL/ELT</hl>, des architectures <hl>data lake</hl> et des workflows d\'orchestration sur environnements <hl>multi-cloud</hl>.',
        'Forgé chez <hl>BNP Paribas CIB</hl>, je maîtrise les contraintes de volumétrie, de qualité de données et de conformité. Double certifié <hl>Azure AZ-900</hl> et <hl>GCP Associate Data Practitioner</hl>.',
      ],
      education: "Formation",
      certifications: "Certifications",
      obtained: "Obtenue",
    },

    aboutExtras: [
      { icon: "globe", label: "Volontariat", text: "Préservation des tortues au Costa Rica" },
      { icon: "dumbbell", label: "Sports", text: "Musculation, course à pied, kickboxing" },
      { icon: "bitcoin", label: "Intérêt", text: "Écosystème crypto & blockchain" },
      { icon: "languages", label: "Langues", text: "Français (natif) · Anglais (courant)" },
    ],

    formations: [
      { title: "Diplôme Ingénieur Bac+5 Data Science", school: "EFREI Paris", period: "2022 – 2025" },
      { title: "Mobilité internationale", school: "Asia Pacific University, Kuala Lumpur", period: "Janv. – Mai 2023" },
      { title: "Prépa Intégrée", school: "ESPRIT, Tunis", period: "2020 – 2022" },
    ],

    certifications: [
      { name: "Microsoft Azure Fundamentals AZ-900", issuer: "Microsoft" },
      { name: "Google Cloud – Associate Data Practitioner", issuer: "Google" },
    ],

    skills: {
      title: "Compétences",
      subtitle: "Stack technique & méthodologie.",
      cloudPlatforms: "Plateformes Cloud",
      technicalSkills: "Compétences Techniques",
      certified: "Certifié",
    },

    skillCategories: [
      { title: "Langages", icon: "code", skills: ["Python", "SQL", "Java", "C#", "Rust", "Solidity"] },
      { title: "Data Engineering", icon: "database", skills: ["PySpark", "Hadoop", "Hive", "ETL/ELT", "Apache Airflow", "dbt"] },
      {
        title: "Google Cloud (GCP)", icon: "cloud",
        skills: ["BigQuery", "Dataflow", "Pub/Sub", "Cloud Storage", "Dataproc", "Cloud Composer", "Cloud SQL", "Bigtable", "Looker Studio", "Data Catalog"],
      },
      { title: "Microsoft Azure", icon: "cloud", skills: ["Azure Fundamentals", "Blob Storage", "Azure SQL", "Azure Functions"] },
      { title: "DevOps / CI-CD", icon: "rocket", skills: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "SonarQube", "Terraform"] },
      { title: "Data Analytics & ML", icon: "brain", skills: ["Pandas", "scikit-learn", "BigQuery ML", "Vertex AI", "Looker", "Dataplex"] },
      { title: "Web", icon: "globe", skills: ["PHP", "HTML", "JavaScript", "ReactJS", "NodeJS"] },
      { title: "Blockchain", icon: "link", skills: ["Ethereum", "Polygon", "Solana", "Bitcoin"] },
      { title: "Outils", icon: "wrench", skills: ["Git", "Jira", "Confluence", "Bitbucket"] },
    ],

    cloudConfig: {
      "Google Cloud (GCP)": { certName: "Associate Data Practitioner" },
      "Microsoft Azure": { certName: "Azure Fundamentals AZ-900" },
    },

    experience: {
      title: "Expérience professionnelle",
      subtitle: "Parcours en finance de marché, data et développement.",
      missions: "Missions",
      impact: "Impact",
    },

    experiences: [
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
    ],

    projects: {
      title: "Projets",
      subtitle: "Réalisations techniques à fort impact.",
      techStack: "stack technique",
    },

    projectsList: [
      {
        title: "BNP Paribas – Regulatory Services",
        type: "Finance de Marché",
        period: "2025",
        description: "Architecture et automatisation de 6 scénarios de tests BDD critiques (SpecFlow/Gherkin) pour les rapports réglementaires. Couverture de 5 zones géographiques (Europe, APAC, NAR), monitoring Kibana temps réel, qualité validée en chaîne CI/CD Jenkins.",
        impact: "100% conformité production",
        stack: ["C#", ".NET 8", "SpecFlow", "Gherkin", "Jenkins", "SQL Server", "Elasticsearch", "Kibana"],
      },
      {
        title: "Signo'Lib",
        type: "Application Mobile",
        period: "Nov. 2024 – Févr. 2025",
        description: "Application mobile inclusive connectant les sourds et malentendants avec des interprètes LSF certifiés en temps réel. Architecture full-stack React Native + API REST Node.js, authentification sécurisée, sprints Agile en équipe de 5.",
        impact: "MVP livré en 4 mois",
        stack: ["React Native", "Node.js", "Express", "MongoDB", "Agile"],
      },
      {
        title: "Pipeline CI/CD End-to-End",
        type: "DevOps & Cloud",
        period: "Nov. 2024",
        description: "Pipeline d'intégration et déploiement continu complet : conteneurisation Docker multi-stage, orchestration Kubernetes, provisionnement Ansible, tests automatisés. Élimination des erreurs manuelles et déploiement en 1 clic.",
        impact: "−80% temps déploiement",
        stack: ["Docker", "Kubernetes", "GitHub Actions", "Ansible", "Maven", "Terraform"],
      },
      {
        title: "Modèle ML – Prédiction & Classification",
        type: "Data Science",
        period: "Avr. 2024",
        description: "Benchmark de modèles supervisés (Random Forest, kNN, SVM) sur datasets réels. Feature engineering avancé, cross-validation stratifiée, tuning hyperparamètres par grid search. Analyse d'importance des features et interprétabilité.",
        impact: "R² > 0.85 atteint",
        stack: ["Python", "Pandas", "scikit-learn", "Random Forest", "kNN", "Matplotlib"],
      },
    ],

    hackathonsSection: {
      title: "Concours & Hackathons",
      subtitle: "Challenges techniques et moments forts.",
      contributions: "Contributions",
      technologies: "Technologies",
    },

    hackathonsList: [
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
        photos: ["/assets/hackathons/deloitte-gcloud-1.png", "/assets/hackathons/deloitte-gcloud-2.png", "/assets/hackathons/deloitte-gcloud-3.png", "/assets/hackathons/deloitte-gcloud-4.png", "/assets/hackathons/deloitte-gcloud-5.png", "/assets/hackathons/deloitte-gcloud-6.png"],
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
        photos: ["/assets/hackathons/ey-challenge-banner.png"],
        organizers: ["EY", "Snowflake"],
      },
    ],

    contact: {
      title: "Contact",
      subtitle: "Discutons de votre prochain projet.",
      description: "Ouvert aux opportunités en data engineering, projets cloud ou collaboration technique.",
      button: "Me contacter",
      footer: "Conçu & développé par",
    },

    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/tristanmendes-v/", color: "#0A66C2" },
      { name: "GitHub", url: "https://github.com/MendesTristan", color: "#8b5cf6" },
      { name: "Email", url: "mailto:mendesvoufo.pro@gmail.com", color: "#ea4335" },
    ],

    contactInfo: {
      email: "mendesvoufo.pro@gmail.com",
      location: "Paris, France",
    },

    admin: {
      login: {
        title: "Espace Admin",
        subtitle: "Connectez-vous pour accéder au tableau de bord",
        email: "Email",
        password: "Mot de passe",
        submit: "Connexion",
        error: "Identifiants incorrects",
        back: "Retour au portfolio",
      },
      dashboard: {
        title: "Tableau de bord",
        totalVisitors: "Visiteurs totaux",
        todayVisitors: "Aujourd'hui",
        uniqueVisitors: "Visiteurs uniques",
        recentVisitors: "Visiteurs récents",
        noVisitors: "Aucun visiteur enregistré",
        date: "Date",
        country: "Pays",
        city: "Ville",
        device: "Appareil",
        browser: "Navigateur",
        os: "Système",
        page: "Page",
        logout: "Déconnexion",
        backToSite: "Retour au site",
        loading: "Chargement...",
      },
    },
  },

  en: {
    navLinks: [
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#experience", label: "Experience" },
      { href: "#projects", label: "Projects" },
      { href: "#hackathons", label: "Hackathons" },
      { href: "#contact", label: "Contact" },
    ],

    hero: {
      label: "Data Engineering & Cloud Architecture",
      roles: ["Data Engineer", "AI Builder", "Future Founder"],
      description:
        "Passionate about technological innovation, I leverage AI and data pipeline automation to solve complex problems and deliver reliable solutions.",
      cta: "View my projects",
      ctaSecondary: "Contact me",
      scroll: "Scroll",
    },

    stats: [
      { value: "3+", label: "Years of Experience" },
      { value: "10+", label: "Projects Delivered" },
      { value: "20+", label: "Technologies" },
      { value: "2", label: "Cloud Certifications" },
    ],

    about: {
      title: "About",
      subtitle: "Data Engineering, cloud and beyond.",
      bio: [
        '<hl>Data & Cloud</hl> Engineer (EFREI Paris, MSc), I design and industrialize <hl>ETL/ELT pipelines</hl>, <hl>data lake</hl> architectures and orchestration workflows on <hl>multi-cloud</hl> environments.',
        'Trained at <hl>BNP Paribas CIB</hl>, I master the constraints of data volume, quality and compliance. Dual-certified <hl>Azure AZ-900</hl> and <hl>GCP Associate Data Practitioner</hl>.',
      ],
      education: "Education",
      certifications: "Certifications",
      obtained: "Obtained",
    },

    aboutExtras: [
      { icon: "globe", label: "Volunteering", text: "Turtle conservation in Costa Rica" },
      { icon: "dumbbell", label: "Sports", text: "Weightlifting, running, kickboxing" },
      { icon: "bitcoin", label: "Interest", text: "Crypto & blockchain ecosystem" },
      { icon: "languages", label: "Languages", text: "French (native) · English (fluent)" },
    ],

    formations: [
      { title: "MSc Data Science Engineering", school: "EFREI Paris", period: "2022 – 2025" },
      { title: "International Exchange", school: "Asia Pacific University, Kuala Lumpur", period: "Jan. – May 2023" },
      { title: "Preparatory Program", school: "ESPRIT, Tunis", period: "2020 – 2022" },
    ],

    certifications: [
      { name: "Microsoft Azure Fundamentals AZ-900", issuer: "Microsoft" },
      { name: "Google Cloud – Associate Data Practitioner", issuer: "Google" },
    ],

    skills: {
      title: "Skills",
      subtitle: "Technical stack & methodology.",
      cloudPlatforms: "Cloud Platforms",
      technicalSkills: "Technical Skills",
      certified: "Certified",
    },

    skillCategories: [
      { title: "Languages", icon: "code", skills: ["Python", "SQL", "Java", "C#", "Rust", "Solidity"] },
      { title: "Data Engineering", icon: "database", skills: ["PySpark", "Hadoop", "Hive", "ETL/ELT", "Apache Airflow", "dbt"] },
      {
        title: "Google Cloud (GCP)", icon: "cloud",
        skills: ["BigQuery", "Dataflow", "Pub/Sub", "Cloud Storage", "Dataproc", "Cloud Composer", "Cloud SQL", "Bigtable", "Looker Studio", "Data Catalog"],
      },
      { title: "Microsoft Azure", icon: "cloud", skills: ["Azure Fundamentals", "Blob Storage", "Azure SQL", "Azure Functions"] },
      { title: "DevOps / CI-CD", icon: "rocket", skills: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "SonarQube", "Terraform"] },
      { title: "Data Analytics & ML", icon: "brain", skills: ["Pandas", "scikit-learn", "BigQuery ML", "Vertex AI", "Looker", "Dataplex"] },
      { title: "Web", icon: "globe", skills: ["PHP", "HTML", "JavaScript", "ReactJS", "NodeJS"] },
      { title: "Blockchain", icon: "link", skills: ["Ethereum", "Polygon", "Solana", "Bitcoin"] },
      { title: "Tools", icon: "wrench", skills: ["Git", "Jira", "Confluence", "Bitbucket"] },
    ],

    cloudConfig: {
      "Google Cloud (GCP)": { certName: "Associate Data Practitioner" },
      "Microsoft Azure": { certName: "Azure Fundamentals AZ-900" },
    },

    experience: {
      title: "Professional Experience",
      subtitle: "Background in capital markets, data and development.",
      missions: "Missions",
      impact: "Impact",
    },

    experiences: [
      {
        title: "Business Analyst & Developer",
        company: "BNP Paribas CIB",
        location: "Paris",
        period: "Mar. – Sept. 2025",
        context: "Integration of automated tests within the Cockpit ALM Treasury modules (Capital Markets, Regulatory Services).",
        missions: [
          "Design and implementation of BDD integration tests (Gherkin / SpecFlow) for critical regulatory report validation (Daily & Monthly Reports)",
          "C# / .NET 8 development: coding Step Definitions and integration into the existing micro-services architecture",
          "Advanced mocking (Moq): simulation of complex dependencies (SQL databases, messaging services, logs) for test isolation and reliability",
          "Complex SQL Server queries for identifying regulatory exclusion criteria and validating datasets",
          "Technical debt reduction via SonarQube: code duplication removal and maintainability improvement",
          "CI/CD: test integration into the continuous deployment chain via Jenkins, Git / Bitbucket versioning",
          "Creation of Kibana dashboards (ElasticSearch) for real-time monitoring of errors, performance and data volumes",
        ],
        highlights: [
          { metric: "6", label: "major automated scenarios", detail: "Trading Obligation, Clearing Obligation, eligibility" },
          { metric: "5", label: "geographic zones covered", detail: "Europe, APAC, Poland, Fortis, NAR" },
          { metric: "100%", label: "production compliance", detail: "Strict quality thresholds met for deployment" },
        ],
        stack: ["C#", ".NET 8", "SpecFlow", "Gherkin", "SQL Server", "Moq", "Jenkins", "SonarQube", "Kibana", "ElasticSearch", "Git", "Bitbucket", "Jira"],
      },
      {
        title: "Data Analyst",
        company: "ISEG Strasbourg",
        location: "Strasbourg",
        period: "Dec. 2023 – Apr. 2024",
        context: "Prospect database processing on Salesforce for client profiling.",
        missions: [
          "Administration and manipulation of prospect data on Salesforce (cleaning, filtering, categorization)",
          "Statistical analysis & Data Mining: descriptive cohort studies to identify emerging trends and profile correlations",
          "Client profiling (segmentation): database division into homogeneous segments based on demographic and behavioral criteria for personalized marketing campaigns",
          "Predictive analysis: statistical models to anticipate conversion rates and event participation",
          "Data Visualization: customized reports and dynamic dashboards for KPI tracking",
          "Data standardization: cleaning, validation and homogenization process for heterogeneous multi-source data (Web, fairs, open days)",
        ],
        highlights: [
          { metric: "2,000+", label: "prospects processed and analyzed", detail: "Cleaning, segmentation and profiling of the complete database" },
          { metric: "12 yrs", label: "of history analyzed", detail: "Student enrollment evolution from 2012 to 2024" },
          { metric: "+55%", label: "growth identified", detail: "Overall enrollment increase, including +67% for the Grande École" },
          { metric: "SPC", label: "correlation established", detail: "Link between parents' socio-professional category and academic success" },
        ],
        stack: ["Python", "Salesforce", "Pandas", "Data Mining", "Data Visualization", "Excel"],
      },
      {
        title: "Junior Developer",
        company: "ESPRIT TECH",
        location: "Tunisia",
        period: "July – Aug. 2021",
        context: "Optimization of search algorithms and development of an e-commerce ticketing platform.",
        missions: [
          "Design of optimized search algorithms (Pattern Matching) for instant display of movies and actors in the database",
          "Full-Stack PHP Web Development in MVC architecture: clear separation between business logic and user interface",
          "Database modeling and administration with MySQL (phpMyAdmin): tables, relationships, foreign keys (movies, sessions, users, reservations)",
          "Transaction security: secure user sessions and access rights management for online reservations",
          "Dynamic HTML/CSS interface integrated with PHP for real-time display of available seats per theater",
        ],
        highlights: [
          { metric: "~0s", label: "search time", detail: "Temporal complexity reduction via optimized Pattern Matching" },
          { metric: "E2E", label: "complete purchase funnel", detail: "Movie selection → reservation → unique ticket generation" },
          { metric: "10+", label: "interdependent tables", detail: "Optimized database ensuring sales data integrity" },
          { metric: "0", label: "seat conflict", detail: "Concurrency management for simultaneous reservations" },
        ],
        stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "phpMyAdmin", "MVC", "Algorithms"],
      },
    ],

    projects: {
      title: "Projects",
      subtitle: "High-impact technical achievements.",
      techStack: "tech stack",
    },

    projectsList: [
      {
        title: "BNP Paribas – Regulatory Services",
        type: "Capital Markets",
        period: "2025",
        description: "Architecture and automation of 6 critical BDD test scenarios (SpecFlow/Gherkin) for regulatory reports. Coverage of 5 geographic zones (Europe, APAC, NAR), real-time Kibana monitoring, quality validated through Jenkins CI/CD pipeline.",
        impact: "100% production compliance",
        stack: ["C#", ".NET 8", "SpecFlow", "Gherkin", "Jenkins", "SQL Server", "Elasticsearch", "Kibana"],
      },
      {
        title: "Signo'Lib",
        type: "Mobile Application",
        period: "Nov. 2024 – Feb. 2025",
        description: "Inclusive mobile application connecting deaf and hard-of-hearing users with certified LSF interpreters in real-time. Full-stack architecture React Native + REST API Node.js, secure authentication, Agile sprints in a team of 5.",
        impact: "MVP delivered in 4 months",
        stack: ["React Native", "Node.js", "Express", "MongoDB", "Agile"],
      },
      {
        title: "End-to-End CI/CD Pipeline",
        type: "DevOps & Cloud",
        period: "Nov. 2024",
        description: "Complete continuous integration and deployment pipeline: multi-stage Docker containerization, Kubernetes orchestration, Ansible provisioning, automated testing. Elimination of manual errors and one-click deployment.",
        impact: "−80% deployment time",
        stack: ["Docker", "Kubernetes", "GitHub Actions", "Ansible", "Maven", "Terraform"],
      },
      {
        title: "ML Model – Prediction & Classification",
        type: "Data Science",
        period: "Apr. 2024",
        description: "Benchmark of supervised models (Random Forest, kNN, SVM) on real datasets. Advanced feature engineering, stratified cross-validation, hyperparameter tuning via grid search. Feature importance analysis and interpretability.",
        impact: "R² > 0.85 achieved",
        stack: ["Python", "Pandas", "scikit-learn", "Random Forest", "kNN", "Matplotlib"],
      },
    ],

    hackathonsSection: {
      title: "Contests & Hackathons",
      subtitle: "Technical challenges and key moments.",
      contributions: "Contributions",
      technologies: "Technologies",
    },

    hackathonsList: [
      {
        theme: "google",
        title: "Hackathon Deloitte x Google Cloud",
        date: "November 28, 2024",
        location: "La Défense – Tour Majunga, Paris",
        description: "One-day tech challenge focused on Cloud, AI and Data. Solving real business cases by building end-to-end AI agents on Google Cloud with Google's Agent Development Kit (ADK): a marketing campaign management agent and an international currency exchange rate prediction agent based on real-time web data.",
        highlights: [
          "Business case: design of an AI marketing campaign management agent (targeting, personalization, budget optimization)",
          "Business case: development of a multi-currency exchange rate prediction AI agent from real-time web data",
          "Use of Google's Agent Development Kit (ADK) to orchestrate agents end-to-end",
          "Final pitch and awards ceremony before a panel of Deloitte & Google Cloud experts",
        ],
        stack: ["Google Cloud", "Agent Development Kit (ADK)", "Vertex AI", "BigQuery", "Gemini", "Python", "Cloud Functions"],
        photos: ["/assets/hackathons/deloitte-gcloud-1.png", "/assets/hackathons/deloitte-gcloud-2.png", "/assets/hackathons/deloitte-gcloud-3.png", "/assets/hackathons/deloitte-gcloud-4.png", "/assets/hackathons/deloitte-gcloud-5.png", "/assets/hackathons/deloitte-gcloud-6.png"],
        organizers: ["Deloitte", "Google Cloud"],
      },
      {
        theme: "ey",
        title: "Open Science AI & Data Challenge 2026",
        date: "January – March 2026",
        location: "Fully Remote – Global Competition",
        description: "International Data & AI challenge organized by EY in partnership with Snowflake. Goal: develop a Machine Learning model to predict water quality in South African rivers, ensuring equitable and sustainable access to clean water for vulnerable populations.",
        highlights: [
          "Development of an ML model predicting 3 water quality parameters (alkalinity, conductance, dissolved phosphorus)",
          "Advanced feature engineering from geospatial data, Landsat satellites and TerraClimate",
          "Training and optimization on ~200 South African river sites (2011-2015), validation on unseen regions",
          "Score evaluated on the average R² of 3 parameters – worldwide ranking against students from all over the world",
        ],
        stack: ["Python", "Snowflake", "scikit-learn", "Landsat", "TerraClimate", "Pandas", "Machine Learning"],
        photos: ["/assets/hackathons/ey-challenge-banner.png"],
        organizers: ["EY", "Snowflake"],
      },
    ],

    contact: {
      title: "Contact",
      subtitle: "Let's discuss your next project.",
      description: "Open to data engineering opportunities, cloud projects or technical collaboration.",
      button: "Contact me",
      footer: "Designed & developed by",
    },

    socialLinks: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/tristanmendes-v/", color: "#0A66C2" },
      { name: "GitHub", url: "https://github.com/MendesTristan", color: "#8b5cf6" },
      { name: "Email", url: "mailto:mendesvoufo.pro@gmail.com", color: "#ea4335" },
    ],

    contactInfo: {
      email: "mendesvoufo.pro@gmail.com",
      location: "Paris, France",
    },

    admin: {
      login: {
        title: "Admin Space",
        subtitle: "Sign in to access the dashboard",
        email: "Email",
        password: "Password",
        submit: "Sign in",
        error: "Invalid credentials",
        back: "Back to portfolio",
      },
      dashboard: {
        title: "Dashboard",
        totalVisitors: "Total Visitors",
        todayVisitors: "Today",
        uniqueVisitors: "Unique Visitors",
        recentVisitors: "Recent Visitors",
        noVisitors: "No visitors recorded",
        date: "Date",
        country: "Country",
        city: "City",
        device: "Device",
        browser: "Browser",
        os: "System",
        page: "Page",
        logout: "Log out",
        backToSite: "Back to site",
        loading: "Loading...",
      },
    },
  },
};

export default translations;
