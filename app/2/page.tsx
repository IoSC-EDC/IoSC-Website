import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  Car,
  ChevronDown,
  CircuitBoard,
  Code2,
  Crown,
  Droplets,
  ExternalLink,
  HelpCircle,
  MapPin,
  ScrollText,
  Shield,
  Sparkles,
  Sword,
  TowerControl,
} from "lucide-react";
import "./material.css";

const projects = [
  {
    icon: Droplets,
    numeral: "I",
    title: "The Flow Watcher",
    actual: "HYDRO HEROES",
    text: "Real-time flow tracking engineered to predict leaks and maintain vigilant water quality monitoring.",
    tools: "IoT · Flow Tracking · Water Quality",
    github: "https://github.com/Waqar080206/Hydro-Heroes",
  },
  {
    icon: HelpCircle,
    numeral: "II",
    title: "The Arena of Inquiries",
    actual: "QUIZ PLAY",
    text: "An interactive UI platform empowering scholars to test their wits, track scores, and manage quiz data.",
    tools: "React · Interactive UI · Quiz Management",
    github: "https://github.com/prefierolasoledad/QuizApp",
  },
  {
    icon: Bot,
    numeral: "III",
    title: "The Code Sentinel",
    actual: "AI CODE REVIEW",
    text: "A full-stack AI-powered code review tool built with Node.js, React, and Google's Gemini API.",
    tools: "Node.js · React · Google Gemini API",
    github: "https://github.com/utkarsh-chauhannn/Ai-Code-Review",
  },
  {
    icon: Car,
    numeral: "IV",
    title: "The Chariot Ledger",
    actual: "DriveEasy",
    text: "A MERN stack-based car rental platform that enables users to easily browse, book, and manage vehicle rentals online.",
    tools: "MERN Stack · MongoDB · Express · React · Node.js",
    github: "https://github.com/AryanSachan12/vehicle-rental",
  },
];

const events = [
  { year: "2023", date: "10—12 Oct", title: "HackMaze", type: "Hackathon", place: "Online prelims · Offline showcase" },
  { year: "2023", date: "The first gathering", title: "Azintek", type: "Tech event", place: "GGSIPU East Delhi Campus" },
  { year: "2024", date: "Two days", title: "Vespera", type: "Campus tech fest", place: "USAR, GGSIPU EDC" },
  { year: "2025", date: "15—16 Oct", title: "AzinHack ’25", type: "24-hour hackathon", place: "USAR, GGSIPU EDC" },
];

const chronicles = [
  ["MMXXIII", "The guild is founded", "IoSC GGSIPU-EDC begins as a student technology community at the East Delhi Campus."],
  ["MMXXIII", "The first trials", "HackMaze and Azintek unite project building, competition, design, and technical exchange."],
  ["MMXXIV", "The gathering grows", "Vespera expands the programme into a collaborative two-day campus festival."],
  ["MMXXV", "AzinHack", "A twenty-four-hour flagship hackathon welcomes builders to the halls of USAR."],
];

function Crest({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`med-crest ${compact ? "med-crest--compact" : ""}`} aria-label="IoSC crest">
      <span className="med-crest-crown"><Crown /></span>
      <span className="med-crest-shield"><i>one</i><b>API</b><small>IoSC</small></span>
      <span className="med-crest-leaf med-crest-leaf-a" />
      <span className="med-crest-leaf med-crest-leaf-b" />
    </div>
  );
}

function Ornament() {
  return <div className="med-ornament" aria-hidden="true"><i /><span>✦</span><i /></div>;
}

export default function MedievalDesignPage() {
  return (
    <main className="med-page">
      <div className="med-paper-grain" aria-hidden="true" />

      <header className="med-header">
        <a href="#top" className="med-brand"><Crest compact /><span><b>IoSC</b><small>The Intel oneAPI Student Club</small></span></a>
        <nav aria-label="Main navigation">
          <a href="#guild">The Guild</a>
          <a href="#works">Great Works</a>
          <a href="#gatherings">Gatherings</a>
          <a href="#chronicle">Chronicle</a>
        </nav>
        <Link href="/" className="med-old-design">View Design I</Link>
      </header>

      <section id="top" className="med-hero">
        <div className="med-corner med-corner-tl" aria-hidden="true" /><div className="med-corner med-corner-tr" aria-hidden="true" />
        <div className="med-hero-copy">
          <p className="med-kicker">GGSIPU · EAST DELHI CAMPUS · EST. MMXXIII</p>
          <Ornament />
          <h1><span className="med-dropcap">W</span>here curious<br/>minds <em>build.</em></h1>
          <p className="med-deck">A fellowship of students exploring technology through craft, code, collaboration, and the oneAPI ecosystem.</p>
          <a href="#guild" className="med-scroll-link">Unroll the chronicle <ChevronDown /></a>
        </div>
        <div className="med-hero-emblem">
          <div className="med-sun med-sun-a" /><div className="med-sun med-sun-b" />
          <div className="med-emblem-ring"><span>INGENIUM</span><span>DISCIPLINA</span><span>CONCORDIA</span></div>
          <Crest />
          <p>ONE CLUB<br/><span>·</span> MANY DISCIPLINES <span>·</span></p>
        </div>
        <div className="med-hero-ribbon"><span>SOFTWARE</span><i>◆</i><span>ARTIFICIAL INTELLIGENCE</span><i>◆</i><span>ROBOTICS</span><i>◆</i><span>DESIGN</span><i>◆</i><span>SYSTEMS</span></div>
      </section>

      <section id="guild" className="med-guild med-section">
        <div className="med-section-number">CHAPTER THE FIRST</div>
        <div className="med-guild-title">
          <p>THE FELLOWSHIP</p>
          <h2>A guild for<br/>the <em>restless.</em></h2>
        </div>
        <div className="med-guild-copy">
          <p className="med-lead"><span>I</span>oSC-EDC brings together people who love technology and innovative development across design, system integration, game development, robotics, web, management, and more.</p>
          <p>Our purpose is hands-on education rooted in collaboration and real-life problem solving. Workshops, hackathons, coding competitions, bootcamps, and networking sessions turn curiosity into contemporary skills and industry insight.</p>
          <div className="med-signature"><i /><span>Learn · Make · Share</span><i /></div>
        </div>
        <aside className="med-guild-seal"><Shield /><b>Founded</b><strong>2023</strong><small>Student-led<br/>and multidisciplinary</small></aside>
      </section>

      <section className="med-pillars med-section">
        <div className="med-section-number med-light">THE THREE VIRTUES</div>
        <h2>The craft of<br/><em>becoming.</em></h2>
        <div className="med-pillar-grid">
          <article><span>I</span><Sword /><h3>Build bravely</h3><p>Take an idea beyond the page and shape it into a working technical project.</p></article>
          <article><span>II</span><ScrollText /><h3>Study deeply</h3><p>Explore oneAPI toolkits, modern workflows, and the reasoning beneath the system.</p></article>
          <article><span>III</span><Sparkles /><h3>Share freely</h3><p>Teach, compete, demonstrate, and grow through a community of fellow builders.</p></article>
        </div>
      </section>

      <section id="works" className="med-works med-section">
        <div className="med-section-number">CHAPTER THE SECOND</div>
        <div className="med-works-heading"><div><p>SELECTED WORKS</p><h2>Artefacts of<br/><em>the guild.</em></h2></div><p>Only a small selection is shown. Each panel is designed as a repeatable component for the next web team.</p></div>
        <div className="med-work-grid">
          {projects.map(({ icon: Icon, numeral, title, actual, text, tools, github }) => (
            <article key={actual}>
              <span className="med-work-numeral">{numeral}</span>
              <div className="med-work-icon"><Icon /></div>
              <small>{actual}</small>
              <h3>{title}</h3>
              <Ornament />
              <p>{text}</p>
              <footer>
                <span>{tools}</span>
                {github ? (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${actual} on GitHub`}
                    style={{ color: "inherit", display: "inline-flex", alignItems: "center" }}
                  >
                    <ExternalLink />
                  </a>
                ) : (
                  <ExternalLink />
                )}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section id="gatherings" className="med-events med-section">
        <div className="med-event-intro">
          <div className="med-section-number med-light">CHAPTER THE THIRD</div>
          <p>PAST GATHERINGS</p>
          <h2>When the halls<br/><em>came alive.</em></h2>
          <CalendarDays />
        </div>
        <div className="med-event-list">
          {events.map((event, index) => (
            <article key={event.title}>
              <div className="med-event-year"><span>0{index + 1}</span><b>{event.year}</b></div>
              <div><small>{event.type}</small><h3>{event.title}</h3><p><MapPin /> {event.place}</p></div>
              <time>{event.date}</time>
            </article>
          ))}
        </div>
      </section>

      <section id="chronicle" className="med-chronicle med-section">
        <div className="med-section-number">CHAPTER THE FOURTH</div>
        <div className="med-chronicle-title"><p>THE CLUB CHRONICLE</p><h2>Four leaves<br/>from our <em>story.</em></h2></div>
        <div className="med-chronicle-book">
          {chronicles.map(([year, title, text], index) => (
            <article key={`${year}-${title}`}>
              <span>{year}</span><i>{index + 1}</i><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="med-cta">
        <div className="med-cta-ornament" aria-hidden="true">❦</div>
        <p>THE NEXT CHAPTER AWAITS</p>
        <h2>Bring thy curiosity.</h2>
        <a href="https://linktr.ee/iosc_ggsipuedc" target="_blank" rel="noreferrer">Enter the fellowship <ArrowUpRight /></a>
      </section>

      <footer className="med-footer">
        <Crest compact />
        <div><strong>Intel oneAPI Student Club</strong><span>GGSIPU East Delhi Campus</span></div>
        <nav><a href="https://www.linkedin.com/company/iosc-usar/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://instagram.com/iosc_edc" target="_blank" rel="noreferrer">Instagram</a><a href="https://youtube.com/@IoSCUSAR" target="_blank" rel="noreferrer">YouTube</a></nav>
        <small>An independent student club concept · Not an official Intel website.</small>
      </footer>
    </main>
  );
}
