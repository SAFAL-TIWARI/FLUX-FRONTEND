/**
 * PURE JAVASCRIPT DATA OBJECT
 * No JSX allowed here to prevent SyntaxErrors.
 */

// Import Convenor Images 2025-26
import dhananjayImg from "../assets/convenors/2025-26/dhananjay.png";
import shrutiImg from "../assets/convenors/2025-26/shruti.jpg";
import snehaImg from "../assets/convenors/2025-26/sneha.jpg";
import yashwantImg from "../assets/convenors/2025-26/yashwant.jpeg";

// Import Co-Convenor Images 2025-26
import ashishImg from "../assets/co-convenors/2025-26/ashish.png";
import nitilImg from "../assets/co-convenors/2025-26/nitil.jpeg";
import ritikaImg from "../assets/co-convenors/2025-26/ritika.jpg";
import shreyaImg from "../assets/co-convenors/2025-26/shreya.jpg";

// Import Domain Heads Images 2025-26
import maheshHeadImg from "../assets/heads/web.jpeg";
import himanshuHeadImg from "../assets/heads/iot.jpeg";
import anshikaJainHeadImg from "../assets/heads/aiml.jpeg";
import aakanshHeadImg from "../assets/heads/design.jpeg";
import bhoomiHeadImg from "../assets/heads/media.jpeg";
import rajshreeHeadImg from "../assets/heads/content.jpeg";
import srijanHeadImg from "../assets/heads/event.jpeg";
import akashHeadImg from "../assets/heads/video.jpeg";
import vedanshHeadImg from "../assets/heads/pr.jpeg";

// Import Convenor Images 2026-27
import bhoomi26Img from "../assets/convenors/2026-27/bhoomi.jpeg";
import nitil26Img from "../assets/convenors/2026-27/nitil.jpeg";
import shreya26Img from "../assets/convenors/2026-27/shreya.jpg";
import srijan26Img from "../assets/convenors/2026-27/srijan.jpeg";

export const SESSIONS = ["2026-27", "2025-26"];

export const TEAM_DATA = {
  "2025-26": {
    convenors: [
      { 
        name: "Dhananjay Dubey", 
        role: "Convenor", 
        branch: "Information Technology",
        year: "Final Year",
        img: dhananjayImg, 
        link: "https://www.linkedin.com/in/dhananjaydubey20/", 
        bio: "The steady pulse of the system. A firm believer that true building happens when logic meets empathy, steering the team through high-pressure sprints with a focus on collective growth and architectural harmony." 
      },
      { 
        name: "Shruti Zunjarke", 
        role: "Convenor", 
        branch: "Computer Science and Engineering",
        year: "Final Year",
        img: shrutiImg, 
        link: "https://www.linkedin.com/in/shruti-zunjarke-7278bb269/", 
        bio: "The voice of the community. Crafting the Flux narrative to ensure that behind every line of code, there is a human story. Building environments where every member feels seen and inspired to create." 
      },
      { 
        name: "Sneha Gawande", 
        role: "Convenor", 
        branch: "Computer Science and Engineering",
        year: "Final Year",
        img: snehaImg, 
        link: "#", 
        bio: "The bridge between abstract ideas and reality. Nurturing the Flux ecosystem by turning individual curiosity into shared technical breakthroughs, proving that we build better when we build together." 
      },
      { 
        name: "Yashwant Singh Gour", 
        role: "Convenor", 
        branch: "IOT",
        year: "Final Year",
        img: yashwantImg, 
        link: "https://www.linkedin.com/in/yashwant-singh-gour/", 
        bio: "The guardian of the Flux spirit. Focusing on the long-term journey and mentoring the next generation of units to value the process of building as much as the final product." 
      },
    ],
    coConvenors: [
      { 
        name: "Ashish Suryavanshi", 
        role: "Co-Convenor", 
        branch: "CSE(Blockchain)", 
        year: "Pre-final Year",
        img: ashishImg,
        link: "https://www.linkedin.com/in/ashish-suryavanshi/",
        bio: "A believer in decentralized trust. Bringing an energy of transparency to Flux and encouraging a workspace where knowledge is shared freely as a building block for the future."
      },
      { 
        name: "Nitil Singh", 
        role: "Co-Convenor", 
        branch: "IOT", 
        year: "Pre-final Year",
        img: nitilImg,
        link: "https://www.linkedin.com/in/nitil-singh-400383326/",
        bio: "The connector. Thriving on the 'inter-connectedness' of the team, constantly finding new ways to sync different departments and keep the Flux environment moving in one fluid motion."
      },
      { 
        name: "Ritika Jain", 
        role: "Co-Convenor", 
        branch: "CSE(Blockchain)", 
        year: "Pre-final Year",
        img: ritikaImg,
        link: "https://www.linkedin.com/in/ritika-jain17/",
        bio: "The strategist of calm. Bringing balance to the intense building phases of Flux, ensuring that technical rigor never comes at the cost of the team's shared emotional well-being."
      },
      { 
        name: "Shreya Chahar", 
        role: "Co-Convenor", 
        branch: "CSE(Blockchain)", 
        year: "Pre-final Year",
        img: shreyaImg,
        link: "https://www.linkedin.com/in/shreya-chahar-07153929b/",
        bio: "The spark of innovation. Pushing the boundaries of what the team thinks is possible, turning 'what if' into 'what is' through relentless experimentation and a fearless building style."
      },
    ],
    heads: [
      {
        name: "Mahesh Kushwah",
        role: "Web Head",
        branch: "Electronics & Communication Engineering",
        year: "3rd Year",
        img: maheshHeadImg,
        link: "#",
        bio: "Architecting modern web experiences, responsive architectures, and scalable interfaces across the digital ecosystem."
      },
      {
        name: "Himanshu Deshmukh",
        role: "IOT Head",
        branch: "Electronics & Communication Engineering",
        year: "3rd Year",
        img: himanshuHeadImg,
        link: "#",
        bio: "Pioneering embedded hardware architectures, IoT sensor grids, and micro-controller automation systems."
      },
      {
        name: "Anshika Jain",
        role: "AI-ML Head",
        branch: "Artificial Intelligence & Data Science",
        year: "3rd Year",
        img: anshikaJainHeadImg,
        link: "#",
        bio: "Driving intelligence and cognitive data pipelines, exploring machine learning models and predictive algorithmic solutions."
      },
      {
        name: "Aakansh Meshram",
        role: "Designing Head",
        branch: "Computer Science & Engineering (Block Chain)",
        year: "3rd Year",
        img: aakanshHeadImg,
        link: "#",
        bio: "Crafting immersive visual identities, cyberpunk user interfaces, and brand design aesthetics for all Flux deployments."
      },
      {
        name: "Bhoomi Lakher",
        role: "Media Head",
        branch: "Information Technology",
        year: "3rd Year",
        img: bhoomiHeadImg,
        link: "#",
        bio: "Spearheading digital storytelling, media presence, and dynamic communication strategies across modern platforms."
      },
      {
        name: "Rajshree Potphode",
        role: "Content Head",
        branch: "Artificial Intelligence & Data Science",
        year: "3rd Year",
        img: rajshreeHeadImg,
        link: "#",
        bio: "Structuring high-impact technical narratives, editorial standards, and documentation for technical initiatives."
      },
      {
        name: "Srijan Shrivastava",
        role: "Event Head",
        branch: "Computer Science & Engineering",
        year: "3rd Year",
        img: srijanHeadImg,
        link: "#",
        bio: "Orchestrating high-octane technical events, hackathons, and operational workflows with precision execution."
      },
      {
        name: "Akash Tripathi",
        role: "Video & Promotion Head",
        branch: "Computer Science & Engineering (Block Chain)",
        year: "3rd Year",
        img: akashHeadImg,
        link: "#",
        bio: "Directing cinematic visual reels, promo campaigns, and multimedia showcases to amplify the Flux mission."
      },
      {
        name: "Vedansh Goyal",
        role: "Outreach & Collaboration Head",
        branch: "Artificial Intelligence & Data Science",
        year: "3rd Year",
        img: vedanshHeadImg,
        link: "#",
        bio: "Fostering strategic cross-institutional alliances, industry networking, and collaborative innovation initiatives."
      }
    ],
    thirdYear: [
      // { name: "Aakansh", branch: "CSE(Blockchain)", link: "#" },
      // { name: "Akash", branch: "CSE(Blockchain)", link: "#" },
      { name: "Anshika Gupta", branch: "Computer Science and Engineering", link: "#" },
      // { name: "Anshika Jain", branch: "AIADS", link: "#" },
      { name: "Anvesha Jain", branch: "AIADS", link: "#" },
      // { name: "Bhoomi", branch: "Information Technology", link: "#" },
      { name: "Harishchandra", branch: "Information Technology", link: "#" },
      // { name: "Himanshu", branch: "Electronics & Communication Engineering", link: "#" },
      // { name: "Mahesh", branch: "Electronics & Communication Engineering", link: "#" },
      { name: "Mahima", branch: "CSE(Blockchain)", link: "#" },
      { name: "Mohit", branch: "Information Technology", link: "#" },
      { name: "Praveen", branch: "CSE(Blockchain)", link: "#" },
      { name: "Rajshree", branch: "AIADS", link: "#" },
      { name: "Saloni", branch: "Computer Science and Engineering", link: "#" },
      { name: "Shivani", branch: "Computer Science and Engineering", link: "#" },
      // { name: "Srijan", branch: "Computer Science and Engineering", link: "#" },
      { name: "Swati", branch: "Computer Science and Engineering", link: "#" },
      // { name: "Vedansh", branch: "AIADS", link: "#" },
      { name: "Veer", branch: "CSE(Blockchain)", link: "#" }
    ],
  },
  "2026-27": {
    convenors: [
      { 
        name: "Bhoomi Lakher", 
        role: "Convenor", 
        branch: "IT",
        year: "Final year",
        img: bhoomi26Img, 
        link: "#", 
        bio: "Spearheading strategic IT execution and system coordination. Bridging the gap between technological complexity and collaborative team execution." 
      },
      { 
        name: "Nitil Singh", 
        role: "Convenor", 
        branch: "IOT",
        year: "Final year",
        img: nitil26Img, 
        link: "https://www.linkedin.com/in/nitil-singh-400383326/", 
        bio: "The connector and system strategist. Driving interconnected hardware-software domains and mentoring units toward holistic engineering excellence." 
      },
      { 
        name: "Shreya Chahar", 
        role: "Convenor", 
        branch: "BCT",
        year: "Final year",
        img: shreya26Img, 
        link: "https://www.linkedin.com/in/shreya-chahar-07153929b/", 
        bio: "The spark of innovation and blockchain leadership. Pushing boundaries through fearless technical execution and empowering the next wave of creators." 
      },
      { 
        name: "Srijan Shrivastav", 
        role: "Convenor", 
        branch: "CSE",
        year: "Final year",
        img: srijan26Img, 
        link: "#", 
        bio: "Architecting software workflows and developer ecosystems with modern paradigms, agile leadership, and deep technical rigor." 
      },
    ],
    coConvenors: [],
    heads: [],
    thirdYear: []
  },

  /* ===================== WORK ENVIRONMENT DESCRIPTION ===================== */
  environment: {
    culture: "Emotional Intelligence & Technical Flux",
    philosophy: "Building in the Flow",
    description: "In Flux, building isn't just about code; it's about the energy between people. Our environment is a living, breathing system where high-octane technical sprints coexist with deep mentorship and emotional support. We don't just build projects; we build ourselves, ensuring that as the technology evolves, the people behind it grow even faster."
  },

  galleryImages: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/flux_${i}/800/800`, 
    caption: `Flux Event #${i + 1}`
  }))
};