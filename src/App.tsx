import { useMemo, useState } from 'react'
import {
  ArrowDown, ArrowUpRight, Award, BrainCircuit, Check,
  Code2, Database, Github, Globe2, GraduationCap,
  Languages, Mail, MapPin, Menu, Network, ShieldCheck, Sparkles,
  Terminal, Workflow, X, Zap,
} from 'lucide-react'

type Lang = 'EN' | 'FR'
type Project = {
  title: string
  category: string
  year: string
  summary: string
  description: string
  stack: string[]
  accent: string
  icon: 'shield' | 'code' | 'database' | 'brain' | 'vision' | 'game' | 'leaf' | 'chart'
  status?: string
  repo?: string
  screenshot?: string
  summaryFr?: string
  descriptionFr?: string
}

const copy = {
  EN: {
    nav: ['About', 'Experience', 'Projects', 'Skills', 'Contact'],
    availability: 'OPEN TO PFE INTERNSHIP · FEB 2027',
    eyebrow: 'SOFTWARE ENGINEERING · ARTIFICIAL INTELLIGENCE',
    intro: 'Building useful software with',
    introAccent: 'intelligence.',
    lead: 'I’m Khadija, a final-year engineering student at ENSA Fès. I explore how AI, data and software engineering can work together to build reliable, practical solutions.',
    ctaProjects: 'Explore my work',
    ctaContact: 'Get in touch',
    location: 'Fès, Morocco',
    aboutLabel: 'A little about me',
    aboutTitle: 'Curious about the systems behind intelligent products.',
    aboutText: 'My interests sit at the intersection of applied AI and software engineering: LLM-powered applications, automated testing, data pipelines and machine learning systems. I enjoy understanding a problem end-to-end — from data preparation and experimentation to implementation.',
    focus: 'CURRENT FOCUS',
    focusItems: ['LLMs & Generative AI', 'Software testing automation', 'Data engineering'],
    expLabel: 'Where I’ve learned by building',
    expTitle: 'Experience',
    projectsLabel: 'Selected work',
    projectsTitle: 'Projects that turn ideas into systems.',
    projectsText: 'A selection of academic, personal and internship projects. Open a card to see the problem, approach and technologies.',
    all: 'All projects',
    skillsLabel: 'Tools & foundations',
    skillsTitle: 'A multidisciplinary toolkit.',
    educationLabel: 'Academic background',
    educationTitle: 'Education',
    certLabel: 'Continuous learning',
    certTitle: 'Certifications',
    contactLabel: 'Let’s connect',
    contactTitle: 'Interested in building something meaningful?',
    contactText: 'I’m looking for a final-year internship (PFE) starting in February 2027, for up to six months, in applied AI, software testing automation or data engineering.',
    email: 'Send me an email',
    github: 'Explore GitHub',
    footer: 'Designed and built with care.',
    close: 'Close details',
    stack: 'TECH STACK',
    details: 'PROJECT OVERVIEW',
    ongoing: 'In progress',
    internship: 'PFA internship · 2 months',
    initiation: 'Introductory internship · 1 month',
  },
  FR: {
    nav: ['À propos', 'Expérience', 'Projets', 'Compétences', 'Contact'],
    availability: 'RECHERCHE PFE · FÉVRIER 2027',
    eyebrow: 'GÉNIE LOGICIEL · INTELLIGENCE ARTIFICIELLE',
    intro: 'Concevoir des logiciels utiles grâce à',
    introAccent: 'l’intelligence.',
    lead: 'Je suis Khadija, élève ingénieure en dernière année à l’ENSA Fès. J’explore la rencontre entre IA, données et génie logiciel pour concevoir des solutions fiables et concrètes.',
    ctaProjects: 'Découvrir mes projets',
    ctaContact: 'Me contacter',
    location: 'Fès, Maroc',
    aboutLabel: 'À propos',
    aboutTitle: 'Comprendre les systèmes derrière les produits intelligents.',
    aboutText: 'Mes intérêts se situent à l’intersection de l’IA appliquée et du génie logiciel : applications basées sur les LLMs, automatisation des tests, pipelines de données et systèmes de machine learning. J’aime aborder un problème de bout en bout, de la préparation des données à l’implémentation.',
    focus: 'DOMAINES ACTUELS',
    focusItems: ['LLMs & IA générative', 'Automatisation des tests', 'Ingénierie des données'],
    expLabel: 'Apprendre en construisant',
    expTitle: 'Expérience',
    projectsLabel: 'Réalisations',
    projectsTitle: 'Des idées transformées en systèmes.',
    projectsText: 'Une sélection de projets académiques, personnels et réalisés en stage. Ouvrez une carte pour découvrir le contexte, l’approche et les technologies.',
    all: 'Tous les projets',
    skillsLabel: 'Outils & fondamentaux',
    skillsTitle: 'Une boîte à outils multidisciplinaire.',
    educationLabel: 'Parcours académique',
    educationTitle: 'Formation',
    certLabel: 'Apprentissage continu',
    certTitle: 'Certifications',
    contactLabel: 'Entrons en contact',
    contactTitle: 'Envie de construire quelque chose d’utile ?',
    contactText: 'Je recherche un stage PFE à partir de février 2027, pour une durée maximale de six mois, en IA appliquée, automatisation des tests logiciels ou ingénierie des données.',
    email: 'M’envoyer un email',
    github: 'Voir GitHub',
    footer: 'Conçu et développé avec soin.',
    close: 'Fermer les détails',
    stack: 'ENVIRONNEMENT TECHNIQUE',
    details: 'PRÉSENTATION DU PROJET',
    ongoing: 'En cours',
    internship: 'Stage PFA · 2 mois',
    initiation: 'Stage d’initiation · 1 mois',
  },
}

const projects: Project[] = [
  {
    title: 'Threat Intelligence Platform',
    repo: 'https://github.com/1marieCurie/threat-intelligence-platform', screenshot: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/01_2_dashboard_after.png', summaryFr: 'Plateforme d’alerte précoce qui aide les PME marocaines à comprendre et prioriser leurs risques cyber grâce à la Threat Intelligence et à l’IA.', descriptionFr: 'Réalisée durant mon stage PFA : une solution qui associe l’analyse de liens suspects à la gestion des vulnérabilités à partir de l’inventaire logiciel. L’objectif est de transformer des informations de sécurité dispersées en priorités de risque et en alertes exploitables pour les responsables sécurité.',
    category: 'AI & Cybersecurity', year: '2026',
    summary: 'An early-warning platform that helps Moroccan SMEs understand cyber risks through threat intelligence and AI.',
    description: 'Developed during my PFA internship: a solution combining suspicious-URL analysis with vulnerability management based on software inventory. The goal is to turn scattered security information into actionable risk priorities and alerts for security managers.',
    stack: ['Python', 'React', 'Node.js', 'PostgreSQL', 'Scikit-learn', 'Threat Intelligence'],
    accent: 'blue', icon: 'shield',
  },
  {
    title: 'iliaCode',
    repo: 'https://github.com/1marieCurie/iliacode', summaryFr: 'Un copilote souverain de développement assisté par IA, conçu pour aider à générer du code et des tests automatisés.', descriptionFr: 'Projet en cours qui explore la manière dont un assistant intelligent peut accompagner le cycle de développement logiciel, faciliter le travail des développeurs et renforcer la fiabilité du code grâce à la génération de tests.',
    category: 'Generative AI', year: 'In progress',
    summary: 'A sovereign AI development copilot designed to assist with code generation and automated test creation.',
    description: 'An ongoing project exploring how an intelligent assistant can support software development workflows, improve developer productivity and strengthen software reliability through generated tests.',
    stack: ['Python', 'LLMs', 'NLP', 'Software Testing', 'Git'],
    accent: 'violet', icon: 'code', status: 'ongoing',
  },
  {
    title: 'Olist · E-commerce BI',
    category: 'Data & BI', year: '2026',
    screenshot: '/images/olist-dashboard.svg',
    summaryFr: 'Tableau de bord décisionnel pour analyser les ventes, les commandes, les catégories de produits et la performance logistique de la marketplace Olist.',
    descriptionFr: 'Projet de Business Intelligence autour du jeu de données Olist : préparation et analyse des données commerciales et logistiques afin de construire une vue synthétique de la performance e-commerce et de l’expérience client.',
    summary: 'A business intelligence project to analyse commercial, logistics and customer satisfaction performance.',
    description: 'Designed an analytical workflow around the Olist e-commerce dataset, using data preparation and relational analysis to support business performance exploration and dashboarding.',
    stack: ['Python', 'PostgreSQL', 'Power BI', 'Data Analysis'],
    accent: 'cyan', icon: 'chart',
  },
  {
    title: 'Cryptographic Elliptic Curves',
    category: 'Research · ML', year: '2025',
    summary: 'Personal research exploring elliptic-curve cryptography and machine learning approaches to vulnerability analysis.',
    description: 'Studied the algebraic foundations of elliptic curves and experimented with machine learning methods to analyse their properties and potential vulnerabilities.',
    stack: ['Applied Mathematics', 'Cryptography', 'Machine Learning'],
    accent: 'amber', icon: 'brain',
  },
  {
    title: 'BeastNet',
    category: 'Computer Vision', year: '2025',
    summary: 'A deep learning solution that identifies an animal class from an input image.',
    description: 'Explored object detection and visual recognition approaches for animal identification, comparing several modern detection architectures.',
    stack: ['Deep Learning', 'YOLO', 'DETR', 'Faster R-CNN', 'EfficientDet'],
    accent: 'green', icon: 'vision',
  },
  {
    title: 'FreeDoom Game Agent',
    repo: 'https://github.com/1marieCurie/FreeDoom_Reinforcement_Learning_Game', screenshot: 'https://raw.githubusercontent.com/1marieCurie/FreeDoom_Reinforcement_Learning_Game/main/image.png', summaryFr: 'Des agents qui apprennent à jouer dans un environnement de combat grâce à l’apprentissage par renforcement.', descriptionFr: 'Implémentation et expérimentation de PPO et Dueling DRQN pour apprendre des comportements de combat dans un environnement de type deathmatch. Les deux approches ont été évaluées dans des conditions distinctes.',
    category: 'Reinforcement Learning', year: '2025',
    summary: 'A game-playing agent that learns by interacting with a custom environment.',
    description: 'Implemented and explored reinforcement-learning approaches for an agent learning to play through environment interaction.',
    stack: ['PPO', 'DQN', 'LSTM', 'Reinforcement Learning'],
    accent: 'rose', icon: 'game',
  },
  {
    title: 'UrbainClean',
    repo: 'https://github.com/1marieCurie/Garbage_Detection_In_Urbain_Zones_Fez', screenshot: 'https://raw.githubusercontent.com/1marieCurie/Garbage_Detection_In_Urbain_Zones_Fez/main/screenshots/interface_main.png', summaryFr: 'Solution de vision par ordinateur pour détecter les zones de déchets dans l’espace urbain de Fès.', descriptionFr: 'Développement d’un système de détection basé sur YOLOv11s, avec une interface Streamlit permettant l’inférence sur des images et des vidéos, le réglage du seuil de confiance et la visualisation des boîtes de détection.',
    category: 'Computer Vision', year: '2025',
    summary: 'A deep learning concept for real-time detection of unsanitary areas in the city of Fès.',
    description: 'Designed a computer-vision solution aimed at detecting urban cleanliness issues in real time, with the objective of supporting a cleaner city.',
    stack: ['YOLO', 'Deep Learning', 'Computer Vision'],
    accent: 'green', icon: 'leaf',
  },
  {
    title: 'Building Energy Prediction',
    repo: 'https://github.com/1marieCurie/Energy_consumption_and_peaks_detection', screenshot: 'https://raw.githubusercontent.com/1marieCurie/Energy_consumption_and_peaks_detection/main/screens/streamlit_dashboard.png', summaryFr: 'Projet de machine learning pour prévoir la consommation énergétique de bâtiments et repérer les périodes de pointe.', descriptionFr: 'Étude de modèles de régression et de séries temporelles sur des données de consommation de bâtiments. Le projet comprend une interface Streamlit pour explorer les prédictions horaires et les heures de pointe.',
    category: 'Machine Learning', year: '2025',
    summary: 'A machine learning project for predicting and optimising building energy consumption.',
    description: 'Explored regression and sequence-learning approaches to model energy consumption, with an interactive Streamlit interface.',
    stack: ['Ridge', 'LightGBM', 'XGBoost', 'LSTM', 'Streamlit'],
    accent: 'amber', icon: 'database',
  },
  {
    title: 'Training Management Web App',
    repo: 'https://github.com/1marieCurie/Plateforme_E-Learning_des_formation_Ecole_Polythechnique_des_Genies', summaryFr: 'Application web de gestion des programmes de formation et des cours en ligne.', descriptionFr: 'Réalisée durant mon stage d’initiation à l’EPG, cette application porte sur la conception et le développement d’un outil web de gestion des formations et des cours.',
    category: 'Web Development', year: '2025',
    summary: 'A web application for managing training programmes and online courses.',
    description: 'Built during my introductory internship at EPG, focusing on the design and development of a web application for training and course management.',
    stack: ['React', 'Laravel', 'MySQL'],
    accent: 'cyan', icon: 'code',
  },
]

const categories = ['All projects', 'AI & Cybersecurity', 'Generative AI', 'Data & BI', 'Computer Vision', 'Machine Learning', 'Reinforcement Learning', 'Web Development', 'Research · ML']
const skillGroups = [
  { icon: BrainCircuit, title: 'Generative AI & Testing', skills: ['NLP', 'RAG', 'Generative AI', 'n8n', 'Pytest', 'JUnit', 'Git'] },
  { icon: Database, title: 'Data Engineering', skills: ['PySpark', 'Apache Airflow', 'ETL / ELT', 'Data Lake', 'Data Warehouse', 'PostgreSQL'] },
  { icon: Network, title: 'Machine Learning', skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow'] },
  { icon: Code2, title: 'Development & Databases', skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Laravel', 'MySQL', 'MongoDB', 'Oracle', 'Elasticsearch'] },
  { icon: Zap, title: 'Reinforcement Learning', skills: ['Q-Learning', 'Monte Carlo', 'SARSA', 'TD n-step', 'DQN'] },
  { icon: Sparkles, title: 'Computer Vision', skills: ['OpenCV', 'CNN', 'Image classification', 'Object detection', 'Explainable AI'] },
]
const projectIcon = (name: Project['icon']) => {
  const common = { size: 21, strokeWidth: 1.7 }
  switch (name) {
    case 'shield': return <ShieldCheck {...common} />
    case 'code': return <Code2 {...common} />
    case 'database': return <Database {...common} />
    case 'brain': return <BrainCircuit {...common} />
    case 'vision': return <Sparkles {...common} />
    case 'game': return <Terminal {...common} />
    case 'leaf': return <Globe2 {...common} />
    case 'chart': return <Database {...common} />
  }
}

function App() {
  const [lang, setLang] = useState<Lang>('EN')
  const [activeCategory, setActiveCategory] = useState('All projects')
  const [selected, setSelected] = useState<Project | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = copy[lang]
  const filtered = useMemo(() => activeCategory === 'All projects' ? projects : projects.filter(p => p.category === activeCategory), [activeCategory])
  const ids = ['about', 'experience', 'projects', 'skills', 'contact']
  const categoriesTranslated = lang === 'EN' ? categories : ['Tous les projets', 'IA & Cybersécurité', 'IA générative', 'Data & BI', 'Vision par ordinateur', 'Machine Learning', 'Apprentissage par renforcement', 'Développement web', 'Recherche · ML']
  const categoryMap: Record<string, string> = Object.fromEntries(categoriesTranslated.map((c, i) => [c, categories[i]]))
  const currentFilter = categoriesTranslated[categories.indexOf(activeCategory)] ?? categoriesTranslated[0]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Khadija Mellak home"><span className="brand-mark">KM</span><span>KHADIJA<span className="brand-dot">.</span></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {t.nav.map((item, i) => <button key={item} onClick={() => scrollTo(ids[i])}>{item}</button>)}
        </nav>
        <div className="top-actions">
          <button className="lang-switch" onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')} aria-label="Switch language"><Languages size={15}/>{lang}</button>
          <a className="nav-contact" href="mailto:mellak71khadija@gmail.com">{t.ctaContact}<ArrowUpRight size={15}/></a>
          <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>
      {mobileOpen && <div className="mobile-nav">{t.nav.map((item, i) => <button key={item} onClick={() => scrollTo(ids[i])}>{item}<ArrowUpRight size={15}/></button>)}</div>}

      <main id="home">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="availability"><span className="pulse" />{t.availability}</div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.intro}<br/><span>{t.introAccent}</span></h1>
            <p className="hero-lead">{t.lead}</p>
            <div className="hero-buttons">
              <button className="button-primary" onClick={() => scrollTo('projects')}>{t.ctaProjects}<ArrowDown size={16}/></button>
              <a className="button-secondary" href="mailto:mellak71khadija@gmail.com">{t.ctaContact}<ArrowUpRight size={16}/></a>
            </div>
            <div className="hero-meta"><span><MapPin size={14}/>{t.location}</span><span className="meta-divider"/><a href="https://github.com/1marieCurie" target="_blank" rel="noreferrer"><Github size={14}/>GitHub <ArrowUpRight size={12}/></a></div>
          </div>
          <div className="hero-visual" aria-label="Portrait of Khadija Mellak">
            <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
            <div className="hero-card">
              <div className="card-topline"><span>ENGINEERING / AI</span><span className="card-live"><i/>AVAILABLE</span></div>
              <img className="profile-photo" src={`${import.meta.env.BASE_URL}profile-khadija.jpg`} alt="Portrait de Khadija Mellak" />
              <div className="hero-card-name">Khadija Mellak</div>
              <div className="hero-card-role">AI ENGINEERING · SOFTWARE QUALITY</div>
              <div className="card-divider"/>
              <div className="hero-card-bottom"><span>ENSA FÈS</span><span>2022 — 2027</span></div>
            </div>
            <div className="floating-chip chip-one"><BrainCircuit size={16}/> Applied AI</div>
            <div className="floating-chip chip-two"><Workflow size={16}/> Reliable systems</div>
            <div className="visual-index">01 / 05</div>
          </div>
          <div className="scroll-cue"><span/>SCROLL TO EXPLORE</div>
        </section>

        <section className="section-wrap about-section" id="about">
          <div className="section-kicker"><span>01</span>{t.aboutLabel}</div>
          <div className="about-grid">
            <h2>{t.aboutTitle}</h2>
            <div className="about-copy"><p>{t.aboutText}</p><div className="focus-label">{t.focus}</div><div className="focus-list">{t.focusItems.map((x, i) => <span key={x}><b>0{i+1}</b>{x}</span>)}</div></div>
          </div>
        </section>

        <section className="section-wrap experience-section" id="experience">
          <div className="section-kicker"><span>02</span>{t.expLabel}</div>
          <h2 className="section-title">{t.expTitle}<span>.</span></h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">JUL — SEP 2026</div><div className="timeline-marker"><span/></div>
              <div className="timeline-content"><div className="timeline-heading"><h3>CMRPI · Espace Cyberconfiance</h3><span className="tag">{t.internship}</span></div><p className="role">AI & Data Engineering Intern · Kénitra</p><p>{lang === 'EN' ? 'Designed and developed an early-warning cyber threat detection platform for SMEs, combining Threat Intelligence, machine learning and vulnerability management.' : 'Conception et développement d’une plateforme de détection et d’alerte précoce des cybermenaces pour les PME, combinant Threat Intelligence, machine learning et gestion des vulnérabilités.'}</p><div className="inline-tech">Python <i/> React <i/> Node.js <i/> PostgreSQL <i/> Scikit-learn</div></div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">JUL — AUG 2025</div><div className="timeline-marker"><span/></div>
              <div className="timeline-content"><div className="timeline-heading"><h3>École Polytechnique des Génies (EPG)</h3><span className="tag">{t.initiation}</span></div><p className="role">Web Development Intern · Fès</p><p>{lang === 'EN' ? 'Designed and developed a web application for managing training programmes and online courses.' : 'Conception et développement d’une application web de gestion des formations et des cours en ligne.'}</p><div className="inline-tech">React <i/> Laravel <i/> MySQL</div></div>
            </div>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-wrap">
            <div className="section-kicker"><span>03</span>{t.projectsLabel}</div>
            <div className="projects-heading"><div><h2 className="section-title">{t.projectsTitle}</h2><p>{t.projectsText}</p></div><span className="project-count">0{projects.length} <small>PROJECTS</small></span></div>
            <div className="filters" aria-label="Filter projects">
              {categoriesTranslated.map(c => <button key={c} className={currentFilter === c ? 'active' : ''} onClick={() => setActiveCategory(categoryMap[c])}>{c}</button>)}
            </div>
            <div className="project-grid">
              {filtered.map((p, i) => <button className={`project-card accent-${p.accent}`} key={p.title} onClick={() => setSelected(p)}>
                <div className="project-card-top"><span className="project-icon">{projectIcon(p.icon)}</span><span className="project-year">{p.year}</span></div>{p.screenshot && <img className="project-preview" src={p.screenshot} alt={`${p.title} project preview`} loading="lazy" />}
                <div className="project-card-body"><div className="project-category">{p.category}</div><h3>{p.title}</h3><p>{lang === 'FR' ? (p.summaryFr ?? p.summary) : p.summary}</p></div>
                <div className="project-card-bottom"><span>{p.status ? t.ongoing : 'VIEW PROJECT'}</span><span className="arrow-circle"><ArrowUpRight size={17}/></span></div>
                <span className="project-number">0{projects.indexOf(p)+1}</span>
              </button>)}
            </div>
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <div className="section-kicker"><span>04</span>{t.skillsLabel}</div>
          <h2 className="section-title">{t.skillsTitle}</h2>
          <div className="skills-grid">
            {skillGroups.map((g, i) => { const Icon = g.icon; return <div className="skill-card" key={g.title}><div className="skill-card-head"><span className="skill-icon"><Icon size={19}/></span><span>0{i+1}</span></div><h3>{g.title}</h3><div className="skill-tags">{g.skills.map(s => <span key={s}>{s}</span>)}</div></div> })}
          </div>
          <div className="other-skills"><span><Globe2 size={16}/>Cloud foundations</span><b>AWS</b><span className="other-divider"/><span><Languages size={16}/>Languages</span><b>Arabic · Native</b><b>French · C1</b><b>English · C1</b></div>
        </section>

        <section className="section-wrap education-section">
          <div className="education-column"><div className="section-kicker"><span>05</span>{t.educationLabel}</div><h2 className="section-title">{t.educationTitle}<span>.</span></h2>
            <div className="education-item"><div className="education-icon"><GraduationCap size={21}/></div><div><span className="education-date">SEP 2022 — PRESENT</span><h3>École Nationale des Sciences Appliquées · Fès</h3><p>Engineering Cycle — Software Engineering & Artificial Intelligence</p></div></div>
            <div className="education-item"><div className="education-icon"><Award size={21}/></div><div><span className="education-date">2021 — 2022</span><h3>Lycée Ben Souda · Fès</h3><p>Baccalauréat in Mathematical Sciences B · Good Honours</p></div></div>
          </div>
          <div className="cert-column"><div className="section-kicker"><span>06</span>{t.certLabel}</div><h2 className="section-title">{t.certTitle}<span>.</span></h2>
            <div className="cert-item"><span className="cert-icon"><Award size={19}/></span><div><h3>AWS Academy Graduate</h3><p>Cloud Foundations · Trained Badge</p><small>Amazon Web Services Academy</small></div><Check size={16} className="cert-check"/></div>
            <div className="cert-item"><span className="cert-icon"><Workflow size={19}/></span><div><h3>Web Search API in n8n</h3><p>Integrated in automated workflows</p><small>Tavily</small></div><Check size={16} className="cert-check"/></div>
          </div>
        </section>

        <section className="contact-section" id="contact"><div className="section-wrap contact-inner">
          <div className="section-kicker"><span>07</span>{t.contactLabel}</div><div className="contact-grid"><div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div><div className="contact-actions"><a className="contact-link" href="mailto:mellak71khadija@gmail.com"><span><Mail size={18}/>{t.email}</span><ArrowUpRight size={19}/></a><a className="contact-link" href="https://github.com/1marieCurie" target="_blank" rel="noreferrer"><span><Github size={18}/>{t.github}</span><ArrowUpRight size={19}/></a><a className="contact-link" href="CV_Khadija_Mellak.pdf" target="_blank" rel="noreferrer"><span><ArrowDown size={18}/>Download CV</span><ArrowUpRight size={19}/></a></div></div>
          <div className="contact-bottom"><span>FÈS, MOROCCO</span><a href="mailto:mellak71khadija@gmail.com">MELLAK71KHADIJA@GMAIL.COM</a><span>AVAILABLE · FEB 2027</span></div>
        </div></section>
      </main>
      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">KM</span><span>KHADIJA<span className="brand-dot">.</span></span></a><span>© {new Date().getFullYear()} KHADIJA MELLAK</span><span>{t.footer}</span><a href="#home">BACK TO TOP ↑</a></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null) }}>
        <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" onClick={() => setSelected(null)} aria-label={t.close}><X size={20}/></button>
          <div className="modal-kicker">{selected.category} · {selected.year}</div><div className={`modal-symbol accent-${selected.accent}`}>{projectIcon(selected.icon)}</div>
          <h2 id="modal-title">{selected.title}</h2><div className="modal-label">{t.details}</div><p className="modal-description">{lang === 'FR' ? (selected.descriptionFr ?? selected.description) : selected.description}</p>
          <div className="modal-label">{t.stack}</div><div className="modal-tags">{selected.stack.map(s => <span key={s}>{s}</span>)}</div>
          {selected.repo && <a className="project-repo-link" href={selected.repo} target="_blank" rel="noreferrer"><Github size={16}/>{lang === 'EN' ? 'View source on GitHub' : 'Voir le code sur GitHub'}<ArrowUpRight size={15}/></a>}<div className="modal-note">{lang === 'EN' ? 'Open the repository to explore the implementation and project files.' : 'Consultez le dépôt pour explorer l’implémentation et les fichiers du projet.'}</div>
          <button className="modal-done" onClick={() => setSelected(null)}>{t.close}<X size={15}/></button>
        </section>
      </div>}
    </div>
  )
}

export default App
