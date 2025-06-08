const PROJECTS_DATA = [
    {
        "name": "Portfolio Website",
        "description": "The codebase for this portfolio, showcasing my skills and projects.",
        "order": 1,
        "github": "https://github.com/gadarsh043/PortFolio-Page",
        "live": "https://adarshgella.com",
        "tech": "React • Vite • Firebase • Google Analytics • GitHub Pages",
        "category": "Showcase"
    },
    {
        "name": "Personal AI Chatbot",
        "description": "An AI-powered personal chatbot that serves as an intelligent resume assistant.",
        "order": 2,
        "github": "https://github.com/gadarsh043/personal-chatbot",
        "live": "https://personal-chatbot-q2wp.onrender.com/",
        "tech": "Flask • OpenAI API • YAML Configuration • Render",
        "category": "AI & ML"
    },
    {
        "name": "Blogger's Hub",
        "description": "A dynamic blogging platform with real-time updates.",
        "order": 3,
        "github": "https://github.com/gadarsh043/blogPage",
        "live": "https://g-adarsh-sonu.netlify.app/",
        "tech": "Vue.js • Firebase Firestore • Real-time Database • Netlify",
        "category": "Web Apps"
    },
    {
        "name": "FitTrackAI",
        "description": "A comprehensive web-based fitness and nutrition tracking application designed to help users achieve their gym physique goals with detailed progress tracking and AI-powered insights.",
        "order": 4,
        "github": "https://github.com/gadarsh043/Fit-Track-AI",
        "live": "https://fit-track-ai.netlify.app/",
        "tech": "React • Firebase • Chart.js • Tailwind CSS • Vite • Google OAuth",
        "category": "Web Apps"
    },
    {
        "name": "Rizzing App",
        "description": "An AI-powered app that generates pickup lines and chat replies from dating profile screenshots.",
        "order": 5,
        "github": "https://github.com/gadarsh043/rizzing-backend",
        "live": "https://rizzing-frontend.netlify.app/",
        "tech": "React • Node.js • Tesseract.js OCR • OpenAI API • Railway",
        "category": "AI & ML"
    },
    {
        "name": "PhotoShare",
        "description": "A photo-sharing application with MongoDB integration.",
        "order": 6,
        "github": "https://github.com/gadarsh043/photoSharingApp",
        "live": "https://youtu.be/k5Rc1Fi5kbU?si=RCmhSil41hWrcb-A",
        "tech": "React • MongoDB • Express.js • File Upload • Authentication",
        "category": "Web Apps"
    },
    {
        "name": "AI Adventure Companion",
        "description": "An AI sidekick that turns hours into epic city escapes.",
        "order": 7,
        "github": "https://github.com/gadarsh043/adventure-companion-backend",
        "live": "https://adventure-companion.netlify.app",
        "tech": "React • OpenStreetMap API • OpenWeatherMap API • Netlify Functions",
        "category": "AI & ML"
    },
    {
        "name": "QuinBook",
        "description": "A lightweight Facebook-inspired social networking platform.",
        "order": 8,
        "github": "https://github.com/gadarsh043/QuinBook-UI",
        "live": "https://drive.google.com/file/d/1AX8LXC3HQwssu-Yb2lT6jEcIvIt9uXS8/view?usp=sharing",
        "tech": "Vue.js • Component Architecture • Social Media Features",
        "category": "Web Apps"
    },
    {
        "name": "3D Tic-Tac-Toe",
        "description": "Holographic 3D Tic-Tac-Toe: battle friends or AI, rotate, win with flair!",
        "order": 9,
        "github": "https://github.com/gadarsh043/3D-Tic-Tac-Toe",
        "live": "https://3d-tic-tac.netlify.app/",
        "tech": "React • 3D Graphics • AI Algorithm • Game Logic • Heroicons",
        "category": "Games"
    },
    {
        "name": "CowBull Game",
        "description": "An interactive guessing game like 'Mastermind'.",
        "order": 10,
        "github": "https://github.com/gadarsh043/cow_bull_game",
        "live": "https://cow-bull-game.netlify.app/",
        "tech": "Vue.js • Game Logic • Interactive UI • Local Storage",
        "category": "Games"
    },
    {
        "name": "Online Notepad",
        "description": "Secure online notepad that automatically saves your work locally.",
        "order": 11,
        "github": "https://github.com/gadarsh043/online-notepad",
        "live": "https://autosave-notepad.netlify.app/",
        "tech": "React • LocalStorage • Auto-save • PWA Features",
        "category": "Utilities"
    },
    {
        "name": "VSCode Assist Plugin",
        "description": "Plugin to help developers with Jest test cases effortlessly.",
        "order": 12,
        "github": "https://github.com/gadarsh043/QB-Assist-VsCode-Plugin",
        "tech": "VSCode Extension API • Jest Integration • Developer Tools",
        "category": "Utilities"
    },
    {
        "name": "IP Tracker",
        "description": "A tool to locate and track IP addresses.",
        "order": 13,
        "github": "https://github.com/gadarsh043/ip-tracker",
        "live": "https://ip-tracking-website.netlify.app",
        "tech": "Vue.js • IP Geolocation API • Maps Integration • Real-time Data",
        "category": "Utilities"
    },
    {
        "name": "TakeInterview",
        "description": "A streamlined UI for managing and conducting technical interviews.",
        "order": 14,
        "github": "https://github.com/gadarsh043/TakeInterview-UI",
        "tech": "Vue.js • Interview Management • UI/UX Design • Admin Panel",
        "category": "Web Apps"
    },
    {
        "name": "Coffee Billing App",
        "description": "A simple and efficient coffee shop billing system for tracking orders.",
        "order": 15,
        "github": "https://github.com/gadarsh043/CustomerBillingSystem-UI",
        "tech": "Vue.js • Billing System • Order Management • POS Interface",
        "category": "Web Apps"
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