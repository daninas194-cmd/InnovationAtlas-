// ============================================================
// index.jsx — InnovationAtlas
// Version complète avec toutes les fonctionnalités
// © 2025 InnovationAtlas. Tous droits réservés.
// ============================================================

import { useState, useEffect } from "react";
import { Globe, Sparkles, ArrowRight, Check, Star, Zap, TrendingUp, Building2, ChevronDown, ChevronUp, Lock, FileText, Calculator, Map, Bell, Mail, Users, BookOpen, Gift, Smartphone, BarChart2, X, Menu, LogIn, UserPlus, FolderOpen } from "lucide-react";

// ═══════════ PAYDUNYA CONFIG ═══════════
const PAYDUNYA_PUBLIC_KEY = "test_public_LrFZzo1e2VbcWC1FgKgMntqqIcF";
const PAYDUNYA_MODE = "test"; // Changer en "live" pour production

const paydunya = {
  createInvoice: async (amount, description, customerName, customerEmail, returnUrl) => {
    try {
      const res = await fetch(`https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PAYDUNYA-MASTER-KEY": PAYDUNYA_PUBLIC_KEY,
          "PAYDUNYA-PUBLIC-KEY": PAYDUNYA_PUBLIC_KEY,
          "PAYDUNYA-MODE": PAYDUNYA_MODE,
        },
        body: JSON.stringify({
          invoice: {
            items: {
              item_0: {
                name: description,
                quantity: 1,
                unit_price: amount,
                total_price: amount,
                description: description,
              }
            },
            total_amount: amount,
            description: description,
          },
          store: {
            name: "InnovationAtlas",
            tagline: "De l'idée à la création mondiale",
            postal_address: "Cotonou, Bénin",
            phone: "",
            logo_url: "",
            website_url: "https://innovationatlas.vercel.app",
          },
          actions: {
            cancel_url: "https://innovationatlas.vercel.app",
            return_url: returnUrl || "https://innovationatlas.vercel.app/success",
            callback_url: "https://innovationatlas.vercel.app/api/paydunya-webhook",
          },
          customer: {
            name: customerName || "Client",
            email: customerEmail || "",
          }
        })
      });
      const data = await res.json();
      return data;
    } catch (e) {
      return { error: e.message };
    }
  }
};

// ═══════════ SUPABASE CONFIG ═══════════
const SUPABASE_URL = "https://izsniedxxnzmodyystjw.supabase.co";
const SUPABASE_KEY = "sb_publishable_UbmT9Wl9vX_ccm96EoKn1w_XLFil5FY";

const supabase = {
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

const C = {
  violet: "#7C3AED", blue: "#3B82F6", green: "#10B981",
  orange: "#F97316", pink: "#EC4899", dark: "#1F2937",
  gray: "#6B7280", light: "#F3F4F6", white: "#FFFFFF",
};

// ═══════════ TRANSLATIONS ═══════════
const T = {
  fr: {
    nav: { home: "🏠 Accueil", generator: "💡 Idées IA", international: "🌍 International", structures: "🏢 Structures", simulator: "🧮 Simulateur", pricing: "💳 Tarifs", projects: "📁 Mes Projets", blog: "📚 Blog", contact: "✉️ Contact" },
    hero: { badge: "Propulsé par Intelligence Artificielle", title: "De l'idée à la", highlight: "création mondiale", subtitle: "Votre entreprise internationale en 30 jours", desc: "Générez des idées d'entreprise futuristes propulsées par l'IA et créez votre société à l'étranger, étape par étape.", cta1: "Démarrer gratuitement", cta2: "Voir les tarifs" },
    stats: [{ v: "15+", l: "Pays couverts", e: "🌍" }, { v: "10+", l: "Structures juridiques", e: "🏢" }, { v: "∞", l: "Idées générées par IA", e: "🤖" }, { v: "30j", l: "Pour créer votre entreprise", e: "⚡" }, { v: "0%", l: "Impôt à Dubaï (FZ)", e: "💰" }],
    modules: "6 Modules Puissants",
    modulesDesc: "Tout ce qu'il vous faut pour réussir à l'international",
    upgrade: "⚡ Upgrade",
    proActive: "✅ Pro actif",
    login: "Connexion",
    signup: "S'inscrire",
    logout: "Déconnexion",
    generate: "Générer mes idées personnalisées",
    generating: "Génération en cours...",
    sector: "🎯 Secteur d'intérêt",
    budget: "💰 Budget disponible",
    experience: "🧠 Expérience",
    market: "🌍 Marché cible",
    yourIdeas: "Vos Idées Personnalisées",
    strengths: "✅ Points forts",
    challenges: "⚠️ Défis",
    nextSteps: "🚀 Prochaines étapes",
    stack: "💻 Stack recommandée",
    seeDetails: "Voir détails complets",
    hideDetails: "Masquer",
    createAbroad: "Créer cette entreprise à l'étranger →",
    premiumContent: "Contenu Premium 🔒",
    unlockIdeas: "Débloquez toutes les idées dès 79€",
    seeOffers: "Voir les offres →",
    chooseDestination: "Choisissez votre destination",
    compare: "+ Comparer",
    comparing: "✓ Comparer",
    comparisonTitle: "📊 Comparaison côte à côte",
    clearComparison: "Effacer comparaison",
    fullGuide: "Guide Complet",
    keyAdvantages: "✅ Avantages clés",
    creationSteps: "📋 Étapes de création",
    requiredDocs: "📄 Documents requis",
    progress: "Progression",
    stepsCompleted: "étapes complétées ✅",
    pricingTitle: "Tarifs Transparents",
    pricingDesc: "Commencez gratuitement, évoluez selon vos ambitions",
    securePayment: "🔒 Paiement 100% Sécurisé",
    secureDesc: "Vos paiements sont protégés. Satisfait ou remboursé sous 7 jours.",
    myProjects: "Mes Projets",
    savedIdeas: "Idées sauvegardées",
    noProjects: "Aucun projet sauvegardé",
    noProjectsDesc: "Générez des idées et sauvegardez-les ici",
    saveIdea: "💾 Sauvegarder",
    saved: "✅ Sauvegardé",
    blogTitle: "Blog & Ressources",
    blogDesc: "Guides, conseils et actualités pour entrepreneurs internationaux",
    contactTitle: "Contactez-nous",
    contactDesc: "Une question ? Nous sommes là pour vous aider",
    contactName: "Votre nom",
    contactEmail: "Votre email",
    contactMessage: "Votre message",
    contactSend: "Envoyer le message",
    contactSent: "✅ Message envoyé ! Nous vous répondrons sous 24h",
    newsletter: "Restez informé",
    newsletterDesc: "Recevez nos derniers guides et conseils chaque semaine",
    newsletterPlaceholder: "Votre email",
    newsletterCta: "S'abonner gratuitement",
    newsletterSuccess: "✅ Inscription confirmée !",
    testimonials: "Ils nous font confiance",
    affiliateTitle: "Programme d'Affiliation",
    affiliateDesc: "Gagnez 30% de commission sur chaque vente que vous générez",
    affiliateCta: "Rejoindre le programme",
    notificationsTitle: "Notifications",
    noNotifications: "Aucune notification",
    exportPDF: "📄 Exporter en PDF",
    onboardingTitle: "Bienvenue sur InnovationAtlas ! 🎉",
    onboardingDesc: "Votre guide pour créer votre entreprise internationale",
    onboardingNext: "Suivant →",
    onboardingSkip: "Passer",
    roiTitle: "Calculateur ROI",
    roiDesc: "Estimez la rentabilité de votre projet",
    mapTitle: "Carte Interactive",
    mapDesc: "Explorez les destinations depuis la carte",
  },
  en: {
    nav: { home: "🏠 Home", generator: "💡 AI Ideas", international: "🌍 International", structures: "🏢 Structures", simulator: "🧮 Simulator", pricing: "💳 Pricing", projects: "📁 My Projects", blog: "📚 Blog", contact: "✉️ Contact" },
    hero: { badge: "Powered by Artificial Intelligence", title: "From idea to", highlight: "global creation", subtitle: "Your international company in 30 days", desc: "Generate futuristic AI-powered business ideas and create your company abroad, step by step.", cta1: "Start for free", cta2: "See pricing" },
    stats: [{ v: "15+", l: "Countries covered", e: "🌍" }, { v: "10+", l: "Legal structures", e: "🏢" }, { v: "∞", l: "AI-generated ideas", e: "🤖" }, { v: "30d", l: "To create your company", e: "⚡" }, { v: "0%", l: "Tax in Dubai (FZ)", e: "💰" }],
    modules: "6 Powerful Modules",
    modulesDesc: "Everything you need to succeed internationally",
    upgrade: "⚡ Upgrade",
    proActive: "✅ Pro active",
    login: "Login",
    signup: "Sign up",
    logout: "Logout",
    generate: "Generate my personalized ideas",
    generating: "Generating...",
    sector: "🎯 Sector of interest",
    budget: "💰 Available budget",
    experience: "🧠 Experience",
    market: "🌍 Target market",
    yourIdeas: "Your Personalized Ideas",
    strengths: "✅ Strengths",
    challenges: "⚠️ Challenges",
    nextSteps: "🚀 Next steps",
    stack: "💻 Recommended stack",
    seeDetails: "See full details",
    hideDetails: "Hide",
    createAbroad: "Create this company abroad →",
    premiumContent: "Premium Content 🔒",
    unlockIdeas: "Unlock all ideas from €79",
    seeOffers: "See offers →",
    chooseDestination: "Choose your destination",
    compare: "+ Compare",
    comparing: "✓ Compare",
    comparisonTitle: "📊 Side-by-side comparison",
    clearComparison: "Clear comparison",
    fullGuide: "Complete Guide",
    keyAdvantages: "✅ Key advantages",
    creationSteps: "📋 Creation steps",
    requiredDocs: "📄 Required documents",
    progress: "Progress",
    stepsCompleted: "steps completed ✅",
    pricingTitle: "Transparent Pricing",
    pricingDesc: "Start free, grow as you need",
    securePayment: "🔒 100% Secure Payment",
    secureDesc: "Your payments are protected. 7-day money-back guarantee.",
    myProjects: "My Projects",
    savedIdeas: "Saved ideas",
    noProjects: "No saved projects",
    noProjectsDesc: "Generate ideas and save them here",
    saveIdea: "💾 Save",
    saved: "✅ Saved",
    blogTitle: "Blog & Resources",
    blogDesc: "Guides, tips and news for international entrepreneurs",
    contactTitle: "Contact Us",
    contactDesc: "A question? We're here to help",
    contactName: "Your name",
    contactEmail: "Your email",
    contactMessage: "Your message",
    contactSend: "Send message",
    contactSent: "✅ Message sent! We'll reply within 24h",
    newsletter: "Stay informed",
    newsletterDesc: "Get our latest guides and tips every week",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe for free",
    newsletterSuccess: "✅ Subscription confirmed!",
    testimonials: "They trust us",
    affiliateTitle: "Affiliate Program",
    affiliateDesc: "Earn 30% commission on every sale you generate",
    affiliateCta: "Join the program",
    notificationsTitle: "Notifications",
    noNotifications: "No notifications",
    exportPDF: "📄 Export to PDF",
    onboardingTitle: "Welcome to InnovationAtlas! 🎉",
    onboardingDesc: "Your guide to creating your international company",
    onboardingNext: "Next →",
    onboardingSkip: "Skip",
    roiTitle: "ROI Calculator",
    roiDesc: "Estimate the profitability of your project",
    mapTitle: "Interactive Map",
    mapDesc: "Explore destinations from the map",
  }
};

const countries = [
  { name: "Dubaï (EAU)", flag: "🇦🇪", difficulty: "Moyen", cost: "10k-50k€", time: "2-4 sem.", tax: "0-9%", lat: 25.2, lng: 55.3, structures: ["FZ-LLC", "Mainland LLC", "Offshore"], advantages: ["0% impôt revenu personnel", "0% dividendes", "Visa résidence inclus", "Hub international", "100% propriété étrangère"], steps: ["Choisir zone franche ou mainland", "Réserver nom commercial", "Approbation initiale", "Voyage à Dubaï (biométrie)", "Signature MOA chez notaire", "Obtenir licence commerciale", "Visa de résidence", "Ouvrir compte bancaire"], docs: ["Passeport valide 6 mois+", "Photo passeport", "Preuve d'adresse", "CV professionnel", "Business plan"] },
  { name: "Estonie", flag: "🇪🇪", difficulty: "Facile", cost: "200-500€", time: "1-2 sem.", tax: "0-20%", lat: 59.4, lng: 24.7, structures: ["OÜ (SARL)", "AS (SA)"], advantages: ["100% en ligne (e-Residency)", "Dans l'Union Européenne", "Fiscal attractif", "Rapide et pas cher", "Accès marché européen"], steps: ["Créer e-Residency (en ligne)", "Choisir nom entreprise", "Préparer statuts", "Ouvrir compte bancaire virtuel", "Enregistrer en ligne", "Obtenir numéro fiscal"], docs: ["Carte d'identité", "e-Residency card", "Adresse email", "Adresse postale"] },
  { name: "Delaware (USA)", flag: "🇺🇸", difficulty: "Facile", cost: "500-2k€", time: "1-2 sem.", tax: "21%", lat: 38.9, lng: -75.5, structures: ["LLC", "C-Corp", "S-Corp"], advantages: ["Meilleure structure pour levée fonds", "Accès investisseurs US", "LLC flexible et simple", "Réputation mondiale", "Stripe Atlas disponible"], steps: ["Choisir LLC ou C-Corp", "Registered agent Delaware", "Déposer Certificate of Formation", "Obtenir EIN (numéro fiscal)", "Ouvrir compte bancaire US", "Compliance annuelle"], docs: ["Passeport", "Adresse aux USA (agent)", "Operating Agreement", "EIN SS-4 form"] },
  { name: "Singapour", flag: "🇸🇬", difficulty: "Moyen", cost: "1k-5k€", time: "2-3 sem.", tax: "17%", lat: 1.3, lng: 103.8, structures: ["Pte Ltd", "LLP", "Branch"], advantages: ["Hub Asie-Pacifique", "Fiscalité attractive", "Stabilité politique", "Accès marchés asiatiques", "Infrastructure world-class"], steps: ["Réserver nom entreprise", "Nommer directeurs/actionnaires", "Établir adresse siège", "Déposer documents ACRA", "Obtenir certificat incorporation", "Enregistrement IRAS"], docs: ["Passeport", "Preuve d'adresse", "Business plan", "Référence bancaire"] },
  { name: "Royaume-Uni", flag: "🇬🇧", difficulty: "Facile", cost: "100-500€", time: "1-2 sem.", tax: "19-25%", lat: 51.5, lng: -0.1, structures: ["Ltd", "PLC", "LLP"], advantages: ["Création ultra rapide", "Anglophone", "Réputation internationale", "Accès marchés", "Coût très bas"], steps: ["Choisir nom (Companies House)", "Nommer directeurs", "Adresse siège UK", "Créer statuts", "Enregistrement Companies House", "Enregistrement HMRC fiscal"], docs: ["Passeport/CNI", "Preuve adresse UK", "SIC code activité", "Memorandum of Association"] },
  { name: "Portugal", flag: "🇵🇹", difficulty: "Moyen", cost: "1k-3k€", time: "2-3 sem.", tax: "21%", lat: 38.7, lng: -9.1, structures: ["LDA (SARL)", "SA", "Unipessoal"], advantages: ["Régime NHR (10% IR)", "Dans l'Union Européenne", "Qualité de vie élevée", "Coûts raisonnables", "Visa entrepreneur"], steps: ["Obtenir NIF (fiscal)", "Ouvrir compte bancaire PT", "Rédiger statuts", "Déposer capital social", "Enregistrement au registre", "Publication journal officiel"], docs: ["Passeport", "NIF portugais", "Preuve d'adresse", "Certificat non-condamnation"] },
  { name: "Hong Kong", flag: "🇭🇰", difficulty: "Moyen", cost: "1k-4k€", time: "1-2 sem.", tax: "16.5%", lat: 22.3, lng: 114.2, structures: ["Limited Company", "Branch"], advantages: ["Gateway vers la Chine", "Faible fiscalité", "Centre financier mondial", "Accès marchés asiatiques", "Système juridique britannique"], steps: ["Réserver nom entreprise", "Nommer secrétaire HK", "Déposer NNC1", "Obtenir Business Registration Certificate", "Ouvrir compte bancaire", "Déclaration profits annuelle"], docs: ["Passeport", "Preuve d'adresse", "NNC1 form", "Résolution actionnaires"] },
  { name: "Irlande", flag: "🇮🇪", difficulty: "Moyen", cost: "1k-3k€", time: "2-4 sem.", tax: "12.5%", lat: 53.3, lng: -6.3, structures: ["Ltd", "DAC", "PLC"], advantages: ["IS le plus bas d'Europe (12.5%)", "Hub tech européen", "Anglophone", "Dans l'UE", "Accès talent tech"], steps: ["Vérifier disponibilité nom", "Préparer constitution", "Nommer directeurs", "Déposer à Companies Registration Office", "Enregistrement Revenue", "Compte bancaire irlandais"], docs: ["Passeport", "Preuve d'adresse", "Constitution société", "Formulaire A1"] },
];

const structures = [
  { country: "🇺🇸 USA", name: "LLC", full: "Limited Liability Company", capital: "0$", shareholders: "1+", tax: "Pass-through / 21%", best: "Startups, solopreneurs, SaaS" },
  { country: "🇺🇸 USA", name: "C-Corp", full: "Corporation", capital: "0$", shareholders: "1+", tax: "21%", best: "Levée de fonds, scale-up" },
  { country: "🇬🇧 UK", name: "Ltd", full: "Private Limited Company", capital: "1£", shareholders: "1+", tax: "19-25%", best: "PME, commerce international" },
  { country: "🇫🇷 FR", name: "SAS", full: "Société par Actions Simplifiée", capital: "1€", shareholders: "1+", tax: "25%", best: "Startups françaises" },
  { country: "🇦🇪 UAE", name: "FZ-LLC", full: "Free Zone LLC", capital: "0€", shareholders: "1+", tax: "0-9%", best: "E-commerce, SaaS, Crypto" },
  { country: "🇩🇪 DE", name: "GmbH", full: "Gesellschaft mit beschränkter Haftung", capital: "25k€", shareholders: "1+", tax: "30%", best: "Business solide en Allemagne" },
  { country: "🇸🇬 SG", name: "Pte Ltd", full: "Private Limited Company", capital: "1 SGD", shareholders: "1-50", tax: "17%", best: "Business Asie-Pacifique" },
  { country: "🇪🇪 EE", name: "OÜ", full: "Osaühing (SARL estonienne)", capital: "0.01€", shareholders: "1+", tax: "0-20%", best: "Business digital 100% en ligne" },
];

const plans = [
  { name: "Gratuit", nameEn: "Free", price: "0€", sub: "Pour découvrir", subEn: "To discover", badge: null, features: ["1 idée générée gratuite", "Aperçu 3 pays", "Structures juridiques basiques", "Accès limité"], featuresEn: ["1 free generated idea", "Preview 3 countries", "Basic legal structures", "Limited access"], cta: "Commencer", ctaEn: "Start", grad: `linear-gradient(135deg, #6B7280, #9CA3AF)`, plan: "free", lsLink: "https://innovationatlas.com" },
  { name: "Pro", nameEn: "Pro", price: "79€", sub: "/mois", subEn: "/month", badge: " POPULAIRE", features: ["Idées illimitées (30 jours)", "10 guides pays complets", "Comparateur avancé", "Simulateur de coûts", "Calculateur fiscal", "Checklist interactive", "Export PDF"], featuresEn: ["Unlimited ideas (30 days)", "10 complete country guides", "Advanced comparator", "Cost simulator", "Tax calculator", "Interactive checklist", "PDF export"], cta: "Choisir Pro", ctaEn: "Choose Pro", grad: `linear-gradient(135deg, ${C.violet}, ${C.blue})`, plan: "pro", lsLink: "https://innovationatlas.com/buy/pro" },
  { name: "Ultimate", nameEn: "Ultimate", price: "149€", sub: "paiement unique", subEn: "one-time payment", badge: "MEILLEUR", features: ["Tout illimité à VIE", "Tous les pays (15+)", "Templates business plan", "Support prioritaire 24/7", "Mises à jour gratuites", featuresEn: ["Everything unlimited", "All countries", "24/7 support", "1h consultation"]
