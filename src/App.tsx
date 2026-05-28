import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Clock,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  Play,
  CheckCircle2,
  Lock,
  AlertCircle,
  Terminal,
  Check,
  DollarSign,
  Activity,
  FileText,
  Users,
  Rocket,
  Flame,
  Star,
  Zap,
  Briefcase,
  Layers,
  Award,
  Sun,
  Moon,
  Copy,
  MessageSquare,
  Send,
  X,
  ChevronRight,
  Smartphone
} from "lucide-react";
import { FAQ_ITEMS, BONUS_ITEMS, TESTIMONIALS, AGITATION_POINTS, PROUD_MOMENTS } from "./data";
import { TransparentImage } from "./components/TransparentImage";
import { StruggleInfographic, LaunchInfographic } from "./components/Infographics";
import { NairaToUSD, LiveConverterStatus } from "./components/CurrencyConverter";
import { InteractiveROICalculator } from "./components/ROICalculator";

export function AnimatedSectionDivider({ theme }: { theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  return (
    <div className="w-full flex items-center justify-center my-14 relative overflow-hidden py-4 select-none">
      <motion.div 
        className={`h-[1px] w-full absolute left-0 ${
          isDark 
            ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent" 
            : "bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        }`}
        animate={{
          x: ["-100%", "100%"]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear"
        }}
      />
      <div className={`px-4 py-1.5 border rounded-full flex items-center gap-1.5 z-10 text-[10px] font-mono uppercase tracking-wider relative shadow-sm ${
        isDark 
          ? "bg-[#090D16] border-white/10 text-gray-400" 
          : "bg-[#fefde6] border-amber-500/35 text-amber-700 shadow-[0_0_12px_rgba(234,179,8,0.15)]"
      }`}>
        <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-amber-500'}`} style={{ animation: "spin 8s linear infinite" }} />
        <span>Sovereign Framework Sprint</span>
      </div>
    </div>
  );
}

export default function App() {
  // Theme Toggle: dark vs light
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Scroll/Reading Progress Bar
  const [scrollProgress, setScrollProgress] = useState(0);

  // Exit Intent Modal
  const [showExitModal, setShowExitModal] = useState(false);

  // Copy Link feedback status
  const [isCopied, setIsCopied] = useState(false);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    { 
      sender: 'bot', 
      text: "Greetings! I'm the automated ABM Challenge Assistant. 🎓 Want to know how to deploy alternative sovereign workflows from your smartphone without coding? Ask me anything or press a fast-shortcut below!", 
      time: 'Now' 
    }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // State for active FAQ Accordion
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  // State for expanded bonus description accordion
  const [expandedBonusId, setExpandedBonusId] = useState<string | null>(null);

  // State for Day-by-Day Challenge Tracker
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Countdown Timer State (Urgency loop)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 52 });

  // ROI Calculator State
  const [clientCount, setClientCount] = useState<number>(3);
  const [retainerSize, setRetainerSize] = useState<number>(2500);

  // Social Proof Notification popup
  const [notification, setNotification] = useState<string | null>(null);

  // Clipboard share trigger
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Chat conversation processor
  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'user' as const, text: query, time: timestamp };
    setChatMessages(prev => [...prev, newMsg]);
    if (!textToSend) {
      setChatInput("");
    }

    setIsBotTyping(true);

    setTimeout(() => {
      let reply = "";
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes("smartphone") || lowerQuery.includes("phone")) {
        reply = "Yes, absolutely! The AI Business Mastery program is custom-tailored for mobile. You can structure, test, and organic-launch your micro-funnels straight from your phone with 100% free AI tools. No high-end laptop or upfront subscriptions required.";
      } else if (lowerQuery.includes("whatsapp") || lowerQuery.includes("group") || lowerQuery.includes("support")) {
        reply = "By completing your slot today under our secure checkout, you unlock immediate access to the 72-[#00E5FF] Hour Live Implementation WhatsApp Group (₦20,000 value). You can collaborate with peers, review cold scripts, and troubleshoot alongside graduates.";
      } else if (lowerQuery.includes("fee") || lowerQuery.includes("cost") || lowerQuery.includes("price") || lowerQuery.includes("pay")) {
        reply = "Standard entry to the Challenge is a one-time charge of ₦50,000. There are zero recurring subscription billing, hosting fees, or lock-ins. You get lifetime portal updates.";
      } else if (lowerQuery.includes("time") || lowerQuery.includes("how fast") || lowerQuery.includes("result")) {
        reply = "Results vary depending on your speed of execution. On Day 1, you structure your high-ticket offer. On Day 2, you set up the mobile smart-funnel layout. On Day 3, you trigger the launch template. Many dedicated students close local or digital retainers within 1-2 weeks of going live.";
      } else if (lowerQuery.includes("obed") || lowerQuery.includes("who is")) {
        reply = "Obed Nwachukwu is a passionate Internet Marketing Consultant and digital advocate. He discovered this alternative no-code framework during his search to solve underemployment, and created the 72-Hour Challenge to help graduates secure alternative digital economies.";
      } else {
        reply = "Excellent question! The 72-Hour AI Business Mastery blueprint is highly structured: it is designed to skip theoretical noise. That means you bypass complex code, copy-paste ready layouts, and secure alternative digital returns. I recommend clicking 'Secure My Slot' to see current checkout options and start immediately!";
      }

      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply, time: botTimestamp }]);
      setIsBotTyping(false);
    }, 900);
  };

  // Handle accordion toggle
  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // exit intent hook
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5) {
        const dismissed = sessionStorage.getItem("exit_modal_dismissed");
        if (!dismissed) {
          setShowExitModal(true);
        }
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Countdown timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to create infinite urgency loop
          return { hours: 2, minutes: 14, seconds: 52 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Social Proof loop
  useEffect(() => {
    const buyers = [
      "David K. from Chicago just secured his challenge slot!",
      "Ananya S. from London just claimed the outreach bonus!",
      "Efe O. from Nigeria just started Module 1!",
      "Marcus V. from Berlin just upgraded to VIP!",
      "Chloe T. from Sydney just unlocked the outreach vault!"
    ];

    const interval = setInterval(() => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      setNotification(randomBuyer);

      // Hide after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }, 14000); // Trigger every 14 seconds

    return () => clearInterval(interval);
  }, []);

  // CTA Link destination
  const affiliateLink = "https://aibusinessmastery.me/go/aff_C3E7AA";

  return (
    <div className={`relative min-h-screen transition-all duration-300 font-sans overflow-x-hidden selection:bg-[#FF6D00] selection:text-white ${theme === 'dark' ? 'dark bg-[#030712] text-gray-100' : 'light text-slate-900 bg-gradient-to-tr from-[#FFFDF0] via-[#FFF9D4] to-[#FFFBE3]'}`}>
      
      {/* FAQ SCHEMA MARKUP */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_ITEMS.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>

      {/* BACKGROUND ACCENTS & RADIAL GLOWS */}
      <div className={`absolute top-[-10%] left-[-20%] w-[60%] h-[50%] rounded-full blur-[130px] pointer-events-none animate-pulse-glow transition-all duration-500 ${theme === 'dark' ? 'bg-cyan-500/10' : 'bg-yellow-400/20'}`} />
      <div className={`absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] pointer-events-none transition-all duration-500 ${theme === 'dark' ? 'bg-blue-600/5' : 'bg-amber-400/15'}`} />
      <div className={`absolute bottom-[20%] left-[-15%] w-[60%] h-[40%] rounded-full blur-[120px] pointer-events-none animate-pulse-glow transition-all duration-500 ${theme === 'dark' ? 'bg-cyan-700/5' : 'bg-orange-300/15'}`} />
      <div className={`absolute bottom-[-5%] right-[-10%] w-[50%] h-[30%] rounded-full blur-[100px] pointer-events-none transition-all duration-500 ${theme === 'dark' ? 'bg-orange-600/5' : 'bg-yellow-300/20'}`} />

      {/* FLOATING TOP PROGRESS BAR & URGENCY BLOCK */}
      <div className={`fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md shadow-xl transition-all duration-300 ${theme === 'dark' ? 'bg-slate-900/80 border-white/5' : 'bg-slate-50/94 border-slate-200/90 shadow-[0_4px_30px_rgba(15,23,42,0.06)]'}`}>
        <div className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400 to-orange-400 z-50 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 py-2.5 px-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className={`text-xs sm:text-sm font-mono ${theme === 'dark' ? 'text-gray-305' : 'text-slate-700'}`}>
              <span className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-semibold`}>Live Training Portal:</span> 2 Slots Remaining Today
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Live 24/7 Currency Converter */}
            <LiveConverterStatus />

            {/* Copy Link Toggle */}
            <button 
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                isCopied 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' 
                  : theme === 'dark' 
                    ? 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="Copy link to clipboard"
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            {/* Dark/Light mode toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                theme === 'dark' 
                  ? 'bg-white/5 hover:bg-white/10 text-orange-400 border-white/10' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
              <Clock className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
              <span className={`text-xs font-mono font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Ends: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER wrapper for long-form landing */}
      <div className="relative max-w-4xl mx-auto px-4 pt-32 sm:pt-24 pb-32">

        {/* SECTION 1: THE BRANDING BLOCK (AUTHOR PROFILE) */}
        <div id="author-block" className="flex flex-col items-center text-center mb-10 group">
          <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-[#00E5FF] to-blue-500 shadow-lg shadow-cyan-500/15 mb-4 animate-float">
            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#030712] bg-slate-900 aspect-square flex items-center justify-center">
              <img
                src="https://i.ibb.co/Pz3nJwsy/IMG-20260522-WA0000.jpg"
                alt="Obed Nwachukwu Profile"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            {/* Soft pulse glow around picture */}
            <span className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur opacity-75 animate-ping -z-10" />
          </div>
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] font-semibold bg-[#00E5FF]/10 px-3 py-1 rounded-full uppercase">
              Special Presentation
            </span>
            <h3 className={`text-lg font-bold mt-2 mb-0.5 font-sans ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Obed Nwachukwu</h3>
            <p className="text-xs text-gray-450 font-mono flex items-center justify-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Internet Marketing Consultant
            </p>
          </div>
        </div>

        {/* SECTION 2: THE HERO BANNER (H1 BLOCK) */}
        <motion.div
          id="hero-section"
          initial={{ opacity: 0, scale: 0.96, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`border rounded-3xl p-6 sm:p-10 mb-10 transition-all duration-300 relative overflow-hidden ${theme === 'dark' ? 'glass-panel border-white/10 shadow-2xl' : 'glass-panel'}`}
        >
          {/* Subtle light effect top left */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />
          
          <div className="relative text-center">
            {/* Urgent Tag badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-transparent border-l-2 border-orange-500 px-4 py-1.5 mb-6">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider text-left">
                Attention: Absolute Priority Alert for Nigerian/African Graduates
              </p>
            </div>

            {/* H1 Headline Verbatim with beautiful Space Grotesk display typography */}
            <h1 className={`text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight sm:leading-snug mb-6 font-display ${theme === 'dark' ? 'text-gray-100' : 'text-slate-900'}`}>
              "If You Are a University Graduate Still Earning a Miserable <span className={`font-black px-2 py-0.5 rounded-lg inline-block border ${theme === 'dark' ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' : 'text-orange-600 border-orange-500/40 bg-orange-500/10'}`}>₦45,005 Salary</span> That Vanishes Into Transportation Fares, <span className="text-[#00E5FF] font-black drop-shadow-[0_2px_8px_rgba(0,229,255,0.15)]">Stop Procrastinating</span> and <span className="text-orange-500 font-extrabold">Read This Right Now</span>."
            </h1>

            {/* Subheadline block to orient visitors */}
            <p className={`text-sm sm:text-base leading-relaxed mb-6 max-w-3xl mx-auto font-sans font-light ${theme === 'dark' ? 'text-gray-350' : 'text-slate-650'}`}>
              This digital bridge page tracks the exact rapid-implementation 72-Hour AI strategy helping underemployed individuals secure alternative sovereign digital workflows using zero prior coding or complex tech.
            </p>

            {/* Quick stats board */}
            <div className={`grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl border mb-8 text-center max-w-lg mx-auto ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              <div>
                <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Focus</p>
                <p className="text-xs sm:text-sm font-bold text-[#00E5FF] font-mono">No-Code AI</p>
              </div>
              <div className={`border-x ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Device</p>
                <p className={`text-xs sm:text-sm font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Smartphone</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Sprint</p>
                <p className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">72 Hours</p>
              </div>
            </div>

            {/* PRIMARY CTA #1 */}
            <div className="flex flex-col items-center gap-3">
              <a
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-[#FF6D00] to-[#FF9100] text-white font-bold text-base sm:text-lg text-center shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer inline-flex items-center justify-center gap-3 glow-btn"
              >
                <span>Secure My Slot In The 72-Hour Challenge Now</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </a>
              <p className="text-xs text-gray-400 font-mono flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Secure Checkout Link • Lifetime Course Access
              </p>
            </div>
          </div>
        </motion.div>

        {/* TRUSTED / RESULTS BAR PROUD MOMENTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 text-center">
          {PROUD_MOMENTS.map((item, index) => (
            <div key={index} className="glass-card border border-white/5 p-4 rounded-xl flex flex-col justify-center items-center">
              <p className="text-xl sm:text-2xl font-extrabold text-[#00E5FF] font-mono tracking-tight">{item.stat}</p>
              <p className="text-[10px] text-gray-405 mt-0.5 uppercase font-medium tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>

        <AnimatedSectionDivider theme={theme} />

        {/* SECTION 3: PROBLEM AGITATION TEXT (SECTIONS 1, 2 & 3) */}
        <div id="agitation-block" className="space-y-6 mb-16">
          <div className="text-center py-2">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold bg-orange-400/10 px-3 py-1 rounded-full">
              The Reality of Underemployment
            </span>
            <h2 className={`text-xl sm:text-2xl font-bold mt-3 font-sans ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Let's Address the Real Situation</h2>
          </div>

          {/* Fluid stack of single-column glassmorphic cards */}
          <div className="space-y-6">
              {/* CARD A (The Mirror Copy) */}
            <div className={`glass-panel rounded-2xl p-6 sm:p-8 border relative overflow-hidden group ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-700/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex gap-4 items-start">
                <span className={`p-2.5 rounded-xl text-xs font-mono font-bold shrink-0 border ${theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                  BLOCK A
                </span>
                <p className={`text-sm sm:text-base leading-relaxed font-light font-sans ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>
                  "You are lying awake at 11:00 PM, staring at your phone screen as the heat in your room settles. You just turned off your mobile data because the constant notifications of other people’s digital alerts feel like physical blows to your chest. You are an educated Nigerian graduate, yet you are trapped in a dead-end 10-hour daily commute for a miserable ₦45,000 monthly salary that vanishes into transportation fares before the first week ends. You feel this deep, heavy frustration of spending your scarce funds buying internet data bundles just to watch YouTube tutorials, while your bank account stays at absolute zero."
                </p>
              </div>
            </div>

            {/* CARD B (The Hidden Cost Copy) */}
            <div className={`glass-panel rounded-2xl p-6 sm:p-8 border relative overflow-hidden group ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-700/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex gap-4 items-start">
                <span className={`p-2.5 rounded-xl text-xs font-mono font-bold shrink-0 border ${theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                  BLOCK B
                </span>
                <p className={`text-sm sm:text-base leading-relaxed font-light font-sans ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>
                  "This continuous loop is draining far more than your wallet; it is quietly eroding your self-worth. Every time a younger sibling texts you for textbook money and you have to fake a bank app glitch to hide your empty balance, a sharp wave of shame chokes you. You avoid old schoolmates on WhatsApp because you cannot endure another conversation about career growth or Japa. Your university degree feels like a broken promise, and you carry an unvoiced terror of permanently remaining a financial burden to your retired parents."
                </p>
              </div>
            </div>

            {/* INFOGRAPHIC BREAKPOINT UP TO 4 BLOCKS */}
            <StruggleInfographic theme={theme} />

            {/* CARD C (The Full Invisible Wall Copy) */}
            <div className={`glass-panel rounded-2xl p-6 sm:p-8 border relative overflow-hidden group ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-700/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex gap-4 items-start">
                <span className={`p-2.5 rounded-xl text-xs font-mono font-bold shrink-0 border ${theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                  BLOCK C
                </span>
                <p className={`text-sm sm:text-base leading-relaxed font-light font-sans ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>
                  "Please know that this is not your fault. You are not lazy. You are simply stuck behind an invisible wall built by internet gurus who dump chaotic 40-hour Google Drive video links on you. They complicate the entire digital landscape, telling you that you must buy high-end MacBooks, pay for expensive click-funnel subscriptions, and master coding before making your first naira. This endless stream of conflicting information leaves you completely paralyzed by overthinking, stranded with zero direction."
                </p>
              </div>
            </div>

          </div>
        </div>

        <AnimatedSectionDivider theme={theme} />

        {/* SECTION 4: PRODUCT INTRODUCTIONS & SHIFT (SECTIONS 4, 5 & 6) */}
        <div id="shift-narrative-block" className="space-y-6 mb-16">
          <div className="text-center py-2">
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold px-3 py-1 rounded-full ${theme === 'dark' ? 'text-[#00E5FF] bg-[#00E5FF]/10' : 'text-sky-700 bg-sky-100'}`}>
              The Strategic Shift
            </span>
            <h2 className={`text-xl sm:text-2xl font-bold mt-3 font-sans ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Breaking the Cycle with Rapid Execution</h2>
          </div>

          <div className="space-y-6">
            
            {/* INTRO CARD A (The Shift Copy) */}
            <div className={`glass-panel rounded-2xl p-6 sm:p-8 border-2 glow-border relative overflow-hidden ${theme === 'dark' ? 'border-white/10' : 'border-slate-200 shadow-sm'}`}>
              <div className="absolute top-0 right-0 w-24 h-24 glow-bg-cyan opacity-40 pointer-events-none" />
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${theme === 'dark' ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-slate-100 border-slate-200'}`}>
                  <Sparkles className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#00E5FF]' : 'text-slate-800 font-extrabold'}`}>The Ultimate Micro-Shift</h4>
                  <p className={`text-sm sm:text-base leading-relaxed font-light font-sans ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>
                    "Here is what most people completely miss: financial breakthrough online does not require massive capital or tech genius. Imagine if you stopped trying to learn five different complex digital skills at once. What if the entire secret to digital revenue is simply taking one raw idea, processing it through free automation tools, and launching it immediately on a platform your audience already checks every single hour?"
                  </p>
                </div>
              </div>
            </div>

             {/* INTRO CARD B (The Path Copy) */}
            <div className={`glass-panel rounded-2xl p-6 sm:p-8 border-2 glow-border relative overflow-hidden ${theme === 'dark' ? 'border-white/10' : 'border-slate-200 shadow-sm'}`}>
              <div className="absolute top-0 right-0 w-24 h-24 glow-bg-cyan opacity-40 pointer-events-none" />
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${theme === 'dark' ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-slate-100 border-slate-200'}`}>
                  <Activity className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#00E5FF]' : 'text-slate-800 font-extrabold'}`}>The Mobile Architecture</h4>
                  <p className={`text-sm sm:text-base leading-relaxed font-light font-sans ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>
                     "To win in this current economy, you need an architecture engineered strictly for mobile execution and rapid deployment. A 72-hour execution sprint succeeds where traditional courses fail because it completely bypasses theoretical lectures. It cuts out the need for a laptop entirely, allowing you to copy, paste, and launch a live digital funnel straight from your smartphone using 100% free AI tools with zero operational overhead."
                  </p>
                </div>
              </div>
            </div>

            {/* FORMULA STRATEGY ACCORDION BREAK OUTS (MAX 4 BLOCKS RULE) */}
            <LaunchInfographic theme={theme} />

            {/* INTRO CARD C (The Vehicle Copy) */}
            <div className={`glass-panel rounded-2xl p-6 sm:p-8 border-2 glow-border relative overflow-hidden ${theme === 'dark' ? 'border-white/10' : 'border-slate-200 shadow-sm'}`}>
              <div className="absolute top-0 right-0 w-24 h-24 glow-bg-cyan opacity-40 pointer-events-none" />
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${theme === 'dark' ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-slate-100 border-slate-200'}`}>
                  <Rocket className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-[#00E5FF]' : 'text-slate-800 font-extrabold'}`}>The Gateway Vehicle</h4>
                  <p className={`text-sm sm:text-base leading-relaxed font-light font-sans ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}>
                    "I was completely stranded in that exact cycle of information paralysis until I discovered the exit door called the AI Business Mastery Challenge. I am not here to pitch you as the creator; I am sharing this strictly as a helpful peer who found a working vehicle that opened the door for me. This 3-day program hands you an explicit, mobile-friendly blueprint that extracts your ideal offer on Day 1, structures your free no-code asset funnel on Day 2, and triggers an organic launch sequence on Day 3."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* INTERACTIVE COMPONENT: PROJECTED PROFIT EVALUATOR */}
        <InteractiveROICalculator theme={theme} />

        {/* SECTION 5: PRODUCT PROOF & DATA EVIDENCE (SECTION 7) */}
        <div id="proof-panel" className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 mb-16 relative overflow-hidden bg-gradient-to-tr from-[#030712] via-[#090D16] to-[#030712]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center mb-6">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full uppercase font-semibold">
              Validated Action Proofs
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 font-sans">The Reality is Undeniable</h3>
          </div>

          <div className="p-5 sm:p-8 rounded-2xl bg-black/50 border border-white/5 relative">
            <span className="absolute -top-3 left-6 bg-emerald-500 text-black text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase">
              REVIEWS STATEMENT
            </span>
            <p className="text-sm sm:text-base text-gray-250 leading-relaxed font-light font-sans text-center">
              "The reality is undeniable. Underemployed graduates, fresh corpers, and complete novices in different countries are using this exact smartphone system to clear their first ₦100,000 in a single weekend. I have looked at the raw data myself; they aren't tech experts, but ordinary people who simply followed the course creator's copy-and-paste prompts to build stable revenue streams from wherever they are."
            </p>
          </div>
        </div>

        {/* RE-HIGHLIGHTING SPREAD DETAILS */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-2 border-white/10 mb-16 relative overflow-hidden glow-border">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-4 py-1.5 rounded-full uppercase tracking-widest font-semibold inline-block">
              Daily Challenge Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-sans">
              AI Business Mastery Challenge Program
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    selectedDay === day
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-[#030712]/60 hover:bg-slate-800 text-gray-400 border border-white/5"
                  }`}
                >
                  Day {day} Sequence
                </button>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-black/50 border border-white/5 min-h-[120px] flex flex-col justify-center">
              {selectedDay === 1 && (
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#00E5FF] flex items-center gap-2 font-mono">
                    <span className="bg-[#00E5FF]/10 text-xs text-[#00E5FF] px-2.5 py-1 rounded">Day 1 Focus</span>
                    Extracting Your Ideal Mobile-Hub Offer
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2 font-light">
                    Stop overcomplicating deliverables. You will pinpoint local enterprise bottlenecks using straightforward structured patterns, package them as automated solution scripts, and present them in plain business terms.
                  </p>
                </div>
              )}
              {selectedDay === 2 && (
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#00E5FF] flex items-center gap-2 font-mono">
                    <span className="bg-[#00E5FF]/10 text-xs text-[#00E5FF] px-2.5 py-1 rounded">Day 2 Focus</span>
                    Constructing Your Smart-Funnel Hub
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2 font-light">
                    Build beautiful, reactive no-code funnels directly on your smartphone screen in minutes. Collect lead inquiries on autopilot and trigger localized client updates with zero hosting bills.
                  </p>
                </div>
              )}
              {selectedDay === 3 && (
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#00E5FF] flex items-center gap-2 font-mono">
                    <span className="bg-[#00E5FF]/10 text-xs text-[#00E5FF] px-2.5 py-1 rounded">Day 3 Focus</span>
                    Triggering Your Sovereign Launch Sequence
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2 font-light">
                    Deploy! Execute the smartphone organic launch sequences to route traffic securely. Present value with confidence, onboard your clients cleanly, and secure early agreements.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-slate-400 font-mono font-semibold text-orange-405 uppercase tracking-widest">Single Entry Bundle Fee</p>
              <h4 className="text-2xl font-black font-mono">
                Only <NairaToUSD naira={50000} /> <span className="text-[10px] font-semibold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full ml-1.5">No Renewal Bills</span>
              </h4>
            </div>
            
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-[#FF6D00] to-[#FF9100] text-white font-bold text-sm text-center shadow-md hover:scale-[1.01] active:scale-[0.99] transition-transform cursor-pointer flex items-center justify-center gap-2 glow-btn"
            >
              <span>{`Secure My Slot In The 72-Hour Challenge Now`}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>

        {/* SECTION 6: PREMIUM 3D DIGITAL DEVICE BONUS SHOWCASE (SECTION 8) */}
        <div id="bonus-showcase" className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold bg-orange-400/10 px-3 py-1 rounded-full">
              Included Premium Digital Stack
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold mt-3 font-sans ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Premium 3D Digital Device Bonus Showcase
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-light max-w-xl mx-auto">
              Unlock the comprehensive suite designed strictly to fast-track your smartphone execution results without delay.
            </p>
          </div>

          {/* SIMULATED 3D GLOSSY BUNDLE PRESENTATION */}
          <div className="relative mb-12 h-64 sm:h-[320px] bg-slate-950/40 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center shadow-inner">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[70px] pointer-events-none" />
            
            {/* 3D GRAPHICAL DEVICE DECK WITH REAL STACKED TRANSPARENT BONUS IMAGES */}
            <div className="relative flex items-center justify-center h-full max-w-xl w-full scale-95 sm:scale-100">
              {/* Decorative radial glows background */}
              <div className="absolute w-48 h-48 bg-orange-500/20 rounded-full blur-[60px] pointer-events-none -translate-x-12" />
              <div className="absolute w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px] pointer-events-none translate-x-12" />
              
              {/* Bonus 1 (Mobile Funnels) - Left Stacked Card */}
              <div className="absolute left-[5%] sm:left-[12%] w-[150px] sm:w-[200px] h-[190px] sm:h-[250px] z-10 transform -rotate-12 -translate-x-4 transition-all duration-500 hover:rotate-0 hover:scale-110 hover:-translate-y-2 hover:z-40">
                <TransparentImage 
                  src="https://i.ibb.co/vvLxzVtZ/1000529616-removebg-preview.jpg" 
                  alt="Bonus 1 - Mobile Funnels Mockup" 
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] select-none"
                />
              </div>

              {/* Bonus 2 (African Market Prompts) - Right Stacked Card */}
              <div className="absolute right-[5%] sm:right-[12%] w-[150px] sm:w-[200px] h-[190px] sm:h-[250px] z-20 transform rotate-12 translate-x-4 transition-all duration-500 hover:rotate-0 hover:scale-110 hover:-translate-y-2 hover:z-40">
                <TransparentImage 
                  src="https://i.ibb.co/C3c6LmxK/1000529615-removebg-preview.jpg" 
                  alt="Bonus 2 - African Market Prompts Mockup" 
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] select-none"
                />
              </div>

              {/* Bonus 3 (24/7 Group Support) - Center Front Card */}
              <div className="absolute w-[170px] sm:w-[220px] h-[210px] sm:h-[270px] z-35 transform -translate-y-2 transition-all duration-500 hover:scale-115 hover:-translate-y-5 hover:z-40">
                <TransparentImage 
                  src="https://i.ibb.co/hx6g70W9/1000529681-removebg-preview.jpg" 
                  alt="Bonus 3 - Group Support Mockup" 
                  className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)] select-none"
                />
              </div>
            </div>
          </div>

          {/* GRID: THE 3 CARD BREAKDOWN WITH BONUS STACK TEXT ELEMENTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BONUS_ITEMS.map((bonus) => {
              const isExpanded = expandedBonusId === bonus.id;
              return (
                <div
                  key={bonus.id}
                  className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#00E5FF]/20 transition-all cursor-default"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] font-mono text-orange-400 uppercase tracking-widest font-semibold bg-orange-500/10 px-2 py-0.5 rounded">
                        {bonus.tag}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {bonus.value}
                      </span>
                    </div>

                    {/* BONUS PRODUCT IMAGE MOCKUP WITHOUT BLACK BACKGROUND */}
                    {bonus.image && (
                      <div className="w-full h-48 flex items-center justify-center mb-4 relative transition-all duration-300">
                        {/* Ambient background blur behind the floating mockup */}
                        <div className={`absolute w-32 h-32 pointer-events-none rounded-full blur-2xl opacity-20 ${
                          bonus.id === 'bonus-1' ? 'bg-cyan-500' : bonus.id === 'bonus-2' ? 'bg-amber-400' : 'bg-orange-500'
                        }`} />
                        <TransparentImage 
                          src={bonus.image} 
                          alt={bonus.title} 
                          className="h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] relative z-10 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 cursor-pointer"
                        />
                      </div>
                    )}

                    {/* CLICKABLE ACCORDION HEADER */}
                    <button
                      onClick={() => setExpandedBonusId(isExpanded ? null : bonus.id)}
                      className="w-full text-left flex justify-between items-start gap-2 text-white hover:text-[#00E5FF] transition-colors cursor-pointer select-none mb-2 focus:outline-none"
                    >
                      <h4 className="text-sm sm:text-base font-bold transition-colors flex-1 leading-snug">
                        {bonus.title}
                      </h4>
                      <div className={`p-1.5 rounded-full bg-white/5 border border-white/5 transition-all shrink-0 mt-0.5 ${
                        isExpanded ? 'rotate-180 bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20' : 'text-gray-400'
                      }`}>
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" />
                      </div>
                    </button>

                    {/* COLLAPSIBLE DESCRIPTION BLOCK */}
                    <div
                      className="transition-all duration-305 ease-in-out overflow-hidden"
                      style={{
                        maxHeight: isExpanded ? "160px" : "0px",
                        opacity: isExpanded ? 1 : 0
                      }}
                    >
                      <p className="text-xs text-gray-300 leading-relaxed font-light mb-4 pt-2 border-t border-white/5">
                        {bonus.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> Unlocked Instant
                    </span>
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECOND INTERACTIVE ACTION LINK */}
          <div className="text-center mt-12">
            <div className="inline-block relative">
              <a
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-[#FF6D00] to-[#FF9100] text-white font-bold text-base sm:text-lg text-center shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer inline-flex items-center gap-2 glow-btn"
              >
                <span>Secure My Slot In The 72-Hour Challenge Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="absolute -bottom-6 left-0 w-full text-center">
                <p className="text-[9px] text-[#00E5FF] font-mono uppercase tracking-widest">⚠️ Free bonus bundle entries are automatically provisioned at checkout</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: THE INVITATION BLOCK & PRIMARY CALL-TO-ACTION (SECTION 9) */}
        <div id="invitation-block" className="glass-panel border-2 border-cyan-500/30 rounded-3xl p-8 sm:p-12 mb-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest font-semibold bg-[#00E5FF]/10 px-3 py-1.5 rounded-full inline-block mb-3">
            Invitation Cohort
          </span>
          
          {/* Card Text Verbatim */}
          <p className="text-base sm:text-xl text-white font-medium leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
            "Taking the first step can feel intimidating, but you have spent enough time preparing to start. I invite you to join our upcoming cohort today."
          </p>

          <div className="flex flex-col items-center gap-3">
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-[#FF6D00] to-[#FF9100] text-white font-black text-base sm:text-lg text-center shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-transform cursor-pointer inline-flex items-center justify-center gap-3 glow-btn"
            >
              <span>Secure My Slot In The 72-Hour Challenge Now</span>
              <ArrowRight className="w-5 h-5 animate-pulse shrink-0" />
            </a>
            <p className="text-xs text-gray-500 font-mono mt-1">
              Affiliate link protects slots for the upcoming live accountability training sequence.
            </p>
          </div>
        </div>

        {/* STUDENT CASE STUDIES */}
        <div id="student-reviews" className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest font-semibold">Verified Student Feedback</span>
            <h2 className={`text-xl sm:text-2xl font-extrabold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>What Real Graduates Are Saying</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <div key={review.id} className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed font-light mb-6">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{review.name}</h5>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5">{review.role}</p>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                    {review.results}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 8: THE CLOSE PANEL (SECTION 10) */}
        <div id="close-panel" className="glass-panel border-2 border-white/10 rounded-3xl p-8 sm:p-10 mb-16 relative overflow-hidden bg-gradient-to-tr from-[#030712] via-[#090D16] to-[#030712] text-center">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Card Copy Verbatim */}
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans font-normal italic">
              "Think about looking at your smartphone three days from tonight and seeing real payment alerts instead of data warnings. Your intelligence is too valuable to be wasted on financial survival anxiety. Secure your access, turn your device into a sovereign economy, and step into the financially secure individual your family respects."
            </p>
            
            <div className="h-px bg-white/10 w-24 mx-auto" />
            <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider">
              - ENROLLMENT GATEWAY ACTIVE NOW
            </p>
          </div>
        </div>

        {/* SECTION 9: INTERACTIVE ACCORDION FAQ SECTION */}
        <div id="faq-accordions" className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest font-semibold">Get Answered</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
            <p className="text-xs text-gray-400 mt-1">Click a question row to expand and view the respective answer text field below.</p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}
                  style={{
                    borderColor: isOpen 
                      ? (theme === 'dark' ? "rgba(0, 229, 255, 0.25)" : "rgba(148, 163, 184, 0.6)") 
                      : (theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(203, 213, 225, 0.4)"),
                    boxShadow: isOpen 
                      ? (theme === 'dark' ? "0 4px 20px rgba(0, 229, 255, 0.05)" : "0 4px 20px rgba(15, 23, 42, 0.04)") 
                      : "none"
                  }}
                >
                  {/* Accordion Question bar */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className={`w-full flex justify-between items-center p-5 text-left font-bold transition-colors cursor-pointer select-none ${theme === 'dark' ? 'text-white hover:bg-slate-900/30' : 'text-slate-900 hover:bg-slate-100'}`}
                  >
                    <span className="text-sm sm:text-base pr-4 font-sans font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-305 ${theme === 'dark' ? 'text-[#00E5FF]' : 'text-slate-600'}`}
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                    />
                  </button>

                  {/* Accordion Answer content */}
                  <div
                    className="transition-all duration-350 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "220px" : "0px",
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <div className={`p-5 pt-0 text-xs sm:text-sm leading-relaxed font-light border-t ${theme === 'dark' ? 'text-gray-300 border-white/5 bg-slate-950/10' : 'text-slate-705 border-slate-200 bg-slate-50'}`}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM REINFORCEMENT CTA */}
        <div className="glass-panel border-2 border-orange-500/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />
          
          <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold bg-orange-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Final Step Required
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 leading-tight">
            Ready to Begin? Secure Lifetime Access Now!
          </h2>
          <p className="text-xs font-semibold max-w-lg mx-auto mb-8 text-orange-405">
            Access the mobilesmart funnel layouts, specific Sub-Saharan blueprints, and accountability WhatsApp groups instantly for <NairaToUSD naira={50000} /> total.
          </p>

          <div className="flex flex-col items-center gap-3">
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-[#FF6D00] to-[#FF9100] text-white font-black text-base sm:text-lg text-center shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer inline-flex items-center justify-center gap-2 glow-btn"
            >
              <span>{`Secure My Slot In The 72-Hour Challenge Now`}</span>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </a>
            
            <p className="text-xs text-gray-400 font-mono mt-2 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Authorized Affiliate checkout portal verified • SSL encrypted connection
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER AREA */}
      <footer className="w-full glass-panel border-t border-white/5 py-12 px-4 shadow-xl text-center relative z-10 font-mono">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            Disclaimer: Affiliate Link. Clicking any CTA on this website redirects you to authorized checkout and training services managed by the parent program. Results described are based on proactive student commitments and individual business effort, and are not guaranteed earnings.
          </p>
          <div className="h-px bg-white/5 w-24 mx-auto" />
          <p className="text-[10px] text-slate-600">
            © 2026 AI Business Mastery Pre-Sell. Dedicated marketing consultation powered by consulting networks. All Rights Reserved. Used under affiliate rights agreement.
          </p>
        </div>
      </footer>

      {/* SIMULATED PURCHASE ALERTS (MICRO-NOTIFICATION SOCIAL PROOF) - MOVED TO THE TOP RIGHT */}
      <div
        className="fixed top-[74px] right-4 z-[90] transition-all duration-500 max-w-xs w-full"
        style={{
          transform: notification ? "translateY(0)" : "translateY(-150px)",
          opacity: notification ? 1 : 0
        }}
      >
        <div className="glass-panel-heavy border border-cyan-400/30 p-4 rounded-xl shadow-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Social Proof Alert</p>
            <p className="text-[10px] text-slate-300 leading-tight mt-0.5">{notification}</p>
          </div>
        </div>
      </div>

      {/* EXIT INTENT MODAL PANEL */}
      {showExitModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className={`relative max-w-md w-full border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-all transform scale-100 ${theme === 'dark' ? 'glass-panel-heavy text-white border-cyan-400/30' : 'bg-white text-slate-900 border-slate-300'}`}>
            {/* Top decoration gradient bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 via-cyan-400 to-orange-500" />
            
            {/* Dismiss Close Box */}
            <button 
              onClick={() => {
                setShowExitModal(false);
                sessionStorage.setItem("exit_modal_dismissed", "true");
              }}
              className="absolute top-4 right-4 p-1 rounded-full bg-slate-800/10 hover:bg-slate-800/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="inline-flex p-3 rounded-full bg-orange-500/10 text-orange-400 animate-pulse">
                <AlertCircle className="w-8 h-8" />
              </div>
              
              <h3 className="text-lg sm:text-2xl font-black font-display tracking-tight leading-snug">
                Wait! Don't Leave Empty-Handed!
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                Educated graduates are securing alternative sovereign digital hubs right now. Your coupon for the **72-Hour AI Masterclass + Free Mobile Layouts** is about to expire!
              </p>

              <div className="py-2.5 px-4 bg-slate-950/40 rounded-xl border border-white/5 inline-flex items-center gap-2 text-xs font-mono">
                <Clock className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>Reserved Discount Slot Expires in 04:59 Mins</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-[#FF9100] text-white font-bold text-center shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer inline-flex items-center justify-center gap-2 glow-btn"
                >
                  <span>Claim My <NairaToUSD naira={50000} className="inline-flex text-white font-bold" /> Access Slot Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                
                <button
                  onClick={() => {
                    setShowExitModal(false);
                    sessionStorage.setItem("exit_modal_dismissed", "true");
                  }}
                  className="text-xs text-gray-500 hover:text-gray-400 underline cursor-pointer mt-1"
                >
                  No thanks, I will pass on digital income
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE FLOATING CHATBOT */}
      <div className="fixed bottom-6 right-6 z-[120]">
        {/* Trigger Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer duration-200 relative group"
          title="Open Assistant Support"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border border-white animate-pulse" />
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>

        {/* Chat window panel */}
        {isChatOpen && (
          <div className={`absolute bottom-16 right-0 w-[320px] sm:w-[380px] h-[480px] rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 z-50 ${theme === 'dark' ? 'bg-[#0B1528] border-cyan-500/35 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'}`}>
            {/* Header branding info */}
            <div className={`p-4 flex justify-between items-center shrink-0 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white' : 'bg-gradient-to-r from-slate-700 to-slate-900 text-white'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${theme === 'dark' ? 'bg-white/15' : 'bg-black/15'}`}>
                  ABM
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans">ABM Challenge Guide</h4>
                  <p className={`text-[9px] font-mono ${theme === 'dark' ? 'text-cyan-200' : 'text-slate-205'}`}>● Online & Ready</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white hover:opacity-80 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message streams */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${theme === 'dark' ? 'bg-[#060D1A]' : 'bg-white'}`}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-[#FF6D00] text-white rounded-tr-none' 
                      : theme === 'dark' 
                        ? 'bg-slate-800 text-gray-200 rounded-tl-none border border-white/5' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[8px] text-gray-500 font-mono mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex flex-col items-start">
                  <div className={`p-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 ${theme === 'dark' ? 'bg-slate-800/40 border border-white/5 text-gray-400' : 'bg-slate-100/70 border border-slate-200/50 text-slate-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === 'dark' ? 'bg-cyan-400' : 'bg-slate-500'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s] ${theme === 'dark' ? 'bg-cyan-400' : 'bg-slate-500'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s] ${theme === 'dark' ? 'bg-cyan-400' : 'bg-slate-500'}`} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick action triggers */}
            <div className={`px-3 py-2 border-t flex flex-wrap gap-1 justify-start shrink-0 ${theme === 'dark' ? 'bg-[#08101E] border-white/5' : 'bg-slate-50 border-slate-200/50'}`}>
              <button 
                onClick={() => handleSendMessage("Do I need technical skills?")}
                className={`text-[9px] px-2 py-0.5 rounded cursor-pointer text-left font-mono border ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-cyan-400' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
              >
                No Technical Skills?
              </button>
              <button 
                onClick={() => handleSendMessage("How much is the program entry fee?")}
                className={`text-[9px] px-2 py-0.5 rounded cursor-pointer text-left font-mono border ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-cyan-400' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
              >
                Enrollment Fee?
              </button>
              <button 
                onClick={() => handleSendMessage("Is there support or a WhatsApp group?")}
                className={`text-[9px] px-2 py-0.5 rounded cursor-pointer text-left font-mono border ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-cyan-400' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
              >
                WhatsApp Group?
              </button>
            </div>

            {/* Message input field */}
            <div className={`p-3 border-t flex gap-2 shrink-0 ${theme === 'dark' ? 'bg-[#08101E] border-white/5' : 'bg-slate-50 border-slate-200/50'}`}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className={`flex-1 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 ${theme === 'dark' ? 'bg-slate-900/60 border border-white/10 text-white focus:border-cyan-400 focus:ring-cyan-400/20' : 'bg-white border border-slate-300 text-slate-800 focus:border-slate-500 focus:ring-slate-500/20'}`}
              />
              <button
                onClick={() => handleSendMessage()}
                className={`p-2 rounded-xl text-white cursor-pointer transition-colors ${theme === 'dark' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-slate-800 hover:bg-slate-900'}`}
                title="Send Chat Message"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

