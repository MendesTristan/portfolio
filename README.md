# Portfolio — Tristan Mendes Voufo

Portfolio personnel présentant mon parcours en **Data Engineering** et **Cloud Architecture**.

Ingénieur diplômé de l'EFREI Paris (Bac+5), doublement certifié **Microsoft Azure AZ-900** et **Google Cloud Associate Data Practitioner**, j'y présente mes expériences professionnelles (BNP Paribas CIB, ISEG Strasbourg, ESPRIT TECH), mes projets techniques et ma stack complète.

## Stack technique

- **React** + **Vite** — SPA rapide avec HMR
- **Tailwind CSS v4** — Styling utility-first
- **Three.js** / React Three Fiber — Scènes 3D interactives (réseau neuronal, particules)
- **GSAP** + ScrollTrigger — Animations au scroll et timelines
- **Responsive** — Mobile-first, adapté à tous les écrans

## Lancer le projet

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── components/
│   ├── sections/    # Hero, About, Skills, Experience, Projects, Contact
│   ├── three/       # Scènes 3D (HeroScene, ParticleField, etc.)
│   └── ui/          # Composants réutilisables (Navbar, Button, SectionWrapper)
├── constants/       # Données centralisées (expériences, projets, certifications)
├── hooks/           # Custom hooks (useMousePosition)
└── index.css        # Thème global et utilitaires
```

## Contact

**Email** — mendesvoufo.pro@gmail.com
