// Organizer-confirmed facts and official participant links.
export const event = {
  name: "AZINHACK ’26",
  dates: '21–22 October 2026',
  registrationUrl: 'https://unstop.com/p/azinhack-2026-guru-gobind-singh-indraprastha-university-ggsipu-delhi-1763832',
  venue: 'GGSIPU USAR · East Delhi Campus',
  address: 'Surajmal Vihar, Delhi — 110092',
  prizePool: '₹1,00,000',
  tinyfishUrl: 'https://agent.tinyfish.ai/sign-up?ref=v1.dXNlcl8zSjZVdjFEZnBqUkEyM2RZMGFvWEI4Ykh3eVo.1WiZO3MiAIbHKbweb2v2wAGPqEUmjGfPQGFRGnPgvrM',
};

// Add new local photos here; the gallery and viewer expand automatically.
export const gallery = [
  { src: '/gallery/community-01.webp', alt: 'A large group cheering together on an auditorium stage.', caption: 'Good people. Great energy.' },
  { src: '/gallery/community-02.webp', alt: 'A group in black IoSC shirts behind the registration desk and yellow AZINHACK letters.', caption: 'Where it all begins.' },
  { src: '/gallery/community-03.webp', alt: 'A medal being presented on stage while others look on.', caption: 'A moment worth building for.' },
  { src: '/gallery/community-04.webp', alt: 'Medal recipients holding certificates in a group portrait on stage.', caption: 'Made of shared moments.' },
  { src: '/gallery/community-05.webp', alt: 'A large group seated and standing together on an auditorium stage.', caption: 'The community behind it all.' },
];

export const journey = [
  { phase: '01 / BEGIN', title: 'Meet. Think. Sketch.', text: 'Arrive, connect with the community, and turn a problem into a plan.', tags: 'CHECK IN / KICK OFF' },
  { phase: '02 / MAKE', title: 'Build through the night.', text: 'Make a prototype, test your assumptions, and give your idea a connection to the live web.', tags: 'BUILD / ITERATE' },
  { phase: '03 / SHOW', title: 'Make your idea heard.', text: 'Demo the solution, show TinyFish in action, and celebrate what you made.', tags: 'DEMO / CELEBRATE' },
];

export const faqs = [
  { q: 'When and where is AZINHACK?', a: '21–22 October 2026 at GGSIPU USAR, East Delhi Campus, Surajmal Vihar, Delhi. Final reporting times and room details will be announced by the organizers.' },
  { q: 'What can we build?', a: 'AZINHACK has one Open Innovation track. Choose a problem you care about and build a useful prototype. Final competition rules will be published by the organizers.' },
  { q: 'Is TinyFish integration required?', a: 'Yes. Every project must integrate TinyFish. Make its role clear in your project and demonstration. Use the TinyFish sign-up link on this page to create your account and prepare your integration.' },
  { q: 'How do I register?', a: 'Visit the official AZINHACK ’26 event page on Unstop and follow the registration instructions there.', link: event.registrationUrl, linkLabel: 'Register on Unstop' },
  { q: 'What is the team size?', a: 'Team size, eligibility, and participation requirements will be announced with the official registration details.' },
  { q: 'How will the prizes be distributed?', a: 'The total prize pool is ₹1,00,000. The final prize allocation and judging criteria will be announced by the organizers.' },
];

export interface OrganizerMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  team: string;
  image: string;
  github?: string;
  linkedin?: string;
  bio?: string;
  isSpecial?: boolean;
  objectPosition?: string;
}

export const organizers: OrganizerMember[] = [
  {
    id: "pranshu-bansal",
    name: "Pranshu Bansal",
    role: "Main Organizer & TinyFish Ambassador",
    badge: "MAIN ORGANIZER",
    team: "Main Organizer · TinyFish",
    image: "/assets/i7/Pranshu-speaking-1.jpeg",
    github: "https://github.com/Pranshu640",
    linkedin: "https://www.linkedin.com/in/pranshu-bansal-dev/",
    bio: "Main Organizer & TinyFish Student Ambassador",
    isSpecial: true,
  },
  {
    id: "piyush-gupta",
    name: "Piyush Gupta",
    role: "Organizer Head & IoSC Lead",
    badge: "ORGANIZER HEAD",
    team: "Club Leadership",
    image: "/assets/leads/Piyush Gupta.jpg",
    github: "https://github.com/Piyush-xo-19",
    linkedin: "https://www.linkedin.com/in/piyush-gupta-358800324/",
    bio: "Lead · Intel oneAPI Student Club",
  },
  {
    id: "armaan-sheikh",
    name: "Armaan",
    role: "Organizer Head & IoSC Co-Lead",
    badge: "ORGANIZER HEAD",
    team: "Club Leadership",
    image: "/assets/leads/IMG_20260612_211648_070 - Armaan _.jpg",
    linkedin: "https://www.linkedin.com/in/armaansheikhh/",
    bio: "Co-Lead · Intel oneAPI Student Club",
  },
  {
    id: "waqar-akhtar",
    name: "Waqar Akhtar",
    role: "Organizer Head & Technical Lead",
    badge: "ORGANIZER HEAD",
    team: "Technical Team",
    image: "/assets/leads/Waqar Akhtar.jpeg",
    github: "https://github.com/Waqar080206",
    linkedin: "https://www.linkedin.com/in/waqar08/",
    bio: "Technical Lead · Intel oneAPI Student Club",
  },
  {
    id: "rahul-bhatia",
    name: "Rahul Bhatia",
    role: "Organizer Head & Technical Co-Lead",
    badge: "ORGANIZER HEAD",
    team: "Technical Team",
    image: "/assets/leads/Rahul Bhatia.jpeg",
    github: "https://github.com/rahulbhatia775",
    linkedin: "https://www.linkedin.com/in/rahul-bhatia-9782802b2/",
    bio: "Technical Co-Lead · Intel oneAPI Student Club",
  },
  {
    id: "mayank-bisht",
    name: "Mayank Bisht",
    role: "Software Team Lead",
    badge: "TEAM LEAD",
    team: "i3 : Software Development",
    image: "/assets/i3/IMG-20250822-WA0032 - Mayank Bisht.jpg",
    github: "https://github.com/mayankbisht-tech",
    linkedin: "https://www.linkedin.com/in/mayankbisht011/",
    bio: "Software Development Lead",
  },
  {
    id: "pawan-yadav",
    name: "Pawan Yadav",
    role: "Software Team Co-Lead",
    badge: "TEAM CO-LEAD",
    team: "i3 : Software Development",
    image: "/assets/i3/Pawan Yadav.jpg",
    github: "https://github.com/pawanydv35",
    linkedin: "https://www.linkedin.com/in/pawan-yadav17/",
    bio: "Software Development Co-Lead",
  },
  {
    id: "akshat-talwar",
    name: "Akshat Talwar",
    role: "IoT & Embedded Team Lead",
    badge: "TEAM LEAD",
    team: "i5 : IoT & Embedded",
    image: "/assets/leads/image.png",
    github: "https://github.com/akshattalwar001",
    linkedin: "https://www.linkedin.com/in/akshat-talwar/",
    bio: "IoT & Embedded Systems Lead",
  },
  {
    id: "gurmehak-singh",
    name: "Gurmehak Singh",
    role: "IoT & Embedded Team Co-Lead",
    badge: "TEAM CO-LEAD",
    team: "i5 : IoT & Embedded",
    image: "/assets/i5/Gurmehak-Singh.png",
    github: "https://github.com/niggsingh20",
    linkedin: "https://www.linkedin.com/in/gurmehak-singh-484763364/",
    bio: "IoT & Embedded Systems Co-Lead",
    objectPosition: "center top",
  },
  {
    id: "manandeep-singh",
    name: "Manandeep Singh Lamba",
    role: "Gaming & Dev Team Lead",
    badge: "TEAM LEAD",
    team: "i7 : Gaming and Development",
    image: "/assets/i7/MANANDEEP SINGH LAMBA.jpeg",
    github: "https://github.com/ManandeepSingh1196",
    linkedin: "https://www.linkedin.com/in/manandeep-singh-lamba/",
    bio: "Gaming & Development Lead",
  },
  {
    id: "avish-choudhary",
    name: "Avish Choudhary",
    role: "AI Development Team Lead",
    badge: "TEAM LEAD",
    team: "i9 : AI Development",
    image: "/assets/i9/me - Avish Choudhary.png",
    github: "https://github.com/choudhary-avish20",
    linkedin: "https://www.linkedin.com/in/c2avish/",
    bio: "AI Development Lead",
  },
  {
    id: "dishita-sinha",
    name: "Dishita Sinha",
    role: "AI Development Team Co-Lead",
    badge: "TEAM CO-LEAD",
    team: "i9 : AI Development",
    image: "/assets/i9/DS.jpeg",
    github: "https://share.google/Av30hbYaudmSY48us",
    linkedin: "https://in.linkedin.com/in/dsinha007",
    bio: "AI Development Co-Lead",
  },
];

export interface CommunityPartner {
  id: string;
  name: string;
  role?: string;
  image: string;
  instagram?: string;
  linkedin?: string;
  description?: string;
}

export const communityPartners: CommunityPartner[] = [
  {
    id: "techspace-usict",
    name: "TechSpace USICT",
    role: "Community Partner",
    image: "/assets/community/techspace.jpeg",
    instagram: "https://www.instagram.com/techspace_usict?stkn=aXUweHkwa2hsdzJm",
    linkedin: "https://www.linkedin.com/company/techspace-usict/",
    description: "Official Tech Club of USICT · GGSIPU",
  },
];


