import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Card, Button, Badge } from "@radix-ui/themes";
import './scss/projects.scss';
import { trackPageView, trackButtonClick } from '@/utils/analytics';

// SVG Icon Components
const GitHubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

GitHubIcon.propTypes = {
  size: PropTypes.number
};

const ExternalLinkIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
  </svg>
);

ExternalLinkIcon.propTypes = {
  size: PropTypes.number
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [iframeErrors, setIframeErrors] = useState({});

  // 5 categories that fit in one line
  const categories = [
    { name: 'All', icon: '🌟', color: '#6366f1' },
    { name: 'Showcase', icon: '💎', color: '#f59e0b' },
    { name: 'AI & ML', icon: '🤖', color: '#10b981' },
    { name: 'Web Apps', icon: '🌐', color: '#3b82f6' },
    { name: 'Games', icon: '🎮', color: '#8b5cf6' },
    { name: 'Utilities', icon: '🛠️', color: '#ef4444' }
  ];

  useEffect(() => {
    trackPageView('/projects', 'Projects - Adarsh Gella Portfolio');

    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map(doc => doc.data());
        
        const sortedProjects = projectsData.sort((a, b) => {
          const aHasDemo = hasLiveDemo(a);
          const bHasDemo = hasLiveDemo(b);
          
          if (aHasDemo !== bHasDemo) {
            return bHasDemo - aHasDemo;
          }
          return a.order - b.order;
        });
        
        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);
      } catch (error) {
        console.error('❌ Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const hasLiveDemo = (project) => {
    return project.live && 
           project.live !== "null" && 
           !project.live.includes('youtu.be') && 
           !project.live.includes('drive.google.com');
  };

  const filterProjects = (category) => {
    setSelectedCategory(category);
    
    const filtered = category === 'All' 
      ? projects 
      : projects.filter(project => project.category === category);
    
    setFilteredProjects(filtered);
    
    trackButtonClick(`Filter: ${category}`, 'projects_page');
  };

  const handleAction = (project, type) => {
    const url = type === 'github' ? project.github : project.live;
    trackButtonClick(type === 'github' ? 'GitHub' : 'Live Demo', 'projects_page');
    window.open(url, '_blank');
  };

  const handleIframeError = (projectName) => {
    setIframeErrors(prev => ({ ...prev, [projectName]: true }));
  };

  const getCategoriesWithCounts = () => {
    return categories.map(cat => ({
      ...cat,
      count: cat.name === 'All' ? projects.length : projects.filter(p => p.category === cat.name).length
    })).filter(cat => cat.count > 0 || cat.name === 'All');
  };

  return (
    <div className="projects-page">
      {/* Header with network background */}
      <div className="projects-header">
        <h1 className="projects-title">My Projects</h1>
        <p className="projects-subtitle">
          Explore {projects.length} projects showcasing my skills and experience
        </p>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        <div className="filters-container">
          {getCategoriesWithCounts().map((category) => (
            <button
              key={category.name}
              className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => filterProjects(category.name)}
              style={{ '--category-color': category.color }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <Badge className="category-count">{category.count}</Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-container">
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <Card 
              key={index} 
              className={`project-card ${hasLiveDemo(project) ? 'has-demo' : 'code-only'}`}
            >
              {/* Project Preview - Only show if has live demo */}
              {hasLiveDemo(project) && (
                <div className="project-preview">
                  {!iframeErrors[project.name] ? (
                    <>
                      <iframe
                        src={project.live}
                        className="project-iframe"
                        loading="lazy"
                        title={`${project.name} Preview`}
                        onError={() => handleIframeError(project.name)}
                        sandbox="allow-same-origin allow-scripts"
                      />
                      <div className="floating-overlay">
                        <div className="floating-actions">
                          <div 
                            className="floating-icon github-icon"
                            onClick={() => handleAction(project, 'github')}
                            title="View Source Code"
                          >
                            <GitHubIcon />
                          </div>
                          <div 
                            className="floating-icon demo-icon"
                            onClick={() => handleAction(project, 'demo')}
                            title="Open Live Demo"
                          >
                            <ExternalLinkIcon />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="iframe-error">
                      <p>Preview unavailable</p>
                      <div className="floating-overlay">
                        <div className="floating-actions">
                          <div 
                            className="floating-icon github-icon"
                            onClick={() => handleAction(project, 'github')}
                            title="View Source Code"
                          >
                            <GitHubIcon />
                          </div>
                          <div 
                            className="floating-icon demo-icon"
                            onClick={() => handleAction(project, 'demo')}
                            title="Open Live Demo"
                          >
                            <ExternalLinkIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Project Info */}
              <div className="project-info">
                <div className="project-header">
                  <h3 className="project-name">{project.name}</h3>
                  {project.category && (
                    <Badge 
                      className="category-badge"
                      style={{ backgroundColor: categories.find(cat => cat.name === project.category)?.color || '#6b7280' }}
                    >
                      {project.category}
                    </Badge>
                  )}
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  <span className="tech-label">Tech:</span>
                  <span className="tech-stack">{project.tech}</span>
                </div>
              </div>

              {/* Project Actions - Keep for non-live demo projects and mobile fallback */}
              <div className="project-actions">
                <Button 
                  className="github-btn"
                  onClick={() => handleAction(project, 'github')}
                >
                  <GitHubIcon size={16} />
                  GitHub
                </Button>
                
                {hasLiveDemo(project) && (
                  <Button 
                    className="demo-btn"
                    onClick={() => handleAction(project, 'demo')}
                  >
                    <ExternalLinkIcon size={16} />
                    Live Demo
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No projects found</h3>
            <p>No projects found in the &quot;{selectedCategory}&quot; category</p>
            <Button onClick={() => filterProjects('All')}>
              Show All Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;