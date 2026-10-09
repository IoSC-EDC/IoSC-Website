'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { event, faqs, gallery, journey, organizers, communityPartners } from '../../lib/event';

gsap.registerPlugin(ScrollTrigger);

function PixelStar({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" className={`pixel-star ${className}`} viewBox="0 0 32 32"><path fill="currentColor" d="M14 0h4v8h4v4h4v2h6v4h-6v2h-4v4h-4v8h-4v-8h-4v-4H6v-2H0v-4h6v-2h4V8h4z" /></svg>;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>[ {number} ]</span><span>{children}</span><span className="label-cross">+</span></div>;
}

export default function AzinhackPage() {
  const root = useRef<HTMLElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const galleryDialog = useRef<HTMLDialogElement>(null);
  const organizerWindowRef = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chapter, setChapter] = useState('01');
  const [motionPaused, setMotionPaused] = useState(false);
  const [organizerIndex, setOrganizerIndex] = useState(0);
  const [organizerHovered, setOrganizerHovered] = useState(false);

  const totalItems = organizers.length + 1;

  const scrollOrganizers = (direction: 'left' | 'right') => {
    if (!organizerWindowRef.current) return;
    const container = organizerWindowRef.current;
    const cardWidth = 334;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === 'right') {
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    } else {
      if (container.scrollLeft <= 20) {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    }
  };

  const handleOrganizerScroll = () => {
    if (!organizerWindowRef.current) return;
    const container = organizerWindowRef.current;
    const cardWidth = 334;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    setOrganizerIndex(Math.min(Math.max(0, newIndex), totalItems - 1));
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || motionPaused || organizerHovered) return;

    const timer = setInterval(() => {
      if (!organizerWindowRef.current) return;
      const container = organizerWindowRef.current;
      const cardWidth = 334;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 2200);

    return () => clearInterval(timer);
  }, [motionPaused, organizerHovered, totalItems]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ticker: ((time: number) => void) | undefined;
    if (!reduced && !motionPaused) {
      const smooth = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false });
      lenis.current = smooth;
      smooth.on('scroll', ScrollTrigger.update);
      ticker = (time) => smooth.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      ScrollTrigger.create({ trigger: root.current, start: 'top top', end: () => ScrollTrigger.maxScroll(window), refreshPriority: -20, onUpdate: self => gsap.set('.progress-fill', { scaleX: self.progress }) });
      document.querySelectorAll<HTMLElement>('[data-chapter]').forEach(section => {
        ScrollTrigger.create({ trigger: section, start: 'top center', end: 'bottom center', onEnter: () => setChapter(section.dataset.chapter!), onEnterBack: () => setChapter(section.dataset.chapter!) });
      });

      if (!reduced && !motionPaused) {
        gsap.from('.hero-title span', { yPercent: 105, duration: 1, ease: 'power3.out', stagger: 0.035, delay: 0.08 });
        gsap.from('.hero-art', { y: 65, opacity: 0, rotate: -7, duration: 1.1, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-intro, .hero-date, .hero-bottom', { y: 20, opacity: 0, duration: 0.65, stagger: 0.08, delay: 0.5, ease: 'power3.out' });

        media.add('(min-width: 1000px) and (min-height: 650px)', () => {
          const pin = (id: string, end: string) => ({ id: `scene-${id}`, trigger: `#${id}`, start: 'top top', end, pin: true, scrub: 0.75, anticipatePin: 1, invalidateOnRefresh: true });
          gsap.timeline({ scrollTrigger: pin('home', '+=65%') })
            .to('.hero-art', { y: -70, rotate: 6, scale: 1.05, ease: 'power1.inOut' }, 0)
            .to('.orbit', { rotate: 35, ease: 'power1.inOut' }, 0)
            .to('.hero-title', { y: -35, opacity: 0.35, ease: 'power1.inOut' }, 0)
            .to('.hero-sticker', { rotate: 10, x: 35, ease: 'power1.inOut' }, 0);
          gsap.timeline({ scrollTrigger: pin('about', '+=75%') })
            .from('.manifesto-line', { y: 70, opacity: 0.15, stagger: 0.2, ease: 'power2.out', duration: 0.7 })
            .from('.about-copy', { y: 35, opacity: 0, duration: 0.4 }, 0.5)
            .to('.about-symbol', { rotate: 90, scale: 1.15, ease: 'power1.inOut', duration: 1 }, 0);
          gsap.timeline({ scrollTrigger: pin('prizes', '+=60%') })
            .from('.prize-digit', { yPercent: 65, opacity: 0.2, stagger: 0.055, ease: 'power2.out', duration: 0.5 })
            .from('.prize-bottom', { y: 25, opacity: 0, duration: 0.4 }, 0.4)
            .to('.prize-stamp', { rotate: -20, ease: 'power1.inOut', duration: 1 }, 0);
          gsap.timeline({ scrollTrigger: pin('challenge', '+=45%') })
            .from('.challenge-heading', { y: 50, opacity: 0.2, ease: 'power2.out' })
            .from('.track-steps, .integration-card', { y: 35, opacity: 0, stagger: 0.15, ease: 'power2.out' }, 0.15);
          gsap.timeline({ scrollTrigger: pin('journey', '+=90%') })
            .from('.journey-card', { x: 50, opacity: 0.1, stagger: 0.35, duration: 0.5, ease: 'power2.out' })
            .to('.journey-number', { rotate: -8, scale: 0.94, ease: 'power1.inOut', duration: 1.3 }, 0);
          const track = document.querySelector<HTMLElement>('.gallery-track');
          const viewport = document.querySelector<HTMLElement>('.gallery-window');
          if (track && viewport) {
            gsap.to(track, { x: () => -(track.scrollWidth - viewport.clientWidth), ease: 'none', scrollTrigger: { ...pin('gallery', '+=100%'), end: () => `+=${Math.max(700, track.scrollWidth - viewport.clientWidth)}`, snap: { snapTo: 1 / (gallery.length - 1), duration: { min: 0.15, max: 0.45 }, delay: 0.18, directional: true } } });
          }
        });
        media.add('(max-width: 999px), (max-height: 649px)', () => {
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, { y: 25, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
        });
        gsap.from('.sponsor-card', { y: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '#sponsors', start: 'top 75%', once: true } });
        gsap.from('.fish-copy, .terminal', { y: 40, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: '#tinyfish', start: 'top 75%', once: true } });
        gsap.from('.community-card', { y: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '#community-partners', start: 'top 75%', once: true } });
        gsap.from('.organizer-card', { y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '#organizers', start: 'top 75%', once: true } });
      }
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, root);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => { media.revert(); context.revert(); if (ticker) gsap.ticker.remove(ticker); lenis.current?.destroy(); lenis.current = null; };
  }, [motionPaused]);

  const navigate = useCallback((id: string) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (!section) return;
    const scene = ScrollTrigger.getById(`scene-${id}`);
    const position = scene ? scene.start + (id === 'home' || id === 'gallery' ? 1 : (scene.end - scene.start) * 0.9) : window.scrollY + section.getBoundingClientRect().top - 78;
    if (lenis.current) lenis.current.scrollTo(position, { duration: 1.25 });
    else window.scrollTo({ top: Math.max(0, position), behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (photo !== null && !galleryDialog.current?.open) { galleryDialog.current?.showModal(); lenis.current?.stop(); }
  }, [photo]);

  const closePhoto = () => { galleryDialog.current?.close(); setPhoto(null); lenis.current?.start(); };
  const changePhoto = (step: number) => setPhoto(current => current === null ? 0 : (current + step + gallery.length) % gallery.length);

  return (
    <main ref={root}>
      <a className="skip-link" href="#about">Skip to event details</a>
      <header className="header">
        <button className="brand" onClick={() => navigate('home')} aria-label="AZINHACK home"><PixelStar /><span className="brand-word">AZIN<span className="brand-hack">HACK</span><span className="brand-year">’26</span></span></button>
        <nav id="mobile-nav" className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Main navigation">
          {[{ label: 'About', id: 'about' }, { label: 'Track', id: 'challenge' }, { label: 'Journey', id: 'journey' }, { label: 'Sponsors', id: 'sponsors' }, { label: 'Partners', id: 'community-partners' }, { label: 'Organizers', id: 'organizers' }, { label: 'Gallery', id: 'gallery' }].map(item => <a key={item.id} href={`#${item.id}`} onClick={e => { e.preventDefault(); navigate(item.id); }}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register now<span className="button-pixel" aria-hidden="true">✳</span></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? '−' : '+'}</button>
      </header>
      <div className="scroll-progress" aria-hidden="true"><div className="progress-fill" /></div>

      <section className="hero scene dot-grid" id="home" data-chapter="01">
        <div className="hero-top mono"><span>IoSC × GGSIPU USAR PRESENTS</span><span>A NATIONAL HACKATHON</span></div>
        <h1 className="hero-title" aria-label="AZINHACK ’26">{'AZINHACK'.split('').map((letter, index) => <span className={index >= 4 ? 'hack-letter' : undefined} aria-hidden="true" key={index}>{letter}</span>)}<sup>’26</sup></h1>
        <div className="hero-intro"><p className="eyebrow"><span className="square-mark" /> IDEAS INTO REALITY</p><h2>Your next big thing<br />starts with a <i>what if.</i></h2><p>24 hours to turn curiosity into code.<br />One open brief. A world of possibility.</p><a className="button button-blue" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register for AZINHACK<PixelStar /></a><span className="registration-note">Official event page on Unstop</span></div>
        <div className="hero-art-wrap"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><Image className="hero-art" src="/art/hand-star.webp" alt="A halftone hand reaching toward an electric-blue star." width={1254} height={1254} priority /><span className="art-coordinate mono">FIG. 01 — THE SPARK</span></div>
        <div className="hero-date"><span className="mono">SAVE THE DATE</span><strong>21—22</strong><span className="date-month">OCTOBER 2026</span><a href="/azinhack-26.ics" download className="text-link">Add to calendar <span aria-hidden="true">+</span></a></div>
        <div className="hero-sticker"><span>24 HOURS</span><PixelStar /><span>MAKE IT REAL</span></div>
        <div className="hero-bottom mono"><span>GGSIPU USAR<br />EAST DELHI CAMPUS</span><button onClick={() => navigate('about')} className="scroll-cue"><span className="scroll-mouse" />SCROLL TO EXPLORE</button><span>OPEN INNOVATION<br />POWERED BY <a className="tinyfish-reference" href={event.tinyfishUrl} target="_blank" rel="noopener noreferrer">TINYFISH ↗</a></span></div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track"><span>THINK BIG</span><PixelStar /><span>BUILD SOMETHING REAL</span><PixelStar /><span>BREAK THE ORDINARY</span><PixelStar /><span>THINK BIG</span><PixelStar /><span>BUILD SOMETHING REAL</span><PixelStar /><span>BREAK THE ORDINARY</span><PixelStar /></div></div>

      <section className="about scene" id="about" data-chapter="02">
        <SectionLabel number="01">THE IDEA BEHIND IT ALL</SectionLabel>
        <div className="manifesto" data-reveal><h2><span className="manifesto-line">YOUR <i>WHAT IF.</i></span><span className="manifesto-line">OUR <i>WHY NOT.</i></span></h2></div>
        <div className="about-bottom"><PixelStar className="about-symbol" /><div className="about-copy" data-reveal><p>Some ideas deserve more than a note on your phone.</p><p>AZINHACK brings curious builders together for an overnight sprint of problem solving, collaboration, and making things happen. Take a problem you care about. Leave with a prototype worth keeping.</p><div className="about-facts mono"><span>24 HOURS</span><span>OPEN INNOVATION</span><span>ONE COMMUNITY</span></div></div></div>
        <div className="frame-corner corner-left" /><div className="frame-corner corner-right" />
      </section>

      <section className="prizes scene dot-grid" id="prizes" data-chapter="03">
        <SectionLabel number="02">BIG IDEAS. REAL REWARDS.</SectionLabel>
        <div className="prize-top"><h2>Total prize pool.</h2><span className="mono">₹1 LAKH IN TOTAL</span></div>
        <div className="prize-amount" role="img" aria-label="Total prize pool: 1 lakh rupees" data-reveal><span className="rupee" aria-hidden="true">₹</span>{'1,00,000'.split('').map((digit, i) => <span className="prize-digit" aria-hidden="true" key={i}>{digit}</span>)}</div>
        <div className="prize-bottom"><div><h3>₹1,00,000 in total prizes.</h3><p>This is the total prize pool for AZINHACK ’26.<br />Final prize distribution will be announced.</p></div><div className="prize-stamp"><PixelStar /><span className="mono">BUILT WITH<br />POSSIBILITY</span></div><span className="prize-code mono">REWARD_PROTOCOL<br />AZINHACK_2026</span></div>
      </section>

      <section className="challenge scene" id="challenge" data-chapter="04" aria-labelledby="track-title">
        <SectionLabel number="03">TRACK & REQUIREMENTS</SectionLabel>
        <div className="challenge-layout">
          <div className="challenge-heading" data-reveal>
            <span className="tag">ONE TRACK · ANY DOMAIN</span>
            <h2 id="track-title">OPEN<br /><i>INNOVATION.</i></h2>
            <p>Choose any real-world problem and build a useful prototype. Every team competes in the same Open Innovation track.</p>
            <ol className="track-steps">
              <li><span className="mono">01</span><span>Pick a problem you want to solve.</span></li>
              <li><span className="mono">02</span><span>Build your solution with TinyFish.</span></li>
              <li><span className="mono">03</span><span>Demo your prototype and its TinyFish integration.</span></li>
            </ol>
            <p className="track-examples">Need an idea? Try a scholarship finder, a recycling resource finder, or a research assistant. These are examples within the same track.</p>
          </div>
          <div className="integration-card" data-reveal>
            <div className="integration-banner mono"><PixelStar /><span>REQUIRED FOR EVERY PROJECT</span></div>
            <Image className="integration-logo" src="/sponsors/tinyfish.svg" alt="TinyFish" width={731} height={166} />
            <h3>TinyFish integration<br />is mandatory.</h3>
            <p>Your prototype must use TinyFish to interact with the live web. Show what it does and how it helps solve your chosen problem in your demo.</p>
            <a className="button button-orange" href={event.tinyfishUrl} target="_blank" rel="noopener noreferrer">Create your TinyFish account<PixelStar /></a>
            <span className="integration-note mono">START HERE. BUILD IT INTO YOUR IDEA.</span>
          </div>
        </div>
      </section>

      <section className="journey scene" id="journey" data-chapter="05">
        <SectionLabel number="04">FROM FIRST THOUGHT TO FINAL DEMO</SectionLabel>
        <div className="journey-layout"><div className="journey-heading" data-reveal><h2>A DAY TO<br /><i>MAKE YOURS.</i></h2><div className="journey-number">24<span>HRS</span></div><p>21–22 OCTOBER 2026</p><span className="schedule-note mono">DETAILED SCHEDULE COMING SOON</span></div><div className="journey-cards">{journey.map(item => <article className="journey-card" key={item.phase} data-reveal><div className="journey-card-top mono"><span>{item.phase}</span><PixelStar /></div><h3>{item.title}</h3><p>{item.text}</p><span className="journey-tags mono">{item.tags}</span></article>)}</div></div>
      </section>

      <section className="sponsors-section" id="sponsors" data-chapter="06" aria-labelledby="sponsors-title">
        <SectionLabel number="05">OUR SPONSORS</SectionLabel>
        <div className="sponsors-heading"><h2 id="sponsors-title">BACKING THE<br /><i>NEXT BIG THING.</i></h2><p className="mono">THE PEOPLE HELPING<br />POSSIBILITY TAKE SHAPE.</p></div>
        <div className="sponsor-grid">
          <a className="sponsor-card sponsor-title" href={event.tinyfishUrl} target="_blank" rel="noopener noreferrer" aria-label="TinyFish, title sponsor. Create your TinyFish account.">
            <div className="sponsor-tier"><span>TITLE SPONSOR</span><PixelStar /></div>
            <div className="sponsor-logo"><Image src="/sponsors/tinyfish.svg" alt="TinyFish" width={731} height={166} /></div>
            <div className="sponsor-card-bottom"><span>GET STARTED WITH TINYFISH</span><span aria-hidden="true">↗</span></div>
          </a>
          <a className="sponsor-card" href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" aria-label="Docker, sponsor. Visit Docker's website.">
            <div className="sponsor-tier"><span>SPONSOR</span><PixelStar /></div>
            <div className="sponsor-logo"><Image src="/sponsors/docker.svg" alt="Docker" width={1250} height={268} /></div>
            <div className="sponsor-card-bottom"><span>EXPLORE DOCKER</span><span aria-hidden="true">↗</span></div>
          </a>
        </div>
      </section>

      <section className="tinyfish" id="tinyfish" data-chapter="06">
        <SectionLabel number="06">BUILD WITH TINYFISH</SectionLabel>
        <div className="fish-layout"><div className="fish-copy"><a className="fish-brand" href={event.tinyfishUrl} target="_blank" rel="noopener noreferrer" aria-label="Create your TinyFish account"><Image src="/sponsors/tinyfish.svg" alt="TinyFish" width={731} height={166} /></a><h2>A BIG IDEA.<br />A <i>TINY FISH.</i></h2><p>Give your idea a connection to the live web. Discover information, read pages, or automate a useful website workflow.</p><p className="fish-requirement">Every AZINHACK project must integrate TinyFish.</p><a className="button button-dark" href={event.tinyfishUrl} target="_blank" rel="noopener noreferrer">Get started with TinyFish<PixelStar /></a></div><div className="terminal"><div className="terminal-bar mono"><span><i /><i /><i /></span><span>IDEA_TO_REALITY.ts</span><span>+</span></div><div className="terminal-body"><p className="terminal-comment">// good ideas need real-world input</p><p><span className="code-blue">const</span> problem = <span className="code-white">"something that matters"</span>;</p><p><span className="code-blue">const</span> possibility = <span className="code-white">"the live web"</span>;</p><p className="terminal-spacer"><span className="code-blue">build</span>({'{'}<br />&nbsp; yourIdea,<br />&nbsp; <span className="code-white">tinyfish</span><br />{'}'});</p><p className="terminal-comment">// make something worth showing<span className="terminal-cursor">▋</span></p></div><div className="terminal-resources mono"><a href="https://docs.tinyfish.ai/" target="_blank" rel="noopener noreferrer">DOCUMENTATION</a><a href={event.tinyfishUrl} target="_blank" rel="noopener noreferrer">CREATE AN ACCOUNT ↗</a></div></div></div>
      </section>

      <section className="community-section scene" id="community-partners" data-chapter="07">
        <SectionLabel number="07">GROWING TOGETHER</SectionLabel>
        <div className="community-heading" data-reveal>
          <h2>COMMUNITY<br /><i>PARTNERS.</i></h2>
          <p className="mono">THE ORGANIZATIONS & CLUBS<br />BUILDING WITH US.</p>
        </div>
        <div className="community-grid">
          {communityPartners.map((partner) => (
            <article className="community-card" key={partner.id} data-reveal>
              <div className="community-card-top">
                <span>{partner.role || 'COMMUNITY PARTNER'}</span>
                <PixelStar />
              </div>
              <div className="community-partner-body">
                <div className="community-logo-wrap">
                  <Image src={partner.image} alt={partner.name} width={400} height={400} />
                </div>
                <div className="community-partner-info">
                  <h3>{partner.name}</h3>
                  {partner.description && <p>{partner.description}</p>}
                </div>
              </div>
              <div className="community-socials">
                {partner.instagram && (
                  <a href={partner.instagram} target="_blank" rel="noopener noreferrer" className="community-social-btn">
                    INSTAGRAM ↗
                  </a>
                )}
                {partner.linkedin && (
                  <a href={partner.linkedin} target="_blank" rel="noopener noreferrer" className="community-social-btn">
                    LINKEDIN ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="organizers-section scene dot-grid" id="organizers" data-chapter="08">
        <SectionLabel number="08">THE MINDS BEHIND AZINHACK</SectionLabel>
        <div className="organizers-header" data-reveal>
          <div>
            <h2>MEET THE<br /><i>ORGANIZERS.</i></h2>
            <p className="mono" style={{ marginTop: '12px', color: '#586779' }}>LEADERSHIP · TINYFISH AMBASSADOR · TEAM LEADS & CO-LEADS</p>
          </div>
          <div className="organizers-controls">
            <span className="organizers-counter">{String(organizerIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}</span>
            <button className="organizer-nav-btn" onClick={() => scrollOrganizers('left')} aria-label="Previous organizer">←</button>
            <button className="organizer-nav-btn" onClick={() => scrollOrganizers('right')} aria-label="Next organizer">→</button>
          </div>
        </div>

        <div
          className="organizer-window"
          ref={organizerWindowRef}
          onScroll={handleOrganizerScroll}
          onMouseEnter={() => setOrganizerHovered(true)}
          onMouseLeave={() => setOrganizerHovered(false)}
          onTouchStart={() => setOrganizerHovered(true)}
          onTouchEnd={() => setOrganizerHovered(false)}
          data-lenis-prevent
        >
          <div className="organizer-track">
            {organizers.map((member) => {
              const isHead = member.badge === 'ORGANIZER HEAD' || member.badge === 'MAIN ORGANIZER';
              const isSpecial = member.isSpecial;
              return (
                <article key={member.id} className={`organizer-card ${isSpecial ? 'is-special' : ''} ${isHead ? 'is-head' : ''}`}>
                  <div className="organizer-card-badge">
                    <span className="badge-tag">{member.badge}</span>
                    <PixelStar />
                  </div>
                  <div className="organizer-img-wrap">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      sizes="(max-width: 700px) 70vw, 320px"
                      style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
                    />
                  </div>
                  <div className="organizer-card-body">
                    <div>
                      <div className="organizer-team-tag">{member.team}</div>
                      <h3 className="organizer-name">{member.name}</h3>
                      <div className="organizer-role">{member.role}</div>
                      {member.bio && <p className="organizer-bio">"{member.bio}"</p>}
                    </div>
                    <div className="organizer-socials">
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="organizer-social-btn">
                          GITHUB ↗
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="organizer-social-btn">
                          LINKEDIN ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            <article className="organizer-card is-redirect-card">
              <div className="organizer-card-badge">
                <span className="badge-tag">FULL DIRECTORY</span>
                <PixelStar />
              </div>
              <div className="redirect-card-body">
                <div>
                  <div className="redirect-icon-box">
                    <PixelStar />
                  </div>
                  <div className="organizer-team-tag">INTEL oneAPI STUDENT CLUB</div>
                  <h3 className="organizer-name">Explore All Teams</h3>
                  <p className="organizer-bio" style={{ fontStyle: 'normal', marginTop: '8px' }}>
                    Discover all team leads, co-leads, core members, and mentors across software, IoT, gaming, and AI.
                  </p>
                </div>
                <a href="/?app=team" className="button button-blue redirect-btn">
                  View Teams Page <PixelStar />
                </a>
              </div>
            </article>
          </div>
        </div>

        <div className="organizers-bottom-link mono" data-reveal>
          <span>WANT TO MEET THE ENTIRE COMMUNITY?</span>
          <a href="/?app=team" className="text-link">SEE FULL TEAM DIRECTORY & MEMBERS <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="faq-section" id="faq" data-chapter="09"><SectionLabel number="09">BEFORE YOU BUILD</SectionLabel><div className="faq-layout"><div><h2>GOOD<br /><i>QUESTIONS.</i></h2><p>A few things to know<br />before the first line of code.</p></div><div className="faq-list">{faqs.map((item, i) => <details key={item.q} onToggle={() => ScrollTrigger.refresh()}><summary><span className="faq-index mono">0{i + 1}</span><span>{item.q}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.a}{item.link && <><br /><a className="text-link" href={item.link} target="_blank" rel="noopener noreferrer">{item.linkLabel} ↗</a></>}</p></details>)}</div></div></section>

      <section className="gallery-section scene" id="gallery" data-chapter="10">
        <SectionLabel number="10">FROM THE COMMUNITY</SectionLabel>
        <div className="gallery-heading"><h2>GOOD PEOPLE.<br /><i>GREAT POSSIBILITIES.</i></h2><span className="mono">THE COMMUNITY ARCHIVE<br />SCROLL. EXPLORE. REMEMBER.</span></div>
        <div className="gallery-window" data-lenis-prevent><div className="gallery-track">{gallery.map((item, i) => <button className="photo-card" key={item.src} onClick={() => setPhoto(i)} aria-label={`Open photo ${i + 1}: ${item.alt}`}><div className="photo-image"><Image src={item.src} alt={item.alt} width={1600} height={1200} sizes="(max-width: 700px) 85vw, 48vw" /><span className="photo-expand" aria-hidden="true">+</span></div><div className="photo-caption"><span className="mono">FRAME_0{i + 1}</span><span>{item.caption}</span></div></button>)}</div></div>
        <div className="gallery-bottom mono"><span>THE PEOPLE BEHIND THE POSSIBILITY.</span><span>CLICK A FRAME TO TAKE A CLOSER LOOK</span></div>
      </section>

      <footer><div className="footer-top"><div><span className="mono">21–22 OCTOBER · GGSIPU USAR</span><h2>GOT A <i>WHAT IF?</i><br />LET’S BUILD IT.</h2></div><a className="button button-white" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register now<PixelStar /></a></div><div className="footer-word" aria-label="AZINHACK ’26"><span className="footer-name">AZIN<span className="footer-hack">HACK</span></span><span className="footer-year">’26</span></div><div className="footer-bottom mono"><span>ORGANIZED BY IoSC<br />INTEL oneAPI STUDENT CLUB · GGSIPU EDC</span><a href="/azinhack-26.ics" download>SAVE THE DATE</a><button className="motion-control" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? 'ENABLE MOTION' : 'PAUSE MOTION'}</button><button onClick={() => navigate('home')}>BACK TO TOP +</button></div></footer>
      <div className="chapter-indicator mono" aria-hidden="true"><span>{chapter}</span><span>/ 10</span></div>

      <dialog ref={galleryDialog} className="gallery-dialog" aria-label="Community photo viewer" data-lenis-prevent onCancel={e => { e.preventDefault(); closePhoto(); }} onClose={() => { setPhoto(null); lenis.current?.start(); }} onClick={e => { if (e.target === e.currentTarget) closePhoto(); }} onKeyDown={e => { if (e.key === 'ArrowRight') changePhoto(1); if (e.key === 'ArrowLeft') changePhoto(-1); }}><button className="dialog-close" onClick={closePhoto} aria-label="Close photo viewer">×</button>{photo !== null && <><Image src={gallery[photo].src} alt={gallery[photo].alt} width={1600} height={1200} sizes="95vw" /><div className="viewer-bottom"><button onClick={() => changePhoto(-1)} aria-label="Previous photo">PREV</button><span>{gallery[photo].caption}<small className="mono">{String(photo + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</small></span><button onClick={() => changePhoto(1)} aria-label="Next photo">NEXT</button></div></>}</dialog>
    </main>
  );
}


