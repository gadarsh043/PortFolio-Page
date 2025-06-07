const PROJECTS_DATA = [
    {
        "order": 1,
        "description": "The codebase for this portfolio, showcasing my skills and projects.",
        "name": "Portfolio Website",
        "tech": "React, SCSS, FireBase, SupaBase",
        "github": "https://github.com/gadarsh043/PortFolio-Page"
    },
    {
        "description": "An AI-powered personal chatbot that serves as an intelligent resume assistant.",
        "order": 2,
        "github": "https://github.com/gadarsh043/personal-chatbot",
        "tech": "Flask, Python, YAML",
        "live": "https://personal-chatbot-q2wp.onrender.com/",
        "name": "Personal AI Chatbot"
    },
    {
        "description": "A dynamic blogging platform with real-time updates.",
        "order": 3,
        "live": "https://g-adarsh-sonu.netlify.app/",
        "tech": "Vue, Firebase, SCSS",
        "name": "Blogger's Hub",
        "github": "https://github.com/gadarsh043/blogPage"
    },
    {
        "name": "Rizzing App",
        "description": "An AI-powered app that generates pickup lines and chat replies from dating profile screenshots.",
        "order": 4,
        "live": "https://rizzing-frontend.netlify.app/",
        "github": "https://github.com/gadarsh043/rizzing-backend",
        "tech": "React, Node.js, Express, Tesseract.js, SCSS, Railway.app"
    },
    {
        "description": "A photo-sharing application with MongoDB integration.",
        "tech": "React, MongoDB, Node.js, Express, SCSS",
        "live": "https://youtu.be/k5Rc1Fi5kbU?si=RCmhSil41hWrcb-A",
        "name": "PhotoShare",
        "order": 5,
        "github": "https://github.com/gadarsh043/photoSharingApp"
    },
    {
        "description": "An AI sidekick that turns hours into epic city escapes.",
        "order": 6,
        "name": "AI Adventure Companion",
        "github": "https://github.com/gadarsh043/adventure-companion-backend",
        "tech": "React, SCSS, Node.js, Netlify Functions, Railway.App, OpenStreetMap, OpenWeatherMap",
        "live": "https://adventure-companion.netlify.app"
    },
    {
        "tech": "Vue, SCSS",
        "description": "A lightweight Facebook-inspired social networking platform.",
        "name": "QuinBook",
        "github": "https://github.com/gadarsh043/QuinBook-UI",
        "order": 7,
        "live": "https://drive.google.com/file/d/1AX8LXC3HQwssu-Yb2lT6jEcIvIt9uXS8/view?usp=sharing"
    },
    {
        "description": "Holographic 3D Tic-Tac-Toe: battle friends or AI, rotate, win with flair!",
        "github": "https://github.com/gadarsh043/3D-Tic-Tac-Toe",
        "tech": "React, Vite, Heroicons",
        "order": 8,
        "live": "https://3d-tic-tac.netlify.app/",
        "name": "3D Tic-Tac-Toe"
    },
    {
        "order": 9,
        "tech": "Vue, SCSS",
        "description": "An interactive guessing game like 'Mastermind'.",
        "live": "https://cow-bull-game.netlify.app/",
        "name": "CowBull Game",
        "github": "https://github.com/gadarsh043/cow_bull_game"
    },
    {
        "live": "https://autosave-notepad.netlify.app/",
        "github": "https://github.com/gadarsh043/online-notepad",
        "name": "Online Notepad",
        "tech": "React, Vite, LocalStorage, CSS3",
        "order": 10,
        "description": "Secure online notepad that automatically saves your work locally."
    },
    {
        "name": "VSCode Assist Plugin",
        "tech": "JavaScript, VSCode Plugin",
        "github": "https://github.com/gadarsh043/QB-Assist-VsCode-Plugin",
        "order": 11,
        "description": "Plugin to help developers with Jest test cases effortlessly."
    },
    {
        "description": "A tool to locate and track IP addresses.",
        "tech": "Vue, SCSS",
        "live": "https://ip-tracking-website.netlify.app",
        "name": "IP Tracker",
        "order": 12,
        "github": "https://github.com/gadarsh043/ip-tracker"
    },
    {
        "tech": "Vue, SCSS",
        "description": "A streamlined UI for managing and conducting technical interviews.",
        "name": "TakeInterview",
        "order": 13,
        "github": "https://github.com/gadarsh043/TakeInterview-UI"
    },
    {
        "description": "A simple and efficient coffee shop billing system for tracking orders.",
        "tech": "Vue, SCSS",
        "name": "Coffee Billing App",
        "order": 14,
        "github": "https://github.com/gadarsh043/CustomerBillingSystem-UI"
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
            // Use the order field as the document ID (converted to string)
            const docId = project.order.toString();
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