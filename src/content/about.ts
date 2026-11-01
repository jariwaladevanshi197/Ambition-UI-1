import type { PageSection } from "@/components/admin/types";

// Built-in content for "/about" (see content/home.ts for how it's used).
// Card titles written "A — B" are split into two fields by the page
// (milestone year — title, person — role, MISSION — heading).
export const ABOUT_SECTIONS: PageSection[] = [
  {
    id: "default-about-0",
    type: "text",
    label: "Hero Carousel (5 rotating slides)",
    visible: true,
    heading: "Hero Carousel",
    body: "1. Coal Trading — \"Powering Industries Across India\" (10M+ Tonnes Delivered, 50+ Cities Served)\n2. Port Operations — \"Stevedoring & Port Logistics\" (15+ Indian Ports, Rapid Turnaround)\n3. Sustainability — \"Building a Greener Energy Future\" (Responsible Trading & Sourcing)\n4. Global Reach — \"Mine to Market Worldwide\" (Asian and African Markets)\n5. CSR Impact — \"Growing Together\" (6 Adopted Schools, 1,300+ Students, 11,000+ Eco Initiatives)",
  },
  {
    id: "default-about-1",
    type: "cards",
    label: "Our Journey — Milestones",
    visible: true,
    cards: [
      {
        title: "2008 — Foundation",
        desc: "Ambition Coal started operations in Surat, Gujarat with a vision to strengthen India's coal supply chain. From a small trading desk, we grew into a nationally trusted energy company.",
      },
      {
        title: "2013 — Karnataka",
        desc: "Expanded operations to Karnataka, supplying power plants, cement factories, and industrial consumers across South India.",
      },
      {
        title: "2017 — West Coast",
        desc: "Expanded across the West Coast of India with handling operations at Kandla, Mumbai, and coastal ports.",
      },
      {
        title: "2018 — Global Reach",
        desc: "Expanded to the East Coast of India with direct mine partnerships across Asia and Africa (Indonesia, South Africa, Zimbabwe, Kenya).",
      },
      {
        title: "2025+ — Future Vision",
        desc: "Expanding into minerals, industrial salt, and cleaner energy transition solutions to power India's next generation.",
      },
    ],
  },
  {
    id: "default-about-2",
    type: "cards",
    label: "Mission & Vision",
    visible: true,
    cards: [
      {
        title: "Mission — Why We Exist",
        icon: "target",
        desc: "To supply an energy mix that is competitive, environment-friendly and adds value to customers — and hence become a trusted preferred supplier. Customer satisfaction is our sole motive.",
      },
      {
        title: "Vision — Where We're Going",
        icon: "telescope",
        desc: "To earn the consistent trust of our customers by providing quality, quantity and service consistency in every aspect of coal supply — growing day by day as a one-way coal solution.",
      },
    ],
  },
  {
    id: "default-about-3",
    type: "cards",
    label: "Leadership Team",
    visible: true,
    cards: [
      {
        title: "Mr. Jayesh Agrawal — Director & Promoter",
        desc: "With more than 15 years in coal trading and supply, Jayesh has grown Ambition Coal from Surat into a pan-India coal company. His relationships with international suppliers and port operators underpin our sourcing strength.",
      },
      {
        title: "Mrs. Yashika Agrawal — Director & Promoter",
        desc: "Yashika brings strategic clarity and operational discipline to our growth. Focused on CSR, compliance and sustainable practices, she ensures our impact extends beyond commerce — powering communities alongside industries.",
      },
    ],
  },
  {
    id: "default-about-4",
    type: "cards",
    label: "Why Choose Us",
    visible: true,
    cards: [
      {
        title: "Competitive Pricing",
        icon: "badge-dollar",
        desc: "Prices kept as low as possible while maintaining the quality our customers demand.",
      },
      {
        title: "Global Sourcing",
        icon: "globe",
        desc: "Coal imported from Indonesia, South Africa and other international sources, with markets across Asia and Africa.",
      },
      {
        title: "Quality Assurance",
        icon: "flask",
        desc: "Quality assured from the mines all the way to your plants and factories.",
      },
      {
        title: "One-Way Solution",
        icon: "layers",
        desc: "Trading, import, port handling, yard & stocking and road & rail transport — all managed.",
      },
      {
        title: "On-Time Delivery",
        icon: "timer-reset",
        desc: "We recognise the importance of delivering ahead of schedule.",
      },
      {
        title: "Ethical Business",
        icon: "handshake",
        desc: "We strictly follow ethical principles and abide by all laws and regulations.",
      },
    ],
  },
  {
    id: "default-about-5",
    type: "stats",
    label: "Trust Stats",
    visible: true,
    stats: [
      { value: "15+", label: "Years Experience" },
      { value: "10M+", label: "Tonnes Delivered" },
      { value: "50+", label: "Cities Served" },
      { value: "15+", label: "Indian Ports" },
    ],
  },
];
