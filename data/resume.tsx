export interface BlogPost {
  id?: string
  title: string
  date: string
  category: string
  summary: string
  content: string
  link?: string
}

export const resumeData = {
  name: "SATHISH JAYARAMAN",
  title: "Chief Architect & Head of Development",
  summary:
    "Distinguished technology leader with 14+ years of experience architecting and delivering enterprise-grade, scalable ML and data platforms. Expert in leveraging AI-assisted development to build production systems rapidly with lean teams.",
  philosophy:
    "Passionate about solving real-world problems through cutting-edge software solutions. Committed to building well-tested, resilient products that deliver measurable business value. Continuously adaptable to emerging technologies with a self-motivated approach to excellence in engineering leadership.",
  contact: {
    email: "scriperdj@gmail.com",
    phone: "+91 8072217269",
    website: "https://sathish.me",
    linkedin: "https://www.linkedin.com/in/scriperdj",
    medium: "https://medium.com/@sathishjayaram",
  },
  coreCompetencies: [
    {
      category: "Distributed Systems",
      skills: [
        "Hybrid Edge-Fog-Cloud",
        "K8s & Kafka Orchestration",
        "Fault-Tolerant Pipelines",
        "Cross-Region Replication",
      ],
    },
    {
      category: "Data Engineering",
      skills: [
        "Dual-Schema Architecture",
        "Spark Streaming ETL",
        "TimescaleDB Intelligence",
        "Apache Iceberg Lakehouse",
      ],
    },
    {
      category: "AI Leadership",
      skills: ["AI-Native Dev Systems", "LLM Agent Frameworks", "Prompt Engineering", "MLOps Orchestration"],
    },
  ],
  personalTraits: [
    {
      pid: 1240,
      user: "sathish",
      cpu: 12.4,
      mem: 4.1,
      time: "5y+",
      command: "./discus_care --daily",
    },
    {
      pid: 8923,
      user: "sathish",
      cpu: 8.2,
      mem: 2.3,
      time: "3y+",
      command: "sh natural_aquarist.sh",
    },
    {
      pid: 4421,
      user: "root",
      cpu: 24.1,
      mem: 8.5,
      time: "2y+",
      command: "run_marathon --42k",
    },
    {
      pid: 1001,
      user: "system",
      cpu: 1.5,
      mem: 0.8,
      time: "14y+",
      command: "early_riser_daemon",
    },
    {
      pid: 3320,
      user: "sathish",
      cpu: 15.7,
      mem: 5.2,
      time: "4y+",
      command: "python miracle_morning.py",
    },
  ],
  technicalExpertise: {
    orchestration: ["Apache Airflow", "Apache Kafka", "Celery", "Luigi", "Redis"],
    bigData: ["Apache Spark (PySpark)", "Apache Iceberg", "Spark Streaming"],
    databases: ["PostgreSQL", "TimescaleDB", "DuckDB", "ElasticSearch", "MySQL", "Redis"],
    cloud: ["Kubernetes", "Docker", "AWS", "Google Cloud", "Azure"],
    backend: ["Django", "FastAPI", "Node.js", "Ruby on Rails"],
    data: ["CubeJS", "GraphQL", "MLflow", "MLOps"],
    languages: ["Python", "Scala", "Java", "Ruby", "PHP"],
    frontend: ["React", "Redux"],
    monitoring: ["Prometheus", "KEDA", "Grafana"],
  },
  experience: [
    {
      role: "Chief Architect & Head of Development",
      company: "Quartic.ai",
      period: "May 2024 - Present",
      description:
        "Leading technical strategy and engineering excellence for AI-powered intelligent manufacturing platform.",
      achievements: [
        "Pioneered AI-assisted development using Claude Code and Cursor agents, reducing cycle time while maintaining production quality",
        "Led migration to modern stack (Apache Iceberg, TimescaleDB, CubeJS) and resolved critical distributed system bottlenecks",
        "Drive technical strategy and R&D for AI-powered manufacturing platform while supporting business growth and compliance",
        "Scale and lead distributed engineering teams across backend, frontend, and DevOps, fostering an ownership culture",
      ],
    },
    {
      role: "Technical Architect & Platform Lead",
      company: "Quartic.ai",
      period: "Feb 2020 - May 2024",
      description: "Architected and executed critical platform transformation initiatives.",
      achievements: [
        "Led critical migration from monolith to scalable microservices, significantly improving resilience and availability",
        "Implemented high-efficiency PySpark ETL pipelines and comprehensive MLOps platform using Kafka and Spark Streaming",
        "Scaled engineering team from 5 to 30+ developers, defining requirements and leading technical onboarding",
        "Orchestrated end-to-end feature delivery and deployment coordination across multiple distributed teams",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Quartic.ai",
      period: "Jul 2017 - Feb 2020",
      description: "Built core platform capabilities and data engineering infrastructure.",
      achievements: [
        "Developed essential platform features for backend and frontend frameworks",
        "Built data-engineering pipelines, ETL jobs, and package abstraction layers",
        "Contributed to deployment and testing infrastructure",
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "Customer Labs Digital Solutions",
      period: "Jul 2015 - Jul 2017",
      description: "Engineered data processing platform for digital marketing analytics.",
      achievements: [
        "Architected and developed distributed platform for processing high-volume clickstream data",
        "Built end-to-end data ingestion pipelines from multiple sources to support large-scale data-driven decision making",
      ],
    },
    {
      role: "Programmer Analyst",
      company: "Cognizant",
      period: "Jan 2012 - Jun 2015",
      description: "Developed enterprise applications for insurance and banking domains.",
      achievements: [
        "Migrated line-of-business applications from legacy to modern platforms",
        "Delivered transaction reporting and portfolio management solutions",
      ],
    },
    {
      role: "Web Developer",
      company: "Kaivalya Tech Services",
      period: "2010 - 2012",
      description: "Early career full-stack development focusing on web solutions.",
      achievements: [
        "Started as an intern during college and transitioned to full-time Web Developer role",
        "Developed and maintained portfolio and e-commerce websites using PHP and CMS technologies",
      ],
    },
  ],
  testimonials: [
    {
      name: "Rajiv Anand",
      role: "CEO, Quartic.ai",
      context: "MILESTONE_WIN",
      message:
        "A special shout out to Sathish for his creativity in system architecture design that allowed us to build an enterprise grade solution! An all round star! You continue to amaze us with the breadth of your skills and your creativity. Bravo!!",
      linkedin: "https://www.linkedin.com/in/anandrajivra/",
    },
    {
      name: "Prathik Bhat",
      role: "Data Engineer",
      context: "FAREWELL",
      message:
        "A special thanks to @scriperdj, whose inspiration and mentorship have been invaluable; I aspire to be a leader like you someday.",
      linkedin: "https://www.linkedin.com/in/prathik-bhat/",
    },
    {
      name: "Aasmeen Khan",
      role: "SDE2",
      context: "APPRECIATION",
      message:
        "I've genuinely appreciated all your support and the way you've always pushed the team forward. I've never felt any kind of bias in how you assign work — you always match it with a person's capability. I also love that you trust the team completely — you never keep asking for constant updates or micromanage.",
      linkedin: "https://www.linkedin.com/in/aasmeen-khan/",
    },
    {
      name: "Partha Sarathi Nanda",
      role: "Engineer",
      context: "FAREWELL",
      message:
        "Thank you @scriperdj for providing support throughout my journey in quartic and i guess i won't find a better team lead than you.",
      linkedin: "https://www.linkedin.com/in/parthasarathi0103/",
    },
    {
      name: "Mayank Prasoon",
      role: "SDE3",
      context: "FAREWELL",
      message:
        "Couldn't have asked for a better mentor to start with. Full freedom to experiment with random ways to implement solutions while focused on overall dev task.",
      linkedin: "https://www.linkedin.com/in/prasoonmayank/",
    },
    {
      name: "Mohamed",
      role: "Senior SRE",
      context: "FAREWELL",
      message:
        "You have not only been a great mentor but also an exceptional leader, always inspiring us to do our best. Working with you has been an absolute pleasure.",
      linkedin: "https://www.linkedin.com/in/smohamed-cloud/",
    },
  ],
  blogs: [
    {
      id: "breaking-the-monolith",
      title: "Breaking the Monolith: A Microservices Journey",
      date: "2024-03-15",
      category: "Architecture",
      summary:
        "How we migrated a critical manufacturing platform from a legacy monolith to a scalable microservices architecture, improving resilience and deployment velocity.",
      content: `
        <h3>The Challenge</h3>
        <p>Our legacy platform was struggling to keep up with the demands of modern manufacturing data. Tightly coupled components meant that a single failure could bring down the entire system, and deployment cycles were becoming painfully slow.</p>
        
        <h3>The Solution: Decomposition</h3>
        <p>We adopted a strangler fig pattern to gradually peel off services. Key steps included:</p>
        <ul>
          <li><strong>Domain Analysis:</strong> Identifying bounded contexts to define service boundaries.</li>
          <li><strong>Event-Driven Backbone:</strong> implementing Apache Kafka to decouple services and ensure asynchronous communication.</li>
          <li><strong>Containerization:</strong> leveraging Kubernetes for orchestration, allowing us to scale individual components based on load.</li>
        </ul>

        <h3>Results</h3>
        <p>The migration resulted in a <strong>99.99% system uptime</strong> and reduced our deployment lead time from days to hours. More importantly, it empowered our engineering teams to own their services end-to-end.</p>
      `,
    },
    {
      id: "ai-assisted-engineering",
      title: "AI-Assisted Engineering: Scaling with Agents",
      date: "2024-05-22",
      category: "AI & Dev",
      summary:
        "Leveraging Claude Code and Cursor agents to accelerate development cycles and maintain high code quality with a lean engineering team.",
      content: `
        <h3>The New Paradigm</h3>
        <p>Traditional coding practices are evolving. By integrating AI agents into our workflow, we aren't just writing code faster; we're architecting better solutions.</p>

        <h3>Strategic Implementation</h3>
        <p>We didn't just use AI for auto-complete. We built a framework where:</p>
        <ul>
          <li><strong>Context is King:</strong> We engineered prompts that provide agents with full system context, architectural constraints, and style guides.</li>
          <li><strong>Automated TDD:</strong> Agents are tasked with writing tests before implementation, ensuring robust code coverage.</li>
          <li><strong>Docs as Code:</strong> Agents automatically update documentation alongside code changes, keeping our knowledge base pristine.</li>
        </ul>

        <h3>Impact</h3>
        <p>This approach allowed us to deliver complex features with a team size of 5 that would traditionally require 15+ engineers.</p>
      `,
    },
    {
      id: "optimizing-time-series-data",
      title: "Optimizing Time-Series Data at Scale",
      date: "2024-01-10",
      category: "Data Engineering",
      summary:
        "Building high-throughput ETL pipelines using Apache Iceberg and TimescaleDB to handle massive streams of industrial IoT data.",
      content: `
        <h3>The Data Deluge</h3>
        <p>Industrial IoT generates terabytes of time-series data daily. Standard relational databases were crumbling under the write load and query latency requirements.</p>

        <h3>Architecture Deep Dive</h3>
        <p>We redesigned our data layer to be a hybrid beast:</p>
        <ul>
          <li><strong>Hot Data:</strong> TimescaleDB handles real-time ingestion and immediate queries, offering SQL familiarity with time-series superpowers.</li>
          <li><strong>Cold Data & Analytics:</strong> Apache Iceberg on S3 provides a cost-effective, query-able data lake for historical analysis.</li>
          <li><strong>Transformation:</strong> PySpark jobs orchestrate the movement and aggregation of data between these layers.</li>
        </ul>

        <h3>Outcome</h3>
        <p>We achieved a <strong>10x improvement in query performance</strong> for analytical workloads and significantly reduced our cloud storage costs by tiering data effectively.</p>
      `,
    },
  ],
  metrics: {
    uptime: "99.99%",
    teamScale: "30+ ENG",
    arrImpact: "$1.5M+",
    opsCost: "-40%",
  },
}
