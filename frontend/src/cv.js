// ✏️ O teu CV (PT e EN). Aparece em /cv/ e /en/cv/ e imprime/guarda em PDF com uma só coluna (bom para ATS).
// "project" liga ao slug de uma página de projeto do site.

export const cv = {
  photo: "/images/andre-cardoso.jpg", // ✏️ vazio = sem foto

  en: {
    headline: "Linux Sysadmin · DevOps",
    location: "Peniche, Portugal",
    summary:
      "Systems administrator with around 5 years of experience across IT support, Linux and Windows servers and infrastructure monitoring, now moving into DevOps. I currently look after the network, servers and backups of an organisation with more than 800 employees. Outside work I run my own production VPS with Docker, nginx, Cloudflare and Wazuh, hosting several apps I built myself, and I automate business processes with Python, PowerShell and OpenRPA.",
    skills: [
      ["Containers & deployment", "Docker, Docker Compose, nginx (reverse proxy), Jenkins, Git, GitHub"],
      ["Networking & web", "Cloudflare DNS, Let's Encrypt / TLS, DHCP, Active Directory, secure remote access"],
      ["Monitoring & security", "Zabbix, Grafana, Prometheus, Wazuh (SIEM), Fail2Ban, Dozzle, server hardening"],
      ["Systems", "Linux (Debian, Mint), Windows Server, backups"],
      ["Scripting & automation", "Bash, Python, PowerShell, OpenRPA (SAP)"],
      ["Development", "React, Node.js, Express, REST APIs"],
    ],
    experience: [
      {
        company: "Thai Union (ESIP)",
        role: "IT Support Technician L2",
        dates: "Jan 2025 – Present",
        bullets: [
          "Maintain the network, servers and backups for an organisation of 800+ employees.",
          "Automate recurring tasks with PowerShell and Python.",
          "Developing an OpenRPA robot that creates SAP purchase requisitions and purchase orders from another system's API, removing manual data entry.",
        ],
      },
      {
        company: "JanelaDigital",
        role: "Helpdesk L2 / Junior SysAdmin",
        dates: "2022 – 2024",
        bullets: [
          "Introduced infrastructure monitoring with Grafana and Prometheus.",
          "Managed Linux and Windows servers and Docker deployments.",
          "Supported DHCP, Active Directory and user systems.",
        ],
      },
      {
        company: "Createinfor",
        role: "IT Helpdesk Technician L1",
        dates: "2021 – 2022",
        bullets: [
          "Provided remote and on-site technical support.",
          "Configured systems, maintained hardware and resolved email issues.",
        ],
      },
    ],
    projects: [
      { name: "Caderneta", project: "caderneta", text: "Multi-user web app in production that reads screenshots with OCR and turns them into stats. React, Docker, nginx, Cloudflare; deployment moving to Jenkins." },
      { name: "VPS security monitoring", project: "wazuh-vps-security", text: "Wazuh SIEM, firewall and Dozzle on an internet-facing server, with real-time alerts on login attempts and scans." },
      { name: "Vivace Beauty", project: "vivace-beauty", text: "Client landing page for a salon in Peniche: React + C#, own .pt domain, nginx in Docker, one-command deploy script." },
      { name: "Horas", project: "horas", text: "Self-hosted time-clock app in Docker behind nginx with HTTPS." },
      { name: "andrecardoso.dev", project: "portfolio", text: "Pre-rendered React site and Node API with Docker Compose, nginx and Let's Encrypt, with technical articles." },
    ],
    education: [
      ["Technical Course in Computer Systems and Networks", "2020"],
      ["Currently learning: AWS, cloud security and CI/CD automation", ""],
      ["Studying towards the CISSP certification", ""],
    ],
    languages: [["Portuguese", "Native"], ["English", "Fluent"], ["German", "B2"]],
    interests: "Cybersecurity, monitoring, automation, self-hosting and Raspberry Pi.",
    ui: {
      title: "CV",
      download: "Download PDF",
      print: "Print",
      summary: "Profile",
      skills: "Technical skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education & learning",
      languages: "Languages",
      interests: "Interests",
      more: "More",
    },
  },

  pt: {
    headline: "Sysadmin Linux · DevOps",
    location: "Peniche, Portugal",
    summary:
      "Administrador de sistemas com cerca de 5 anos de experiência em suporte informático, servidores Linux e Windows e monitorização de infraestrutura, agora a dar o passo para DevOps. Atualmente sou responsável pela rede, servidores e backups de uma organização com mais de 800 colaboradores. Fora do trabalho giro a minha própria VPS em produção com Docker, nginx, Cloudflare e Wazuh, onde alojo várias aplicações feitas por mim, e automatizo processos de negócio com Python, PowerShell e OpenRPA.",
    skills: [
      ["Containers e deploy", "Docker, Docker Compose, nginx (reverse proxy), Jenkins, Git, GitHub"],
      ["Redes e web", "DNS na Cloudflare, Let's Encrypt / TLS, DHCP, Active Directory, acesso remoto seguro"],
      ["Monitorização e segurança", "Zabbix, Grafana, Prometheus, Wazuh (SIEM), Fail2Ban, Dozzle, hardening de servidores"],
      ["Sistemas", "Linux (Debian, Mint), Windows Server, backups"],
      ["Scripting e automação", "Bash, Python, PowerShell, OpenRPA (SAP)"],
      ["Desenvolvimento", "React, Node.js, Express, APIs REST"],
    ],
    experience: [
      {
        company: "Thai Union (ESIP)",
        role: "Técnico de Suporte Informático L2",
        dates: "jan 2025 – atual",
        bullets: [
          "Manutenção da rede, servidores e backups de uma organização com mais de 800 colaboradores.",
          "Automação de tarefas recorrentes com PowerShell e Python.",
          "Desenvolvimento de um robô em OpenRPA que cria requisições e encomendas de compra no SAP a partir da API de outro sistema, eliminando introdução manual de dados.",
        ],
      },
      {
        company: "JanelaDigital",
        role: "Helpdesk L2 / SysAdmin Júnior",
        dates: "2022 – 2024",
        bullets: [
          "Implementei monitorização de infraestrutura com Grafana e Prometheus.",
          "Gestão de servidores Linux e Windows e de deploys em Docker.",
          "Suporte a DHCP, Active Directory e sistemas dos utilizadores.",
        ],
      },
      {
        company: "Createinfor",
        role: "Técnico de Helpdesk L1",
        dates: "2021 – 2022",
        bullets: [
          "Suporte técnico remoto e presencial.",
          "Configuração de sistemas, manutenção de hardware e resolução de problemas de email.",
        ],
      },
    ],
    projects: [
      { name: "Caderneta", project: "caderneta", text: "App web multi-utilizador em produção que lê prints com OCR e os transforma em estatísticas. React, Docker, nginx, Cloudflare; deploy a evoluir para Jenkins." },
      { name: "Monitorização de segurança da VPS", project: "wazuh-vps-security", text: "Wazuh (SIEM), firewall e Dozzle num servidor exposto à internet, com alertas em tempo real para tentativas de login e varrimentos." },
      { name: "Vivace Beauty", project: "vivace-beauty", text: "Landing page de cliente para um salão em Peniche: React + C#, domínio .pt próprio, nginx em Docker e script de deploy num só comando." },
      { name: "Horas", project: "horas", text: "Pica-ponto self-hosted em Docker, atrás de nginx com HTTPS." },
      { name: "andrecardoso.dev", project: "portfolio", text: "Site React pré-renderizado e API Node com Docker Compose, nginx e Let's Encrypt, com artigos técnicos." },
    ],
    education: [
      ["Curso Técnico de Sistemas Informáticos e Redes", "2020"],
      ["A aprender: AWS, segurança na cloud e automação de CI/CD", ""],
      ["Em estudo para a certificação CISSP", ""],
    ],
    languages: [["Português", "Nativo"], ["Inglês", "Fluente"], ["Alemão", "B2"]],
    interests: "Cibersegurança, monitorização, automação, self-hosting e Raspberry Pi.",
    ui: {
      title: "CV",
      download: "Descarregar PDF",
      print: "Imprimir",
      summary: "Perfil",
      skills: "Competências técnicas",
      experience: "Experiência",
      projects: "Projetos",
      education: "Formação",
      languages: "Línguas",
      interests: "Interesses",
      more: "Mais",
    },
  },
};
