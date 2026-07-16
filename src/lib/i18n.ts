export type Lang = "en" | "hi";

export function getLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    return (localStorage.getItem("lang") as Lang) || "en";
  } catch {
    return "en";
  }
}

// Dictionary. UI strings carry both en+hi; data-derived strings (journey,
// experience, projects) carry hi only — the English fallback comes from
// data.ts so content never drifts. Tech terms stay in Latin script.
type Entry = { en?: string; hi: string };

export const DICT: Record<string, Entry> = {
  // hero
  "hero.greeting": { en: "Hi, I'm", hi: "नमस्ते, मैं हूँ" },
  "hero.summary": {
    en: "Computer Science graduate and Software Engineer building production cloud infrastructure and full-stack platforms — from Terraform-provisioned GCP environments to AI-powered web apps.",
    hi: "कंप्यूटर साइंस स्नातक और सॉफ़्टवेयर इंजीनियर — Terraform से प्रोविज़न किए गए GCP एनवायरनमेंट से लेकर AI-संचालित वेब ऐप्स तक, प्रोडक्शन क्लाउड इंफ्रास्ट्रक्चर और फुल-स्टैक प्लेटफ़ॉर्म बनाता हूँ।",
  },
  "hero.cta": { en: "Get in touch", hi: "संपर्क करें" },
  "hero.resume": { en: "Resume", hi: "रिज़्यूमे" },
  "hero.readbio": { en: "Read bio", hi: "बायो सुनें" },
  "hero.stop": { en: "Stop", hi: "रोकें" },
  "hero.availability": { en: "status: open_to_work", hi: "स्थिति: काम के लिए उपलब्ध" },

  // navbar
  "nav.about": { en: "About", hi: "परिचय" },
  "nav.journey": { en: "Journey", hi: "सफ़र" },
  "nav.experience": { en: "Experience", hi: "अनुभव" },
  "nav.projects": { en: "Projects", hi: "प्रोजेक्ट्स" },
  "nav.github": { en: "GitHub", hi: "GitHub" },
  "nav.contact": { en: "Contact", hi: "संपर्क" },

  // section headings
  "h.about.eyebrow": { en: "About", hi: "परिचय" },
  "h.about.title": { en: "Who I am", hi: "मैं कौन हूँ" },
  "h.journey.eyebrow": { en: "Journey", hi: "सफ़र" },
  "h.journey.title": { en: "The road so far", hi: "अब तक का सफ़र" },
  "h.exp.eyebrow": { en: "Experience", hi: "अनुभव" },
  "h.exp.title": { en: "Where I've worked", hi: "मैंने कहाँ काम किया" },
  "h.eng.eyebrow": { en: "Engineering", hi: "इंजीनियरिंग" },
  "h.eng.title": { en: "How I ship", hi: "मैं कैसे शिप करता हूँ" },
  "h.proj.eyebrow": { en: "Projects", hi: "प्रोजेक्ट्स" },
  "h.proj.title": { en: "Things I've built", hi: "जो मैंने बनाया" },
  "h.gh.eyebrow": { en: "GitHub", hi: "GitHub" },
  "h.gh.title": { en: "Code, by the numbers", hi: "कोड, आँकड़ों में" },
  "h.certs.eyebrow": { en: "Certifications", hi: "प्रमाणपत्र" },
  "h.certs.title": { en: "Credentials & distinctions", hi: "प्रमाणपत्र और उपलब्धियाँ" },
  "h.contact.eyebrow": { en: "Contact", hi: "संपर्क" },
  "h.contact.title": { en: "Let's build something", hi: "आइए कुछ बनाएँ" },

  // about
  "about.edu": { en: "Education", hi: "शिक्षा" },
  "about.grad": { en: "Graduated July 2026", hi: "जुलाई 2026 में स्नातक" },
  "about.radar": { en: "Skill profile", hi: "कौशल प्रोफ़ाइल" },
  "about.stat.0": { en: "CGPA in Computer Science", hi: "कंप्यूटर साइंस में CGPA" },
  "about.stat.1": { en: "Students reached via workshops", hi: "वर्कशॉप से जुड़े छात्र" },
  "about.stat.2": { en: "Latency cut in optimized pipelines", hi: "पाइपलाइन लेटेंसी में कटौती" },
  "about.stat.3": { en: "Certifications & distinctions", hi: "प्रमाणपत्र और उपलब्धियाँ" },
  "skills.Languages & Databases": { hi: "भाषाएँ और डेटाबेस" },
  "skills.Frameworks & Cloud": { hi: "फ्रेमवर्क और क्लाउड" },
  "skills.Tools & Methodologies": { hi: "टूल्स और कार्यप्रणाली" },
  "skills.Core Concepts": { hi: "मुख्य अवधारणाएँ" },

  // journey (fallbacks come from data.ts)
  "journey.0.title": { hi: "कंप्यूटर साइंस में B.Tech शुरू" },
  "journey.0.detail": { hi: "मॉडल इंस्टीट्यूट ऑफ़ इंजीनियरिंग एंड टेक्नोलॉजी, जम्मू।" },
  "journey.1.title": { hi: "उपाध्यक्ष व रिसर्च लीड, ACM MIET" },
  "journey.1.detail": { hi: "50+ छात्रों के लिए AI, क्रिप्टोग्राफ़ी और सॉफ़्टवेयर आर्किटेक्चर सेमिनार का नेतृत्व किया।" },
  "journey.2.title": { hi: "रिसर्च इंटर्नशिप और सुरक्षा प्रमाणपत्र" },
  "journey.2.detail": {
    hi: "MIET में प्रोसेसिंग लेटेंसी 30% घटाई; NYU और Palo Alto Networks साइबर-सुरक्षा प्रमाणपत्र, NPTEL साइबर सुरक्षा और GUVI Python पूरे किए।",
  },
  "journey.3.title": { hi: "Google साइबर-सुरक्षा प्रमाणपत्र कोर्स" },
  "journey.3.detail": { hi: "Foundations से Detection and Response तक छह सत्यापित कोर्स पूरे किए।" },
  "journey.4.title": { hi: "उपाध्यक्ष, CSI स्टूडेंट चैप्टर" },
  "journey.4.detail": { hi: "200+ प्रतिभागियों के लिए वर्कशॉप, हैकाथॉन और कोडिंग प्रतियोगिताएँ आयोजित कीं।" },
  "journey.5.title": { hi: "सॉफ़्टवेयर इंटर्न, Straatix Partners Labs" },
  "journey.5.detail": { hi: "HR/उम्मीदवार पोर्टल बनाए; Terraform और keyless CI/CD के साथ GCP माइग्रेशन का नेतृत्व किया।" },
  "journey.6.title": { hi: "स्नातक — डायरेक्टर्स मेरिट गोल्ड मेडलिस्ट" },
  "journey.6.detail": { hi: "8.8 CGPA के साथ B.Tech CSE; फुल-टाइम सॉफ़्टवेयर भूमिकाओं के लिए उपलब्ध।" },

  // experience bullets
  "exp.0.0": {
    hi: "React/Next.js में HR और उम्मीदवारों के लिए दो फ्रंटएंड पोर्टल बनाए व मेंटेन किए — इंटरैक्टिव इंटरव्यू-शेड्यूलिंग टाइल्स और सुलभ नेविगेशन सहित।",
  },
  "exp.0.1": {
    hi: "Supabase पर बैकएंड आर्किटेक्ट किया — SSO, सुरक्षित ईमेल वेरिफ़िकेशन, और automated referral ईमेल पाइपलाइन के लिए serverless TypeScript edge functions।",
  },
  "exp.0.2": {
    hi: "प्रोडक्शन इंफ्रास्ट्रक्चर का Google Cloud Platform पर माइग्रेशन लीड किया — ML पाइपलाइनों को डिप्लॉय व स्केल करने के लिए Cloud Run और Vertex AI।",
  },
  "exp.0.3": { hi: "GCP पर RBAC, कस्टम IAM रोल, सुरक्षा नीतियाँ और रीयल-टाइम अलर्ट प्रोविज़न करने के लिए Terraform लिखा।" },
  "exp.0.4": {
    hi: "GCP Workload Identity Federation के साथ keyless डिप्लॉयमेंट हेतु GitHub Actions CI/CD पाइपलाइन बनाई, साथ ही इंफ्रास्ट्रक्चर की सुरक्षा ऑडिट भी कीं।",
  },
  "exp.1.0": { hi: "200+ छात्र प्रतिभागियों के लिए तकनीकी वर्कशॉप, हैकाथॉन और Agile कोडिंग प्रतियोगिताएँ आयोजित कीं।" },
  "exp.2.0": { hi: "AI, एप्लाइड क्रिप्टोग्राफ़ी और सॉफ़्टवेयर आर्किटेक्चर पर तकनीकी सेमिनार लीड किए; 50+ इंजीनियरिंग छात्रों को मेंटर किया।" },
  "exp.3.0": { hi: "बड़े पैमाने के डेटा प्रोसेसिंग में एल्गोरिथम दक्षता का विश्लेषण किया; C++ और Python कोड ऑप्टिमाइज़ कर प्रोसेसिंग लेटेंसी 30% घटाई।" },

  // projects
  "proj.0.desc": { hi: "HR टीमों और उम्मीदवारों के लिए dual-portal रिक्रूटमेंट प्लेटफ़ॉर्म — रीयल-टाइम नोटिफ़िकेशन और role-based डैशबोर्ड के साथ।" },
  "proj.0.p0": { hi: "रिक्रूटमेंट लाइफ़साइकिल भर में डायनामिक इंटरव्यू शेड्यूलिंग, रीयल-टाइम नोटिफ़िकेशन और सुरक्षित role-based डैशबोर्ड।" },
  "proj.0.p1": { hi: "Terraform के ज़रिए बैकएंड को GCP पर माइग्रेट किया — GKE, Cloud Run और Vertex AI के साथ प्रोडक्शन-ग्रेड, ML-रेडी आर्किटेक्चर।" },
  "proj.0.p2": { hi: "GitHub Actions + GCP Workload Identity Federation से keyless CI/CD — डिप्लॉय पाथ से long-lived credentials हटाए।" },
  "proj.1.desc": { hi: "संवादी असिस्टेंट और खर्च पूर्वानुमान के साथ फुल-स्टैक फ़ाइनेंस ट्रैकर।" },
  "proj.1.p0": { hi: "रीयल-टाइम, व्यक्तिगत वित्तीय मार्गदर्शन के लिए Gemini API आधारित NLP चैटबॉट।" },
  "proj.1.p1": { hi: "डैशबोर्ड पर सीधे भविष्य के खर्च का पूर्वानुमान देने वाले LSTM और ARIMA time-series मॉडल।" },
  "proj.2.desc": { hi: "छात्रों को रीयल-टाइम, सहानुभूतिपूर्ण संवादी सहयोग देने वाला डिजिटल वेलनेस प्लेटफ़ॉर्म।" },
  "proj.2.p0": { hi: "तुरंत, सहानुभूतिपूर्ण सहयोग के लिए Gemini API से रीयल-टाइम sentiment analysis।" },
  "proj.2.p1": { hi: "जर्नल एंट्री और असेसमेंट की गोपनीयता के लिए privacy-first बैकएंड आर्किटेक्चर।" },
  "proj.details": { en: "view details →", hi: "विवरण देखें →" },
  "proj.coursework": { en: "Coursework & practice", hi: "कोर्सवर्क और अभ्यास" },
  "proj.allrepos": { en: "All repos →", hi: "सभी रिपॉज़ →" },

  // github section
  "gh.0": { en: "Public repositories", hi: "पब्लिक रिपॉज़िटरी" },
  "gh.1": { en: "Lines of code", hi: "कोड की पंक्तियाँ" },
  "gh.2": { en: "Commits", hi: "कमिट्स" },
  "gh.3": { en: "Languages", hi: "भाषाएँ" },
  "gh.4": { en: "Most-used language", hi: "सबसे अधिक प्रयुक्त भाषा" },
  "gh.5": { en: "Years on GitHub", hi: "GitHub पर वर्ष" },
  "gh.viewall": { en: "View all repositories", hi: "सभी रिपॉज़िटरी देखें" },
  "gh.heatmap": { en: "Commit activity · last 52 weeks", hi: "कमिट गतिविधि · पिछले 52 सप्ताह" },
  "gh.donut": { en: "Languages by repo", hi: "रिपो के अनुसार भाषाएँ" },

  // deploy simulator
  "sim.title": { en: "Deploy pipeline", hi: "डिप्लॉय पाइपलाइन" },
  "sim.desc": {
    en: "The keyless CI/CD flow I built at Straatix — press play to watch it run.",
    hi: "Straatix में बनाया keyless CI/CD फ़्लो — चलाकर देखें।",
  },
  "sim.deploy": { en: "Deploy", hi: "डिप्लॉय" },
  "sim.redeploy": { en: "Redeploy", hi: "पुनः डिप्लॉय" },
  "sim.deploying": { en: "Deploying…", hi: "डिप्लॉय हो रहा…" },

  // contact
  "contact.intro": {
    en: "Have a role, project, or idea in mind? My inbox is open — drop a message and I'll get back to you directly.",
    hi: "कोई रोल, प्रोजेक्ट या आइडिया है? मेरा इनबॉक्स खुला है — संदेश भेजें, मैं सीधे जवाब दूँगा।",
  },
  "contact.ph.name": { en: "Your name", hi: "आपका नाम" },
  "contact.ph.email": { en: "Your email", hi: "आपका ईमेल" },
  "contact.ph.subject": { en: "Subject", hi: "विषय" },
  "contact.ph.message": { en: "Your message", hi: "आपका संदेश" },
  "contact.send": { en: "Send message", hi: "संदेश भेजें" },
  "contact.sending": { en: "Sending…", hi: "भेजा जा रहा है…" },
  "contact.success": { en: "Thanks — your message is on its way!", hi: "धन्यवाद — आपका संदेश भेज दिया गया है!" },
  "card.title": { en: "Save my contact", hi: "मेरा संपर्क सहेजें" },
  "card.desc": {
    en: "A vCard for your phone, or scan the QR to open this site.",
    hi: "फ़ोन के लिए vCard, या यह साइट खोलने हेतु QR स्कैन करें।",
  },
  "card.show": { en: "Show QR", hi: "QR दिखाएँ" },
  "card.hide": { en: "Hide QR", hi: "QR छिपाएँ" },

  // footer
  "footer.rights": { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
};

export function translate(key: string, lang: Lang, fallback?: string): string {
  const entry = DICT[key];
  if (!entry) return fallback ?? key;
  if (lang === "hi") return entry.hi ?? entry.en ?? fallback ?? key;
  return entry.en ?? fallback ?? key;
}
