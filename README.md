# Adarsh Gella's Portfolio Website 🚀

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-success?style=for-the-badge&logo=netlify)](https://adarsh-gella.com/)

## ✨ Features

### 🎨 **Interactive Design Elements**
- **Circadian Rhythm Visualizer**: A unique 24-hour interactive timeline showing daily activities with hover effects
- **Dynamic Image Morphing**: Mouse-controlled transition between realistic and cartoon portrait styles
- **Responsive Theme Toggle**: Automatic dark/light mode switching based on the circadian rhythm
- **Glass Morphism UI**: Modern frosted glass effects with backdrop filters

### 🤖 **AI-Powered Chatbot**
- **Intelligent Assistant**: Custom AI chatbot trained on personal information, skills, and projects
- **Smart Loading States**: Progressive loading indicators with startup notifications for slow API responses
- **Real-time Communication**: Direct API integration with typing indicators and message history
- **Quick Actions**: Pre-defined questions for common inquiries about skills, projects, and contact

### 📱 **Responsive Experience**
- **Mobile-First Design**: Optimized layouts for all screen sizes (mobile, tablet, desktop)
- **Touch-Friendly Interactions**: Gesture-based navigation and touch-optimized controls
- **Adaptive Components**: Context-aware UI elements that adjust to screen size and device capabilities
- **Cross-Platform Compatibility**: Consistent experience across all modern browsers and devices

### 🎯 **Interactive Portfolio Sections**
- **Home**: Personal introduction with interactive image morphing and engaging bio
- **Projects**: Showcase of development work with live demos and GitHub links
- **Resume**: Interactive PDF viewer with download functionality
- **Contact**: Multi-platform social media integration with direct contact options

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18.3.1** - Modern component-based architecture with hooks
- **React Router 6.27.0** - Client-side routing with nested routes
- **PropTypes** - Runtime type checking for React props

### **Deployment & Hosting**
- **GitHub Pages** - Primary deployment with custom domain (adarshgella.com)
- **Custom Domain** - Professional domain setup with SSL and CNAME configuration
- **Automated Deployment** - GitHub Actions workflow for continuous deployment

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gadarsh043/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file for Firebase configuration
   cp .env.example .env
   # Add your Firebase config values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Compiles and minifies for production
```

## 🎨 Design System

### **Color Palette**
```scss
:root {
  --primary-color: #2ecc71;    /* Emerald Green */
  --secondary-color: #008080;  /* Deep Teal */
  --dark-neutral: #2c3e50;     /* Charcoal Grey */
  --light-neutral: #f7f9f9;    /* Soft Ivory */
  --highlight-color: #f1c40f;  /* Amber Yellow */
  --error-color: #e74c3c;      /* Burnt Orange */
}
```

### **Typography**
- **Primary Font**: Inter, -apple-system, BlinkMacSystemFont
- **Fallback Fonts**: 'Segoe UI', Roboto, sans-serif
- **Responsive Sizing**: Fluid typography that scales with viewport

### **Responsive Breakpoints**
- **Mobile**: ≤ 736px
- **Tablet**: 737px - 1024px  
- **Desktop**: ≥ 1025px

## 🤖 AI Chatbot Features

### **Intelligent Conversations**
- Answers questions about skills, experience, and projects
- Contextual responses based on portfolio content
- Natural language processing for better understanding

### **Smart Loading System**
- **0-3 seconds**: Animated typing indicator
- **3+ seconds**: Detailed startup screen with progress information
- **Error handling**: Graceful fallback for connection issues

### **User Experience**
- **Quick Actions**: Pre-defined questions for common inquiries
- **Message History**: Persistent chat session during visit
- **Accessibility**: Full keyboard navigation and screen reader support
- **Mobile Optimized**: Touch-friendly interface with overlay modal

## 🔧 Configuration

### **Environment Variables**
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### **Deployment Configuration**

#### **GitHub Pages** (Primary - Live at adarshgella.com)
The portfolio is deployed to GitHub Pages and connected to the custom domain `adarshgella.com`.

##### **Deploy to GitHub Pages**
```bash
# Build and deploy to gh-pages branch
npm run deploy
```

This command:
1. Runs `npm run build` to create optimized production files
2. Copies `index.html` to `404.html` for SPA routing support
3. Deploys the `dist` folder to the `gh-pages` branch
4. Changes are automatically reflected at `adarshgella.com`

##### **Custom Domain Setup**
The repository is configured with:
- **Custom Domain**: `adarshgella.com` (set in GitHub Pages settings)
- **CNAME File**: Automatically generated in `gh-pages` branch
- **SSL Certificate**: Automatically provided by GitHub Pages
- **DNS Configuration**: Domain points to GitHub Pages servers

##### **Deployment Workflow**
1. **Make Changes**: Edit code in your local repository
2. **Test Locally**: Run `npm run dev` to test changes
3. **Build & Deploy**: Run `npm run deploy` to push to production
4. **Live Updates**: Changes appear at `adarshgella.com` within 1-2 minutes

##### **Manual Deployment Steps**
```bash
# 1. Ensure you're on the main branch
git checkout main

# 2. Pull latest changes (if working in a team)
git pull origin main

# 3. Install dependencies (if needed)
npm install

# 4. Build and deploy
npm run deploy

# 5. Verify deployment
# Visit https://adarshgella.com to see changes
```

### Lints and fixes files
```
npm run lint -- --fix
```

## 🎯 Key Features Breakdown

### **1. Circadian Rhythm Visualizer**
- Interactive 24-hour timeline showing daily activities
- Dynamic theme switching based on time of day
- Hover effects with activity descriptions
- Visual storytelling of daily routine

### **2. Dynamic Image Morphing**
- Mouse-controlled transition between portrait styles
- Smooth CSS clip-path animations
- Click to toggle on mobile devices
- Engaging visual interaction

### **3. AI-Powered Assistant**
- Custom-trained chatbot with personal information
- Progressive loading states for better UX
- Real-time conversation capabilities
- Smart error handling and recovery

### **4. Responsive Design**
- Mobile-first approach with touch optimization
- Adaptive layouts for all screen sizes
- Context-aware navigation and interactions
- Cross-platform compatibility

## 🚀 Performance Optimizations

### **Build Optimizations**
- **Vite**: Lightning-fast development and build times
- **Code Splitting**: Automatic route-based code splitting
- **Asset Optimization**: Image compression and lazy loading
- **Bundle Analysis**: Optimized bundle sizes

### **Runtime Performance**
- **React 18**: Concurrent rendering and automatic batching
- **Lazy Loading**: Components and images loaded on demand
- **Memoization**: Optimized re-renders with React.memo
- **Efficient State Management**: Minimal re-renders with proper state design

## 🔒 Best Practices

### **Code Quality**
- **ESLint**: Consistent code style and error prevention
- **PropTypes**: Runtime type checking for components
- **Component Architecture**: Reusable, maintainable components
- **SCSS Organization**: Modular stylesheets with variables

### **Accessibility**
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Visible focus indicators

### **SEO & Performance**
- **Semantic HTML**: Proper document structure
- **Meta Tags**: Optimized for social media sharing
- **Performance Monitoring**: Core Web Vitals optimization
- **Progressive Enhancement**: Works without JavaScript

## 🌟 Future Enhancements

### **Planned Features**
- [ ] **Blog Section**: Tech articles and project tutorials
- [ ] **Project Filtering**: Advanced search and categorization
- [ ] **Animation Library**: More interactive micro-animations
- [ ] **Multi-language Support**: Internationalization (i18n)

### **Technical Improvements**
- [ ] **PWA Features**: Offline functionality and app-like experience
- [ ] **Performance Monitoring**: Real-time analytics integration
- [ ] **A/B Testing**: Component and layout optimization
- [ ] **Advanced Analytics**: User behavior tracking and insights

## 👨‍💻 About the Developer

**Adarsh Gella** is a Computer Science master's student at UTD, passionate about front-end development and creating engaging user experiences. This portfolio showcases both technical skills and creative problem-solving abilities.

### **Connect with Adarsh**
- 🔗 **Portfolio**: [adarshgella.com](https://adarshgella.com/)
- 💼 **LinkedIn**: [@g-adarsh-sonu](https://www.linkedin.com/in/g-adarsh-sonu/)
- 🐙 **GitHub**: [@gadarsh043](https://github.com/gadarsh043)
- 📧 **Email**: [g.adarsh043@gmail.com](mailto:g.adarsh043@gmail.com)
- 🎥 **YouTube**: [@g_adarsh_sonu](https://www.youtube.com/@g_adarsh_sonu)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  
**Built with ❤️ by [Adarsh Gella](https://adarshgella.com/)**

*If you found this project helpful, please consider giving it a ⭐ on GitHub!*

</div>
