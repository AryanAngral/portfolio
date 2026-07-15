export const siteUrl = "https://aryanangral.vercel.app";

export const profile = {
  name: "Aryan Angral",
  role: "Software Engineer",
  tagline: "Cloud infrastructure, full-stack apps, and applied AI.",
  location: "Jammu, India",
  email: "aryan.angral.dev@gmail.com",
  github: "https://github.com/AryanAngral",
  linkedin: "https://www.linkedin.com/in/aryan-angral-44a953167",
  resumeUrl: "/Aryan_Angral_Resume.pdf",
  availability: "Open to full-time opportunities",
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

export const skillsRadar: { axis: string; value: number }[] = [
  { axis: "Cloud", value: 88 },
  { axis: "DevOps", value: 84 },
  { axis: "Backend", value: 82 },
  { axis: "Frontend", value: 86 },
  { axis: "Security", value: 80 },
  { axis: "AI / ML", value: 74 },
];

export type PipelineStage = {
  label: string;
  detail: string;
};

export const pipeline: PipelineStage[] = [
  { label: "git push", detail: "commit lands on main" },
  { label: "GitHub Actions", detail: "workflow triggered" },
  { label: "Workload Identity Federation", detail: "keyless auth to GCP — no long-lived secrets" },
  { label: "terraform plan & apply", detail: "infra reconciled as code" },
  { label: "build & test", detail: "container built, suite green" },
  { label: "deploy → Cloud Run", detail: "rolled out, scaled to demand" },
  { label: "healthcheck ✓", detail: "live, observability alerts armed" },
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
    period: "Jan 2026 – Jul 2026",
    points: [
      "Built and maintained dual frontend portals for HR professionals and candidates in React/Next.js, including interactive interview-scheduling tiles and accessible navigation.",
      "Architected the backend on Supabase — SSO, secure email verification, and serverless TypeScript edge functions powering automated referral email pipelines.",
      "Led the migration of production infrastructure to Google Cloud Platform, standing up Cloud Run and Vertex AI to deploy and scale ML pipelines.",
      "Wrote Terraform to provision RBAC, custom IAM roles, security policies, and real-time observability alerts on GCP.",
      "Built GitHub Actions CI/CD pipelines with GCP Workload Identity Federation for keyless deployments, plus security and vulnerability audits across the infrastructure.",
    ],
  },
  {
    role: "Vice Chairperson",
    org: "CSI Student Chapter — MIET",
    period: "2025 – Jul 2026",
    points: [
      "Organized technical workshops, hackathons, and Agile coding competitions for 200+ student participants, raising hands-on software development skills across campus.",
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
  repo?: string;
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
    repo: "https://github.com/AryanAngral/spendr_final",
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

export type Milestone = {
  period: string;
  title: string;
  detail: string;
};

export const journey: Milestone[] = [
  {
    period: "2022",
    title: "Started B.Tech in Computer Science",
    detail: "Model Institute of Engineering and Technology, Jammu.",
  },
  {
    period: "2023",
    title: "Vice Chairperson & Research Lead, ACM MIET",
    detail: "Led AI, cryptography, and architecture seminars for 50+ students.",
  },
  {
    period: "2024",
    title: "Research internship & security certifications",
    detail:
      "Cut processing latency 30% at MIET; earned NYU and Palo Alto Networks cybersecurity certificates, NPTEL Cyber Security, and GUVI Python.",
  },
  {
    period: "2024 – 2025",
    title: "Google Cybersecurity certificate courses",
    detail: "Completed six verified courses, from Foundations to Detection and Response.",
  },
  {
    period: "2025",
    title: "Vice Chairperson, CSI Student Chapter",
    detail: "Ran workshops, hackathons, and coding competitions for 200+ participants.",
  },
  {
    period: "Jan 2026",
    title: "Software Intern, Straatix Partners Labs",
    detail:
      "Built dual HR/candidate portals; led the GCP migration with Terraform and keyless CI/CD.",
  },
  {
    period: "Jul 2026",
    title: "Graduated — Director's Merit Gold Medalist",
    detail: "B.Tech CSE with 8.8 CGPA; open to full-time software roles.",
  },
];

export type CourseworkRepo = {
  name: string;
  description: string;
  tech: string;
  repo: string;
};

export const courseworkRepos: CourseworkRepo[] = [
  {
    name: "CPP-DSA",
    description: "Day-wise C++ data structures & algorithms practice covering the core DSA curriculum.",
    tech: "C++",
    repo: "https://github.com/AryanAngral/CPP-DSA",
  },
  {
    name: "AI with Computer Vision",
    description: "University lab notebooks combining machine learning with computer vision to analyze visual data.",
    tech: "Python / Jupyter",
    repo: "https://github.com/AryanAngral/COM-611-AI-with-Computer-Vision",
  },
  {
    name: "MIET Internship 2024",
    description: "Summer 2024 internship codebase — C++ builds including a train-management system.",
    tech: "C++",
    repo: "https://github.com/AryanAngral/INTERNSHIP-JULY-2024-MIET",
  },
  {
    name: "Data Structures in C",
    description: "Classic data structures implemented from scratch in C — arrays, stacks, search and traversal.",
    tech: "C",
    repo: "https://github.com/AryanAngral/DATA-STRUCTURE-USING-C",
  },
  {
    name: "Inventory Management System",
    description: "Console-based inventory manager written in C++.",
    tech: "C++",
    repo: "https://github.com/AryanAngral/Inventory-Management-System",
  },
  {
    name: "Phone Book Management System",
    description: "Console phone book with add, search and delete operations in C++.",
    tech: "C++",
    repo: "https://github.com/AryanAngral/Phone-book-management-system",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  year?: string;
  href?: string;
  credentialId?: string;
  courses?: { label: string; href: string }[];
};

export const certifications: Certification[] = [
  {
    title: "Director's Merit List Gold Medalist",
    issuer: "Model Institute of Engineering and Technology",
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google · Coursera",
    year: "2024 – 2025",
    courses: [
      { label: "Foundations of Cybersecurity", href: "https://coursera.org/verify/40Z0EXGY2ERX" },
      { label: "Manage Security Risks", href: "https://coursera.org/verify/WHR9BM8LK8OZ" },
      { label: "Linux and SQL", href: "https://coursera.org/verify/ERRD7JWYEKY5" },
      { label: "Network Security", href: "https://coursera.org/verify/ID4M8VZH6PHT" },
      { label: "Assets, Threats & Vulnerabilities", href: "https://coursera.org/verify/Z8X06AR208Q0" },
      { label: "Detection and Response", href: "https://coursera.org/verify/SW1YX7XE0NLI" },
    ],
  },
  {
    title: "Palo Alto Networks Cybersecurity Professional Certificate",
    issuer: "Palo Alto Networks · Coursera",
    year: "2024",
    href: "https://coursera.org/verify/LGPHQ8QZJN8I",
  },
  {
    title: "Introduction to Cyber Security Specialization",
    issuer: "New York University · Coursera",
    year: "2024",
    href: "https://coursera.org/verify/TMC96CLAEKS7",
  },
  {
    title: "Cyber Security and Privacy (12-week course)",
    issuer: "NPTEL",
    year: "2024",
    credentialId: "NPTEL24CS121S954400149",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    year: "2025",
  },
  {
    title: "Python",
    issuer: "GUVI",
    year: "2024",
    href: "https://www.guvi.in/certificate?id=872MS84092736zrv14",
  },
  {
    title: "Certified Specialist in AI and Secure Computing",
    issuer: "Coursera",
  },
];
