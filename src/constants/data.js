export const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#experience", label: "Expériences" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: "3+", label: "Années d'expérience" },
  { value: "10+", label: "Projets livrés" },
  { value: "15+", label: "Technologies" },
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
    title: "Data & Big Data",
    icon: "database",
    skills: ["PySpark", "Hadoop", "Hive", "ETL/ELT"],
  },
  {
    title: "Cloud",
    icon: "cloud",
    skills: ["GCP BigQuery", "Cloud Storage", "Dataflow", "Pub/Sub"],
  },
  {
    title: "DevOps / CI-CD",
    icon: "rocket",
    skills: ["Jenkins", "GitHub Actions", "SonarQube", "Docker", "Kubernetes"],
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
    description:
      "Automatisation de tests d'intégration BDD (Gherkin/SpecFlow/C#/.NET). Dashboards de monitoring sur Elasticsearch/Kibana. Contexte : Finance de marché, ALM Treasury, Regulatory Services.",
    stack: ["C#", ".NET 8", "SQL Server", "Jenkins", "Jira", "Bitbucket", "SonarQube"],
  },
  {
    title: "Data Analyst",
    company: "ISEG Strasbourg",
    location: "Strasbourg",
    period: "Déc. 2023 – Avr. 2024",
    description:
      "Analyse CRM Salesforce, analyses prédictives Python, création de KPI dashboards pour la prise de décision stratégique.",
    stack: ["Python", "Salesforce", "Pandas", "Data Visualization"],
  },
  {
    title: "Développeur Junior",
    company: "ESPRIT TECH",
    location: "Tunisie",
    period: "Juill. – Août 2021",
    description:
      "Développement d'algorithmes de recherche et création d'un site web dynamique full-stack.",
    stack: ["PHP", "HTML", "JavaScript", "Algorithms"],
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
  { name: "Microsoft Azure Fundamentals AZ-900", issuer: "Microsoft", status: "obtained" },
  { name: "Google Cloud – Associate Data Practitioner", issuer: "Google", status: "in-progress" },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/tristanmendesv", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/tristanmendesv", icon: "linkedin" },
  { name: "Email", url: "mailto:mendesvoufo.pro@gmail.com", icon: "mail" },
];

export const contactInfo = {
  email: "mendesvoufo.pro@gmail.com",
  location: "Marne-La-Vallée, 77700",
};
