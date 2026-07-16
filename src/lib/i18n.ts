export type Lang = "en" | "hi";

export const hero: Record<Lang, { greeting: string; summary: string; cta: string; resume: string; availability: string }> = {
  en: {
    greeting: "Hi, I'm",
    summary:
      "Computer Science graduate and Software Engineer building production cloud infrastructure and full-stack platforms — from Terraform-provisioned GCP environments to AI-powered web apps.",
    cta: "Get in touch",
    resume: "Resume",
    availability: "status: open_to_work",
  },
  hi: {
    greeting: "नमस्ते, मैं हूँ",
    summary:
      "कंप्यूटर साइंस स्नातक और सॉफ़्टवेयर इंजीनियर — Terraform से प्रोविज़न किए गए GCP एनवायरनमेंट से लेकर AI-संचालित वेब ऐप्स तक, प्रोडक्शन क्लाउड इंफ्रास्ट्रक्चर और फुल-स्टैक प्लेटफ़ॉर्म बनाता हूँ।",
    cta: "संपर्क करें",
    resume: "रिज़्यूमे",
    availability: "स्थिति: काम के लिए उपलब्ध",
  },
};

export function getLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    return (localStorage.getItem("lang") as Lang) || "en";
  } catch {
    return "en";
  }
}
