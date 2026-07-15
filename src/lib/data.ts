export const profile = {
  name: "Aryan Angral",
  role: "Software Engineer",
  tagline: "Cloud infrastructure, full-stack apps, and applied AI.",
  location: "Jammu, India",
  email: "aryan.angral.dev@gmail.com",
  phone: "[removed]",
  github: "https://github.com/AryanAngral",
  linkedin: "https://www.linkedin.com/in/aryan-angral-44a953167",
  resumeUrl: "/Aryan_Angral_Resume.pdf",
  summary:
    "Computer Science graduate and Software Engineer building production cloud infrastructure and full-stack platforms — from Terraform-provisioned GCP environments to AI-powered web apps.",
};

export const education = {
  school: "Model Institute of Engineering and Technology",
  location: "Jammu, India",
  degree: "B.Tech. in Computer Science and Engineering",
  cgpa: "8.8 / 10.0",
  graduation: "Graduated July 2026",
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Databases",
    skills: [
      "C++",
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL",
      "HCL (Terraform)",
      "PostgreSQL / Supabase",
      "MySQL",
    ],
  },
  {
    title: "Frameworks & Cloud",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "REST APIs",
      "Google Cloud Platform",
      "Cloud Run",
      "GKE",
      "Vertex AI",
    ],
  },
  {
    title: "Tools & Methodologies",
    skills: [
      "Terraform",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Git",
      "Agile / Scrum",
      "GCP Workload Identity Federation",
    ],
  },
  {
    title: "Core Concepts",
    skills: [
      "NLP (Gemini API)",
      "Semantic Search",
      "Time Series Forecasting (LSTM, ARIMA)",
      "Data Structures & Algorithms",
      "Cybersecurity",
      "Infrastructure as Code",
    ],
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Intern",
    org: "Straatix Partners Labs Pvt. Ltd.",
    period: "Jan 2026 – Present",
    points: [
      "Built and maintain dual frontend portals for HR professionals and candidates in React/Next.js, including interactive interview-scheduling tiles and accessible navigation.",
      "Architected the backend on Supabase — SSO, secure email verification, and serverless TypeScript edge functions powering automated referral email pipelines.",
      "Led the migration of production infrastructure to Google Cloud Platform, standing up Cloud Run and Vertex AI to deploy and scale ML pipelines.",
      "Wrote Terraform to provision RBAC, custom IAM roles, security policies, and real-time observability alerts on GCP.",
      "Built GitHub Actions CI/CD pipelines with GCP Workload Identity Federation for keyless deployments, plus security and vulnerability audits across the infrastructure.",
    ],
  },
  {
    role: "Vice Chairperson",
    org: "CSI Student Chapter — MIET",
    period: "2025 – Present",
    points: [
      "Organize technical workshops, hackathons, and Agile coding competitions for 200+ student participants, raising hands-on software development skills across campus.",
    ],
  },
  {
    role: "Vice Chairperson & Research Lead",
    org: "ACM — MIET Chapter",
    period: "2023 – 2025",
    points: [
      "Led technical seminars on AI, applied cryptography, and software architecture, mentoring a cohort of 50+ engineering students.",
    ],
  },
  {
    role: "Intern",
    org: "MIET",
    period: "July 2024 – August 2024",
    points: [
      "Analyzed algorithmic efficiency in large-scale data processing to find performance bottlenecks; optimized C++ and Python code for a 30% reduction in processing latency.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  points: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    name: "Straatix Talent Exchange",
    description:
      "Dual-portal recruitment platform for HR teams and candidates, with real-time notifications and role-based dashboards.",
    tags: ["React/Next.js", "Node.js", "TypeScript", "Supabase", "GCP", "Terraform", "GitHub Actions"],
    points: [
      "Dynamic interview scheduling, real-time notifications, and secure role-based dashboards across the recruitment lifecycle.",
      "Migrated backend to GCP using Terraform — GKE, Cloud Run, and Vertex AI pipelines for a production-grade, ML-ready architecture.",
      "Keyless CI/CD via GitHub Actions + GCP Workload Identity Federation, removing long-lived credentials from the deploy path.",
    ],
  },
  {
    name: "Spender — AI-Powered Personal Finance Manager",
    description:
      "Full-stack finance tracker with a conversational assistant and predictive expense forecasting.",
    tags: ["MERN Stack", "REST APIs", "Gemini API", "Python"],
    points: [
      "NLP-driven chatbot powered by the Gemini API for real-time, personalized financial guidance.",
      "LSTM and ARIMA time-series models forecast future expenses directly on the dashboard for proactive planning.",
    ],
  },
  {
    name: "Mind Bridge — AI-Driven Student Mental Health Support",
    description:
      "A digital wellness platform offering real-time, empathetic conversational support for students.",
    tags: ["React", "Node.js", "Gemini API"],
    points: [
      "Real-time conversational sentiment analysis via the Gemini API for immediate, empathetic support.",
      "Privacy-first backend architecture protecting user anonymity for journal entries and assessments.",
    ],
  },
];

export type Certification = {
  title: string;
  issuer: string;
};

export const certifications: Certification[] = [
  {
    title: "Director's Merit List Gold Medalist",
    issuer: "Model Institute of Engineering and Technology",
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
  },
  {
    title: "Palo Alto Networks Cybersecurity Specialization",
    issuer: "Palo Alto Networks",
  },
  {
    title: "Certified Specialist in AI and Secure Computing",
    issuer: "Coursera",
  },
];
