"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Bot, CalendarDays, Car, Check, ChevronRight,
  Code2, Computer, Cpu, Droplets, FileText, Folder, FolderOpen, Github, Linkedin, Globe2,
  HelpCircle, Info, Mail, MapPin, Maximize2, MessageCircle, Minus, Monitor,
  MoreHorizontal, Music2, Plus, Power, Search, Send, Settings, Sparkles, Trophy,
  Wifi, X
} from "lucide-react";
import { fetchEvents, formatEventForDisplay } from "../lib/api";
import EventForm from "./components/EventForm";
import JoinForm from "./components/JoinForm";

type AppId = "welcome" | "about" | "team" | "alumni" | "projects" | "events" | "archive";

type WindowState = {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
};

type TeamMember = {
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  bio?: string;
};

type Team = {
  id: string;
  name: string;
  image: string;
  description: string;
  lead: TeamMember;
  coLead: TeamMember;
  members: TeamMember[];
};

type MentorProfile = {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  highlight: string;
  github: string;
  linkedin: string;
};

type AlumniProfile = {
  id: string;
  name: string;
  role: string;
  batch: string;
  image: string;
  description: string;
  highlight: string;
  github: string;
  linkedin: string;
};

type Profile = MentorProfile | AlumniProfile;

const APP_META: Record<AppId, { label: string; short: string; icon: typeof Computer; tone: string }> = {
  welcome: { label: "Welcome to IoSC", short: "Welcome", icon: Info, tone: "blue" },
  about: { label: "About Intel oneAPI Student Club", short: "About IoSC", icon: Cpu, tone: "blue" },
  projects: { label: "oneAPI Projects - Internet Explorer", short: "oneAPI Projects", icon: Globe2, tone: "blue" },
  events: { label: "Events Calendar", short: "Events", icon: CalendarDays, tone: "orange" },
  archive: { label: "IoSC Archive - Notepad", short: "Archive", icon: FileText, tone: "paper" },
  team: { label: "Teams", short: "Teams", icon: Folder, tone: "blue" },
  alumni: { label: "Mentors & Alumni", short: "Mentors & Alumni", icon: FolderOpen, tone: "blue" },
  // join: { label: "Join IoSC", short: "Join IoSC", icon: MessageCircle, tone: "green" },
};

const XP_ICONS: Record<AppId, string> = {
  welcome: "/assets/xp/icons/tour.png",
  about: "/assets/xp/icons/computer.png",
  projects: "/assets/xp/icons/internet-explorer.png",
  events: "/assets/xp/icons/events.png",
  archive: "/assets/xp/icons/notepad.png",
  team: "/assets/xp/icons/members.png",
  alumni: "/assets/xp/icons/tour.png",
  // join: "/assets/xp/icons/messenger.png",
};

const DEFAULT_POSITIONS: Record<AppId, { x: number; y: number }> = {
  welcome: { x: 250, y: 86 }, about: { x: 120, y: 72 },
  projects: { x: 160, y: 65 }, events: { x: 265, y: 100 }, archive: { x: 320, y: 76 }, team: { x: 370, y: 112 }, alumni: { x: 430, y: 148 },
};

const projects = [
  {
    title: "HYDRO HEROES",
    type: "IoT · Flow Tracking · Water Quality",
    status: "Built",
    icon: Droplets,
    color: "#0284c7",
    description: "It does realtime flow tracking to predict leaks and quality monitoring.",
    github: "https://github.com/Waqar080206/Hydro-Heroes",
  },
  {
    title: "QUIZ PLAY",
    type: "React · Interactive UI · Quiz Management",
    status: "Built",
    icon: HelpCircle,
    color: "#8b5cf6",
    description: "It allows users to take quizzes, view results, and manage quiz data through an interactive UI.",
    github: "https://github.com/prefierolasoledad/QuizApp",
  },
  {
    title: "AI CODE REVIEW",
    type: "Full-Stack · Node.js · React · Gemini API",
    status: "Built",
    icon: Bot,
    color: "#059669",
    description: "A full-stack AI-powered code review tool built with Node.js, React, and Google's Gemini API.",
    github: "https://github.com/utkarsh-chauhannn/Ai-Code-Review",
  },
  {
    title: "DriveEasy",
    type: "MERN Stack · Vehicle Rental Platform",
    status: "Built",
    icon: Car,
    color: "#d97706",
    description: "DriveEasy is a MERN stack-based car rental platform that enables users to easily browse, book, and manage vehicle rentals online.",
    github: "https://github.com/AryanSachan12/vehicle-rental",
  },
];

const clubLeadership = [
  {
    title: "IoSC Lead",
    name: "Piyush Gupta",
    image: "/assets/xp/leads/PIYUSH GUPTA.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    title: "IoSC Co-Lead",
    name: "Armaan",
    image: "/assets/xp/leads/IMG_20260612_211648_070 - Armaan _.jpg",
    github: "#",
    linkedin: "#",
    bio: "Driven by curiosity . Defined by creativity . Blending creativity with technology",
  },
  {
    title: "Technical Lead",
    name: "Waqar Akhtar",
    image: "/assets/xp/leads/Waqar Akhtar.jpeg",
    github: "#",
    linkedin: "#",
  },
  {
    title: "Technical Co-Lead",
    name: "Rahul Bhatia",
    image: "/assets/xp/leads/Rahul Bhatia.jpeg",
    github: "#",
    linkedin: "#",
  },
];

const teams: Team[] = [
  {
    id: "software",
    name: "i3 : Software Development Team",
    image: "/assets/teams/software.png",
    description:
      "Develops web applications, AI solutions, automation tools and technical projects.",

    lead: {
      name: "Mayank Bisht",
      role: "Team Lead",
      image: "/assets/xp/i3/IMG-20250822-WA0032 - Mayank Bisht.jpg",
      github: "https://github.com/mayankbisht-tech",
      linkedin: "https://www.linkedin.com/in/mayankbisht011/",
    },

    coLead: {
      name: "Pawan Yadav",
      role: "Co Lead",
      image: "/assets/xp/i3/Pawan Yadav.jpg",
      github: "https://github.com/pawanydv35",
      linkedin: "#",
    },

    members: [
      {
        name: "Jayant Baliyan",
        role: "Member",
        image: "/assets/xp/i3/IMG20250822141950 - Jayant Baliyan.jpg",
        github: "https://github.com/Jayant-Baliyan",
        linkedin: "https://www.linkedin.com/in/jayant-baliyan/",
        bio: "We must cling to our honor, lest we become beasts ourselves.",
      },
      {
        name: "DHRUV SHARMA",
        role: "Member",
        image: "/assets/xp/i3/DHRUV SHARMA.jpg",
        github: "#",
        linkedin: "#",
      },
      {
        name: "Prabhat Kumar",
        role: "Member",
        image: "/assets/xp/i3/Prabhat Kumar - Prabhat Kumar.png",
        github: "https://github.com/PrabhatKumar-06",
        linkedin: "#",
        bio: "Heavy are the hands that center a div.",
      },
    ],
  },

  {
    id: "iot",
    name: "i5 : IoT & Embedded Systems Team",
    image: "/assets/teams/iot.png",
    description: "Develops IoT and embedded systems solutions.",

    lead: {
      name: "Samarth Yadav",
      role: "Team Lead",
      image: "/assets/xp/i5/Samarth Yadav.jpg",
      github: "#",
      linkedin: "#",
    },

    coLead: {
      name: "Place Holder",
      role: "Co Lead",
      image: "/assets/members/placeholder.png",
      github: "#",
      linkedin: "#",
    },

    members: [
      {
        name: "Shourya Upadhyay",
        role: "Member",
        image: "/assets/xp/i5/20260708_114840 - Shourya Upadhyay.jpg",
        github: "https://github.com/shouryaupadhyay2029",
        linkedin: "#",
      },
      {
        name: "Aditya Bhatnagar",
        role: "Member",
        image: "/assets/xp/i5/IMG_20260130_044912_379 - Aditya Bhatnagar.webp",
        github: "https://github.com/adityabhatnagar1",
        linkedin: "#",
        bio: "If there is a God, he's a great Mathematician!",
      },
      {
        name: "Gurmehak Singh",
        role: "Member",
        image: "/assets/xp/i5/IMG_20260727_005348 - Gurmehak Singh.png",
        github: "https://github.com/niggsingh20",
        linkedin: "#",
        bio: "Some random nobody ~",
      },
      {
        name: "Jatin Khandelwal",
        role: "Member",
        image: "/assets/xp/i5/PXL_20260104_042517377 - Jatin Khandelwal.jpg",
        github: "https://github.com/jatinkhandelwal662-jk",
        linkedin: "#",
        bio: "The Pragmatic Builder",
      },
    ],
  },

  {
    id: "gaming",
    name: "i7 : Gaming and Development Team",
    image: "/assets/teams/gaming.png",
    description: "Develops games and gaming-related applications.",

    lead: {
      name: "Manandeep Singh Lamba",
      role: "Team Lead",
      image: "/assets/xp/i7/MANANDEEP SINGH LAMBA.jpeg",
      github: "#",
      linkedin: "#",
    },

    coLead: {
      name: "Pranshu Bansal",
      role: "Co Lead",
      image: "/assets/members/placeholder.png",
      github: "#",
      linkedin: "#",
    },

    members: [
      {
        name: "Akul Malik",
        role: "Member",
        image: "/assets/xp/i7/IMG-20260606-WA0023~2 - Akul Malik.jpg",
        github: "https://github.com/akul1301",
        linkedin: "https://www.linkedin.com/in/akul-malik-b65216324/",
        bio: "Building software that scales",
      },
      {
        name: "Vishesh Sagar",
        role: "Member",
        image: "/assets/xp/i7/WhatsApp Image 2026-07-26 at 22.07.39 - Vishesh Sagar.jpeg",
        github: "https://github.com/visheshsagar0501-prog",
        linkedin: "#",
        bio: "Professional Ctrl + C, ctrl + V ; Part time coder",
      },
    ],
  },

  {
    id: "ai",
    name: "i9 : AI Development Team",
    image: "/assets/teams/aidev.png",
    description: "Handles AI development and Machine Learning projects.",

    lead: {
      name: "Avish Choudhary",
      role: "Team Lead",
      image: "/assets/xp/i9/me - Avish Choudhary.png",
      github: "https://github.com/choudhary-avish20",
      linkedin: "#",
      bio: "Works, but makes sad noises",
    },

    coLead: {
      name: "Dishita",
      role: "Co Lead",
      image: "/assets/members/placeholder.png",
      github: "#",
      linkedin: "#",
    },

    members: [
      {
        name: "PUSHPENDRA SINGH",
        role: "Member",
        image: "/assets/xp/i9/IMG-20260411-WA0020 - PUSHPENDRA SINGH.jpg",
        github: "https://github.com/Pushpendra2006/Pushpendra2006",
        linkedin: "https://www.linkedin.com/in/pushpendra-singh-69a768333/",
        bio: "Most people ask AI for answers.I spend time figuring out how AI finds them",
      },
      {
        name: "Chaitanya Mangla",
        role: "Member",
        image: "/assets/xp/i9/College photo - Chaitanya Mangla.jpeg",
        github: "https://github.com/cmangla581",
        linkedin: "#",
        bio: "Passionate about Mathematics, Physics and Artificial Intelligence.  Also, allergic to giving up.",
      },
      {
        name: "Ananya Sharma",
        role: "Member",
        image: "/assets/xp/i9/IMG_20260726_181547 - Ananya Sharma.jpg",
        github: "https://github.com/ananya-builds",
        linkedin: "#",
        bio: "Core Member - Team i9 | Turning data into decisions",
      },
      {
        name: "Richik Das",
        role: "Member",
        image: "/assets/xp/i9/WhatsApp Image 2026-07-26 at 21.55.35 - Richik Das.jpeg",
        github: "https://github.com/Richik06",
        linkedin: "#",
        bio: "Aspiring AI Engineer",
      },
    ],
  },

  /*
  {
    id: "pr",
    name: "Xeon : PR and Sponsorship Team",
    image: "/assets/teams/prsponsor.png",
    description: "Handles social media and sponsorship activities.",

    lead: {
      name: "Place Holder",
      role: "Team Lead",
      image: "/assets/members/placeholder.png",
      github: "#",
      linkedin: "#",
    },

    coLead: {
      name: "Place Holder",
      role: "Co Lead",
      image: "/assets/members/placeholder.png",
      github: "#",
      linkedin: "#",
    },

    members: [],
  },

  {
    id: "design",
    name: "Arc : Design and Content Team",
    image: "/assets/teams/design.png",
    description: "Designs club materials and promotional content.",

    lead: {
      name: "Place Holder",
      role: "Team Lead",
      image: "/assets/members/placeholder.png",
      github: "#",
      linkedin: "#",
    },

    coLead: {
      name: "Place Holder",
      role: "Co Lead",
      image: "/assets/members/placeholder.png",
      github: "#",
      linkedin: "#",
    },

    members: [],
  },
  */
];

const mentors = [
  {
    id: "drkhyati",
    name: "Dr. Khyati Chopra",
    role: "Mentor",
    image: "/assets/xp/mentors/Dr Khyati Chopra.png",
    description: "A former club lead who now builds scalable web products and mentors the next generation of developers.",
    highlight: "Mentored workshops and helped launch the first club portal experience.",
    github: "#",
    linkedin: "#",
  },
  {
    id: "drrahul",
    name:"Dr. Rahul Johari",
    role: "Mentor",
    image: "/assets/xp/mentors/Dr. Rahul Johari.png",
    description: "A former AI team member who now works on applied machine learning projects and community outreach.",
    highlight: "Guided the club’s AI track and supported student hackathon projects.",
    github: "#",
    linkedin: "#",
  },
];

const alumni = [
  {
    id: "divyansh",
    name: "Divyansh",
    role: "Alumni",
    batch: "Batch 2023",
    image: "/assets/xp/alumni/Divyansh.jpg",
    description: "An alumnus known for turning technical concepts into elegant, accessible product experiences.",
    highlight: "Shaped the club’s visual identity and helped run design-focused events.",
    github: "#",
    linkedin: "#",
  },
  {
    id: "siddharth",
    name: "Siddharth Gupta",
    role: "Alumni",
    batch: "Batch 2023",
    image: "/assets/xp/alumni/Siddharth Gupta.jpg",
    description: "A prior IoT team member who now works on connected devices and hands-on engineering education.",
    highlight: "Continues to mentor embedded systems projects and technical workshops.",
    github: "#",
    linkedin: "#",
  },
  {
    id: "aryan",
    name: "Aryan Khanna",
    role: "Alumni",
    batch: "Batch 2023",
    image: "/assets/xp/alumni/Aryan Khanna.jpg",
    description: "A former club lead who now builds scalable web products and mentors the next generation of developers.",
    highlight: "Mentored workshops and helped launch the first club portal experience.",
    github: "#",
    linkedin: "#",
  },
  {
    id: "avinash",
    name: "Avinash Srivastava",
    role: "Alumni",
    batch: "Batch 2023",
    image: "/assets/xp/alumni/Avinash Srivastava.jpg",
    description: "A former AI team member who now works on applied machine learning projects and community outreach.",
    highlight: "Guided the club’s AI track and supported student hackathon projects.",
    github: "#",
    linkedin: "#",
  },
];

const defaultEvents = [
  { day: "10–12", month: "OCT 2023", title: "HackMaze", type: "Hackathon", place: "Online prelims · Offline project showcase", accent: "#0068b5" },
  { day: "2023", month: "ARCHIVE", title: "Azintek", type: "Tech event", place: "GGSIPU East Delhi Campus", accent: "#00a3a3" },
  { day: "2024", month: "ARCHIVE", title: "Vespera", type: "Two-day tech fest", place: "USAR, GGSIPU EDC", accent: "#ce7b25" },
  { day: "15–16", month: "OCT 2025", title: "AzinHack ’25", type: "24-hour hackathon", place: "USAR, GGSIPU EDC", accent: "#875fa0" },
];


function WindowsFlag({ small = false }: { small?: boolean }) {
  return <span className={`windows-flag ${small ? "windows-flag--small" : ""}`} aria-hidden="true">
    <i className="bg-[#f04b2f]" /><i className="bg-[#77b82a]" /><i className="bg-[#2f7dd0]" /><i className="bg-[#f8bd22]" />
  </span>;
}

function ChipMark({ compact = false }: { compact?: boolean }) {
  return <span className={`chip-mark ${compact ? "chip-mark--compact" : ""}`} aria-hidden="true">
    <i className="chip-die"><b>one</b><b>API</b></i>
    {Array.from({ length: 12 }, (_, index) => <i className="chip-pin" key={index} />)}
  </span>;
}

function SiliconOverlay() {
  return <div className="silicon-overlay" aria-hidden="true">
    <div className="silicon-chip"><span>intel</span><strong>oneAPI</strong><small>student club</small></div>
    <i className="trace trace-a" /><i className="trace trace-b" /><i className="trace trace-c" /><i className="trace trace-d" />
    <b className="node node-a" /><b className="node node-b" /><b className="node node-c" /><b className="node node-d" />
  </div>;
}

function AppIcon({ id, size = "desktop" }: { id: AppId; size?: "desktop" | "small" | "menu" }) {
  return <span className={`app-icon app-icon--${size}`}><img src={XP_ICONS[id]} alt="" draggable={false} /></span>;
}

function BootScreen({ done }: { done: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(done, 1550);
    return () => window.clearTimeout(timer);
  }, [done]);
  return <button className="boot-screen" onClick={done} aria-label="Skip boot animation">
    <div className="boot-brand"><div><span>intel</span><sup>student club</sup></div><strong>oneAPI</strong></div>
    <p>Initializing heterogeneous computing environment...</p>
    <div className="boot-progress"><i /><i /><i /></div>
    <small>Click anywhere to start</small>
  </button>;
}

function DesktopShortcut({ id, selected, onSelect, onOpen }: { id: AppId; selected: boolean; onSelect: () => void; onOpen: () => void }) {
  return <button
    className={`desktop-shortcut ${selected ? "desktop-shortcut--selected" : ""}`}
    onClick={onSelect}
    onDoubleClick={onOpen}
    onKeyDown={(event) => { if (event.key === "Enter") onOpen(); }}
  >
    <AppIcon id={id} /><span>{APP_META[id].short}</span>
  </button>;
}

function TitleBar({ id, active, maximized, onFocus, onMinimize, onMaximize, onClose, onDragStart }: {
  id: AppId; active: boolean; maximized: boolean; onFocus: () => void; onMinimize: () => void; onMaximize: () => void; onClose: () => void; onDragStart: (event: React.PointerEvent) => void;
}) {
  return <div className={`window-titlebar ${active ? "window-titlebar--active" : ""}`} onPointerDown={onDragStart} onDoubleClick={onMaximize}>
    <div className="window-title"><AppIcon id={id} size="small" /><span>{APP_META[id].label}</span></div>
    <div className="window-controls" onPointerDown={(event) => event.stopPropagation()}>
      <button onClick={() => { onFocus(); onMinimize(); }} aria-label="Minimize"><Minus /></button>
      <button onClick={() => { onFocus(); onMaximize(); }} aria-label={maximized ? "Restore" : "Maximize"}><Maximize2 /></button>
      <button className="window-close" onClick={onClose} aria-label="Close"><X /></button>
    </div>
  </div>;
}

function MenuBar({ items = ["File", "Edit", "View", "Favorites", "Tools", "Help"] }: { items?: string[] }) {
  return <div className="menu-bar" aria-label="Application menu">{items.map(item => <span key={item}>{item}</span>)}</div>;
}

function ExplorerToolbar({ address }: { address: string }) {
  return <div className="address-bar"><span>Address</span><div><img src="/assets/xp/icons/earth.png" alt="" /><p>{address}</p></div></div>;
}

function WelcomeApp({ openApp }: { openApp: (id: AppId) => void }) {
  return <div className="welcome-app">
    <div className="welcome-left">
      <div className="welcome-logo"><ChipMark /><div><strong>Intel oneAPI</strong><span>Student Club · IoSC</span></div></div>
      <h1>Building dreams together.</h1>
      <p>We’re IoSC-EDC: a future-focused, tech-driven community for students who learn, build, and experiment across software, AI, robotics, design, games, and systems.</p>
      <button className="xp-primary-button" onClick={() => openApp("about")}>Take the tour <ChevronRight /></button>
    </div>
    <div className="welcome-actions">
      <p>What do you want to do?</p>
      {["about", "projects", "events", "team", "alumni"].map(id => <button key={id} onClick={() => openApp(id as AppId)}><AppIcon id={id as AppId} size="menu" /><span><strong>{APP_META[id as AppId].short}</strong><small>{id === "about" ? "Mission, focus, and campus chapter" : id === "projects" ? "A small selection of club work" : id === "events" ? "Hackathons, workshops, and tech fests" : id === "team" ? "Connect with the community" : "Meet former club leaders and mentors"}</small></span><ChevronRight /></button>)}
    </div>
  </div>;
}

function TeamsApp() {
  return (
    <div className="teams-app">
      <MenuBar />
      <TeamsPanel />
    </div>
  );
}

function AboutApp() {
  const [tab, setTab] = useState("General");
  return <div className="system-app">
    <div className="system-tabs">{["General", "Our values", "Club details"].map(item => <button key={item} onClick={() => setTab(item)} className={tab === item ? "active" : ""}>{item}</button>)}</div>
    <div className="system-panel">
      {tab === "General" && <><div className="system-hero"><ChipMark /><div><h2>Intel oneAPI Student Club — EDC</h2><p>IoSC · GGSIPU East Delhi Campus</p></div></div><hr /><div className="system-copy"><strong>A future-focused, tech-driven community.</strong><p>IoSC brings together students who love technology and innovative development—from design, system integration, game development, robotics, and web to management. It is a platform to learn, gain hands-on experience, and excel.</p></div><div className="system-stats"><span><b>LEARN</b> together</span><span><b>BUILD</b> projects</span><span><b>SHARE</b> openly</span></div></>}
      {tab === "Our values" && <div className="value-list">{[["Hands-on education", "Turn technical ideas into practical experience through making and experimentation."], ["Real-life problem solving", "Learn by working on challenges that demand thoughtful, useful solutions."], ["Collaboration", "Build with people from different technical and creative disciplines."], ["Industry insight", "Connect workshops and sessions with contemporary tools and working practice."]].map(([title, text], i) => <div key={title}><span>{i + 1}</span><p><strong>{title}</strong><small>{text}</small></p></div>)}</div>}
      {tab === "Club details" && <div className="detail-table"><div><span>Club type</span><strong>Intel oneAPI Student Club</strong></div><div><span>Established</span><strong>2023</strong></div><div><span>Campus</span><strong>GGSIPU East Delhi Campus, USAR</strong></div><div><span>Activities</span><strong>Workshops, hackathons, coding competitions, bootcamps &amp; networking</strong></div><div><span>Focus</span><strong>Technology, oneAPI, multidisciplinary project building</strong></div></div>}
    </div>
  </div>;
}

function TeamsPanel() {
  const [selectedTeam, setSelectedTeam] = useState<string | "club">("club");
  const [selectedView, setSelectedView] = useState<"leadership" | "members">("leadership");
  const [selectedPerson, setSelectedPerson] = useState(0);
  const currentTeam = teams.find((team) => team.id === selectedTeam) ?? null;
  const people = selectedTeam === "club"
    ? clubLeadership.map((leader) => ({ name: leader.name, role: leader.title, image: leader.image, github: leader.github, linkedin: leader.linkedin, bio: "bio" in leader ? leader.bio : undefined }))
    : selectedView === "leadership"
      ? [currentTeam!.lead, currentTeam!.coLead]
      : currentTeam!.members;
  const person = people[Math.min(selectedPerson, people.length - 1)];
  const select = (team: string | "club", view: "leadership" | "members" = "leadership") => {
    setSelectedTeam(team);
    setSelectedView(view);
    setSelectedPerson(0);
  };
  const location = selectedTeam === "club"
    ? "C:\\Website\\Teams\\Club Leadership"
    : `C:\\Website\\Teams\\${currentTeam?.name.split(" : ")[0]}\\${selectedView === "leadership" ? "Team Leadership" : "Members"}`;

  return (
    <div className="explorer-app team-explorer-shell">
      <div className="explorer-toolbar">
        <button type="button" aria-label="Back">
          <ArrowLeft size={21} />
          <span>Back</span>
        </button>
        <button type="button" disabled aria-label="Forward">
          <ArrowRight size={21} />
          <span>Forward</span>
        </button>
        <div className="toolbar-separator" />
        <button type="button">
          <FolderOpen size={21} />
          <span>Up</span>
        </button>
        <button type="button">
          <Search size={21} />
          <span>Search</span>
        </button>
        <button type="button"><Folder size={21} /><span>Folders</span></button>
      </div>

      <div className="address-bar">
        <span>Address</span>
        <div>
          <img src="/assets/xp/icons/earth.png" alt="" />
          <p>{location}</p>
        </div>
      </div>

      <div className="explorer-main">
        <aside className="explorer-sidebar">
          <div className="sidebar-panel">
            <div>Folders</div>
            <section>
              <button type="button" className="xp-tree-root" onClick={() => select("club")}>
                <Folder size={14} />
                <span>Teams</span>
              </button>
              <button
                type="button"
                className={`xp-tree-item xp-tree-level-one ${selectedTeam === "club" ? "selected" : ""}`}
                onClick={() => select("club")}
              >
                <FolderOpen size={13} />
                <span>Club Leadership</span>
              </button>
              {teams.map((team) => (
                <div key={team.id} className="xp-tree-branch">
                  <button type="button" className={`xp-tree-item xp-tree-level-one ${selectedTeam === team.id ? "selected" : ""}`} onClick={() => select(team.id)}>
                    <FolderOpen size={13} />
                    <span>{team.name.split(" : ")[0]}</span>
                  </button>
                  <button type="button" className={`xp-tree-item xp-tree-level-two ${selectedTeam === team.id && selectedView === "leadership" ? "selected" : ""}`} onClick={() => select(team.id, "leadership")}>
                    <Folder size={13} /><span>Team Leadership</span>
                  </button>
                  <button type="button" className={`xp-tree-item xp-tree-level-two ${selectedTeam === team.id && selectedView === "members" ? "selected" : ""}`} onClick={() => select(team.id, "members")}>
                    <Folder size={13} /><span>Members</span>
                  </button>
                </div>
              ))}
            </section>
          </div>
        </aside>

        <main className="team-profile-pane">
          <div className="xp-person-preview">
            <img src={person.image} alt={person.name} />
            <div>
              <h2>{person.name}</h2>
              <strong>{person.role}</strong>
              <dl><dt>Team:</dt><dd>{selectedTeam === "club" ? "Intel oneAPI Student Club" : currentTeam?.name}</dd><dt>Status:</dt><dd className="online">Active</dd></dl>
              {person.bio && <p>“{person.bio}”</p>}
              <span className="xp-person-social"><a href={person.github} target="_blank" rel="noreferrer"><Github size={22} /> GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={22} /> LinkedIn</a></span>
            </div>
          </div>
          <div className="xp-member-list" role="listbox" aria-label="Team members">
            <div className="xp-member-list-head"><span>Name</span><span>Role</span><span>Status</span></div>
            {people.map((member, index) => <button key={`${member.name}-${index}`} className={index === Math.min(selectedPerson, people.length - 1) ? "selected" : ""} onClick={() => setSelectedPerson(index)}><span>{member.name}</span><span>{member.role}</span><span>Active</span></button>)}
          </div>
        </main>
      </div>

      <div className="status-bar">
        <span>{people.length} object{people.length === 1 ? "" : "s"}</span><span>{selectedTeam === "club" ? "Club Leadership" : currentTeam?.name}</span>
      </div>
    </div>
  );
}

function AlumniApp() {
  return (
    <div className="teams-app">
      <MenuBar />
      <AlumniPanel />
    </div>
  );
}

function AlumniPanel() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  if (selectedProfile) {
    const selectedBatch = "batch" in selectedProfile ? selectedProfile.batch : null;

    return (
      <div className="xp-team-details">
        <div className="xp-team-breadcrumb">
          <button className="xp-back-button" onClick={() => setSelectedProfile(null)}>← Back</button>
          <span>📁 Mentors & Alumni &gt; <b>{selectedProfile.name}</b></span>
        </div>

        <div className="xp-team-details-content">
          <div className="xp-alumni-header">
            <div className="xp-folder-large">
              <img src={selectedProfile.image} alt={selectedProfile.name} />
            </div>
            <div>
              <h2>{selectedProfile.name}</h2>
              <p>{selectedProfile.role}{selectedBatch ? ` · ${selectedBatch}` : ""}</p>
              <p>{selectedProfile.description}</p>
            </div>
          </div>

          <div className="xp-alumni-highlight">
            <article>
              <h3>Current focus</h3>
              <p>{selectedProfile.highlight}</p>
            </article>
            <article>
              <h3>Stay connected</h3>
              <div className="xp-social-links">
                <a href={selectedProfile.github} target="_blank" rel="noreferrer" title="GitHub"><Github size={16} /></a>
                <a href={selectedProfile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn"><Linkedin size={16} /></a>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xp-alumni-panel">
      <div className="xp-club-leadership">
        <h2>Mentors</h2>
        <p className="xp-alumni-intro">Guiding the club’s growth through advice, experience, and long-term support.</p>
      </div>

      <div className="xp-alumni-grid">
        {mentors.map((person) => (
          <button key={person.id} type="button" className="xp-alumni-card" onClick={() => setSelectedProfile(person)}>
            <div className="xp-alumni-image">
              <img src={person.image} alt={person.name} />
            </div>
            <div className="xp-alumni-info">
              <h3>{person.name}</h3>
              <span className="xp-team-lead">
                <b>{person.role}</b>
              </span>
              <p>{person.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="xp-club-leadership">
        <h2>Alumni</h2>
        <p className="xp-alumni-intro">Former members who continue to inspire the community through their work and leadership.</p>
      </div>

      <div className="xp-alumni-grid">
        {alumni.map((person) => (
          <button key={person.id} type="button" className="xp-alumni-card" onClick={() => setSelectedProfile(person)}>
            <div className="xp-alumni-image">
              <img src={person.image} alt={person.name} />
            </div>
            <div className="xp-alumni-info">
              <h3>{person.name}</h3>
              <span className="xp-team-lead">
                <b>{person.role}</b>
              </span>
              <span className="xp-team-lead">{person.batch}</span>
              <p>{person.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectsApp() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  const ProjectIcon = project.icon;
  return <div className="browser-app"><MenuBar /><ExplorerToolbar address="https://iosc.club/projects" /><div className="project-webpage">
    <header><div><ChipMark compact /><strong>IoSC // Projects</strong></div><span>Select a project to view details</span></header>
    <div className="project-page-heading"><div><p>PROJECT SHOWCASE</p><h2>Curated club creations.</h2><span>Innovative software, AI solutions, web platforms, and IoT systems.</span></div><div className="project-orb"><Cpu /></div></div>
    <div className="project-browser-grid"><aside>{projects.map((item, index) => { const Icon = item.icon; return <button key={item.title} className={selected === index ? "active" : ""} onClick={() => setSelected(index)}><span style={{ backgroundColor: item.color }}><Icon /></span><p><strong>{item.title}</strong><small>{item.type}</small></p></button> })}</aside><article><div className="project-preview" style={{ "--project": project.color } as React.CSSProperties}><ProjectIcon /><span>{project.status}</span></div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags"><span>Club work</span><span>Student-built</span></div><p className="project-repo-note"><Github /> {project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "#164e91", textDecoration: "underline", fontWeight: 600 }}>{project.github}</a> : "Add the maintained repository link when the new project catalogue is ready."}</p></article></div>
  </div><div className="browser-status"><span>Done</span><div /><Globe2 /><span>Internet</span></div></div>;
}

function EventsApp({ openApp, eventsList, onRefresh, onRegisterClick }: { openApp: (id: AppId) => void; eventsList: typeof defaultEvents; onRefresh?: () => void; onRegisterClick?: () => void }) {
  const [view, setView] = useState<"Event archive" | "Highlights">("Event archive");
  return <div className="events-app"><MenuBar items={["File", "Edit", "View", "Tools", "Help"]} /><div className="events-period"><CalendarDays /> IoSC event archive · 2023—2026</div><div className="events-shell"><aside><div className="mini-calendar"><strong>October 2023</strong><div className="calendar-week">S M T W T F S</div><div className="calendar-days">{Array.from({ length: 31 }, (_, i) => <span className={i + 1 >= 10 && i + 1 <= 12 ? "active" : ""} key={i}>{i + 1}</span>)}</div></div><div className="event-filters"><button className={view === "Event archive" ? "active" : ""} onClick={() => setView("Event archive")}>Event archive</button><button className={view === "Highlights" ? "active" : ""} onClick={() => setView("Highlights")}>Highlights</button></div></aside><main><div className="events-heading"><h2>{view}</h2></div>{view === "Event archive" ? <div className="event-list">{eventsList.map(event => <article key={event.title}><div className="event-date" style={{ borderColor: event.accent }}><strong>{event.day}</strong><small>{event.month}</small></div><div><span style={{ color: event.accent }}>{event.type}</span><h3>{event.title}</h3><p><MapPin /> {event.place}</p></div></article>)}</div> : <div className="past-events"><Trophy /><h3>Learning through making.</h3><p>oneAPI introductions · HackMaze project building · DesignBlitz · coding and gaming competitions · speaker sessions · Vespera · AzinHack ’25</p><button onClick={() => openApp("archive")}>Open club timeline</button></div>}</main></div><div className="status-bar"><span>{view === "Event archive" ? `${eventsList.length} verified event records` : "Selected programme highlights"}</span><span>Archive view</span></div></div>;
}

function ArchiveApp() {
  return <div className="notepad-app"><MenuBar items={["File", "Edit", "Format", "View", "Help"]} /><div className="notepad-page" contentEditable suppressContentEditableWarning spellCheck={false}>
    <p>IoSC SYSTEM LOG<br />===============</p><p>Intel oneAPI Student Club — selected milestones.</p>
    <p><b>2023 — SYSTEM BOOT</b><br />IoSC GGSIPU-EDC is founded as a student technology community at the East Delhi Campus.</p>
    <p><b>2023 — oneAPI INTRODUCTION</b><br />The club presents an introductory workshop covering oneAPI toolkits and Intel DevCloud.</p>
    <p><b>10–12 OCT 2023 — HACKMAZE</b><br />A project-based hackathon challenges teams to explore, learn, and create with oneAPI. The programme moves from online prelims to an offline showcase.</p>
    <p><b>2023 — AZINTEK</b><br />The club’s first tech event brings together HackMaze, DesignBlitz, coding competitions, gaming events, and speaker sessions.</p>
    <p><b>2024 — VESPERA</b><br />IoSC and AWS Cloud Club GGSIPU organise a two-day campus tech fest.</p>
    <p><b>15–16 OCT 2025 — AZINHACK ’25</b><br />IoSC organises the 24-hour flagship hackathon of Elysian 2025 at USAR, GGSIPU EDC.</p>
    <p>_</p>
  </div><div className="notepad-status"><span>Ln 24, Col 1</span><span>100%</span><span>Windows (CRLF)</span><span>UTF-8</span></div></div>;
}

function JoinApp() {
  const links = [
    ["LinkedIn", "Official club updates and event announcements", "https://www.linkedin.com/company/iosc-usar/"],
    ["Instagram", "Photos, posters, and campus highlights", "https://instagram.com/iosc_edc"],
    ["YouTube", "Session recordings and club videos", "https://youtube.com/@IoSCUSAR"],
    ["All official links", "Open the IoSC GGSIPU-EDC Linktree", "https://linktr.ee/iosc_ggsipuedc"],
  ];
  return <div className="join-app overflow-y-auto p-2">
    <div className="join-header">
      <div className="messenger-people"><span /><span /></div>
      <div><strong>Connect with Intel oneAPI Student Club</strong><p>● Visit official channels and social media</p></div>
    </div>
    <div className="join-message my-3">
      <span>IoSC says:</span>
      <p>Follow the club’s verified public channels for new sessions, applications, hackathons, and campus announcements.</p>
    </div>
    {/* <div className="welcome-actions">
      {links.map(([title, description, href]) => (
        <a key={title} href={href} target="_blank" rel="noreferrer">
          <AppIcon id="join" size="menu" />
          <span><strong>{title}</strong><small>{description}</small></span>
          <ChevronRight />
        </a>
      ))}
    </div> */}
  </div>;
}

function AppContent({ id, openApp, eventsList, onRefresh, onRegisterClick }: { id: AppId; openApp: (id: AppId) => void; eventsList: typeof defaultEvents; onRefresh: () => void; onRegisterClick?: () => void }) {
  if (id === "welcome") return <WelcomeApp openApp={openApp} />;
  if (id === "about") return <AboutApp />;
  if (id === "projects") return <ProjectsApp />;
  if (id === "events") return <EventsApp openApp={openApp} eventsList={eventsList} onRefresh={onRefresh} onRegisterClick={onRegisterClick} />;
  if (id === "archive") return <ArchiveApp />;
  if (id === "team") return <TeamsApp />;
  if (id === "alumni") return <AlumniApp />;
  return <JoinApp />;
}

function StartMenu({ openApp, close, openGuide }: { openApp: (id: AppId) => void; close: () => void; openGuide: () => void }) {
  return <div className="start-menu">
    <div className="start-user"><div>i</div><strong>IoSC Club</strong></div>
    <div className="start-content"><div className="start-left">
      <button onClick={() => openApp("projects")}><AppIcon id="projects" size="menu" /><span><strong>Internet Explorer</strong><small>Browse club projects</small></span></button>
      {/* <button onClick={() => openApp("join")}><AppIcon id="join" size="menu" /><span><strong>IoSC Messenger</strong><small>Join the community</small></span></button><hr /> */}
      {(["events", "team", "alumni", "archive", "about"] as AppId[]).map(id => <button key={id} onClick={() => openApp(id)}><AppIcon id={id} size="menu" /><span><strong>{APP_META[id].short}</strong></span></button>)}
      <div className="all-programs">All Programs <ChevronRight /></div>
    </div><div className="start-right">
        {(["about", "team", "alumni", "projects", "events", "archive"] as AppId[]).map(id => <button key={id} onClick={() => openApp(id)}><AppIcon id={id} size="small" /><span>{APP_META[id].short}</span></button>)}
      </div></div>
    <div className="start-footer"><button onClick={openGuide}><img src="/assets/xp/icons/tour.png" alt="" /> Guided website</button><button onClick={close}><X /> Close menu</button></div>
  </div>;
}

function GuidedSite({ openDesktop, time, eventsList, onRefresh }: { openDesktop: (id?: AppId) => void; time: string; eventsList: typeof defaultEvents; onRefresh: () => void }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return <main className="guided-shell portal-shell relative">
    <div className="guided-browser-chrome">
      <div className="window-titlebar window-titlebar--active"><div className="window-title"><AppIcon id="projects" size="small" /><span>IoSC Home - Intel oneAPI Student Club - Internet Explorer</span></div><div className="window-controls"><button className="window-close" onClick={() => openDesktop()} aria-label="Open XP desktop"><X /></button></div></div>
      <MenuBar />
      <div className="guided-minimal-toolbar"><div className="address-bar"><span>Address</span><div><img src="/assets/xp/icons/earth.png" alt="" /><p>https://iosc.club/home</p></div></div><button onClick={() => openDesktop()}><img src="/assets/xp/icons/computer.png" alt="" /> Open XP Desktop</button></div>
    </div>

    <div className="portal-page">
      <header className="portal-header" id="top"><div className="portal-brand"><span>intel</span><div><strong>oneAPI Student Club</strong><small>IoSC · GGSIPU East Delhi Campus</small></div></div><div className="portal-utility"><a href="#club-timeline">Timeline</a><a href="#club-events">Events</a></div></header>
      <nav className="portal-nav"><span className="portal-nav-brand">IoSC</span><a href="#top" className="active">Home</a><a href="#about-club">About the club</a><a href="#tracks">What we do</a><a href="#club-projects">Projects</a><a href="#club-events">Events</a><a href="#club-timeline">Timeline</a><button onClick={() => openDesktop()}><img src="/assets/xp/icons/computer.png" alt="" /> XP Desktop</button></nav>
      <div className="portal-breadcrumb">IoSC Home &nbsp;›&nbsp; Welcome</div>

      <div className="portal-layout">
        <div className="portal-main">
          <section className="portal-hero">
            <div><p>INTEL oneAPI STUDENT CLUB · EDC</p><h1>Building dreams together.</h1><span>A future-focused, tech-driven community where students learn, experiment, and build across software, AI, robotics, design, games, and systems.</span><div><a href="#about-club">Explore IoSC</a></div></div>
            <div className="portal-code"><div><span /><span /><span />vector_add.cpp</div><pre><code>{`queue q;\nq.parallel_for(n, [=](id<1> i) {\n  c[i] = a[i] + b[i];\n});\nq.wait();`}</code></pre><small>oneAPI + SYCL</small></div>
          </section>

          <div className="portal-notice"><strong>From the archive:</strong> HackMaze turned oneAPI learning into a project-building journey. <button onClick={() => openDesktop("events")}>View event archive »</button></div>

          <section id="about-club" className="portal-section"><h2>About the club</h2><div className="portal-rule" /><p>IoSC-EDC is a community of people who love technology and innovative development across design, system integration, game development, robotics, web, management, and more.</p><p>Our mission is to bring hands-on education based on collaboration and real-life problem solving through workshops, hackathons, coding competitions, and networking sessions—building contemporary skills and industry insight along the way.</p><button className="portal-link" onClick={() => openDesktop("about")}><img src="/assets/xp/icons/computer.png" alt="" /> View club information</button></section>

          <section id="tracks" className="portal-section"><h2>What we do</h2><div className="portal-rule" /><div className="portal-track-list">{[["Workshops & bootcamps", "Hands-on introductions to oneAPI toolkits and a wide range of technical topics."], ["Hackathons & projects", "Build practical solutions, collaborate across disciplines, and present working ideas."], ["Coding & creative events", "Programming competitions, design challenges, gaming events, and technical showcases."], ["Talks & networking", "Learn from practitioners and connect technical work with contemporary industry insight."]].map(([title, text], index) => <article key={title}><b>{index + 1}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

          <section id="club-projects" className="portal-section"><div className="portal-section-title"><h2>Selected projects</h2><button onClick={() => openDesktop("projects")}>Open Projects in Internet Explorer</button></div><div className="portal-rule" /><div className="portal-project-table">{projects.map(project => { const Icon = project.icon; return <article key={project.title}><div style={{ backgroundColor: project.color }}><Icon /></div><section><h3>{project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }} className="hover:underline">{project.title}</a> : project.title}</h3><p>{project.description}</p><small>{project.type}</small></section><div style={{ display: "flex", alignItems: "center", gap: "8px" }}>{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" title="View repository on GitHub" style={{ color: "#154d84", display: "inline-flex", alignItems: "center" }}><Github style={{ width: 18, height: 18 }} /></a>}<span>{project.status}</span></div></article>; })}</div></section>

          <section id="club-events" className="portal-section">
            <div className="portal-section-title">
              <h2>Events Calendar</h2>
              <div className="flex items-center gap-2">
                {/* <button className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1 shadow" onClick={() => setShowFormModal(true)}>
                  📝 Register Now
                </button> */}
                <button onClick={() => openDesktop("events")}>Open event archive</button>
              </div>
            </div>
            <div className="portal-rule" />
            <table className="portal-events">
              <thead><tr><th>Date</th><th>Event</th><th>Type</th><th>Location</th></tr></thead>
              <tbody>{eventsList.map(event => <tr key={event.title}><td>{event.day} {event.month}</td><td><strong>{event.title}</strong></td><td>{event.type}</td><td>{event.place}</td></tr>)}</tbody>
            </table>
          </section>

          <section id="club-timeline" className="portal-section"><div className="portal-section-title"><h2>Club timeline</h2><button onClick={() => openDesktop("archive")}>Open timeline in Notepad</button></div><div className="portal-rule" /><div className="portal-track-list">{[["2023", "IoSC GGSIPU-EDC is founded and begins introducing students to oneAPI."], ["Oct 2023", "HackMaze runs as a project-based oneAPI hackathon; Azintek brings multiple technical and creative events together."], ["2024", "Vespera expands the campus programme into a two-day collaborative tech fest."], ["Oct 2025", "AzinHack ’25 runs as a 24-hour flagship hackathon at USAR."]].map(([title, text], index) => <article key={title}><b>{index + 1}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
        </div>

        <aside className="portal-sidebar">
          <section><h2>Club links</h2>
            {/* <button onClick={() => openDesktop("join")}><img src="/assets/xp/icons/messenger.png" alt="" /><span><strong>Join IoSC</strong><small>Membership interest form</small></span></button> */}
            <button onClick={() => openDesktop("projects")}><img src="/assets/xp/icons/folder.png" alt="" /><span><strong>Project archive</strong><small>Code, demos, and reports</small></span></button><button onClick={() => openDesktop("archive")}><img src="/assets/xp/icons/notepad.png" alt="" /><span><strong>Club timeline</strong><small>Past sessions and milestones</small></span></button></section>
          <section><h2>Campus</h2><div className="portal-meeting"><strong>GGSIPU East Delhi Campus</strong><span>University School of Automation and Robotics</span><p>133, Patel Street, Vishwas Nagar, Shahdara, New Delhi 110032.</p></div></section>
          <section><h2>Official channels</h2><ul><li><a href="https://www.linkedin.com/company/iosc-usar/" target="_blank" rel="noreferrer">LinkedIn ↗</a></li><li><a href="https://instagram.com/iosc_edc" target="_blank" rel="noreferrer">Instagram ↗</a></li><li><a href="https://youtube.com/@IoSCUSAR" target="_blank" rel="noreferrer">YouTube ↗</a></li><li><a href="https://linktr.ee/iosc_ggsipuedc" target="_blank" rel="noreferrer">All official links ↗</a></li></ul></section>
          <section className="portal-status"><h2>Club record</h2><p><i /> Founded in 2023</p><p><i /> Student technology community</p><p><i /> Workshops, projects &amp; hackathons</p></section>
        </aside>
      </div>

      <footer className="portal-footer"><div><strong>Intel oneAPI Student Club</strong><span>IoSC · Student chapter website</span></div><nav><a href="#about-club">About</a><a href="#club-projects">Projects</a><a href="#club-events">Events</a><button onClick={() => openDesktop()}>XP Desktop</button></nav><small>This student website is a design draft and is not an official Intel website.</small></footer>
    </div>

    <footer className="taskbar guided-taskbar"><button className="start-button" onClick={() => openDesktop()}><img src="/assets/xp/icons/windows.png" alt="" /><em>start</em></button><div className="quick-launch"><button title="Open XP desktop" onClick={() => openDesktop()}><img src="/assets/xp/icons/computer.png" alt="" /></button><button title="IoSC Home" onClick={() => document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" })}><img src="/assets/xp/icons/internet-explorer.png" alt="" /></button></div><div className="task-divider" /><div className="task-items"><button className="active" onClick={() => document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" })}><AppIcon id="projects" size="small" /><span>IoSC Home - Internet Explorer</span></button></div><div className="system-tray"><span className="tray-hide">‹</span><Wifi /><Music2 /><span>{time}</span></div></footer>

    {showFormModal && (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowFormModal(false)}>
        <div className="relative w-full max-w-2xl bg-slate-900 rounded-xl shadow-2xl border border-slate-800 p-2" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setShowFormModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
          <EventForm onSuccess={() => { setShowFormModal(false); onRefresh(); }} />
        </div>
      </div>
    )}

    {showRegisterModal && (
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center py-6 overflow-y-auto" onClick={() => setShowRegisterModal(false)}>
        <div className="relative mx-auto w-full max-w-2xl bg-[#ece9d8] rounded-xl border-4 border-[#0054e3] shadow-2xl p-3 max-h-[calc(100vh-3rem)] overflow-y-auto text-slate-900" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#7f9db9] pb-3 mb-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">📝</span> IoSC Event & Membership Registration
              </h3>
              <p className="text-xs text-slate-400">Submit your application to participate in upcoming events & workshops</p>
            </div>
            <button onClick={() => setShowRegisterModal(false)} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <JoinForm />
        </div>
      </div>
    )}
  </main>;
}

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>([{ id: "welcome", minimized: false, maximized: false, ...DEFAULT_POSITIONS.welcome }]);
  const [active, setActive] = useState<AppId>("welcome");
  const [selectedIcon, setSelectedIcon] = useState<AppId | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [viewMode, setViewMode] = useState<"guided" | "desktop">("guided");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const dragRef = useRef<{ id: AppId; dx: number; dy: number } | null>(null);

  const [eventsList, setEventsList] = useState(defaultEvents);

  const loadEvents = async () => {
    try {
      const res = await fetchEvents();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        const formatted = res.data.map(formatEventForDisplay);
        setEventsList(formatted);
      }
    } catch (err) {
      console.warn("Backend server offline or unreachable. Displaying fallback event list.", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date()));
    tick(); const timer = window.setInterval(tick, 30000); return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!dragRef.current || window.innerWidth < 700) return;
      const { id, dx, dy } = dragRef.current;
      setWindows(current => current.map(win => win.id === id ? { ...win, x: Math.max(0, event.clientX - dx), y: Math.max(0, event.clientY - dy) } : win));
    };
    const up = () => { dragRef.current = null; };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, []);

  const focusWindow = (id: AppId) => {
    setActive(id); setStartOpen(false); setContextMenu(null);
    setWindows(current => { const target = current.find(win => win.id === id); return target ? [...current.filter(win => win.id !== id), { ...target, minimized: false }] : current; });
  };
  const openApp = (id: AppId) => {
    const exists = windows.some(win => win.id === id);
    if (exists) focusWindow(id);
    else { setWindows(current => [...current, { id, minimized: false, maximized: false, ...DEFAULT_POSITIONS[id] }]); setActive(id); setStartOpen(false); }
  };
  const closeWindow = (id: AppId) => {
    setWindows(current => current.filter(win => win.id !== id));
    const next = [...windows].reverse().find(win => win.id !== id && !win.minimized); if (next) setActive(next.id);
  };
  const minimizeWindow = (id: AppId) => setWindows(current => current.map(win => win.id === id ? { ...win, minimized: true } : win));
  const maximizeWindow = (id: AppId) => setWindows(current => current.map(win => win.id === id ? { ...win, maximized: !win.maximized } : win));
  const startDrag = (id: AppId, event: React.PointerEvent) => {
    const win = windows.find(item => item.id === id); if (!win || win.maximized) return;
    focusWindow(id); dragRef.current = { id, dx: event.clientX - win.x, dy: event.clientY - win.y };
  };


  const openDesktop = (id?: AppId) => {
    setViewMode("desktop");
    if (id) openApp(id);
  };

  if (booting) return <BootScreen done={() => setBooting(false)} />;
  if (viewMode === "guided") return <GuidedSite openDesktop={openDesktop} time={time} eventsList={eventsList} onRefresh={loadEvents} />;

  return <main className="xp-desktop" onClick={() => { setSelectedIcon(null); setContextMenu(null); }} onContextMenu={(event) => { event.preventDefault(); setContextMenu({ x: event.clientX, y: event.clientY }); }}>
    <div className="wallpaper" aria-hidden="true"><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="hill hill-back" /><div className="hill hill-front" /><div className="wallpaper-shine" /></div>
    <SiliconOverlay />
    <div className="desktop-brand"><span>intel</span><strong>oneAPI Student Club</strong><small>CPU · GPU · AI · HPC</small></div>
    <div className="desktop-icons">
      {([
        "about",
        "projects",
        "events",
        "archive",
        "team",
        "alumni",
      ] as AppId[]).map(id => (
        <DesktopShortcut
          key={id}
          id={id}
          selected={selectedIcon === id}
          onSelect={() => setSelectedIcon(id)}
          onOpen={() => openApp(id)}
        />
      ))}
    </div>
    <button className="desktop-guide-toggle" onClick={(event) => { event.stopPropagation(); setViewMode("guided"); }}><img src="/assets/xp/icons/tour.png" alt="" /> Guided website</button>
    <div className="desktop-tip"><MousePointerIcon /><span>Double-click an icon<br />or use the Start menu</span></div>

    {windows.map((win, index) => !win.minimized && <section
      key={win.id}
      className={`xp-app-window ${win.maximized ? "xp-app-window--maximized" : ""}`}
      style={win.maximized ? { zIndex: 20 + index } : { left: win.x, top: win.y, zIndex: 20 + index }}
      onPointerDown={() => focusWindow(win.id)}
    >
      <TitleBar id={win.id} active={active === win.id} maximized={win.maximized} onFocus={() => focusWindow(win.id)} onMinimize={() => minimizeWindow(win.id)} onMaximize={() => maximizeWindow(win.id)} onClose={() => closeWindow(win.id)} onDragStart={(event) => startDrag(win.id, event)} />
      <div className="app-content"><AppContent id={win.id} openApp={openApp} eventsList={eventsList} onRefresh={loadEvents} onRegisterClick={() => setShowRegisterModal(true)} /></div>
    </section>)}

    {contextMenu && <div className="context-menu" style={{ left: contextMenu.x, top: contextMenu.y }} onClick={event => event.stopPropagation()}><button onClick={() => setViewMode("guided")}>Open guided website</button><hr /><button onClick={() => openApp("about")}>Club properties</button></div>}

    {startOpen && (
      <StartMenu openApp={openApp} close={() => setStartOpen(false)} openGuide={() => setViewMode("guided")} />
    )}
    <footer className="taskbar" onClick={event => event.stopPropagation()}>
      <button className={`start-button ${startOpen ? "pressed" : ""}`} onClick={() => setStartOpen(!startOpen)}><WindowsFlag small /><em>start</em></button>
      <div className="quick-launch"><button title="Show desktop" onClick={() => setWindows(current => current.map(win => ({ ...win, minimized: true })))}><img src="/assets/xp/icons/computer.png" alt="" /></button><button title="Guided website" onClick={() => setViewMode("guided")}><img src="/assets/xp/icons/internet-explorer.png" alt="" /></button></div>
      <div className="task-divider" />
      <div className="task-items">{windows.map(win => <button key={win.id} className={active === win.id && !win.minimized ? "active" : ""} onClick={() => win.minimized || active !== win.id ? focusWindow(win.id) : minimizeWindow(win.id)}><AppIcon id={win.id} size="small" /><span>{APP_META[win.id].short}</span></button>)}</div>
      <div className="system-tray"><span className="tray-hide">‹</span><Wifi /><Music2 /><span>{time}</span></div>
    </footer>

    {showRegisterModal && (
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center py-6 overflow-y-auto" onClick={() => setShowRegisterModal(false)}>
        <div className="relative mx-auto w-full max-w-2xl bg-[#ece9d8] rounded-xl border-4 border-[#0054e3] shadow-2xl p-3 max-h-[calc(100vh-3rem)] overflow-y-auto text-slate-900" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#7f9db9] pb-3 mb-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">📝</span> IoSC Event & Membership Registration
              </h3>
              <p className="text-xs text-slate-400">Submit your application to participate in upcoming events & workshops</p>
            </div>
            <button onClick={() => setShowRegisterModal(false)} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <JoinForm />
        </div>
      </div>
    )}
  </main>;
}

function MousePointerIcon() { return <span className="pixel-pointer">↖</span>; }

