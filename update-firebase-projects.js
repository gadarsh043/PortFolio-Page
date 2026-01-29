const PROJECTS_DATA = [
    {
        "name": "Portfolio Website",
        "description": "The codebase for this portfolio, featuring optimized frontend architecture and Google Analytics integration.",
        "order": 1,
        "live": "https://adarshgella.com",
        "tech": "React • Vite • Firebase • Google Analytics • GitHub Pages",
        "category": "Showcase"
    },
    {
        "name": "N8N JobSearch & Lead Engine",
        "description": "An end-to-end automation pipeline that aggregates 500+ daily job leads, using local LLMs (Ollama/Qwen 2.5) for technical match scoring and personalized cover letter generation.",
        "order": 2,
        "github": "https://github.com/gadarsh043/N8N-JobSearch-Tool",
        "tech": "n8n • Ollama (LLM) • Node.js • Apify API • Google Sheets API • Docker",
        "category": "Automation & AI"
    },
    {
        "name": "VSCode Assist Plugin",
        "description": "A custom engineering tool that automates Jest test case generation, slashing developer validation time by 73% (from 80 to 22 minutes).",
        "order": 3,
        "github": "https://github.com/gadarsh043/QB-Assist-VsCode-Plugin",
        "tech": "TypeScript • VSCode Extension API • Jest Integration • Node.js",
        "category": "Utilities"
    },
    {
        "name": "FitTrackAI",
        "description": "A comprehensive health-tracking dashboard with real-time synchronization and AI-powered physique insights. Reached 50+ active users.",
        "order": 4,
        "github": "https://github.com/gadarsh043/Fit-Track-AI",
        "live": "https://fit-track-ai.netlify.app/",
        "tech": "React • Firebase • Chart.js • Tailwind CSS • Vite • Google OAuth",
        "category": "Web Apps"
    },
    {
        "name": "Personal AI Chatbot",
        "description": "An intelligent AI resume assistant using a YAML-based knowledge base to provide instantaneous answers to recruiters.",
        "order": 5,
        "github": "https://github.com/gadarsh043/personal-chatbot",
        "live": "https://personal-chatbot-q2wp.onrender.com/",
        "tech": "Flask • OpenAI API • YAML Configuration • Render",
        "category": "AI & ML"
    },
    {
        "name": "Rizzing App",
        "description": "AI-driven response generator with OCR integration that processes 100+ profiles daily for context-aware social interactions.",
        "order": 6,
        "github": "https://github.com/gadarsh043/rizzing-backend",
        "live": "https://rizzing-frontend.netlify.app/",
        "tech": "React • Node.js • Tesseract.js OCR • OpenAI API • Railway",
        "category": "AI & ML"
    },
    {
        "name": "AI Adventure Companion",
        "description": "An AI sidekick that utilizes location and weather data to generate personalized city escape itineraries.",
        "order": 7,
        "github": "https://github.com/gadarsh043/adventure-companion-backend",
        "live": "https://adventure-companion.netlify.app",
        "tech": "React • OpenStreetMap API • OpenWeatherMap API • Netlify Functions",
        "category": "AI & ML"
    },
    {
        "name": "PhotoShare",
        "description": "A full-stack photo-sharing platform featuring MongoDB integration, user authentication, and secure file uploads.",
        "order": 8,
        "github": "https://github.com/gadarsh043/photoSharingApp",
        "live": "https://youtu.be/k5Rc1Fi5kbU?si=RCmhSil41hWrcb-A",
        "tech": "React • MongoDB • Express.js • File Upload • Authentication",
        "category": "Web Apps"
    },
    {
        "name": "Blogger's Hub",
        "description": "A dynamic blogging platform with real-time updates powered by Firebase Firestore.",
        "order": 9,
        "github": "https://github.com/gadarsh043/blogPage",
        "live": "https://g-adarsh-sonu.netlify.app/",
        "tech": "Vue.js • Firebase Firestore • Real-time Database • Netlify",
        "category": "Web Apps"
    },
    {
        "name": "QuinBook",
        "description": "A lightweight social networking platform demonstrating advanced component architecture in Vue.js.",
        "order": 10,
        "github": "https://github.com/gadarsh043/QuinBook-UI",
        "live": "https://drive.google.com/file/d/1AX8LXC3HQwssu-Yb2lT6jEcIvIt9uXS8/view?usp=sharing",
        "tech": "Vue.js • Component Architecture • Social Media Features",
        "category": "Web Apps"
    },
    {
        "name": "3D Tic-Tac-Toe",
        "description": "Interactive holographic game featuring 3D graphics and an AI opponent algorithm.",
        "order": 11,
        "github": "https://github.com/gadarsh043/3D-Tic-Tac-Toe",
        "live": "https://3d-tic-tac.netlify.app/",
        "tech": "React • 3D Graphics • AI Algorithm • Game Logic",
        "category": "Games"
    },
    {
        "name": "IP Tracker",
        "description": "Geospatial tool for real-time IP tracking and mapping via external Geolocation APIs.",
        "order": 12,
        "github": "https://github.com/gadarsh043/ip-tracker",
        "live": "https://ip-tracking-website.netlify.app",
        "tech": "Vue.js • IP Geolocation API • Maps Integration",
        "category": "Utilities"
    },
    {
        "name": "Online Notepad",
        "description": "PWA-ready secure notepad with LocalStorage auto-save functionality for offline use.",
        "order": 13,
        "github": "https://github.com/gadarsh043/online-notepad",
        "live": "https://autosave-notepad.netlify.app/",
        "tech": "React • LocalStorage • Auto-save • PWA",
        "category": "Utilities"
    },
    {
        "name": "TakeInterview",
        "description": "Administrative UI for managing technical interviews, focusing on high-performance UX design.",
        "order": 14,
        "github": "https://github.com/gadarsh043/TakeInterview-UI",
        "tech": "Vue.js • UI/UX Design • Admin Panel",
        "category": "Web Apps"
    },
    {
        "name": "Coffee Billing App",
        "description": "Efficient POS billing interface for tracking orders and managing shop transactions.",
        "order": 15,
        "github": "https://github.com/gadarsh043/CustomerBillingSystem-UI",
        "tech": "Vue.js • Billing System • Order Management",
        "category": "Web Apps"
    },
    {
        "name": "CowBull Game",
        "description": "Interactive 'Mastermind' style guessing game focusing on clean game logic and UI transitions.",
        "order": 16,
        "github": "https://github.com/gadarsh043/cow_bull_game",
        "live": "https://cow-bull-game.netlify.app/",
        "tech": "Vue.js • Game Logic • Local Storage",
        "category": "Games"
    }
];

// ===== SCRIPT =====
import { db } from './src/firebaseConfig.js';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';

async function replaceAllProjects() {
    console.log('🔥 Starting Firebase project replacement...');
    
    try {
        // Step 1: Delete all existing projects
        console.log('🗑️ Deleting all existing projects...');
        const querySnapshot = await getDocs(collection(db, 'projects'));
        
        const deletePromises = [];
        querySnapshot.forEach((doc) => {
            deletePromises.push(deleteDoc(doc.ref));
        });
        
        await Promise.all(deletePromises);
        console.log(`✅ Deleted ${querySnapshot.size} existing projects`);
        
        // Step 2: Add all new projects with custom document IDs
        console.log('📤 Adding new projects with custom document IDs...');
        const addPromises = [];
        
        PROJECTS_DATA.forEach((project) => {
            // Use zero-padded order field as document ID (01, 02, 03, etc.)
            const docId = project.order.toString().padStart(2, '0');
            const docRef = doc(db, 'projects', docId);
            addPromises.push(setDoc(docRef, project));
            console.log(`📝 Setting project "${project.name}" with document ID: ${docId}`);
        });
        
        await Promise.all(addPromises);
        console.log(`✅ Added ${PROJECTS_DATA.length} new projects with custom IDs`);
        
        console.log('🎉 Successfully replaced all projects in Firebase!');
        
        // Step 3: Verify the update
        console.log('🔍 Verifying projects...');
        const newSnapshot = await getDocs(collection(db, 'projects'));
        console.log(`📊 Total projects in Firebase: ${newSnapshot.size}`);
        
        // Show the document IDs
        console.log('📋 Document IDs created:');
        newSnapshot.forEach((doc) => {
            console.log(`  ID: ${doc.id} -> Project: ${doc.data().name}`);
        });
        
    } catch (error) {
        console.error('❌ Error replacing projects:', error);
    }
}

// Run the script
replaceAllProjects();