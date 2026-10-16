// ✏️ Edita aqui o teu texto (PT e EN). Depois: docker compose up -d --build

export const links = {
  email: "salvador0988@sapo.pt",
  whatsapp: "351938041038",                         // número com indicativo, sem + nem espaços
  whatsappDisplay: "+351 938 041 038",
  github: "https://github.com/teu-utilizador",      // ✏️
  linkedin: "https://www.linkedin.com/in/teu-perfil", // ✏️
  calendar: "",                                     // ✏️ opcional: link do Cal.com. Vazio = botão escondido
};

export const stack = [
  "Linux", "Docker", "nginx", "Wazuh", "Cloudflare",
  "React", "Vite", "Node.js", "Express", "Python", "PostgreSQL",
];

export const content = {
  pt: {
    name: "André Cardoso",
    tagline: "Monto, protejo e mantenho aplicações web e IA privada em servidores que tu controlas.",
    location: "Lisboa, Portugal",

    about:
      "Trabalho em sysadmin e helpdesk e sou programador full-stack. Gosto de levar uma ideia até estar online, com domínio, HTTPS, monitorização e segurança tratados desde o primeiro dia. Aprendo melhor a fazer, por isso o meu VPS é também o meu laboratório.",

    services: [
      {
        icon: "shield",
        title: "Segurança e monitorização de servidores",
        text: "Firewall, hardening, SIEM com Wazuh e alertas, para saberes o que se passa nos teus servidores antes de haver um problema.",
      },
      {
        icon: "spark",
        title: "IA privada e automação",
        text: "Assistentes de IA e automações a correr na tua infraestrutura, com os dados a ficar na Europa.",
      },
      {
        icon: "server",
        title: "Deploy e manutenção de aplicações",
        text: "Docker, nginx, domínios, certificados e backups. Ponho a tua aplicação online e mantenho-a a funcionar.",
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
        art: "web",
        image: "", // ✏️ opcional: ex. "/images/web.png" (põe o ficheiro em frontend/public/images/)
        title: "Este site, do servidor ao ecrã",
        summary: "Portfólio com frontend, API e área privada, alojado e protegido por mim.",
        problem: "Queria um site próprio, rápido e seguro, sem depender de plataformas de terceiros.",
        solution: "React e uma API em Node em Docker, atrás de nginx com HTTPS da Let's Encrypt, DNS na Cloudflare, cabeçalhos de segurança e migração do domínio antigo com redirecionamentos 301.",
        result: "Um site em domínio próprio, com HTTPS obrigatório e renovação automática de certificados.",
        tags: ["React", "Node.js", "nginx", "Cloudflare"],
      },
      {
        // ✏️ Confirma e completa este projeto com os detalhes reais
        art: "ai",
        image: "",
        title: "TaskIA",
        summary: "Uma ferramenta do dia a dia com um modelo de linguagem integrado.",
        problem: "✏️ Que problema resolve?",
        solution: "✏️ Como funciona e que tecnologias usa?",
        result: "✏️ O que mudou para quem o usa?",
        tags: ["IA", "Python"],
      },
    ],

    skills: [
      { title: "Servidores", text: "Linux, Docker, nginx e certificados. Faço o deploy e a manutenção das minhas próprias aplicações." },
      { title: "Segurança", text: "Firewall, hardening, SIEM e análise de logs." },
      { title: "Desenvolvimento", text: "Interfaces em React e APIs em Node e Python, com autenticação e bases de dados." },
      { title: "Suporte", text: "Anos de helpdesk: sei explicar tecnologia a quem não é técnico." },
    ],

    likes: [
      "Automatizar tudo o que repito mais de duas vezes",
      "Self-hosting e brincar com o meu VPS",
      "Café e bons fones",
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
      contactText: "Tens um servidor sem monitorização ou queres usar IA sem enviar dados para fora? Fala comigo por WhatsApp ou email.",
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
    tagline: "I build, secure and run web apps and private AI on servers you control.",
    location: "Lisbon, Portugal",

    about:
      "I work in sysadmin and helpdesk, and I'm a full-stack developer. I like taking an idea all the way to production, with domain, HTTPS, monitoring and security handled from day one. I learn best by doing, so my VPS doubles as my lab.",

    services: [
      {
        icon: "shield",
        title: "Server security and monitoring",
        text: "Firewall, hardening, Wazuh SIEM and alerts, so you know what's happening on your servers before it becomes a problem.",
      },
      {
        icon: "spark",
        title: "Private AI and automation",
        text: "AI assistants and automations running on your own infrastructure, with your data staying in Europe.",
      },
      {
        icon: "server",
        title: "App deployment and maintenance",
        text: "Docker, nginx, domains, certificates and backups. I get your app online and keep it running.",
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
        art: "web",
        image: "", // ✏️ opcional: ex. "/images/web.png" (põe o ficheiro em frontend/public/images/)
        title: "This site, from server to screen",
        summary: "A portfolio with a frontend, an API and a private area, hosted and secured by me.",
        problem: "I wanted my own fast, secure site without depending on third-party platforms.",
        solution: "React and a Node API in Docker, behind nginx with Let's Encrypt HTTPS, Cloudflare DNS, security headers and a migration from the old domain with 301 redirects.",
        result: "A site on its own domain, HTTPS-only, with automatic certificate renewal.",
        tags: ["React", "Node.js", "nginx", "Cloudflare"],
      },
      {
        // ✏️ Confirm and complete this project with the real details
        art: "ai",
        image: "",
        title: "TaskIA",
        summary: "An everyday tool with a language model built in.",
        problem: "✏️ What problem does it solve?",
        solution: "✏️ How does it work and what does it use?",
        result: "✏️ What changed for the people using it?",
        tags: ["AI", "Python"],
      },
    ],

    skills: [
      { title: "Servers", text: "Linux, Docker, nginx and certificates. I deploy and maintain my own applications." },
      { title: "Security", text: "Firewalls, hardening, SIEM and log analysis." },
      { title: "Development", text: "React interfaces and Node and Python APIs, with authentication and databases." },
      { title: "Support", text: "Years of helpdesk: I can explain technology to non-technical people." },
    ],

    likes: [
      "Automating anything I repeat more than twice",
      "Self-hosting and tinkering with my VPS",
      "Coffee and good headphones",
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
      contactText: "Running a server with no monitoring, or want to use AI without sending your data abroad? Reach me on WhatsApp or by email.",
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
