/* ===================== PROJECT ASSETS ===================== */
import roboticArmImg from '../assets/projects/robotic-hand.png';
import plantHealthImg from '../assets/projects/plant.png';
import mazeSolverImg from '../assets/projects/maze-solver.png';
import droneImg from '../assets/projects/drone.png';
import gamingGlovesImg from '../assets/projects/gaming-glub.png';
import ctfImg from '../assets/projects/ctf.png'; 
import fluxMailImg from '../assets/projects/bulk-mail.png'; 
import auctionImg from '../assets/projects/auction.png'; // Add your Auction asset here

const PROJECT_DATA = [
  {
    title: "Robotic Arm Prototype",
    description: "Design and fabrication of a 3D-printed robotic arm utilizing Arduino Uno and a custom MIT App Inventor GUI.",
    img: roboticArmImg,
    tech: ["Arduino", "3D Printing", "MIT App Inventor"]
  },
  {
    title: "IoT Plant Monitor",
    description: "Real-time health tracking system measuring soil moisture and humidity with cloud-sync capabilities.",
    img: plantHealthImg,
    tech: ["IoT", "Sensors", "LED Display"]
  },
  {
    title: "Maze Solver Bot",
    description: "Autonomous navigation unit engineered to solve complex pathing using AI-driven algorithmic logic.",
    img: mazeSolverImg,
    tech: ["Robotics", "AI Algorithms", "Sensors"]
  },
  {
    title: "Quadcopter Unit",
    description: "High-performance drone built on KK-2.1.5 flight controller with a 1km operational range.",
    img: droneImg,
    tech: ["Flight Control", "BLDC Motors", "RF"]
  },
  {
    title: "Haptic Gaming Gloves",
    description: "Wireless motion-control interface using accelerometer sensors for immersive digital interaction.",
    img: gamingGlovesImg,
    tech: ["Accelerometer", "Wireless", "Microcontrollers"]
  },
  {
    title: "CTF - Capture The Flag",
    description: "A web-based cybersecurity challenge. Investigators must hunt for hidden flags within source code.",
    img: ctfImg,
    tech: ["Web Security", "Steganography", "OSINT"]
  }, 
  {
    title: "FluxMail - Bulk Dispatcher",
    description: "A professional MERN-based campaign manager featuring Google Sheets integration, real-time analytics tracking, and personalized email templates via Nodemailer.",
    img: fluxMailImg,
    tech: ["MERN Stack", "Google Sheets API", "Nodemailer", "Tailwind"]
  },
  {
    title: "Flux Auction - Stack Bidding",
    description: "Real-time bidding platform where players compete for tech stacks. Winners submit project proposals utilizing their won stack in a post-auction phase.",
    img: auctionImg,
    tech: ["MERN Stack", "Socket.io", "Real-time Bidding"]
  }
];

export const PROJECTS_DATA = PROJECT_DATA;