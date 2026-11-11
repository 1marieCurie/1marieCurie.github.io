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
  screenshotClass?: 'contain' | 'wildlife' | 'math' | 'histogram'
  screenshotCredit?: string
  screenshotCreditUrl?: string
  screenshotNote?: string
  summaryFr?: string
  descriptionFr?: string
  details?: {
    intro: string
    metrics?: { label: string; value: string; note?: string }[]
    sections?: { title: string; body?: string; bullets?: string[] }[]
    tables?: { title: string; columns: string[]; rows: string[][] }[]
    gallery?: { src: string; title: string; caption: string; source?: string }[]
  }
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
    certTitle: 'Certifications & badges',
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
    certTitle: 'Certifications & badges',
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
    details: {
      intro: 'An SME-oriented cyber-risk platform that combines suspicious-URL classification with vulnerability management based on the organisation’s actual Windows software inventory. It turns scattered security signals into a prioritised view and actionable alerts.',
      metrics: [
        { label: 'URL training records', value: '114,131', note: 'Three classes: benign, phishing and malware' },
        { label: 'URL features', value: '13', note: 'Raw numerical features' },
        { label: 'CV macro F1', value: '0.869', note: 'Mean across 5 group-aware folds' },
        { label: 'OOF macro ROC-AUC', value: '0.971', note: 'Out-of-fold evaluation' },
      ],
      sections: [
        { title: 'Two connected security workflows', body: 'The public and authenticated URL-analysis flow classifies a submitted address and returns the model verdict and confidence when available. The vulnerability workflow starts from a Windows machine inventory, imports installed software and versions, then correlates those components with vulnerability intelligence.' },
        { title: 'URL threat classification', bullets: ['A HistGradientBoostingClassifier is used for the selected hardened URL model.', 'The 13 raw features describe URL structure, hostname/path lengths, punctuation and character ratios, path segments and hostname entropy.', 'The selected model uses a group-aware StratifiedGroupKFold protocol with five folds; the external test split is kept separate from fitting and selection.'] },
        { title: 'Inventory-driven vulnerability management', bullets: ['Correlates inventoried software with CVE/CWE data, CVSS severity, EPSS probability, CISA Known Exploited Vulnerabilities and GitHub Advisory signals.', 'Distinguishes confirmed exposures from potential matches that need additional validation.', 'Separates technical severity from operational priority so security managers can decide what to remediate first.'] },
        { title: 'Alert policy and delivery', bullets: ['Creates alerts for a newly confirmed CRITICAL exposure, a confirmed exposure newly listed in CISA KEV, or a confirmed exposure that transitions to CRITICAL.', 'Potential exposures do not trigger these critical alerts automatically.', 'Deduplication prevents repeated alerts and emails for the same event; the alert is persisted before external email delivery is attempted.', 'Gmail delivery uses OAuth 2.0 and targets active security-responsible accounts.'] },
        { title: 'Architecture and access model', body: 'The backend separates domain and application rules from infrastructure adapters. FastAPI, PostgreSQL, SQLAlchemy and Alembic support the API and persistence; the React/TypeScript frontend provides the public landing page and role-specific workspaces. The two roles are staff and security_responsible.' },
        { title: 'Evaluation context and limitations', body: 'The metadata reports cross-validation and out-of-fold metrics for the selected candidate. The repository also records that temporal robustness and independent-source validation are still required, source-label confounding remains a known dataset limitation, and the artifact is not marked production-validated.' }
      ],
      tables: [
        { title: 'Selected URL model — reported validation', columns: ['Measure', 'Result', 'Evaluation context'], rows: [
          ['Training rows', '114,131', 'URL multiclass pool, version 2026-08-12-v1'],
          ['CV macro F1', '0.8686 ± 0.0539', '5-fold StratifiedGroupKFold'],
          ['CV balanced accuracy', '0.8655', 'Mean across folds'],
          ['Phishing F1 / recall', '0.8640 / 0.8287', 'Mean across folds'],
          ['Malware F1 / recall', '0.8641 / 0.8076', 'Mean across folds'],
          ['OOF macro ROC-AUC', '0.9710', 'Out-of-fold predictions']
        ]},
        { title: 'Critical alert triggers', columns: ['Event', 'Required condition'], rows: [
          ['New critical exposure', 'A newly created exposure is confirmed and priority is CRITICAL'],
          ['New KEV listing', 'An existing confirmed exposure enters the CISA KEV catalogue'],
          ['Critical priority transition', 'A confirmed exposure moves from LOW, MEDIUM or HIGH to CRITICAL'],
          ['Potential exposure', 'No automatic critical alert in policy V1']
        ]}
      ],
      gallery: [
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/01_2_dashboard_after.png', title: 'Security dashboard', caption: 'Organisation-level overview of machines, components, exposure status and risk priorities.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/02_1_demo_machines.png', title: 'Machine inventory', caption: 'Inventoried Windows machines and their associated exposure counts.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/02_2_demo_machines_details.png', title: 'Machine exposure details', caption: 'Software inventory and correlated exposure details for an individual machine.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/04_vulnerabilities_after.png', title: 'Vulnerability prioritisation', caption: 'Aggregated vulnerability view with severity, priority, EPSS, applicability and KEV context.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/05_logiciels_after.png', title: 'Software inventory', caption: 'Installed software components collected from the machine inventory.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/06_1_alerte.png', title: 'Alert centre', caption: 'A critical-priority transition recorded by the application.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/06_2_gmail_alert.png', title: 'Email notification', caption: 'Gmail notification sent to the security-responsible user.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/07_confirmed_cisa.png', title: 'Confirmed CISA KEV exposure', caption: 'Evidence view for a confirmed exposure associated with the CISA KEV catalogue.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/08_confirmed_exposition_critical.png', title: 'Confirmed critical exposure', caption: 'A confirmed critical exposure and its remediation priority.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/threat-intelligence-platform/main/artifacts/demo-final/screenshots/09_potential_critical_no_alert.png', title: 'Potential exposure handling', caption: 'A potential critical match retained for review instead of triggering the confirmed-exposure alert.' }
      ]
    },
    accent: 'blue', icon: 'shield',
  },
  {
    title: 'iliaCode',
    repo: 'https://github.com/1marieCurie/iliacode', screenshot: import.meta.env.BASE_URL + 'project-images/iliacode.svg', summaryFr: 'Un copilote souverain de développement assisté par IA, conçu pour aider à générer du code et des tests automatisés.', descriptionFr: 'Projet en cours qui explore la manière dont un assistant intelligent peut accompagner le cycle de développement logiciel, faciliter le travail des développeurs et renforcer la fiabilité du code grâce à la génération de tests.',
    category: 'Generative AI', year: 'In progress',
    summary: 'A sovereign AI development copilot designed to assist with code generation and automated test creation.',
    description: 'An ongoing project exploring how an intelligent assistant can support software development workflows, improve developer productivity and strengthen software reliability through generated tests.',
    stack: ['Python', 'LLMs', 'NLP', 'Software Testing', 'Git'],
    details: {
      intro: 'An ongoing exploration of a locally controlled coding-assistant foundation. The accessible repository documents tokenizer engineering and model-runtime experiments rather than a completed, benchmarked code-generation product.',
      sections: [
        { title: 'Byte-level BPE tokenization', body: 'The tokenizer implementation starts from the 256 possible byte values and uses a word-end marker. It learns frequent adjacent-symbol merges from a corpus, then replays those merges to encode text. Decoding reconstructs the original UTF-8 text.' },
        { title: 'Code-aware pre-tokenisation', bullets: ['Recognises decimal numbers, compound operators, words, punctuation and whitespace.', 'Preserves whitespace to support reversible text processing.', 'Handles underscores and camelCase boundaries so code identifiers can be segmented into meaningful pieces.'] },
        { title: 'Model loading and runtime inspection', body: 'The GenAI exercise code includes a Qwen2-compatible causal language model loading path, tokenizer loading, parameter counting, weight-memory measurement and next-token probability extraction. A model-choice worksheet compares candidate coding models, but its hardware measurements and final selection fields are still blank in the repository.' },
        { title: 'Automated checks', body: 'The repository includes ten pytest cases around model/tokenizer loading, tokenizer round-trip behaviour, parameter and memory calculations, token-level probabilities and a perplexity sanity check. The test fixture creates a small randomly initialised Qwen2 model (two layers, hidden size 32 and vocabulary size 256); these checks validate the software path, not the performance of a trained assistant.' },
        { title: 'Current scope', body: 'No verified code-generation benchmark, HumanEval score or end-to-end productivity result is published in the accessible repository. Those results are intentionally not presented here.' }
      ],
      tables: [
        { title: 'Documented technical components', columns: ['Component', 'Repository evidence'], rows: [
          ['Base vocabulary', '256 byte symbols plus a word-ending marker'],
          ['Merge learning', 'Frequency-weighted adjacent-pair counting and merging'],
          ['Encoding', 'Replays learned merges in rank order'],
          ['Decoding', 'Reconstructs byte sequences and decodes UTF-8'],
          ['Test coverage', '10 pytest cases for loading, tokenization, memory and probability utilities']
        ]}
      ]
    },
    accent: 'violet', icon: 'code', status: 'ongoing',
  },
  {
    title: 'Olist · E-commerce BI', screenshot: import.meta.env.BASE_URL + 'project-images/olist-bi.svg',
    category: 'Data & BI', year: '2026',
    summary: 'A business intelligence project to analyse commercial, logistics and customer satisfaction performance.',
    description: 'Designed an analytical workflow around the Olist e-commerce dataset, using data preparation and relational analysis to support business performance exploration and dashboarding.',
    stack: ['Python', 'PostgreSQL', 'Power BI', 'Data Analysis'],
    accent: 'cyan', icon: 'chart',
  },
  {
    title: 'Cryptographic Elliptic Curves', screenshot: import.meta.env.BASE_URL + 'project-images/elliptic-curve-plot.svg', screenshotClass: 'math',
    category: 'Research · ML', year: '2025',
    summary: 'Personal research exploring elliptic-curve cryptography and machine learning approaches to vulnerability analysis.',
    description: 'Studied the algebraic foundations of elliptic curves and experimented with machine learning methods to analyse their properties and potential vulnerabilities.',
    stack: ['Applied Mathematics', 'Cryptography', 'Machine Learning'],
    accent: 'amber', icon: 'brain',
  },
  {
    title: 'Wildlife Monitoring',
    screenshot: import.meta.env.BASE_URL + 'project-images/wildlife-monitoring-cover.webp',
    screenshotClass: 'wildlife',
    category: 'Computer Vision', year: '2025',
    summary: 'Camera trap-based monitoring.',
    summaryFr: 'Suivi de la faune basé sur des pièges photographiques.',
    description: 'A camera trap-based wildlife monitoring project.',
    descriptionFr: 'Un projet de suivi de la faune basé sur des pièges photographiques.',
    stack: ['Camera Traps', 'EfficientDet-D0', 'YOLO'],
    details: {
      intro: 'The article visual presents representative samples from the ENA24 dataset and a baseline model evaluation figure.',
      sections: [
        { title: 'Dataset examples', body: 'The figure caption identifies the samples as representative images from ENA24 and highlights day and night conditions, occlusion, scale variation and multi-species scenes.' },
        { title: 'Baseline experiment', body: 'The supplied article excerpt includes an EfficientDet-D0 baseline description and a YOLO metrics plot. Further methodology and results will be added when the project details are provided.' }
      ],
      gallery: [
        { src: import.meta.env.BASE_URL + 'project-images/wildlife-monitoring-article.webp', title: 'Article figure — ENA24 samples and baseline metrics', caption: 'The article figure supplied for this project, showing representative ENA24 camera-trap samples and the baseline evaluation visual.' }
      ]
    },
    accent: 'green', icon: 'vision',
  },
  {
    title: 'FreeDoom Game Agent',
    repo: 'https://github.com/1marieCurie/FreeDoom_Reinforcement_Learning_Game', screenshot: 'https://raw.githubusercontent.com/1marieCurie/FreeDoom_Reinforcement_Learning_Game/main/image.png', summaryFr: 'Des agents qui apprennent à jouer dans un environnement de combat grâce à l’apprentissage par renforcement.', descriptionFr: 'Implémentation et expérimentation de PPO et Dueling DRQN pour apprendre des comportements de combat dans un environnement de type deathmatch. Les deux approches ont été évaluées dans des conditions distinctes.',
    category: 'Reinforcement Learning', year: '2025',
    summary: 'A game-playing agent that learns by interacting with a custom environment.',
    description: 'Implemented and explored reinforcement-learning approaches for an agent learning to play through environment interaction.',
    stack: ['PPO', 'DQN', 'LSTM', 'Reinforcement Learning'],
    details: {
      intro: 'A VizDoom deathmatch study comparing two deep reinforcement-learning agents: a spatially constrained PPO policy and Arnold, a Dueling Double Deep Recurrent Q-Network (Dueling DRQN) operating on full maps.',
      metrics: [
        { label: 'Arnold training', value: '3.27M', note: 'Environment steps' },
        { label: 'Mean kills / episode', value: '16.83', note: 'Across 6,215 episodes' },
        { label: 'Mean K/D ratio', value: '10.68', note: 'Arnold training statistics' },
        { label: 'Episodes with K/D > 1', value: '86.8%', note: 'Reported training episodes' },
      ],
      sections: [
        { title: 'PPO agent — constrained arena', body: 'The PPO agent uses a CNN policy and a custom 600 × 600-unit arena centred on its spawn point. The boundary discourages aimless wandering and increases encounters with two opponent bots. Its observation pipeline converts the VizDoom screen to an 84 × 84 RGB input and uses eight discrete macro-actions.' },
        { title: 'Arnold — recurrent Dueling DRQN', bullets: ['A dueling architecture separates state value V(s) from action advantage A(s,a).', 'An LSTM carries temporal context across stacked visual frames, helping the agent track enemies in a partially observable environment.', 'An auxiliary game-feature head predicts enemy visibility and acts as a perceptual regulariser.', 'The agent operates on a full deathmatch map with four bots and five rotating maps.'] },
        { title: 'Reward design', body: 'The PPO reward combines kill, survival, time, damage, ammunition, zone and death terms. Arnold uses kill and death rewards together with distance, stale-state and health-pickup signals. The README reports a reward–kill correlation of r = 0.984 for Arnold.' },
        { title: 'Interpretation and limitations', body: 'The repository reports a 50% success rate for the final PPO test (both enemies eliminated). It also notes that PPO had not fully converged at the reported training budget, while Arnold showed a behavioural plateau. Both approaches were evaluated with a single random seed, so multi-seed validation remains necessary.' }
      ],
      tables: [
        { title: 'Agent comparison', columns: ['Agent', 'Algorithm', 'Environment', 'Training steps', 'Reported result'], rows: [
          ['PPO Agent', 'Proximal Policy Optimization', '600 × 600 arena, 2 bots', '301,056', '50% success rate in 10 test episodes'],
          ['Arnold', 'Dueling Double DRQN + LSTM', 'Full map, 4 bots, 5 maps', '3,271,025', '16.83 mean kills/episode; K/D 10.68']
        ]},
        { title: 'Arnold — reported final metrics', columns: ['Metric', 'Value'], rows: [
          ['Total episodes', '6,215'],
          ['Peak kills in an episode', '43'],
          ['Greedy evaluation kills', '5.4 per episode'],
          ['Greedy evaluation K/D', '5.40'],
          ['Mean TD loss / game-feature loss', '0.2384 / 0.1915'],
          ['Reward–kill correlation', 'r = 0.984']
        ]}
      ],
      gallery: [
        { src: 'https://raw.githubusercontent.com/1marieCurie/FreeDoom_Reinforcement_Learning_Game/main/image.png', title: 'VizDoom deathmatch environment', caption: 'Gameplay screenshot from the repository demonstration.' }
      ]
    },
    accent: 'rose', icon: 'game',
  },
  {
    title: 'UrbainClean',
    repo: 'https://github.com/1marieCurie/Garbage_Detection_In_Urbain_Zones_Fez', screenshot: 'https://raw.githubusercontent.com/1marieCurie/Garbage_Detection_In_Urbain_Zones_Fez/main/screenshots/detection_image.png', screenshotClass: 'contain', summaryFr: 'Solution de vision par ordinateur pour détecter les zones de déchets dans l’espace urbain de Fès.', descriptionFr: 'Développement d’un système de détection basé sur YOLOv11s, avec une interface Streamlit permettant l’inférence sur des images et des vidéos, le réglage du seuil de confiance et la visualisation des boîtes de détection.',
    category: 'Computer Vision', year: '2025',
    summary: 'A deep learning concept for real-time detection of unsanitary areas in the city of Fès.',
    description: 'Designed a computer-vision solution aimed at detecting urban cleanliness issues in real time, with the objective of supporting a cleaner city.',
    stack: ['YOLOv11s', 'Roboflow', 'OpenCV', 'Streamlit'],
    details: {
      intro: 'A computer-vision system that detects larger dirty or disordered public-space regions as a single garbage_zone class. The model focuses on the surrounding zone rather than attempting to classify every individual item of litter.',
      metrics: [
        { label: 'Training images', value: '~6,186', note: 'Approximately 3,093 per class' },
        { label: 'Training epochs', value: '150', note: 'YOLOv11 Small' },
        { label: 'Image size', value: '640 × 640', note: 'Training resolution' },
        { label: 'mAP@0.5', value: '0.889', note: 'Value shown in the repository PR curve' },
      ],
      sections: [
        { title: 'Dataset preparation', body: 'Two Roboflow datasets are merged and balanced, with approximately 3,093 images for each class (garbage and clean). Images containing dirty regions are labelled with bounding boxes around the larger garbage zones; clean images use empty labels.' },
        { title: 'Model training', bullets: ['YOLOv11s was selected to fit the available GPU constraints.', 'Training configuration: 150 epochs, 640 × 640 image size and batch size 16.', 'Augmentation includes mosaic (0.5), HSV transformations and flips.', 'Initial learning rate 0.0007, weight decay 0.0005 and patience 30.'] },
        { title: 'Inference application', body: 'The Streamlit interface accepts images and videos, runs predictions and overlays bounding boxes with class labels and confidence scores. Users can adjust the confidence threshold and inspect a detection table containing box coordinates and predicted classes.' },
        { title: 'Evaluation note', body: 'The repository PR curve displays garbage_zone AP = 0.889 and all-classes mAP@0.5 = 0.889. These are the values visible in the committed results graphic; the portfolio does not reinterpret them as mAP@0.5:0.95.' }
      ],
      tables: [
        { title: 'Training configuration', columns: ['Setting', 'Value'], rows: [
          ['Architecture', 'YOLOv11 Small (YOLOv11s)'],
          ['Dataset balance', '~3,093 garbage + ~3,093 clean images'],
          ['Epochs / image size / batch', '150 / 640 × 640 / 16'],
          ['Augmentation', 'Mosaic 0.5, HSV, horizontal/vertical flips'],
          ['Initial learning rate', '0.0007'],
          ['Weight decay / patience', '0.0005 / 30']
        ]}
      ],
      gallery: [
        { src: 'https://raw.githubusercontent.com/1marieCurie/Garbage_Detection_In_Urbain_Zones_Fez/main/screenshots/principe_image.png', title: 'Bounding-box predictions', caption: 'Repository comparison showing candidate boxes and retained garbage detections with confidence scores.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/Garbage_Detection_In_Urbain_Zones_Fez/main/screenshots/metrics_image.png', title: 'Precision–recall curve', caption: 'Committed precision–recall curve showing garbage_zone AP and mAP@0.5 of 0.889.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/Garbage_Detection_In_Urbain_Zones_Fez/main/screenshots/detection_image.png', title: 'Single-image inference', caption: 'Actual YOLOv11s prediction with a garbage_zone bounding box and 0.88 confidence.' }
      ]
    },
    accent: 'green', icon: 'leaf',
  },
  {
    title: 'Building Energy Prediction',
    repo: 'https://github.com/1marieCurie/Energy_consumption_and_peaks_detection', screenshot: import.meta.env.BASE_URL + 'project-images/energy-histogram.svg', screenshotClass: 'histogram', screenshotNote: 'Illustrative histogram layout for the requested kWh prediction view; bar heights are placeholders, not exported project metrics.', summaryFr: 'Projet de machine learning pour prévoir la consommation énergétique de bâtiments et repérer les périodes de pointe.', descriptionFr: 'Étude de modèles de régression et de séries temporelles sur des données de consommation de bâtiments. Le projet comprend une interface Streamlit pour explorer les prédictions horaires et les heures de pointe.',
    category: 'Machine Learning', year: '2025',
    summary: 'A machine learning project for predicting and optimising building energy consumption.',
    description: 'Explored regression and sequence-learning approaches to model energy consumption, with an interactive Streamlit interface.',
    stack: ['Ridge + RFE', 'Scikit-learn', 'MORED', 'Streamlit'],
    details: {
      intro: 'A regression and peak-detection workflow for residential electricity consumption in Morocco. It uses the MORED dataset and building metadata to estimate hourly energy use in kWh and identify high-consumption periods.',
      metrics: [
        { label: 'Buildings', value: '12', note: 'Residential MORED dataset' },
        { label: 'Reported daily range', value: '28–295 kWh', note: 'As documented in the repository' },
        { label: 'Selected model', value: 'Ridge + RFE', note: '20 selected features; alpha 0.01' },
        { label: 'Reported test R²', value: '0.9999992', note: 'Repository result; see validation caveat below' },
      ],
      sections: [
        { title: 'Dataset and preprocessing', body: 'The project uses the Moroccan Buildings’ Electricity Consumption Dataset (MORED), covering 12 residential buildings in Salé, Tétouan and Rabat. Collection periods range from 14 to 90 days per building. The source describes high-frequency raw measurements and an hourly aggregation target y_kWh, enriched with occupancy and building metadata.' },
        { title: 'Feature engineering', bullets: ['Lagged consumption: previous hour, two hours, 24 hours, 48 hours and seven days.', 'Rolling statistics over 6 hours, 24 hours and 7 days, plus expanding mean and standard deviation.', 'Time features: hour, weekday, weekend, month and cyclic sine/cosine encodings.', 'Building context: number of occupants and interactions with temporal features.'] },
        { title: 'Model selection', body: 'Several stacking configurations and an LSTM sequence model were evaluated. The repository reports that stacking did not improve the initial Ridge baseline and that the tested 168-hour LSTM performed poorly. The final documented approach is Ridge regression with Recursive Feature Elimination (RFE), selecting 20 features.' },
        { title: 'Prediction and peak analysis', body: 'The Streamlit application supports daily, weekly and monthly views, actual-versus-predicted comparisons, peak-hour detection and CSV export. The committed peak-detection plot overlays predicted consumption and real measurements, along with predicted and actual peak markers.' },
        { title: 'Metric interpretation', body: 'The values displayed for Ridge + RFE are transcribed from the repository’s committed performance graphic. The exceptionally high reported R² and very small errors should be rechecked on a separate, independently held-out building or time period before being interpreted as evidence of generalisation.' }
      ],
      tables: [
        { title: 'Dataset profile', columns: ['Aspect', 'Documented value'], rows: [
          ['Dataset', 'MORED — Moroccan Buildings’ Electricity Consumption Dataset'],
          ['Residential buildings', '12'],
          ['Cities', 'Salé, Tétouan and Rabat'],
          ['Observation period', '14–90 days per building'],
          ['Daily consumption range', '28–295 kWh'],
          ['Context metadata', 'Occupants, dwelling type, area and ownership']
        ]},
        { title: 'Approaches compared in the repository', columns: ['Approach', 'Test R²', 'RMSE', 'Repository observation'], rows: [
          ['Ridge + LightGBM stacking (KFold OOF)', '0.4078', '0.2196', 'Negligible gain over the baseline'],
          ['Ridge + LightGBM + XGBoost (Ridge meta)', '0.3945', '0.2215', 'Performance decreased'],
          ['Ridge + LightGBM + XGBoost (GradientBoosting meta)', '0.3645', '0.2275', 'More complex meta-model degraded results'],
          ['LSTM(128, 64) on 168-hour sequences', '0.0450', '0.2798', 'Did not learn the patterns in this experiment']
        ]},
        { title: 'Selected Ridge + RFE result (as reported)', columns: ['Metric', 'Value'], rows: [
          ['Selected features', '20'],
          ['Best alpha', '0.01'],
          ['Cross-validation R²', '0.999632'],
          ['Test R²', '0.9999992'],
          ['MAE', '0.000218'],
          ['RMSE', '0.000249'],
          ['MAPE', '0.1229%']
        ]}
      ],
      gallery: [
        { src: import.meta.env.BASE_URL + 'project-images/energy-distribution.svg', title: 'Energy consumption distribution', caption: 'Histogram supplied by the project owner; the screenshot is used as provided.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/Energy_consumption_and_peaks_detection/main/screens/mored_overview.png', title: 'MORED dataset overview', caption: 'The project’s illustration of whole-premises and individual-load electricity acquisition.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/Energy_consumption_and_peaks_detection/main/screens/models_performance.png', title: 'Model comparison', caption: 'Repository comparison table for stacking and LSTM experiments.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/Energy_consumption_and_peaks_detection/main/screens/best_model.png', title: 'Ridge + RFE metrics', caption: 'Committed performance summary for the selected Ridge + RFE configuration.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/Energy_consumption_and_peaks_detection/main/screens/peak_detection.png', title: 'Predictions and peak detection', caption: 'Hourly predicted consumption compared with real data, including predicted and actual peak markers.' },
        { src: 'https://raw.githubusercontent.com/1marieCurie/Energy_consumption_and_peaks_detection/main/screens/streamlit_dashboard.png', title: 'Streamlit dashboard', caption: 'Application metrics and an overview of detected versus real energy peaks.' }
      ]
    },
    accent: 'amber', icon: 'database',
  },
  {
    title: 'Training Management Web App',
    repo: 'https://github.com/1marieCurie/Plateforme_E-Learning_des_formation_Ecole_Polythechnique_des_Genies', screenshot: import.meta.env.BASE_URL + 'project-images/training-management.svg', summaryFr: 'Application web de gestion des programmes de formation et des cours en ligne.', descriptionFr: 'Réalisée durant mon stage d’initiation à l’EPG, cette application porte sur la conception et le développement d’un outil web de gestion des formations et des cours.',
    category: 'Web Development', year: '2025',
    summary: 'A web application for managing training programmes and online courses.',
    description: 'Built during my introductory internship at EPG, focusing on the design and development of a web application for training and course management.',
    stack: ['React', 'Laravel', 'MySQL'],
    details: {
      intro: 'An e-learning management application built around training programmes (formations), the courses inside them, teachers and enrolled students. The repository code and supporting documentation describe course delivery, progress tracking, statistics, role permissions and certificates.',
      metrics: [
        { label: 'Courses in test guide', value: '11', note: 'Documented validation snapshot' },
        { label: 'Test enrolments', value: '26', note: 'Documented validation snapshot' },
        { label: 'Chapters in test data', value: '7', note: 'Across five courses' },
        { label: 'User roles', value: '4', note: 'Super admin, admin, teacher and student' },
      ],
      sections: [
        { title: 'Training and course structure', body: 'A Formation groups multiple courses and is associated with a teacher and category. Courses contain chapters, assignments, feedback and evaluations. The models also store learning objectives, prerequisites, duration, difficulty, active status and view counts.' },
        { title: 'Student access and progress', bullets: ['Students enrol in a formation rather than being linked directly to each course.', 'The documented access rule checks the formation enrolment and paid payment status.', 'Formation progress can be read from the enrolment record; course and formation completion can lead to certificates.'] },
        { title: 'Roles and permissions', body: 'The supporting permissions documentation describes four roles: super admin, admin, teacher (formateur) and student. Super admins have full administrative access; normal admins receive granular permissions; teachers manage their own learning content; students have learning access without administrative permissions.' },
        { title: 'Certificates and verification', body: 'The repository documents both course certificates and formation certificates, with generation for completed learning paths, certificate numbers, verification codes, validity checks, download and verification URLs, expiry handling and verification logs.' },
        { title: 'Testing snapshot', body: 'The course-statistics guide records an example validation dataset: 11 active courses, 26 enrolments and 7 chapters across five courses. These figures are documentation/test values, not a claim about current production usage.' }
      ],
      tables: [
        { title: 'Documented course-statistics test snapshot', columns: ['Metric', 'Value'], rows: [
          ['Total courses', '11'],
          ['Active courses', '11'],
          ['Total enrolments', '26'],
          ['Courses with chapters', '5'],
          ['Total chapters', '7'],
          ['Main category', 'Web Development (7 courses)']
        ]},
        { title: 'Role model', columns: ['Role', 'Documented responsibility'], rows: [
          ['Super admin', 'Full system administration and permission management'],
          ['Admin', 'Specific permissions granted by the super admin'],
          ['Teacher / Formateur', 'Create and manage own formations and courses'],
          ['Student', 'Access enrolled learning content and track progress']
        ]}
      ]
    },
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
              {filtered.map((p) => <button className={`project-card accent-${p.accent}`} key={p.title} onClick={() => setSelected(p)}>
                {p.screenshot && <img className={`project-preview ${p.screenshotClass ? `project-preview--${p.screenshotClass}` : ''}`} src={p.screenshot} alt={`${p.title} visual preview`} loading="lazy" />}
                <div className="project-card-body"><h3>{p.title}</h3><p>{lang === 'FR' ? (p.summaryFr ?? p.summary) : p.summary}</p></div>
                <div className="project-card-bottom">
                  <div className="project-tags">{p.stack.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
                  <span className="project-view-action">{p.status ? t.ongoing : (lang === 'EN' ? 'View Project' : 'Voir le projet')}<ArrowUpRight size={15}/></span>
                </div>
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
            <div className="cert-item">
              <span className="cert-icon"><Award size={19}/></span>
              <div className="cert-content"><div className="cert-title-row"><h3>Retrieval-Augmented Generation (RAG)</h3><span className="cert-type cert-type--badge">BADGE</span></div>
                <p>IBM SkillsBuild · Completed November 2026</p>
                <small>Retrieval-Augmented Generation for Enhanced AI Output</small>
                <a className="cert-source-link" href="https://www.linkedin.com/in/khadija-mellak-090498287/" target="_blank" rel="noreferrer">View badge on LinkedIn <ArrowUpRight size={12}/></a>
              </div>
            </div>
            <div className="cert-item">
              <span className="cert-icon"><Award size={19}/></span>
              <div><h3>AWS Academy Graduate</h3><p>Cloud Foundations · Trained Badge</p><small>Amazon Web Services Academy</small></div><Check size={16} className="cert-check"/>
            </div>
            <div className="cert-item">
              <span className="cert-icon"><Workflow size={19}/></span>
              <div><h3>Web Search API in n8n</h3><p>Integrated in automated workflows</p><small>Tavily</small></div><Check size={16} className="cert-check"/>
            </div>
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
          <h2 id="modal-title">{selected.title}</h2>
          {selected.screenshotCredit && <a className="image-credit" href={selected.screenshotCreditUrl} target="_blank" rel="noreferrer">Image reference: {selected.screenshotCredit}<ArrowUpRight size={13}/></a>}
          {selected.screenshotNote && <p className="image-note">{selected.screenshotNote}</p>}
          {!selected.details?.gallery?.length && selected.screenshot && <div className={`modal-cover-preview ${selected.screenshotClass ? `modal-cover-preview--${selected.screenshotClass}` : ''}`}><img src={selected.screenshot} alt={`${selected.title} visual`} loading="lazy"/></div>}
          <div className="modal-label">{t.details}</div>
          <p className="modal-description">{lang === 'FR' ? (selected.descriptionFr ?? selected.description) : selected.description}</p>
          {selected.details && <>
            <p className="detail-intro">{selected.details.intro}</p>
            {!!selected.details.metrics?.length && <div className="detail-metrics">
              {selected.details.metrics.map(metric => <div className="detail-metric" key={metric.label}>
                <span>{metric.label}</span><strong>{metric.value}</strong>{metric.note && <small>{metric.note}</small>}
              </div>)}
            </div>}
            {!!selected.details.sections?.length && <div className="detail-sections">
              {selected.details.sections.map(section => <section className="detail-section" key={section.title}>
                <h3>{section.title}</h3>
                {section.body && <p>{section.body}</p>}
                {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
              </section>)}
            </div>}
            {!!selected.details.tables?.length && <div className="detail-tables">
              {selected.details.tables.map(table => <section className="detail-table-section" key={table.title}>
                <h3>{table.title}</h3>
                <div className="detail-table-scroll"><table>
                  <thead><tr>{table.columns.map(column => <th key={column}>{column}</th>)}</tr></thead>
                  <tbody>{table.rows.map((values, rowIndex) => <tr key={rowIndex}>{values.map((value, cellIndex) => <td key={cellIndex}>{value}</td>)}</tr>)}</tbody>
                </table></div>
              </section>)}
            </div>}
            {!!selected.details.gallery?.length && <section className="detail-gallery-section">
              <div className="detail-gallery-heading"><div className="modal-label">PROJECT EVIDENCE</div><span>{selected.details.gallery.length} visuals</span></div>
              <div className="detail-gallery">
                {selected.details.gallery.map(visual => <figure className="detail-gallery-item" key={visual.title}>
                  <div className="detail-gallery-frame"><img src={visual.src} alt={visual.title} loading="lazy"/></div>
                  <figcaption><strong>{visual.title}</strong><span>{visual.caption}</span>{visual.source && <a href={visual.source} target="_blank" rel="noreferrer">Open source <ArrowUpRight size={12}/></a>}</figcaption>
                </figure>)}
              </div>
            </section>}
          </>}
          <div className="modal-label">{t.stack}</div><div className="modal-tags">{selected.stack.map(s => <span key={s}>{s}</span>)}</div>
          {selected.repo && <a className="project-repo-link" href={selected.repo} target="_blank" rel="noreferrer"><Github size={16}/>{lang === 'EN' ? 'View source on GitHub' : 'Voir le code sur GitHub'}<ArrowUpRight size={15}/></a>}<div className="modal-note">{lang === 'EN' ? 'Open the repository to explore the implementation and project files.' : 'Consultez le dépôt pour explorer l’implémentation et les fichiers du projet.'}</div>
          <button className="modal-done" onClick={() => setSelected(null)}>{t.close}<X size={15}/></button>
        </section>
      </div>}
    </div>
  )
}

export default App
