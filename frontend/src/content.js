// ✏️ Edita aqui o teu texto (PT e EN). Depois: docker compose up -d --build

export const links = {
  email: "salvador0988@sapo.pt",
  whatsapp: "351938041038",                         // número com indicativo, sem + nem espaços
  whatsappDisplay: "+351 938 041 038",
  github: "https://github.com/Blacktouro",
  linkedin: "",                                     // ✏️ cola aqui o link do teu LinkedIn. Vazio = botão escondido
  calendar: "",                                     // ✏️ opcional: link do Cal.com. Vazio = botão escondido
};

export const stack = [
  "Linux", "Docker", "Docker Compose", "nginx", "Jenkins", "CI/CD", "Git", "GitHub",
  "Wazuh", "Cloudflare", "Let's Encrypt", "Bash",
  "React", "Vite", "Node.js", "Express", "Python", "PostgreSQL", "OpenRPA", "SAP",
];

// Texto usado no <title> e na meta description, por idioma (o App troca-os ao mudar de língua)
export const seo = {
  pt: {
    title: "André Cardoso | DevOps e Sysadmin Linux · Docker, CI/CD e Segurança",
    description:
      "Sysadmin Linux com 5 anos de experiência e foco em DevOps. Docker, nginx, CI/CD com Jenkins, segurança com Wazuh e apps self-hosted em produção. Peniche, Portugal.",
  },
  en: {
    title: "André Cardoso | DevOps & Linux Sysadmin · Docker, CI/CD & Security",
    description:
      "Linux sysadmin with 5 years of experience, focused on DevOps. Docker, nginx, CI/CD with Jenkins, Wazuh security and self-hosted apps in production. Based in Portugal.",
  },
};

export const content = {
  pt: {
    name: "André Cardoso",
    tagline: "Sysadmin Linux focado em DevOps. Ponho aplicações em produção com Docker, CI/CD, monitorização e segurança, em servidores que eu próprio giro.",
    location: "Peniche, Portugal",

    about:
      "Trabalho há cerca de 5 anos como sysadmin Linux e estou a dar o passo para DevOps. Gosto de levar uma ideia até estar online, com domínio, HTTPS, monitorização e segurança tratados desde o primeiro dia. Aprendo melhor a fazer, por isso o meu VPS é também o meu laboratório: corre várias aplicações minhas em Docker, atrás de nginx, protegidas por firewall e Wazuh.",

    services: [
      {
        icon: "shield",
        title: "Segurança e monitorização de servidores",
        text: "Firewall, hardening, SIEM com Wazuh e alertas, para saberes o que se passa nos teus servidores antes de haver um problema.",
      },
      {
        icon: "spark",
        title: "Automação e IA privada",
        text: "Automações de processos (incluindo RPA sobre SAP) e assistentes de IA a correr na tua infraestrutura, com os dados a ficar na Europa.",
      },
      {
        icon: "server",
        title: "Deploy, CI/CD e manutenção",
        text: "Docker, nginx, pipelines com Jenkins, domínios, certificados e backups. Ponho a tua aplicação online e mantenho-a a funcionar.",
      },
    ],

    cases: [
      {
        art: "security",
        image: "", // ✏️ opcional: ex. "/images/security.png" (põe o ficheiro em frontend/public/images/)
        title: "Monitorização de segurança numa VPS",
        summary: "Um servidor exposto à internet com visibilidade total sobre quem tenta entrar.",
        problem: "Um servidor público recebe tentativas de acesso todos os dias, e sem monitorização ninguém dá por elas.",
        solution: "Firewall só com as portas essenciais abertas, Wazuh como SIEM para detetar intrusões e alterações, e Dozzle para ver os logs de todos os containers num só sítio.",
        result: "Tentativas de login e varrimentos automáticos ficam registados e geram alertas em tempo real.",
        tags: ["Wazuh", "Firewall", "Dozzle", "Docker"],
      },
      {
        art: "data",
        image: "",
        title: "Caderneta: registo de apostas com OCR",
        summary: "App web multi-utilizador que lê prints e transforma-os em dados e estatísticas.",
        problem: "Registar apostas à mão é lento e cheio de erros, e os dados ficam espalhados por capturas de ecrã.",
        solution: "Frontend em React com login, backend que extrai os dados dos prints por OCR e guarda só o resultado (as imagens não ficam no servidor). Página partilhada com análises pré-jogo, previsões e taxa de acerto. Corre em Docker atrás de nginx, num subdomínio próprio na Cloudflare, com deploy a evoluir para Jenkins.",
        result: "Em produção desde outubro de 2026, com dados reais e vários utilizadores.",
        tags: ["React", "OCR", "Docker", "nginx", "Jenkins"],
        url: "https://apostas.andrecardoso.dev",
      },
      {
        art: "clock",
        image: "",
        title: "Horas: pica-ponto self-hosted",
        summary: "Aplicação de registo de horas de trabalho, alojada no meu próprio servidor.",
        problem: "As ferramentas de pica-ponto comerciais são pagas e guardam os dados de horário em servidores de terceiros.",
        solution: "Aplicação web em Docker, publicada num subdomínio com nginx como reverse proxy e HTTPS, no mesmo VPS monitorizado pelo Wazuh.",
        result: "Registo de entradas e saídas acessível em qualquer dispositivo, com os dados sob o meu controlo.",
        tags: ["Docker", "nginx", "Self-hosting"],
        url: "https://horas.andrecardoso.dev",
      },
      {
        art: "ai",
        image: "",
        title: "Automação de compras no SAP com OpenRPA",
        summary: "Um robô que cria requisições e encomendas de compra no SAP sem intervenção manual.",
        problem: "Criar requisições (PR) e encomendas (PO) no SAP a partir dos dados de outro sistema era trabalho manual e repetitivo.",
        solution: "Robô em OpenRPA que lê os dados pela API do outro software e preenche o SAP automaticamente.",
        result: "Menos introdução manual de dados e menos erros num processo que se repete todos os dias.",
        tags: ["OpenRPA", "SAP", "API", "Automação"],
      },
      {
        art: "web",
        image: "", // ✏️ opcional: ex. "/images/web.png" (põe o ficheiro em frontend/public/images/)
        title: "Este site, do servidor ao ecrã",
        summary: "Portfólio com frontend, API e área privada, alojado e protegido por mim.",
        problem: "Queria um site próprio, rápido e seguro, sem depender de plataformas de terceiros.",
        solution: "React e uma API em Node em Docker Compose, atrás de nginx com HTTPS da Let's Encrypt, DNS na Cloudflare, cabeçalhos de segurança, login com JWT e proteção contra força bruta, e painel que verifica se cada projeto está online.",
        result: "Um site em domínio próprio, com HTTPS obrigatório e renovação automática de certificados.",
        tags: ["React", "Node.js", "nginx", "Cloudflare"],
        repo: "https://github.com/Blacktouro/portfolio",
      },
    ],

    skills: [
      { title: "Servidores", text: "5 anos de Linux em produção. Docker, Docker Compose, nginx e certificados; faço o deploy e a manutenção das minhas próprias aplicações." },
      { title: "CI/CD e automação", text: "Pipelines com Jenkins em Docker, Git e GitHub, scripts em Bash e Python, e RPA para processos de negócio." },
      { title: "Segurança e observabilidade", text: "Firewall, hardening, SIEM com Wazuh, centralização e análise de logs." },
      { title: "Desenvolvimento", text: "Interfaces em React e APIs em Node e Python, com autenticação e bases de dados." },
    ],

    likes: [
      "Automatizar tudo o que repito mais de duas vezes",
      "Self-hosting e brincar com o meu VPS",
      "Monitorização: gráficos, alertas e logs",
      "Futebol ao fim de semana",
      "Aprender uma tecnologia nova por projeto",
    ],

    ui: {
      home: "Início",
      hello: "Olá, sou o",
      seeWork: "Ver projetos",
      contactMe: "Enviar email",
      whatsapp: "WhatsApp",
      waText: "Olá André, vi o teu site e gostava de falar contigo.",
      details: "Ver detalhes",
      hideDetails: "Esconder detalhes",
      visit: "Ver online",
      code: "Código",
      bookCall: "Marcar uma conversa",
      servicesTitle: "Como posso ajudar",
      casesTitle: "Projetos",
      problem: "Problema",
      solution: "Solução",
      result: "Resultado",
      aboutTitle: "Quem sou",
      skillsTitle: "O que sei fazer",
      stackLabel: "Tecnologias",
      likesTitle: "O que gosto",
      contactTitle: "Vamos conversar",
      contactText: "Procuras um DevOps ou sysadmin, tens um servidor sem monitorização ou queres usar IA sem enviar dados para fora? Fala comigo por WhatsApp ou email.",
      privateText: "Painel privado",
      login: "Entrar",
      logout: "Sair",
      user: "Utilizador",
      password: "Password",
      cancel: "Cancelar",
      loggingIn: "A entrar…",
      serverError: "O servidor não respondeu. Tenta outra vez.",
      greeting: (u) => `Olá, ${u}.`,
      projectCount: (n) => `Tens ${n} ${n === 1 ? "projeto" : "projetos"}.`,
      loading: "A carregar os projetos…",
      noProjects: "Ainda não há projetos. Adiciona-os em",
      checking: "A verificar",
      online: "Online",
      offline: "Offline",
      noLink: "Sem link",
      switchTo: "EN",
      switchLabel: "Switch to English",
    },
  },

  en: {
    name: "André Cardoso",
    tagline: "Linux sysadmin moving into DevOps. I take apps to production with Docker, CI/CD, monitoring and security, on servers I run myself.",
    location: "Peniche, Portugal",

    about:
      "I've worked as a Linux sysadmin for about 5 years and I'm moving into DevOps. I like taking an idea all the way to production, with domain, HTTPS, monitoring and security handled from day one. I learn best by doing, so my VPS doubles as my lab: it runs several of my own apps in Docker, behind nginx, protected by a firewall and Wazuh.",

    services: [
      {
        icon: "shield",
        title: "Server security and monitoring",
        text: "Firewall, hardening, Wazuh SIEM and alerts, so you know what's happening on your servers before it becomes a problem.",
      },
      {
        icon: "spark",
        title: "Automation and private AI",
        text: "Process automation (including RPA on SAP) and AI assistants running on your own infrastructure, with your data staying in Europe.",
      },
      {
        icon: "server",
        title: "Deployment, CI/CD and maintenance",
        text: "Docker, nginx, Jenkins pipelines, domains, certificates and backups. I get your app online and keep it running.",
      },
    ],

    cases: [
      {
        art: "security",
        image: "", // ✏️ opcional: ex. "/images/security.png" (põe o ficheiro em frontend/public/images/)
        title: "Security monitoring on a VPS",
        summary: "An internet-facing server with full visibility into who's trying to get in.",
        problem: "A public server gets access attempts every day, and without monitoring nobody notices.",
        solution: "A firewall with only the essential ports open, Wazuh as a SIEM to detect intrusions and file changes, and Dozzle to see every container's logs in one place.",
        result: "Login attempts and automated scans are logged and raise alerts in real time.",
        tags: ["Wazuh", "Firewall", "Dozzle", "Docker"],
      },
      {
        art: "data",
        image: "",
        title: "Caderneta: OCR-powered bet tracker",
        summary: "A multi-user web app that reads screenshots and turns them into data and stats.",
        problem: "Logging bets by hand is slow and error-prone, and the data ends up scattered across screenshots.",
        solution: "A React frontend with login and a backend that extracts the data from screenshots with OCR and stores only the result (images never stay on the server). A shared page shows pre-match analyses, predictions and hit rate. It runs in Docker behind nginx on its own Cloudflare subdomain, with deployment moving to Jenkins.",
        result: "In production since October 2026, with real data and several users.",
        tags: ["React", "OCR", "Docker", "nginx", "Jenkins"],
        url: "https://apostas.andrecardoso.dev",
      },
      {
        art: "clock",
        image: "",
        title: "Horas: self-hosted time clock",
        summary: "A work-hours tracking app, hosted on my own server.",
        problem: "Commercial time-clock tools are paid and keep your schedule data on someone else's servers.",
        solution: "A web app in Docker, published on a subdomain with nginx as a reverse proxy and HTTPS, on the same Wazuh-monitored VPS.",
        result: "Clock-in and clock-out from any device, with the data under my control.",
        tags: ["Docker", "nginx", "Self-hosting"],
        url: "https://horas.andrecardoso.dev",
      },
      {
        art: "ai",
        image: "",
        title: "SAP purchasing automation with OpenRPA",
        summary: "A robot that creates purchase requisitions and orders in SAP with no manual input.",
        problem: "Creating purchase requisitions (PR) and orders (PO) in SAP from another system's data was manual, repetitive work.",
        solution: "An OpenRPA robot that reads the data from the other software's API and fills in SAP automatically.",
        result: "Less manual data entry and fewer errors in a process that runs every day.",
        tags: ["OpenRPA", "SAP", "API", "Automation"],
      },
      {
        art: "web",
        image: "", // ✏️ opcional: ex. "/images/web.png" (põe o ficheiro em frontend/public/images/)
        title: "This site, from server to screen",
        summary: "A portfolio with a frontend, an API and a private area, hosted and secured by me.",
        problem: "I wanted my own fast, secure site without depending on third-party platforms.",
        solution: "React and a Node API with Docker Compose, behind nginx with Let's Encrypt HTTPS, Cloudflare DNS, security headers, JWT login with brute-force protection, and a dashboard that checks whether each project is online.",
        result: "A site on its own domain, HTTPS-only, with automatic certificate renewal.",
        tags: ["React", "Node.js", "nginx", "Cloudflare"],
        repo: "https://github.com/Blacktouro/portfolio",
      },
    ],

    skills: [
      { title: "Servers", text: "5 years of Linux in production. Docker, Docker Compose, nginx and certificates; I deploy and maintain my own applications." },
      { title: "CI/CD and automation", text: "Jenkins pipelines in Docker, Git and GitHub, Bash and Python scripting, and RPA for business processes." },
      { title: "Security and observability", text: "Firewalls, hardening, Wazuh SIEM, log centralisation and analysis." },
      { title: "Development", text: "React interfaces and Node and Python APIs, with authentication and databases." },
    ],

    likes: [
      "Automating anything I repeat more than twice",
      "Self-hosting and tinkering with my VPS",
      "Monitoring: dashboards, alerts and logs",
      "Football on weekends",
      "Learning one new technology per project",
    ],

    ui: {
      home: "Home",
      hello: "Hi, I'm",
      seeWork: "See my work",
      contactMe: "Send an email",
      whatsapp: "WhatsApp",
      waText: "Hi André, I saw your website and would like to talk.",
      details: "See details",
      hideDetails: "Hide details",
      visit: "Visit",
      code: "Code",
      bookCall: "Book a call",
      servicesTitle: "How I can help",
      casesTitle: "Projects",
      problem: "Problem",
      solution: "Solution",
      result: "Result",
      aboutTitle: "About me",
      skillsTitle: "What I do",
      stackLabel: "Technologies",
      likesTitle: "What I enjoy",
      contactTitle: "Let's talk",
      contactText: "Looking for a DevOps engineer or sysadmin, running a server with no monitoring, or want to use AI without sending your data abroad? Reach me on WhatsApp or by email.",
      privateText: "Private dashboard",
      login: "Sign in",
      logout: "Sign out",
      user: "Username",
      password: "Password",
      cancel: "Cancel",
      loggingIn: "Signing in…",
      serverError: "The server didn't respond. Try again.",
      greeting: (u) => `Hi, ${u}.`,
      projectCount: (n) => `You have ${n} ${n === 1 ? "project" : "projects"}.`,
      loading: "Loading projects…",
      noProjects: "No projects yet. Add them in",
      checking: "Checking",
      online: "Online",
      offline: "Offline",
      noLink: "No link",
      switchTo: "PT",
      switchLabel: "Mudar para português",
    },
  },
};
