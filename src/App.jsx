// ============================================================
// index.jsx — InnovationAtlas
// Version complète corrigée
// © 2025 InnovationAtlas. Tous droits réservés.
// ============================================================

import { useState, useEffect } from "react";
import { Globe, Sparkles, ArrowRight, Check, Star, Zap, TrendingUp, Building2, ChevronDown, ChevronUp, Lock, FileText, Calculator, Bell, Mail, BookOpen, X, LogIn, UserPlus, FolderOpen } from "lucide-react";

const C = {
  violet: "#7C3AED", blue: "#3B82F6", green: "#10B981",
  orange: "#F97316", pink: "#EC4899", dark: "#1F2937",
  gray: "#6B7280", light: "#F3F4F6", white: "#FFFFFF",
};

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "https://izsniedxxnzmodyystjw.supabase.co";
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || "sb_publishable_UbmT9Wl9vX_ccm96EoKn1w_XLFil5FY";
const PAYDUNYA_KEY = process.env.REACT_APP_PAYDUNYA_KEY || "test_public_LrFZzo1e2VbcWC1FgKgMntqqIcF";

const supabaseClient = {
  auth: {
    signUp: async ({ email, password, options }) => {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_KEY },
        body: JSON.stringify({ email, password, data: options?.data })
      });
      return res.json();
    },
    signIn: async ({ email, password }) => {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_KEY },
        body: JSON.stringify({ email, password })
      });
      return res.json();
    },
    signOut: async (token) => {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${token}` }
      });
    }
  },
  from: (table) => ({
    insert: async (data, token) => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${token || SUPABASE_KEY}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(data)
      });
      return { ok: res.ok, status: res.status };
    },
    select: async (token) => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${token || SUPABASE_KEY}`
        }
      });
      return res.json();
    },
    delete: async (id, token) => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${token || SUPABASE_KEY}`
        }
      });
      return { ok: res.ok };
    }
  })
};

const T = {
  fr: {
    nav: { home: "Accueil", generator: "Idées IA", international: "International", structures: "Structures", simulator: "Simulateur", pricing: "Tarifs", projects: "Mes Projets", blog: "Blog", contact: "Contact" },
    hero: { badge: "Propulsé par Intelligence Artificielle", title: "De l'idée à la", highlight: "création mondiale", subtitle: "Votre entreprise internationale en 30 jours", desc: "Générez des idées d'entreprise futuristes et créez votre société à l'étranger.", cta1: "Démarrer gratuitement", cta2: "Voir les tarifs" },
    upgrade: "Upgrade", proActive: "Pro actif", login: "Connexion", signup: "S'inscrire", logout: "Déconnexion",
    generate: "Générer mes idées", generating: "Génération en cours...",
    sector: "Secteur", budget: "Budget", experience: "Expérience", market: "Marché",
    yourIdeas: "Vos Idées", strengths: "Points forts", challenges: "Défis", nextSteps: "Prochaines étapes",
    seeDetails: "Voir détails", hideDetails: "Masquer", createAbroad: "Créer à l'étranger",
    premiumContent: "Contenu Premium", unlockIdeas: "Débloquez dès 79€", seeOffers: "Voir les offres",
    chooseDestination: "Choisissez votre destination", compare: "Comparer", comparing: "Comparé",
    fullGuide: "Guide Complet", keyAdvantages: "Avantages", creationSteps: "Étapes", requiredDocs: "Documents",
    progress: "Progression", stepsCompleted: "étapes",
    pricingTitle: "Tarifs", pricingDesc: "Commencez gratuitement",
    securePayment: "Paiement Sécurisé", secureDesc: "Satisfait ou remboursé sous 7 jours.",
    myProjects: "Mes Projets", savedIdeas: "Idées sauvegardées", noProjects: "Aucun projet",
    noProjectsDesc: "Générez des idées et sauvegardez-les ici",
    saveIdea: "Sauvegarder", saved: "Sauvegardé",
    blogTitle: "Blog", blogDesc: "Guides pour entrepreneurs",
    contactTitle: "Contact", contactDesc: "Nous sommes là pour vous",
    contactName: "Votre nom", contactEmail: "Votre email", contactMessage: "Votre message",
    contactSend: "Envoyer", contactSent: "Message envoyé !",
    newsletter: "Newsletter", newsletterDesc: "Guides chaque semaine",
    newsletterPlaceholder: "Votre email", newsletterCta: "S'abonner",
    newsletterSuccess: "Inscription confirmée !",
    testimonials: "Témoignages", affiliateTitle: "Affiliation",
    affiliateDesc: "Gagnez 30% de commission", affiliateCta: "Rejoindre",
    notificationsTitle: "Notifications", noNotifications: "Aucune notification",
    exportPDF: "Exporter PDF", roiTitle: "Calculateur ROI", roiDesc: "Estimez la rentabilité",
    mapTitle: "Carte Interactive", mapDesc: "Explorez les destinations",
  },
  en: {
    nav: { home: "Home", generator: "AI Ideas", international: "International", structures: "Structures", simulator: "Simulator", pricing: "Pricing", projects: "My Projects", blog: "Blog", contact: "Contact" },
    hero: { badge: "Powered by Artificial Intelligence", title: "From idea to", highlight: "global creation", subtitle: "Your international company in 30 days", desc: "Generate futuristic AI-powered business ideas and create your company abroad.", cta1: "Start for free", cta2: "See pricing" },
    upgrade: "Upgrade", proActive: "Pro active", login: "Login", signup: "Sign up", logout: "Logout",
    generate: "Generate my ideas", generating: "Generating...",
    sector: "Sector", budget: "Budget", experience: "Experience", market: "Market",
    yourIdeas: "Your Ideas", strengths: "Strengths", challenges: "Challenges", nextSteps: "Next steps",
    seeDetails: "See details", hideDetails: "Hide", createAbroad: "Create abroad",
    premiumContent: "Premium Content", unlockIdeas: "Unlock from 79€", seeOffers: "See offers",
    chooseDestination: "Choose destination", compare: "Compare", comparing: "Compared",
    fullGuide: "Full Guide", keyAdvantages: "Advantages", creationSteps: "Steps", requiredDocs: "Documents",
    progress: "Progress", stepsCompleted: "steps",
    pricingTitle: "Pricing", pricingDesc: "Start for free",
    securePayment: "Secure Payment", secureDesc: "7-day money-back guarantee.",
    myProjects: "My Projects", savedIdeas: "Saved ideas", noProjects: "No projects",
    noProjectsDesc: "Generate ideas and save them here",
    saveIdea: "Save", saved: "Saved",
    blogTitle: "Blog", blogDesc: "Guides for entrepreneurs",
    contactTitle: "Contact", contactDesc: "We are here for you",
    contactName: "Your name", contactEmail: "Your email", contactMessage: "Your message",
    contactSend: "Send", contactSent: "Message sent!",
    newsletter: "Newsletter", newsletterDesc: "Weekly guides",
    newsletterPlaceholder: "Your email", newsletterCta: "Subscribe",
    newsletterSuccess: "Subscription confirmed!",
    testimonials: "Testimonials", affiliateTitle: "Affiliate",
    affiliateDesc: "Earn 30% commission", affiliateCta: "Join",
    notificationsTitle: "Notifications", noNotifications: "No notifications",
    exportPDF: "Export PDF", roiTitle: "ROI Calculator", roiDesc: "Estimate profitability",
    mapTitle: "Interactive Map", mapDesc: "Explore destinations",
  }
};

const countries = [
  { name: "Dubai (UAE)", flag: "🇦🇪", difficulty: "Medium", cost: "10k-50k€", time: "2-4 wks", tax: "0-9%", structures: ["FZ-LLC", "Mainland LLC"], advantages: ["0% personal income tax", "0% dividends", "Residence visa", "International hub"], steps: ["Choose free zone or mainland", "Reserve trade name", "Initial approval", "Travel to Dubai", "Sign MOA", "Get trade license", "Residence visa", "Open bank account"], docs: ["Valid passport", "Passport photo", "Proof of address", "CV", "Business plan"] },
  { name: "Estonia", flag: "🇪🇪", difficulty: "Easy", cost: "200-500€", time: "1-2 wks", tax: "0-20%", structures: ["OÜ", "AS"], advantages: ["100% online (e-Residency)", "EU member", "Low cost", "Fast setup"], steps: ["Create e-Residency", "Choose company name", "Prepare statutes", "Open virtual bank", "Register online", "Get tax number"], docs: ["ID card", "e-Residency card", "Email address", "Postal address"] },
  { name: "Delaware (USA)", flag: "🇺🇸", difficulty: "Easy", cost: "500-2k€", time: "1-2 wks", tax: "21%", structures: ["LLC", "C-Corp", "S-Corp"], advantages: ["Best for fundraising", "US investors access", "Flexible LLC", "Global reputation"], steps: ["Choose LLC or C-Corp", "Delaware registered agent", "File Certificate of Formation", "Get EIN", "Open US bank account", "Annual compliance"], docs: ["Passport", "US address (agent)", "Operating Agreement", "EIN SS-4 form"] },
  { name: "Singapore", flag: "🇸🇬", difficulty: "Medium", cost: "1k-5k€", time: "2-3 wks", tax: "17%", structures: ["Pte Ltd", "LLP"], advantages: ["Asia-Pacific hub", "Attractive taxation", "Political stability", "World-class infrastructure"], steps: ["Reserve company name", "Appoint directors", "Establish registered address", "File with ACRA", "Get incorporation certificate", "IRAS registration"], docs: ["Passport", "Proof of address", "Business plan", "Bank reference"] },
  { name: "UK", flag: "🇬🇧", difficulty: "Easy", cost: "100-500€", time: "1-2 wks", tax: "19-25%", structures: ["Ltd", "PLC", "LLP"], advantages: ["Ultra-fast setup", "English-speaking", "International reputation", "Low cost"], steps: ["Check name availability", "Appoint directors", "UK registered address", "Create articles", "Register at Companies House", "HMRC registration"], docs: ["Passport/ID", "UK address proof", "SIC code", "Memorandum of Association"] },
  { name: "Portugal", flag: "🇵🇹", difficulty: "Medium", cost: "1k-3k€", time: "2-3 wks", tax: "21%", structures: ["LDA", "SA"], advantages: ["NHR regime (10% IT)", "EU member", "High quality of life", "Entrepreneur visa"], steps: ["Get NIF", "Open PT bank account", "Draft statutes", "Deposit share capital", "Register company", "Official journal publication"], docs: ["Passport", "Portuguese NIF", "Proof of address", "Certificate of non-conviction"] },
  { name: "Hong Kong", flag: "🇭🇰", difficulty: "Medium", cost: "1k-4k€", time: "1-2 wks", tax: "16.5%", structures: ["Limited Company", "Branch"], advantages: ["Gateway to China", "Low taxation", "Global financial center", "British legal system"], steps: ["Reserve company name", "Appoint HK secretary", "File NNC1", "Get Business Registration Certificate", "Open bank account", "Annual profit declaration"], docs: ["Passport", "Proof of address", "NNC1 form", "Shareholder resolution"] },
  { name: "Ireland", flag: "🇮🇪", difficulty: "Medium", cost: "1k-3k€", time: "2-4 wks", tax: "12.5%", structures: ["Ltd", "DAC", "PLC"], advantages: ["Lowest IS in EU (12.5%)", "Tech hub", "English-speaking", "EU member"], steps: ["Check name availability", "Prepare constitution", "Appoint directors", "File with CRO", "Revenue registration", "Irish bank account"], docs: ["Passport", "Proof of address", "Company constitution", "A1 form"] },
];

const structures = [
  { country: "🇺🇸 USA", name: "LLC", full: "Limited Liability Company", capital: "$0", shareholders: "1+", tax: "Pass-through / 21%", best: "Startups, SaaS, solopreneurs" },
  { country: "🇺🇸 USA", name: "C-Corp", full: "Corporation", capital: "$0", shareholders: "1+", tax: "21%", best: "Fundraising, scale-up" },
  { country: "🇬🇧 UK", name: "Ltd", full: "Private Limited Company", capital: "£1", shareholders: "1+", tax: "19-25%", best: "SMEs, international trade" },
  { country: "🇫🇷 FR", name: "SAS", full: "Société par Actions Simplifiée", capital: "€1", shareholders: "1+", tax: "25%", best: "French startups" },
  { country: "🇦🇪 UAE", name: "FZ-LLC", full: "Free Zone LLC", capital: "€0", shareholders: "1+", tax: "0-9%", best: "E-commerce, SaaS, Crypto" },
  { country: "🇩🇪 DE", name: "GmbH", full: "Gesellschaft mit beschränkter Haftung", capital: "€25k", shareholders: "1+", tax: "30%", best: "Solid German business" },
  { country: "🇸🇬 SG", name: "Pte Ltd", full: "Private Limited Company", capital: "1 SGD", shareholders: "1-50", tax: "17%", best: "Asia-Pacific business" },
  { country: "🇪🇪 EE", name: "OÜ", full: "Osaühing", capital: "€0.01", shareholders: "1+", tax: "0-20%", best: "100% online digital business" },
];

const plans = [
  { name: "Gratuit", nameEn: "Free", price: "0", sub: "Pour decouvrir", subEn: "To discover", badge: null, features: ["1 idee gratuite", "Apercu 3 pays", "Structures basiques", "Acces limite"], featuresEn: ["1 free idea", "Preview 3 countries", "Basic structures", "Limited access"], cta: "Commencer", ctaEn: "Start", grad: "linear-gradient(135deg, #6B7280, #9CA3AF)", plan: "free" },
  { name: "Pro", nameEn: "Pro", price: "79", sub: "/mois", subEn: "/month", badge: "POPULAIRE", features: ["Idees illimitees 30 jours", "10 guides pays", "Comparateur avance", "Simulateur couts", "Calculateur fiscal", "Checklist", "Export PDF"], featuresEn: ["Unlimited ideas 30 days", "10 country guides", "Advanced comparator", "Cost simulator", "Tax calculator", "Checklist", "PDF export"], cta: "Choisir Pro", ctaEn: "Choose Pro", grad: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, plan: "pro" },
  { name: "Ultimate", nameEn: "Ultimate", price: "149", sub: "unique", subEn: "one-time", badge: "MEILLEUR", features: ["Tout illimite a VIE", "Tous les pays", "Templates business plan", "Support 24/7", "Mises a jour gratuites"], featuresEn: ["Everything unlimited", "All countries", "Business plan templates", "24/7 support", "Free updates"], cta: "Choisir Ultimate", ctaEn: "Choose Ultimate", grad: `linear-gradient(135deg, ${C.orange}, ${C.pink})`, plan: "ultimate" },
];

const sectors = ["🤖 IA & ML", "💻 SaaS", "🛒 E-commerce", "🏥 HealthTech", "🎓 EdTech", "🏦 FinTech", "🌱 GreenTech", "🎮 Gaming", "📱 Mobile App", "🏢 B2B Services"];
const budgets = ["< 5k€", "5k-25k€", "25k-100k€", "100k-500k€", "500k+"];
const experiences = ["Débutant", "Intermédiaire", "Expert"];
const markets = ["Local", "National", "Afrique", "Europe", "International", "Global"];
const taxRate = { "Dubai (UAE)": 0, "Estonia": 20, "Delaware (USA)": 21, "Singapore": 17, "UK": 19, "Portugal": 21, "Hong Kong": 16.5, "Ireland": 12.5 };

const blogPosts = [
  { emoji: "🇦🇪", title: "Créer une FZ-LLC à Dubaï", titleEn: "Create a FZ-LLC in Dubai", desc: "Guide complet pour Dubaï", descEn: "Complete Dubai guide", date: "15 Jan 2025", tag: "Dubai" },
  { emoji: "🤖", title: "5 idées IA pour 2025", titleEn: "5 AI ideas for 2025", desc: "Opportunités IA générative", descEn: "Generative AI opportunities", date: "10 Jan 2025", tag: "Innovation" },
  { emoji: "💰", title: "Fiscalité internationale", titleEn: "International taxation", desc: "Réduire votre imposition", descEn: "Reduce your taxation", date: "5 Jan 2025", tag: "Tax" },
  { emoji: "🇪🇪", title: "e-Residency Estonienne", titleEn: "Estonian e-Residency", desc: "Entreprise UE en ligne", descEn: "EU company online", date: "1 Jan 2025", tag: "Estonia" },
];

const testimonials = [
  { name: "Amadou K.", country: "🇸🇳 Sénégal", text: "J'ai créé ma LLC au Delaware en 2 semaines. Le guide est incroyable !", textEn: "I created my Delaware LLC in 2 weeks. The guide is incredible!", stars: 5 },
  { name: "Marie L.", country: "🇫🇷 France", text: "Le générateur d'idées IA m'a donné l'idée parfaite. Je lance mon SaaS !", textEn: "The AI idea generator gave me the perfect idea. Launching my SaaS!", stars: 5 },
  { name: "Ibrahim D.", country: "🇨🇮 Côte d'Ivoire", text: "Le simulateur fiscal m'a fait économiser 40 000€. Merci InnovationAtlas !", textEn: "The tax simulator saved me €40,000. Thank you InnovationAtlas!", stars: 5 },
];

export default function InnovationAtlas() {
  const [lang, setLang] = useState("fr");
  const t = T[lang];
  const [tab, setTab] = useState("home");
  const [sector, setSector] = useState("");
  const [budget, setBudget] = useState("");
  const [experience, setExperience] = useState("");
  const [market, setMarket] = useState("");
  const [generating, setGenerating] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [expandedIdea, setExpandedIdea] = useState(null);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [userPlan, setUserPlan] = useState("free");
  const [checklist, setChecklist] = useState({});
  const [compareList, setCompareList] = useState([]);
  const [simRevenue, setSimRevenue] = useState(50000);
  const [simCountry, setSimCountry] = useState("Dubai (UAE)");
  const [roiRevenue, setRoiRevenue] = useState(100000);
  const [roiCost, setRoiCost] = useState(20000);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [userToken, setUserToken] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(null);
  const [paymentError, setPaymentError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentForm, setPaymentForm] = useState({ name: "", email: "", phone: "" });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Bienvenue sur InnovationAtlas !", read: false },
    { id: 2, text: "Nouveau : Guide Dubai 2025 disponible", read: false },
    { id: 3, text: "Irlande : Taux IS 12.5%", read: false },
  ]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [showAffiliate, setShowAffiliate] = useState(false);

  const loadMsgs = [
    "Analyse de votre profil...",
    "Exploration des tendances mondiales...",
    "Generation d'idees innovantes...",
    "Finalisation des resultats..."
  ];

  const generateIdeas = async () => {
    if (!sector || !budget) return;
    setGenerating(true);
    setIdeas([]);
    for (let i = 0; i < loadMsgs.length; i++) {
      setLoadMsg(loadMsgs[i]);
      await new Promise(r => setTimeout(r, 900));
    }
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Generate 3 futuristic innovative business ideas for: sector "${sector}", budget "${budget}", experience "${experience || "not specified"}", market "${market || "international"}". Reply ONLY in raw JSON without backticks: {"ideas":[{"title":"string","pitch":"2 sentence string","potential":5,"model":"string","market":"string","investment":"string","timeline":"string","strengths":["x","x","x"],"challenges":["x","x"],"revenue":"string","stack":"string","nextSteps":["x","x","x"]}]}`
          }]
        })
      });
      const data = await res.json();
      const text = data.content[0].text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      setIdeas(parsed.ideas);
    } catch (e) {
      setIdeas([
        { title: "AI B2B SaaS Platform", pitch: "Intelligent automation platform for SMEs. Reduce 80% of repetitive tasks with generative AI.", potential: 5, model: "SaaS Subscription", market: "Europe & Africa SMEs", investment: "15k-30k€", timeline: "6-12 months", strengths: ["Recurring MRR revenue", "Scalable", "Under-digitized market"], challenges: ["Long B2B acquisition", "Competition from AI giants"], revenue: "99-499€/month subscription", stack: "React, Node.js, OpenAI API, Supabase", nextSteps: ["Interview 10 SMEs", "Build MVP in 30 days", "Test pricing with 5 clients"] },
        { title: "Francophone Africa Marketplace", pitch: "First B2B hub connecting experts and companies in Francophone Africa. Bridge the gap between local talent and global opportunities.", potential: 5, model: "Commission Marketplace", market: "Francophone Africa (200M+)", investment: "10k-25k€", timeline: "12-18 months", strengths: ["First mover", "200M+ people market", "Low direct competition"], challenges: ["Building both sides", "Local trust and payments"], revenue: "8-15% commission per transaction", stack: "Next.js, Wave/Stripe, Firebase, Mobile app", nextSteps: ["Choose specific niche", "Recruit 50 first experts", "Launch beta MVP"] },
        { title: "Nomad FinTech Savings App", pitch: "Savings and investment app for digital nomads and African diaspora. Next-generation financial inclusion.", potential: 4, model: "Freemium + Transactions", market: "Global African Diaspora", investment: "25k-50k€", timeline: "18-24 months", strengths: ["500B+ diaspora market", "High unmet demand", "Volume and recurring"], challenges: ["Complex banking regulations", "Bank partnerships needed"], revenue: "1-2% fees + 9.99€/month Premium", stack: "React Native, Node.js, Banking API, KYC SaaS", nextSteps: ["Regulatory study", "Find banking partner", "60-day prototype"] },
      ]);
    }
    setGenerating(false);
  };

  const handleAuth = async (type) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      if (type === "signup") {
        const data = await supabaseClient.auth.signUp({ email: authEmail, password: authPassword, options: { data: { name: authName } } });
        if (data.error) { setAuthError(data.error.message); return; }
        if (data.access_token) {
          setUserToken(data.access_token);
          await supabaseClient.from("profiles").insert({ id: data.user.id, name: authName, email: authEmail, plan: "free" }, data.access_token);
          setUser({ name: authName, email: authEmail, plan: "free", id: data.user.id });
          setShowAuth(null);
          setShowOnboarding(true);
        } else {
          setAuthError("Check your email to confirm your account!");
        }
      } else {
        const data = await supabaseClient.auth.signIn({ email: authEmail, password: authPassword });
        if (data.error) { setAuthError(data.error.message); return; }
        if (data.access_token) {
          setUserToken(data.access_token);
          setUser({ name: data.user?.user_metadata?.name || authEmail.split("@")[0], email: authEmail, plan: "free", id: data.user.id });
          setShowAuth(null);
          const savedData = await supabaseClient.from("saved_ideas").select(data.access_token);
          if (Array.isArray(savedData)) setSavedIdeas(savedData);
        } else {
          setAuthError("Invalid email or password");
        }
      }
    } catch (e) { setAuthError("Connection error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const saveIdea = async (idea) => {
    if (savedIdeas.find(s => s.title === idea.title)) return;
    const newIdea = { ...idea, id: Date.now() };
    setSavedIdeas(prev => [...prev, newIdea]);
    setNotifications(prev => [{ id: Date.now(), text: `Idea "${idea.title}" saved!`, read: false }, ...prev]);
    if (user && userToken) {
      try {
        await supabaseClient.from("saved_ideas").insert({ user_id: user.id, title: idea.title, pitch: idea.pitch, model: idea.model, market: idea.market, investment: idea.investment, timeline: idea.timeline }, userToken);
      } catch (e) {}
    }
  };

  const deleteIdea = async (idea, index) => {
    setSavedIdeas(prev => prev.filter((_, j) => j !== index));
    if (user && userToken && idea.id) {
      try { await supabaseClient.from("saved_ideas").delete(idea.id, userToken); } catch (e) {}
    }
  };

  const handleContact = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    try { await supabaseClient.from("contacts").insert({ name: contactForm.name, email: contactForm.email, message: contactForm.message }, userToken); } catch (e) {}
    setContactSent(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setContactSent(false), 5000);
  }; 
  const handleNewsletter = async () => {
    if (!newsletterEmail) return;
    try { await supabaseClient.from("newsletter").insert({ email: newsletterEmail }, userToken); } catch (e) {}
    setNewsletterSuccess(true);
    setNewsletterEmail("");
  };

  const handleLogout = async () => {
    if (userToken) await supabaseClient.auth.signOut(userToken);
    setUser(null);
    setUserToken(null);
    setSavedIdeas([]);
    setIdeas([]);
  };

  const handlePayment = async (plan) => {
    if (!paymentForm.name || !paymentForm.email) { setPaymentError("Please fill in your name and email!"); return; }
    setPaymentLoading(plan.plan);
    setPaymentError("");
    try {
      const amount = plan.plan === "pro" ? 79 * 655 : 149 * 655;
      const res = await fetch("https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", "PAYDUNYA-MASTER-KEY": PAYDUNYA_KEY, "PAYDUNYA-PUBLIC-KEY": PAYDUNYA_KEY, "PAYDUNYA-MODE": "test" },
        body: JSON.stringify({
          invoice: { items: { item_0: { name: `InnovationAtlas ${plan.name}`, quantity: 1, unit_price: amount, total_price: amount, description: `InnovationAtlas ${plan.name} Plan` } }, total_amount: amount, description: `InnovationAtlas ${plan.name}` },
          store: { name: "InnovationAtlas", tagline: "From idea to global creation", website_url: "https://innovationatlas.vercel.app" },
          actions: { cancel_url: "https://innovationatlas.vercel.app", return_url: "https://innovationatlas.vercel.app", callback_url: "https://innovationatlas.vercel.app" },
          customer: { name: paymentForm.name, email: paymentForm.email }
        })
      });
      const data = await res.json();
      if (data.response_code === "00" && data.invoice_url) {
        window.open(data.invoice_url, "_blank");
        setShowPaymentModal(false);
      } else {
        setPaymentError("Payment error. Please try again.");
      }
    } catch (e) {
      setPaymentError("Connection error. Please try again.");
    } finally {
      setPaymentLoading(null);
    }
      };
  
  const toggleCompare = (name) => {
    if (compareList.includes(name)) setCompareList(compareList.filter(n => n !== name));
    else if (compareList.length < 3) setCompareList([...compareList, name]);
  };

  const taxSaved = simRevenue - simRevenue * ((taxRate[simCountry] || 0) / 100);
  const roiProfit = roiRevenue - roiCost;
  const roiPercent = ((roiProfit / roiCost) * 100).toFixed(0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const exportPDF = () => window.print();

  const badge = (text, color) => (
    <span style={{ background: `${color}20`, color, padding: "4px 12px", borderRadius: 50, fontSize: 12, fontWeight: 700 }}>{text}</span>
  );

  const sectionHeader = (icon, title, subtitle, grad) => (
    <div style={{ background: grad, borderRadius: 20, padding: "40px 32px", marginBottom: 32, textAlign: "center" }}>
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <h2 style={{ fontSize: 30, fontWeight: 900, color: "white", margin: "0 0 8px" }}>{title}</h2>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, margin: 0 }}>{subtitle}</p>
    </div>
  );

  const onboardingSteps = [
    { icon: "💡", title: lang === "fr" ? "Générez vos idées" : "Generate ideas", desc: lang === "fr" ? "Utilisez notre IA pour trouver l'idée parfaite" : "Use our AI to find the perfect idea" },
    { icon: "🌍", title: lang === "fr" ? "Choisissez votre pays" : "Choose your country", desc: lang === "fr" ? "Comparez 15+ pays et trouvez la destination idéale" : "Compare 15+ countries and find the ideal destination" },
    { icon: "📋", title: lang === "fr" ? "Suivez le guide" : "Follow the guide", desc: lang === "fr" ? "Etapes détaillées, documents, couts et fiscalité" : "Detailed steps, documents, costs and taxation" },
    { icon: "🚀", title: lang === "fr" ? "Lancez votre business" : "Launch your business", desc: lang === "fr" ? "De l'idée à l'entreprise opérationnelle en 30 jours" : "From idea to operational company in 30 days" },
  ];

  const navItems = [
    { id: "home", label: lang === "fr" ? "🏠" : "🏠" },
    { id: "generator", label: "💡" },
    { id: "international", label: "🌍" },
    { id: "structures", label: "🏢" },
    { id: "simulator", label: "🧮" },
    { id: "projects", label: "📁" },
    { id: "blog", label: "📚" },
    { id: "contact", label: "✉️" },
    { id: "pricing", label: "💳" },
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#F8FAFC", color: C.dark }}>

      
      {/* ONBOARDING */}
      {showOnboarding && user && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 40, maxWidth: 440, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>{onboardingSteps[onboardingStep].icon}</div>
            <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 10 }}>{onboardingStep === 0 ? (lang === "fr" ? "Bienvenue sur InnovationAtlas!" : "Welcome to InnovationAtlas!") : onboardingSteps[onboardingStep].title}</h2>
            <p style={{ color: C.gray, marginBottom: 28, lineHeight: 1.7 }}>{onboardingStep === 0 ? (lang === "fr" ? "Votre guide pour créer votre entreprise internationale" : "Your guide to creating your international company") : onboardingSteps[onboardingStep].desc}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
              {onboardingSteps.map((_, i) => <div key={i} style={{ width: i === onboardingStep ? 20 : 8, height: 8, borderRadius: 4, background: i === onboardingStep ? C.violet : "#E5E7EB", transition: "all 0.3s" }} />)}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowOnboarding(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "1px solid #E5E7EB", background: "white", cursor: "pointer", fontWeight: 600, color: C.gray }}>
                {lang === "fr" ? "Passer" : "Skip"}
              </button>
              <button onClick={() => { if (onboardingStep < onboardingSteps.length - 1) setOnboardingStep(s => s + 1); else setShowOnboarding(false); }} style={{ flex: 2, padding: "11px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white" }}>
                {onboardingStep < onboardingSteps.length - 1 ? (lang === "fr" ? "Suivant" : "Next") : (lang === "fr" ? "Commencer" : "Start")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuth && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 36, maxWidth: 380, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontWeight: 900, fontSize: 22, margin: 0 }}>{showAuth === "login" ? t.login : t.signup}</h2>
              <button onClick={() => setShowAuth(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={22} /></button>
            </div>
            {showAuth === "signup" && <input value={authName} onChange={e => setAuthName(e.target.value)} placeholder={t.contactName} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #E5E7EB", marginBottom: 10, fontSize: 14, boxSizing: "border-box" }} />}
            <input value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="Email" type="email" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #E5E7EB", marginBottom: 10, fontSize: 14, boxSizing: "border-box" }} />
            <input value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder={lang === "fr" ? "Mot de passe" : "Password"} type="password" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #E5E7EB", marginBottom: 16, fontSize: 14, boxSizing: "border-box" }} />
            {authError && <div style={{ background: "#FEF2F2", color: "#DC2626", padding: "8px 12px", borderRadius: 8, marginBottom: 12, fontSize: 13, fontWeight: 600 }}>{authError}</div>}
            <button onClick={() => handleAuth(showAuth)} disabled={authLoading} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white", marginBottom: 10, opacity: authLoading ? 0.7 : 1 }}>
              {authLoading ? (lang === "fr" ? "Chargement..." : "Loading...") : showAuth === "login" ? t.login : t.signup}
            </button>
            <p style={{ textAlign: "center", color: C.gray, fontSize: 13 }}>
              {showAuth === "login" ? (lang === "fr" ? "Pas de compte?" : "No account?") : (lang === "fr" ? "Déjà un compte?" : "Already have an account?")}{" "}
              <span onClick={() => setShowAuth(showAuth === "login" ? "signup" : "login")} style={{ color: C.violet, cursor: "pointer", fontWeight: 700 }}>
                {showAuth === "login" ? t.signup : t.login}
              </span>
            </p>
          </div>
        </div>
      )}

            {/* PAYMENT MODAL */}
      {showPaymentModal && selectedPlan && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 36, maxWidth: 420, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontWeight: 900, fontSize: 20, margin: 0 }}>Payer {selectedPlan.price}</h2>
              <button onClick={() => setShowPaymentModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={22} /></button>
            </div>
            <div style={{ background: `${C.violet}10`, borderRadius: 14, padding: 16, marginBottom: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Plan {selectedPlan.name}</div>
              <div style={{ fontSize: 28, fontWeight: 900, background: selectedPlan.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{selectedPlan.price}</div>
              <div style={{ fontSize: 12, color: C.gray }}>{selectedPlan.plan === "pro" ? "51,745 FCFA" : "97,595 FCFA"}</div>
            </div>
            <input value={paymentForm.name} onChange={e => setPaymentForm({ ...paymentForm, name: e.target.value })} placeholder={lang === "fr" ? "Votre nom complet" : "Your full name"} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #E5E7EB", marginBottom: 10, fontSize: 14, boxSizing: "border-box" }} />
            <input value={paymentForm.email} onChange={e => setPaymentForm({ ...paymentForm, email: e.target.value })} placeholder="Email" type="email" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #E5E7EB", marginBottom: 10, fontSize: 14, boxSizing: "border-box" }} />
            <input value={paymentForm.phone} onChange={e => setPaymentForm({ ...paymentForm, phone: e.target.value })} placeholder={lang === "fr" ? "Numero Mobile Money (optionnel)" : "Mobile Money Number (optional)"} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #E5E7EB", marginBottom: 14, fontSize: 14, boxSizing: "border-box" }} />
            {paymentError && <div style={{ background: "#FEF2F2", color: "#DC2626", padding: "8px 12px", borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{paymentError}</div>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {["Carte", "MTN MoMo", "Moov Money", "Orange Money", "Wave"].map((m, i) => (
                <span key={i} style={{ background: C.light, padding: "5px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{m}</span>
              ))}
            </div>
            <button onClick={() => handlePayment(selectedPlan)} disabled={!!paymentLoading} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 16, background: selectedPlan.grad, color: "white", opacity: paymentLoading ? 0.7 : 1 }}>
              {paymentLoading ? (lang === "fr" ? "Initialisation..." : "Initializing...") : `Payer ${selectedPlan.price}`}
            </button>
            <p style={{ textAlign: "center", color: C.gray, fontSize: 11, marginTop: 10 }}>Paiement securise par PayDunya</p>
          </div>
        </div>
      )}

      {/* AFFILIATE MODAL */}
      {showAffiliate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 36, maxWidth: 440, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontWeight: 900, fontSize: 20, margin: 0 }}>Programme Affiliation</h2>
              <button onClick={() => setShowAffiliate(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={22} /></button>
            </div>
            <p style={{ color: C.gray, marginBottom: 20 }}>{t.affiliateDesc}</p>
            <div style={{ background: `${C.green}10`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: C.gray, marginBottom: 4 }}>Votre lien d'affiliation</div>
              <div style={{ fontWeight: 700, color: C.violet, fontSize: 13, wordBreak: "break-all" }}>https://innovationatlas.vercel.app?ref={user?.name?.toLowerCase() || "user"}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[{ v: "30%", l: "Commission" }, { v: "30j", l: "Cookie" }, { v: "∞", l: "Gains" }].map((s, i) => (
                <div key={i} style={{ background: C.light, borderRadius: 10, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.violet }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: C.gray }}>{s.l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowAffiliate(false)} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 700, background: `linear-gradient(135deg, ${C.orange}, ${C.pink})`, color: "white" }}>
              Copier mon lien
            </button>
          </div>
        </div>    
    )}

      {/* NAVBAR */}
      <nav style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe size={16} color="white" />
            </div>
            <span style={{ fontWeight: 900, fontSize: 15, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>InnovationAtlas</span>
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "center", flex: 1, justifyContent: "center", overflowX: "auto" }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => setTab(item.id)} style={{ padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 16, background: tab === item.id ? `linear-gradient(135deg, ${C.violet}, ${C.blue})` : "transparent", transition: "all 0.2s" }}>
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} style={{ padding: "5px 10px", borderRadius: 8, border: "1px solid #E5E7EB", background: "white", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <div style={{ position: "relative" }}>
              <button onClick={(e) => { e.stopPropagation(); setShowNotifs(!showNotifs); }} style={{ padding: "5px 8px", borderRadius: 8, border: "1px solid #E5E7EB", background: showNotifs ? `${C.violet}10` : "white", cursor: "pointer", position: "relative" }}>
                <Bell size={15} color={showNotifs ? C.violet : C.gray} />
                {unreadNotifs > 0 && <span style={{ position: "absolute", top: 1, right: 1, background: C.orange, color: "white", borderRadius: "50%", width: 12, height: 12, fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{unreadNotifs}</span>}
              </button>
              {showNotifs && (
                <div onClick={e => e.stopPropagation()} style={{ position: "absolute", right: 0, top: "120%", background: "white", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", border: "1px solid #E5E7EB", width: 280, zIndex: 500 }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{t.notificationsTitle}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setNotifications(n => n.map(x => ({ ...x, read: true })))} style={{ background: "none", border: "none", cursor: "pointer", color: C.violet, fontSize: 11, fontWeight: 600 }}>
                        {lang === "fr" ? "Tout lire" : "Read all"}
                      </button>
                      <button onClick={() => setShowNotifs(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={14} /></button>
                    </div>
                  </div>
                  {notifications.length === 0 ? (
                    <div style={{ padding: 20, textAlign: "center", color: C.gray, fontSize: 13 }}>{t.noNotifications}</div>
                  ) : notifications.slice(0, 5).map(n => (
                    <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))} style={{ padding: "11px 16px", borderBottom: "1px solid #F3F4F6", background: n.read ? "white" : `${C.violet}06`, cursor: "pointer" }}>
                      <div style={{ fontSize: 12, fontWeight: n.read ? 400 : 700, color: C.dark }}>{n.text}</div>
                    </div>
                  ))}
                  <div style={{ padding: "10px 16px", textAlign: "center" }}>
                    <button onClick={() => setNotifications([])} style={{ background: "none", border: "none", cursor: "pointer", color: C.gray, fontSize: 11, fontWeight: 600 }}>
                      {lang === "fr" ? "Effacer tout" : "Clear all"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 12 }}>{user.name[0].toUpperCase()}</div>
                <button onClick={handleLogout} style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "white", cursor: "pointer", fontSize: 10, color: C.gray }}>{t.logout}</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 3 }}>
                <button onClick={() => setShowAuth("login")} style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #E5E7EB", background: "white", cursor: "pointer", fontWeight: 600, fontSize: 11 }}>{t.login}</button>
                <button onClick={() => setShowAuth("signup")} style={{ padding: "5px 8px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 11, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white" }}>{t.signup}</button>
              </div>
            )}
            <button onClick={() => setUserPlan(userPlan === "free" ? "pro" : "free")} style={{ padding: "5px 8px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 11, background: `linear-gradient(135deg, ${C.orange}, ${C.pink})`, color: "white" }}>
              {userPlan === "free" ? t.upgrade : t.proActive}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>

        {/* HOME */}
        {tab === "home" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${C.violet} 0%, ${C.blue} 100%)`, borderRadius: "0 0 28px 28px", padding: "72px 20px", textAlign: "center", margin: "0 -16px 48px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 50, padding: "6px 16px", marginBottom: 20 }}>
                <Sparkles size={14} color="white" />
                <span style={{ color: "white", fontWeight: 600, fontSize: 13 }}>{t.hero.badge}</span>
              </div> 
               </h1>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", marginBottom: 10, fontWeight: 600 }}>{t.hero.subtitle}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>{t.hero.desc}</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setTab("generator")} style={{ padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 16, background: "white", color: C.violet, display: "flex", alignItems: "center", gap: 8 }}>
                  {t.hero.cta1} <ArrowRight size={16} />
                </button>
                <button onClick={() => setTab("pricing")} style={{ padding: "14px 32px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 16, background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.45)" }}>
                  {t.hero.cta2}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
              {[{ v: "15+", l: lang === "fr" ? "Pays couverts" : "Countries", e: "🌍" }, { v: "10+", l: lang === "fr" ? "Structures" : "Structures", e: "🏢" }, { v: "∞", l: "AI Ideas", e: "🤖" }, { v: "30d", l: lang === "fr" ? "Pour créer" : "To create", e: "⚡" }, { v: "0%", l: "Tax Dubai FZ", e: "💰" }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{s.e}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.v}</div>
                  <div style={{ color: C.gray, fontWeight: 500, fontSize: 11 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <h2 style={{ textAlign: "center", fontSize: 30, fontWeight: 900, marginBottom: 8 }}>{lang === "fr" ? "6 Modules Puissants" : "6 Powerful Modules"}</h2>
            <p style={{ textAlign: "center", color: C.gray, fontSize: 15, marginBottom: 36 }}>{lang === "fr" ? "Tout pour réussir à l'international" : "Everything to succeed internationally"}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginBottom: 48 }}>
              {[
                { icon: "✨", title: lang === "fr" ? "Générateur d'Idées IA" : "AI Idea Generator", desc: lang === "fr" ? "Idées futuristes selon votre profil" : "Futuristic ideas for your profile", tab: "generator", border: C.violet, badgeText: "PREMIUM" },
                { icon: "🌍", title: lang === "fr" ? "Création Internationale" : "International Creation", desc: lang === "fr" ? "Guide complet pour 15+ pays" : "Complete guide for 15+ countries", tab: "international", border: C.blue, badgeText: "PREMIUM" },
                { icon: "🏢", title: lang === "fr" ? "Structures Juridiques" : "Legal Structures", desc: "LLC, Ltd, GmbH, SAS...", tab: "structures", border: C.green, badgeText: "FREE" },
                { icon: "🧮", title: lang === "fr" ? "Simulateur Fiscal" : "Tax Simulator", desc: lang === "fr" ? "Calculez vos économies" : "Calculate your savings", tab: "simulator", border: C.orange, badgeText: "FREE" },
                { icon: "📁", title: lang === "fr" ? "Mes Projets" : "My Projects", desc: lang === "fr" ? "Sauvegardez vos idées" : "Save your ideas", tab: "projects", border: C.pink, badgeText: "FREE" },
                { icon: "📚", title: "Blog", desc: lang === "fr" ? "Guides entrepreneuriat" : "Entrepreneurship guides", tab: "blog", border: C.violet, badgeText: "FREE" },
              ].map((m, i) => (
                <div key={i} onClick={() => setTab(m.tab)} style={{ background: `${m.border}10`, borderRadius: 16, padding: 22, border: `1px solid ${m.border}20`, cursor: "pointer", position: "relative" }}>
                  <div style={{ position: "absolute", top: 12, right: 12 }}>{badge(m.badgeText, m.badgeText === "FREE" ? C.green : C.violet)}</div>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{m.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{m.title}</h3>
                  <p style={{ color: C.gray, fontSize: 13, lineHeight: 1.5, margin: "0 0 14px" }}>{m.desc}</p>
                  <span style={{ color: m.border, fontWeight: 700, fontSize: 13 }}>{lang === "fr" ? "Accéder" : "Access"} →</span>
                </div>
      
  ))}
            </div>

            <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 900, marginBottom: 28 }}>{t.testimonials}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16, marginBottom: 48 }}>
              {testimonials.map((test, i) => (
                <div key={i} style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB" }}>
                  <div style={{ color: C.orange, fontSize: 18, marginBottom: 10 }}>{"⭐".repeat(test.stars)}</div>
                  <p style={{ color: C.dark, lineHeight: 1.7, fontSize: 13, marginBottom: 14, fontStyle: "italic" }}>"{lang === "fr" ? test.text : test.textEn}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 13 }}>{test.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{test.name}</div>
                      <div style={{ fontSize: 11, color: C.gray }}>{test.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.pink})`, borderRadius: 20, padding: "32px 28px", marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h3 style={{ color: "white", fontWeight: 900, fontSize: 20, margin: "0 0 6px" }}>🎁 {t.affiliateTitle}</h3>
                <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: 14 }}>{t.affiliateDesc}</p>
              </div>
              <button onClick={() => { if (user) setShowAffiliate(true); else setShowAuth("signup"); }} style={{ padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: "white", color: C.orange }}>
                {t.affiliateCta}
              </button>
            </div>

            <div style={{ background: `${C.violet}08`, borderRadius: 18, padding: 32, marginBottom: 48, textAlign: "center", border: `1px solid ${C.violet}15` }}>
              <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 6 }}>{t.newsletter}</h3>
              <p style={{ color: C.gray, marginBottom: 18, fontSize: 14 }}>{t.newsletterDesc}</p>
              {newsletterSuccess ? (
                <div style={{ color: C.green, fontWeight: 700 }}>{t.newsletterSuccess}</div>
              ) : (
                <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto", flexWrap: "wrap" }}>
                  <input value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder={t.newsletterPlaceholder} type="email" style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, minWidth: 160 }} />
                  <button onClick={handleNewsletter} style={{ padding: "10px 18px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white", fontSize: 13 }}>
                    {t.newsletterCta} 
                    </button>
                </div>
              )}
            </div>

            <div style={{ background: `linear-gradient(135deg, ${C.dark}, #374151)`, borderRadius: 20, padding: "40px 24px", marginBottom: 48 }}>
              <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 900, color: "white", marginBottom: 28 }}>15+ {lang === "fr" ? "Pays Couverts" : "Countries"}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {countries.map((c, i) => (
                  <div key={i} onClick={() => { setSelectedCountry(c); setTab("international"); }} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 18 }}>{c.flag}</span>
                    <div>
                      <div style={{ color: "white", fontWeight: 700, fontSize: 11 }}>{c.name}</div>
                      <div style={{ color: C.green, fontSize: 10, fontWeight: 600 }}>IS: {c.tax}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GENERATOR */}
        {tab === "generator" && (
          <div style={{ paddingTop: 32 }}>
            {sectionHeader(<Sparkles size={36} color="white" />, lang === "fr" ? "Générateur d'Idées IA" : "AI Idea Generator", lang === "fr" ? "Idées futuristes personnalisées pour vous" : "Futuristic ideas personalized for you", `linear-gradient(135deg, ${C.violet}, ${C.blue})`)}
            <div style={{ background: "white", borderRadius: 18, padding: 28, marginBottom: 24, border: "1px solid #E5E7EB" }}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 10, fontSize: 14 }}>{t.sector} *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {sectors.map(s => <button key={s} onClick={() => setSector(s)} style={{ padding: "7px 12px", borderRadius: 8, border: `2px solid ${sector === s ? C.violet : "#E5E7EB"}`, cursor: "pointer", fontWeight: 600, fontSize: 12, background: sector === s ? `${C.violet}12` : "white", color: sector === s ? C.violet : C.dark }}>{s}</button>)}
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 10, fontSize: 14 }}>{t.budget} *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {budgets.map(b => <button key={b} onClick={() => setBudget(b)} style={{ padding: "7px 12px", borderRadius: 8, border: `2px solid ${budget === b ? C.blue : "#E5E7EB"}`, cursor: "pointer", fontWeight: 600, fontSize: 12, background: budget === b ? `${C.blue}12` : "white", color: budget === b ? C.blue : C.dark }}>{b}</button>)}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>{t.experience}</label>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {experiences.map(e => <button key={e} onClick={() => setExperience(e)} style={{ padding: "7px 10px", borderRadius: 8, border: `2px solid ${experience === e ? C.green : "#E5E7EB"}`, cursor: "pointer", fontWeight: 600, fontSize: 12, background: experience === e ? `${C.green}12` : "white", color: experience === e ? C.green : C.dark }}>{e}</button>)}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>{t.market}</label>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {markets.map(m => <button key={m} onClick={() => setMarket(m)} style={{ padding: "7px 10px", borderRadius: 8, border: `2px solid ${market === m ? C.orange : "#E5E7EB"}`, cursor: "pointer", fontWeight: 600, fontSize: 12, background: market === m ? `${C.orange}12` : "white", color: market === m ? C.orange : C.dark }}>{m}</button>)}
                  </div>
                </div>
              </div>
              <button onClick={generateIdeas} disabled={!sector || !budget || generating} style={{ width: "100%", padding: "15px", borderRadius: 12, border: "none", cursor: sector && budget ? "pointer" : "not-allowed", fontWeight: 800, fontSize: 16, background: sector && budget ? `linear-gradient(135deg, ${C.violet}, ${C.blue})` : "#E5E7EB", color: sector && budget ? "white" : C.gray, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                {generating ? <><div style={{ width: 16, height: 16, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />{loadMsg}</> : <><Sparkles size={18} />{t.generate}</>}
              </button>
            </div>

            {ideas.length > 0 && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>⭐ {t.yourIdeas}</h3>
                  <button onClick={exportPDF} style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${C.violet}30`, background: "white", cursor: "pointer", fontWeight: 600, fontSize: 12, color: C.violet }}>{t.exportPDF}</button>
                </div>
                {ideas.map((idea, i) => (
                  <div key={i} style={{ background: "white", borderRadius: 18, padding: 24, marginBottom: 14, border: `1px solid ${C.violet}15`, position: "relative", overflow: "hidden" }}>
                    {i > 0 && userPlan === "free" && (
                      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.88)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 18 }}>
                        <Lock size={44} color={C.violet} />
                        <h4 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>{t.premiumContent}</h4>
                        <p style={{ color: C.gray, margin: 0, fontSize: 13 }}>{t.unlockIdeas}</p>
                        <button onClick={() => setTab("pricing")} style={{ padding: "9px 24px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white", fontSize: 13 }}>{t.seeOffers}</button>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                      <h4 style={{ fontSize: 18, fontWeight: 900, margin: 0, flex: 1 }}>{idea.title}</h4>
                      <div style={{ display: "flex", gap: 5 }}>
                        {badge(idea.model, C.blue)}
                        {badge("⭐".repeat(idea.potential), C.orange)}
                      </div>
                    </div>
                    <p style={{ color: C.gray, lineHeight: 1.7, marginBottom: 14, fontSize: 13 }}>{idea.pitch}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginBottom: 14 }}>
                      {[{ l: lang === "fr" ? "Marché" : "Market", v: idea.market, e: "🌍" }, { l: lang === "fr" ? "Investissement" : "Investment", v: idea.investment, e: "💰" }, { l: lang === "fr" ? "Rentabilité" : "ROI", v: idea.timeline, e: "⏱️" }].map((info, j) => (
                        <div key={j} style={{ background: C.light, borderRadius: 8, padding: "9px 11px" }}>
                          <div style={{ fontSize: 14, marginBottom: 2 }}>{info.e}</div>
                          <div style={{ fontSize: 9, color: C.gray, fontWeight: 600 }}>{info.l}</div>
                          <div style={{ fontSize: 11, fontWeight: 700 }}>{info.v}</div>
                        </div> 
                    ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button onClick={() => setExpandedIdea(expandedIdea === i ? null : i)} style={{ background: "none", border: `1px solid ${C.violet}25`, borderRadius: 8, padding: "7px 13px", cursor: "pointer", fontWeight: 600, fontSize: 12, color: C.violet, display: "flex", alignItems: "center", gap: 5 }}>
                        {expandedIdea === i ? <><ChevronUp size={13} />{t.hideDetails}</> : <><ChevronDown size={13} />{t.seeDetails}</>}
                      </button>
                      <button onClick={() => saveIdea(idea)} style={{ background: savedIdeas.find(s => s.title === idea.title) ? `${C.green}15` : "none", border: `1px solid ${C.green}25`, borderRadius: 8, padding: "7px 13px", cursor: "pointer", fontWeight: 600, fontSize: 12, color: C.green }}>
                        {savedIdeas.find(s => s.title === idea.title) ? t.saved : t.saveIdea}
                      </button>
                    </div>
                    {expandedIdea === i && (
                      <div style={{ marginTop: 18, borderTop: "1px solid #E5E7EB", paddingTop: 18 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                          <div style={{ background: `${C.green}08`, borderRadius: 10, padding: 14 }}>
                            <h5 style={{ fontWeight: 800, color: C.green, marginBottom: 8, fontSize: 13 }}>{t.strengths}</h5>
                            {idea.strengths?.map((s, j) => <div key={j} style={{ display: "flex", gap: 5, marginBottom: 5, fontSize: 12 }}><Check size={12} color={C.green} />{s}</div>)}
                          </div>
                          <div style={{ background: `${C.orange}08`, borderRadius: 10, padding: 14 }}>
                            <h5 style={{ fontWeight: 800, color: C.orange, marginBottom: 8, fontSize: 13 }}>{t.challenges}</h5>
                            {idea.challenges?.map((c, j) => <div key={j} style={{ display: "flex", gap: 5, marginBottom: 5, fontSize: 12 }}><Zap size={12} color={C.orange} />{c}</div>)}
                          </div>
                        </div>
                        {idea.stack && <div style={{ background: `${C.violet}08`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
                          <h5 style={{ fontWeight: 800, marginBottom: 5, fontSize: 12 }}>💻 Stack</h5>
                          <p style={{ fontSize: 12, color: C.gray, margin: 0 }}>{idea.stack}</p>
                        </div>}
                        <h5 style={{ fontWeight: 800, marginBottom: 8, fontSize: 13 }}>{t.nextSteps}</h5>
                        {idea.nextSteps?.map((step, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7, background: C.light, borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
                            <span style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 10, flexShrink: 0 }}>{j + 1}</span>
                            {step}
                          </div>
                        ))}
                        <button onClick={() => setTab("international")} style={{ width: "100%", marginTop: 14, padding: "11px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, background: `linear-gradient(135deg, ${C.orange}, ${C.pink})`, color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13 }}>
                          <Globe size={15} />{t.createAbroad}
                        </button>
                      </div>
                    )} 
                    </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* INTERNATIONAL */}
        {tab === "international" && (
          <div style={{ paddingTop: 32 }}>
            {sectionHeader(<Globe size={36} color="white" />, lang === "fr" ? "Création Internationale" : "International Creation", lang === "fr" ? "15+ pays avec guides complets" : "15+ countries with complete guides", `linear-gradient(135deg, ${C.blue}, ${C.green})`)}

            <div style={{ background: "white", borderRadius: 18, padding: 24, marginBottom: 24, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 14 }}>🗺️ {t.mapTitle}</h3>
              <div style={{ background: `${C.blue}06`, borderRadius: 14, padding: 16, border: `1px solid ${C.blue}15`, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {countries.map((c, i) => (
                  <button key={i} onClick={() => setSelectedCountry(c)} style={{ background: selectedCountry?.name === c.name ? `linear-gradient(135deg, ${C.violet}, ${C.blue})` : "white", border: `2px solid ${selectedCountry?.name === c.name ? "transparent" : "#E5E7EB"}`, borderRadius: 10, padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 18 }}>{c.flag}</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: selectedCountry?.name === c.name ? "white" : C.dark }}>{c.name}</div>
                      <div style={{ fontSize: 9, color: selectedCountry?.name === c.name ? "rgba(255,255,255,0.8)" : C.green, fontWeight: 600 }}>IS: {c.tax}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{t.chooseDestination}</h3>
                {compareList.length >= 2 && <div style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white", padding: "6px 14px", borderRadius: 8, fontWeight: 700, fontSize: 12 }}>{compareList.length} selected</div>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                {countries.map((c, i) => (
                  <div key={i} style={{ background: selectedCountry?.name === c.name ? `linear-gradient(135deg, ${C.violet}, ${C.blue})` : "white", borderRadius: 14, padding: 18, cursor: "pointer", border: `2px solid ${selectedCountry?.name === c.name ? "transparent" : compareList.includes(c.name) ? C.orange : "#E5E7EB"}`, transition: "all 0.2s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
                      <span style={{ fontSize: 28 }}>{c.flag}</span>
                      <button onClick={e => { e.stopPropagation(); toggleCompare(c.name); }} style={{ background: compareList.includes(c.name) ? C.orange : "rgba(0,0,0,0.05)", border: "none", borderRadius: 6, padding: "3px 7px", cursor: "pointer", fontSize: 9, fontWeight: 700, color: compareList.includes(c.name) ? "white" : C.gray }}>
                        {compareList.includes(c.name) ? t.comparing : t.compare}
                      </button>
                    </div>
                    <div onClick={() => setSelectedCountry(selectedCountry?.name === c.name ? null : c)}>
                      <h4 style={{ fontSize: 12, fontWeight: 800, margin: "0 0 7px", color: selectedCountry?.name === c.name ? "white" : C.dark }}>{c.name}</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                        {[{ l: "Cost", v: c.cost }, { l: "Time", v: c.time }, { l: "IS", v: c.tax }, { l: "Level", v: c.difficulty }].map((inf, j) => (
                          <div key={j}>
                            <div style={{ fontSize: 8, color: selectedCountry?.name === c.name ? "rgba(255,255,255,0.6)" : C.gray, fontWeight: 600 }}>{inf.l}</div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: selectedCountry?.name === c.name ? "white" : C.dark }}>{inf.v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {compareList.length >= 2 && (
              <div style={{ background: "white", borderRadius: 18, padding: 24, marginBottom: 20, border: `2px solid ${C.orange}25`, overflowX: "auto" }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>{t.comparisonTitle || "Comparison"}</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 350 }}>
                  <thead>
                    <tr style={{ background: C.light }}>
                      <th style={{ padding: "9px 12px", textAlign: "left", fontWeight: 700 }}>Criteria</th>
                      {compareList.map(name => {
                        const country = countries.find(c => c.name === name);
                        return <th key={name} style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700 }}>{country?.flag} {name}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {["difficulty", "cost", "time", "tax"].map((key, i) => (
                      <tr key={key} style={{ borderBottom: "1px solid #F3F4F6" }}>
                        <td style={{ padding: "9px 12px", fontWeight: 700 }}>{["Difficulty", "Cost", "Time", "IS"][i]}</td>
                        {compareList.map(name => {
                          const country = countries.find(c => c.name === name);
                          return <td key={name} style={{ padding: "9px 12px", textAlign: "center", fontWeight: 600, color: C.violet }}>{country?.[key]}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={() => setCompareList([])} style={{ marginTop: 10, padding: "5px 12px", borderRadius: 7, border: `1px solid ${C.gray}25`, background: "none", cursor: "pointer", color: C.gray, fontSize: 11 }}>
                  {t.clearComparison || "Clear"}
                </button>
              </div>
            )}           
            

        {selectedCountry && (
              <div style={{ background: "white", borderRadius: 18, padding: 28, border: `2px solid ${C.violet}15`, marginBottom: 28 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 5 }}>{selectedCountry.flag} {selectedCountry.name}</h3>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 18 }}>
                  {selectedCountry.structures.map((s, i) => badge(s, C.blue))}
                </div>
                {userPlan === "free" ? (
                  <div style={{ textAlign: "center", padding: "44px 16px", background: `${C.violet}04`, borderRadius: 14 }}>
                    <Lock size={48} color={C.violet} style={{ marginBottom: 12 }} />
                    <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{t.premiumContent}</h4>
                    <p style={{ color: C.gray, marginBottom: 20, fontSize: 13 }}>{lang === "fr" ? "Accédez aux étapes, documents, couts et fiscalité" : "Access steps, documents, costs and taxation"}</p>
                    <button onClick={() => setTab("pricing")} style={{ padding: "12px 32px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white" }}>{t.seeOffers}</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 20 }}>
                      {[{ l: lang === "fr" ? "Difficulté" : "Difficulty", v: selectedCountry.difficulty, e: "⚡" }, { l: "Cost", v: selectedCountry.cost, e: "💰" }, { l: "Time", v: selectedCountry.time, e: "⏱️" }, { l: "IS", v: selectedCountry.tax, e: "🧾" }].map((info, i) => (
                        <div key={i} style={{ background: C.light, borderRadius: 10, padding: 14, textAlign: "center" }}>
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{info.e}</div>
                          <div style={{ fontSize: 10, color: C.gray, fontWeight: 600, marginBottom: 2 }}>{info.l}</div>
                          <div style={{ fontSize: 15, fontWeight: 900, color: C.violet }}>{info.v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: `${C.green}08`, borderRadius: 12, padding: 18, marginBottom: 18 }}>
                      <h4 style={{ fontWeight: 800, color: C.green, marginBottom: 10, fontSize: 14 }}>{t.keyAdvantages}</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 7 }}>
                        {selectedCountry.advantages.map((a, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "white", borderRadius: 7, padding: "7px 10px", fontSize: 12 }}><Check size={12} color={C.green} />{a}</div>)}
                      </div>
                    </div>
                    <h4 style={{ fontWeight: 800, marginBottom: 10, fontSize: 14 }}>{t.creationSteps}</h4>
                    {selectedCountry.steps.map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7, background: C.light, borderRadius: 8, padding: "9px 12px" }}>
                        <span style={{ background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>{step}</span>
                        <button onClick={() => setChecklist(prev => ({ ...prev, [`${selectedCountry.name}-${i}`]: !prev[`${selectedCountry.name}-${i}`] }))} style={{ background: checklist[`${selectedCountry.name}-${i}`] ? C.green : "white", border: `2px solid ${checklist[`${selectedCountry.name}-${i}`] ? C.green : "#E5E7EB"}`, borderRadius: 5, width: 20, height: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {checklist[`${selectedCountry.name}-${i}`] && <Check size={11} color="white" />}
                        </button>
                      </div>
                    ))}
                    <div style={{ background: `${C.violet}10`, borderRadius: 8, padding: "9px 12px", textAlign: "center", fontWeight: 700, color: C.violet, fontSize: 12, marginTop: 4 }}>
                      {t.progress}: {selectedCountry.steps.filter((_, i) => checklist[`${selectedCountry.name}-${i}`]).length}/{selectedCountry.steps.length} {t.stepsCompleted}
                    </div>
                    <div style={{ background: `${C.blue}08`, borderRadius: 12, padding: 18, marginTop: 16 }}>
                      <h4 style={{ fontWeight: 800, color: C.blue, marginBottom: 10, fontSize: 14 }}>{t.requiredDocs}</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 7 }}>
                        {selectedCountry.docs.map((d, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "white", borderRadius: 7, padding: "7px 10px", fontSize: 12 }}><FileText size={12} color={C.blue} />{d}</div>)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>   
          )}
{/* STRUCTURES */}
        {tab === "structures" && (
          <div style={{ paddingTop: 32 }}>
            {sectionHeader(<Building2 size={36} color="white" />, lang === "fr" ? "Structures Juridiques" : "Legal Structures", lang === "fr" ? "Comparatif complet" : "Complete comparison", `linear-gradient(135deg, ${C.green}, ${C.blue})`)}
            <div style={{ background: "white", borderRadius: 18, padding: 24, border: "1px solid #E5E7EB", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 550 }}>
                <thead>
                  <tr style={{ background: `${C.violet}08` }}>
                    {["Country", "Structure", "Full Name", "Capital", "Shareholders", "Tax", "Best for"].map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, borderBottom: `2px solid ${C.violet}15`, fontSize: 11 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {structures.map((s, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F3F4F6", background: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                      <td style={{ padding: "9px 12px", fontWeight: 700, fontSize: 11 }}>{s.country}</td>
                      <td style={{ padding: "9px 12px" }}>{badge(s.name, C.violet)}</td>
                      <td style={{ padding: "9px 12px", color: C.gray, fontSize: 11 }}>{s.full}</td>
                      <td style={{ padding: "9px 12px", fontWeight: 600, fontSize: 11 }}>{s.capital}</td>
                      <td style={{ padding: "9px 12px", fontSize: 11 }}>{s.shareholders}</td>
                      <td style={{ padding: "9px 12px" }}>{badge(s.tax, C.green)}</td>
                      <td style={{ padding: "9px 12px", color: C.gray, fontSize: 11 }}>{s.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SIMULATOR */}
        {tab === "simulator" && (
          <div style={{ paddingTop: 32 }}>
            {sectionHeader(<Calculator size={36} color="white" />, lang === "fr" ? "Simulateur Fiscal" : "Tax Simulator", lang === "fr" ? "Calculez vos impots et economies" : "Calculate your taxes and savings", `linear-gradient(135deg, ${C.orange}, ${C.pink})`)}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "white", borderRadius: 18, padding: 24, border: "1px solid #E5E7EB" }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 18 }}>{lang === "fr" ? "Parametres" : "Parameters"}</h3>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{lang === "fr" ? "Revenus annuels" : "Annual revenue"}</label>
                <input type="range" min={10000} max={500000} step={5000} value={simRevenue} onChange={e => setSimRevenue(+e.target.value)} style={{ width: "100%", accentColor: C.violet, marginBottom: 4 }} />
                <div style={{ fontSize: 22, fontWeight: 900, color: C.violet, marginBottom: 18 }}>{simRevenue.toLocaleString()}€</div>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Country</label>
                {Object.keys(taxRate).map(name => (
                  <button key={name} onClick={() => setSimCountry(name)} style={{ display: "block", width: "100%", padding: "7px 12px", marginBottom: 5, borderRadius: 8, border: `2px solid ${simCountry === name ? C.violet : "#E5E7EB"}`, cursor: "pointer", fontWeight: 600, fontSize: 11, background: simCountry === name ? `${C.violet}10` : "white", color: simCountry === name ? C.violet : C.dark, textAlign: "left" }}>
                    {countries.find(c => c.name === name)?.flag} {name} — {taxRate[name]}%
                  </button>
           ))}
              </div>
              <div style={{ background: "white", borderRadius: 18, padding: 24, border: "1px solid #E5E7EB" }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 18 }}>{lang === "fr" ? "Resultats" : "Results"}</h3>
                <div style={{ background: `${C.violet}10`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: C.gray, marginBottom: 2 }}>{lang === "fr" ? "Revenus" : "Revenue"}</div>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>{simRevenue.toLocaleString()}€</div>
                </div>
                <div style={{ background: `${C.orange}10`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: C.gray, marginBottom: 2 }}>Tax ({taxRate[simCountry]}%)</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: C.orange }}>{(simRevenue * taxRate[simCountry] / 100).toLocaleString()}€</div>
                </div>
                <div style={{ background: `${C.green}12`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: C.gray, marginBottom: 2 }}>{lang === "fr" ? "Net apres impots" : "Net after tax"}</div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: C.green }}>{taxSaved.toLocaleString()}€</div>
                </div>
                {Object.entries(taxRate).map(([name, rate]) => (
                  <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, padding: "5px 9px", background: name === simCountry ? `${C.violet}10` : C.light, borderRadius: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{countries.find(c => c.name === name)?.flag} {name}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: rate === 0 ? C.green : rate < 15 ? C.blue : C.orange }}>-{(simRevenue * rate / 100).toLocaleString()}€</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 18, padding: 24, border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>📈 {t.roiTitle}</h3>
              <p style={{ color: C.gray, fontSize: 13, marginBottom: 18 }}>{t.roiDesc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: 12 }}>{lang === "fr" ? "Revenus projetes/an" : "Projected revenue/yr"}</label>
                  <input type="range" min={10000} max={1000000} step={10000} value={roiRevenue} onChange={e => setRoiRevenue(+e.target.value)} style={{ width: "100%", accentColor: C.violet }} />
                  <div style={{ fontSize: 18, fontWeight: 900, color: C.violet }}>{roiRevenue.toLocaleString()}€</div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: 12 }}>{lang === "fr" ? "Couts totaux/an" : "Total costs/yr"}</label>
                  <input type="range" min={5000} max={500000} step={5000} value={roiCost} onChange={e => setRoiCost(+e.target.value)} style={{ width: "100%", accentColor: C.orange }} />
                  <div style={{ fontSize: 18, fontWeight: 900, color: C.orange }}>{roiCost.toLocaleString()}€</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[{ l: lang === "fr" ? "Benefice" : "Profit", v: `${roiProfit.toLocaleString()}€`, c: roiProfit > 0 ? C.green : C.orange }, { l: "ROI", v: `${roiPercent}%`, c: C.violet }, { l: lang === "fr" ? "Statut" : "Status", v: roiProfit > 0 ? "Profitable" : "Deficit", c: roiProfit > 0 ? C.green : C.orange }].map((s, i) => (
                  <div key={i} style={{ background: `${s.c}10`, borderRadius: 12, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: C.gray, marginBottom: 3 }}>{s.l}</div>
                    <div style={{ fontSize: 17, fontWeight: 900, color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} 

        {/* PROJECTS */}
        {tab === "projects" && (
          <div style={{ paddingTop: 32 }}>
            {sectionHeader(<FolderOpen size={36} color="white" />, t.myProjects, t.savedIdeas, `linear-gradient(135deg, ${C.pink}, ${C.violet})`)}
            {savedIdeas.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 16px", background: "white", borderRadius: 18, border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>📁</div>
                <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 7 }}>{t.noProjects}</h3>
                <p style={{ color: C.gray, marginBottom: 20, fontSize: 14 }}>{t.noProjectsDesc}</p>
                <button onClick={() => setTab("generator")} style={{ padding: "11px 24px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white", fontSize: 14 }}>
                  {lang === "fr" ? "Generer des idees" : "Generate ideas"} →
                </button>
              </div>
            ) : (
              <div>
                {savedIdeas.map((idea, i) => (
                  <div key={i} style={{ background: "white", borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.violet}15` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 7 }}>
                      <div>
                        <h4 style={{ fontWeight: 900, fontSize: 16, margin: "0 0 5px" }}>{idea.title}</h4>
                        <p style={{ color: C.gray, fontSize: 12, margin: 0 }}>{idea.pitch}</p>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {badge(idea.model, C.blue)}
                        <button onClick={() => deleteIdea(idea, i)} style={{ background: "none", border: `1px solid ${C.orange}25`, borderRadius: 7, padding: "3px 8px", cursor: "pointer", color: C.orange, fontSize: 11, fontWeight: 600 }}>
                          {lang === "fr" ? "Supprimer" : "Delete"}
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 11, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: C.gray }}>💰 {idea.investment}</span>
                      <span style={{ fontSize: 11, color: C.gray }}>⏱️ {idea.timeline}</span>
                      <span style={{ fontSize: 11, color: C.gray }}>🌍 {idea.market}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
{/* BLOG */}
        {tab === "blog" && (
          <div style={{ paddingTop: 32 }}>
            {sectionHeader(<BookOpen size={36} color="white" />, t.blogTitle, t.blogDesc, `linear-gradient(135deg, ${C.violet}, ${C.pink})`)}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginBottom: 40 }}>
              {blogPosts.map((post, i) => (
                <div key={i} style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB", cursor: "pointer" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{post.emoji}</div>
                  <div style={{ display: "flex", gap: 7, marginBottom: 10 }}>
                    {badge(post.tag, C.violet)}
                    <span style={{ fontSize: 10, color: C.gray, display: "flex", alignItems: "center" }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 7 }}>{lang === "fr" ? post.title : post.titleEn}</h3>
                  <p style={{ color: C.gray, fontSize: 12, lineHeight: 1.6, margin: "0 0 14px" }}>{lang === "fr" ? post.desc : post.descEn}</p>
                  <span style={{ color: C.violet, fontWeight: 700, fontSize: 12 }}>{lang === "fr" ? "Lire la suite" : "Read more"} →</span>
                </div>
              ))}
            </div>
            <div style={{ background: `${C.violet}08`, borderRadius: 16, padding: 28, textAlign: "center", border: `1px solid ${C.violet}12` }}>
              <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 6 }}>{t.newsletter}</h3>
              <p style={{ color: C.gray, marginBottom: 16, fontSize: 13 }}>{t.newsletterDesc}</p>
              {newsletterSuccess ? <div style={{ color: C.green, fontWeight: 700 }}>{t.newsletterSuccess}</div> : (
                <div style={{ display: "flex", gap: 8, maxWidth: 380, margin: "0 auto", flexWrap: "wrap" }}>
                  <input value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder={t.newsletterPlaceholder} type="email" style={{ flex: 1, padding: "9px 12px", borderRadius: 9, border: "1px solid #E5E7EB", fontSize: 13, minWidth: 150 }} />
                  <button onClick={handleNewsletter} style={{ padding: "9px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white", fontSize: 12 }}>{t.newsletterCta}</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {tab === "contact" && (
          <div style={{ paddingTop: 32 }}>
            {sectionHeader(<Mail size={36} color="white" />, t.contactTitle, t.contactDesc, `linear-gradient(135deg, ${C.blue}, ${C.violet})`)}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "white", borderRadius: 18, padding: 28, border: "1px solid #E5E7EB" }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 18 }}>✉️ {t.contactTitle}</h3>
                {contactSent ? (
                  <div style={{ textAlign: "center", padding: "36px 16px" }}>
                    <div style={{ fontSize: 44, marginBottom: 10 }}>✅</div>
                    <p style={{ color: C.green, fontWeight: 700, fontSize: 15 }}>{t.contactSent}</p>
                  </div>
                ) : (
                  <>
                    <input value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} placeholder={t.contactName} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1px solid #E5E7EB", marginBottom: 10, fontSize: 13, boxSizing: "border-box" }} />
                    <input value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} placeholder={t.contactEmail} type="email" style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1px solid #E5E7EB", marginBottom: 10, fontSize: 13, boxSizing: "border-box" }} />
                    <textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} placeholder={t.contactMessage} rows={5} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1px solid #E5E7EB", marginBottom: 14, fontSize: 13, boxSizing: "border-box", resize: "vertical" }} />
                    <button onClick={handleContact} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, color: "white" }}>{t.contactSend}</button>
                  </>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ icon: "📧", label: "Email", value: "support@innovationatlas.com" }, { icon: "💬", label: "WhatsApp", value: "+229 XX XX XX XX" }, { icon: "🌍", label: "Web", value: "innovationatlas.vercel.app" }, { icon: "⏱️", label: lang === "fr" ? "Reponse" : "Response", value: lang === "fr" ? "Sous 24 heures" : "Within 24 hours" }].map((info, i) => (
                  <div key={i} style={{ background: "white", borderRadius: 14, padding: 18, border: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 24 }}>{info.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: C.gray, fontWeight: 600 }}>{info.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{info.value}</div>
                    </div>
                  </div>
                ))}
                <div onClick={() => setShowAffiliate(true)} style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.pink})`, borderRadius: 14, padding: 20, cursor: "pointer" }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>🎁</div>
                  <h4 style={{ color: "white", fontWeight: 800, margin: "0 0 4px", fontSize: 14 }}>{t.affiliateTitle}</h4>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, margin: 0 }}>{t.affiliateDesc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

                  
     
        {/* PRICING */}
        {tab === "pricing" && (
          <div style={{ paddingTop: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 8 }}>{t.pricingTitle}</h2>
              <p style={{ fontSize: 16, color: C.gray }}>{t.pricingDesc}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18, marginBottom: 40 }}>
              {plans.map((plan, i) => (
                <div key={i} style={{ borderRadius: 22, padding: 32, background: "white", border: i === 1 ? `2px solid ${C.violet}` : "1px solid #E5E7EB", boxShadow: i === 1 ? `0 20px 60px ${C.violet}20` : "0 4px 16px rgba(0,0,0,0.05)", position: "relative", transform: i === 1 ? "scale(1.03)" : "scale(1)" }}>
                  {plan.badge && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: plan.grad, color: "white", fontSize: 11, fontWeight: 800, padding: "5px 18px", borderRadius: 50, whiteSpace: "nowrap" }}>{plan.badge}</div>}
                  <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 5 }}>{lang === "fr" ? plan.name : plan.nameEn}</h3>
                  <div style={{ fontSize: 44, fontWeight: 900, background: plan.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 3 }}>{plan.price}</div>
                  <p style={{ color: C.gray, fontSize: 12, marginBottom: 20 }}>{lang === "fr" ? plan.sub : plan.subEn}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 9 }}>
                    {(lang === "fr" ? plan.features : plan.featuresEn).map((f, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${C.green}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check size={11} color={C.green} /></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => {
                    if (plan.plan === "free") { setUserPlan("free"); setTab("generator"); }
                    else { setSelectedPlan(plan); setShowPaymentModal(true); setPaymentError(""); }
                  }} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 15, background: plan.grad, color: "white" }}>
                    {lang === "fr" ? plan.cta : plan.ctaEn}
                  </button>
                </div>
              ))}
            </div>
            <div style={{ background: `${C.violet}07`, borderRadius: 18, padding: 28, textAlign: "center", border: `1px solid ${C.violet}12` }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{t.securePayment}</h3>
              <p style={{ color: C.gray, marginBottom: 16, fontSize: 13 }}>{t.secureDesc}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                {["Carte bancaire", "MTN MoMo", "Moov Money", "Orange Money", "Wave", "SSL 256-bit"].map((item, i) => (
                  <span key={i} style={{ background: "white", padding: "7px 14px", borderRadius: 8, fontWeight: 600, fontSize: 12, border: "1px solid #E5E7EB" }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
        
     
      {/* FOOTER */}
      <footer style={{ background: `linear-gradient(135deg, ${C.dark}, #374151)`, padding: "44px 16px 28px", marginTop: 60 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 28, marginBottom: 36 }}>
            <div style={{ maxWidth: 240 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Globe size={14} color="white" /></div>
                <span style={{ fontWeight: 900, fontSize: 16, color: "white" }}>InnovationAtlas</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontSize: 12 }}>{lang === "fr" ? "De l'idee a la creation mondiale." : "From idea to global creation."}</p>
            </div>
            {[
              { title: lang === "fr" ? "Produit" : "Product", links: [lang === "fr" ? "Generateur d'Idees" : "AI Ideas", lang === "fr" ? "Creation Internationale" : "International Creation", lang === "fr" ? "Simulateur Fiscal" : "Tax Simulator"] },
              { title: "Support", links: ["FAQ", "Contact", "Blog"] },
              { title: lang === "fr" ? "Legal" : "Legal", links: ["CGV", lang === "fr" ? "Confidentialite" : "Privacy", lang === "fr" ? "Mentions legales" : "Legal notice"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ color: "white", fontWeight: 800, marginBottom: 12, fontSize: 13 }}>{col.title}</h4>
                {col.links.map((link, j) => <div key={j} style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 7, cursor: "pointer" }}>{link}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>© 2025 InnovationAtlas.</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>PayDunya · Apple Pay · Google Pay</span>
          </div>
        </div>
      </footer>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } @media print { nav, footer { display: none; } }`}</style>
    </div>
  );
}
      
