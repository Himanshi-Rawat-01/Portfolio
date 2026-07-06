import { FaCss3Alt, FaHtml5, FaJs, FaPhp, FaPython, FaReact } from 'react-icons/fa';
import { SiFlask, SiMysql } from 'react-icons/si';
import aqiDashboardImage from '../assets/projects/aqi-dashboard.png';
import dentalSiteImage from '../assets/projects/Dental-site.png';
import ecommerceImage from '../assets/projects/ecommerce-website.svg';
import environmentImage from '../assets/projects/enviroaware.png';
import pawImage from '../assets/projects/paw-adoption.svg';

export const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const skillIcons = [
  { label: 'HTML5', Icon: FaHtml5 },
  { label: 'CSS3', Icon: FaCss3Alt },
  { label: 'JavaScript', Icon: FaJs },
  { label: 'React.js', Icon: FaReact },
  { label: 'Python', Icon: FaPython },
  { label: 'PHP', Icon: FaPhp },
  { label: 'Flask', Icon: SiFlask },
  { label: 'MySQL', Icon: SiMysql },
];


export const services = [
  {
    title: 'Frontend Development',
    description:
      'Building responsive, mobile-first interfaces with clean HTML, CSS, JavaScript, and React.js.',
  },
  {
    title: 'UI/UX Design',
    description:
      'Designing intuitive layouts, accessible flows, and polished interfaces focused on usability.',
  },
  {
    title: 'Full-Stack Integration',
    description:
      'Connecting frontend experiences with Flask, Core PHP, MySQL, and REST API services.',
  },
  {
    title: 'Data and ML Interfaces',
    description:
      'Creating dashboards, reports, and visual experiences for analysis, prediction, and insights.',
  },
];

export const projects = [
  {
    title: 'AirSense',
    category: 'AQI Monitoring Platform',
    image: aqiDashboardImage,
    description:
      'A full-stack AQI monitoring and prediction platform with React, Flask, live AQI APIs, EDA, and pollutant trend visualization.',
    stack: ['React.js', 'Flask', 'Pandas', 'REST APIs'],
    github: 'https://github.com/himanshi-rawat-01/aqi-monitor',
    live: 'https://aqi-monitor-flax.vercel.app/',
  },
  {
    title: 'Dental Care Website',
    category: 'Healthcare Clinic Landing Page',
    image: dentalSiteImage,
    description:
      'A polished dental clinic website with modern sections, service highlights, appointment-focused UI, and responsive layouts for a professional online presence.',
    stack: ['React.js', 'CSS', 'Responsive UI', 'Modern Design'],
    live: 'https://dentail-site.vercel.app/',
  },
  {
    title: 'E-Commerce Website',
    category: 'Food Ordering Platform',
    image: ecommerceImage,
    description:
      'A responsive e-commerce website with vendor and customer interfaces, product listings, add-to-cart, and order placement.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    live: 'https://e-commerce-site-foodorderingsytem.netlify.app/',
  },
  {
    title: 'PAW',
    category: 'Pet Adoption Website',
    image: pawImage,
    description:
      'An interactive pet adoption platform with category search, filters, animations, dark mode, and modal forms.',
    stack: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    live: 'https://my-paw.netlify.app/',
  },
  {
    title: 'Toxicology Awareness',
    category: 'Environmental Awareness',
    image: environmentImage,
    description:
      'An informative environmental and chemical awareness website with clean content structure, responsive design, and readable UI components.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    live: 'https://enviromentpollutiontoxilogy.netlify.app/',
  },
];

export const experienceTimeline = [
  {
    period: 'Internship',
    title: 'Front-End Developer Intern',
    company: 'Acmegrade',
    description:
      'Developed an e-commerce web application using HTML, CSS, and JavaScript with product listing, cart functionality, form handling, smooth navigation, and layout debugging.',
  },
  {
    period: 'Internship',
    title: 'Machine Learning Intern',
    company: 'Agratas',
    description:
      'Prepared machine learning reports using Python, worked on data preprocessing and analysis, and used NumPy, Pandas, and Matplotlib for visualization and performance insights.',
  },
  {
    period: '2023 - 2026',
    title: 'Bachelor of Computer Applications',
    company: 'Tecnia Institute of Advanced Studies, Delhi - GGSIPU',
    description:
      'Pursuing BCA with project work across frontend development, backend integration, data visualization, IoT, and machine learning fundamentals.',
  },
];

export const contactLinks = [
  { label: 'Email', href: 'mailto:himanshir007@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/himanshi-rawat-021070265/' },
  { label: 'GitHub', href: 'https://github.com/himanshi-rawat-01' },
];
