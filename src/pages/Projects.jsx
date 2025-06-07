import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Card, Button, Badge } from "@radix-ui/themes";
import './scss/projects.scss';
import { trackProjectClick, trackPageView, trackButtonClick } from '@/utils/analytics';

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
        
        // Sort: Projects with live demos first, then by order
        const sortedProjects = projectsData.sort((a, b) => {
          // First check if project has a live demo (not null, not empty, not YouTube/Drive links)
          const aHasDemo = a.live && a.live !== "null" && !a.live.includes('youtu.be') && !a.live.includes('drive.google.com');
          const bHasDemo = b.live && b.live !== "null" && !b.live.includes('youtu.be') && !b.live.includes('drive.google.com');
          
          if (aHasDemo !== bHasDemo) {
            return bHasDemo - aHasDemo; // Projects with demos first
          }
          // Then sort by order
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

  const filterProjects = (category) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
    
    trackButtonClick(`Filter: ${category}`, 'projects_page', {
      category_selected: category,
      projects_shown: category === 'All' ? projects.length : projects.filter(p => p.category === category).length
    });
  };

  const handleGitHubClick = (project) => {
    trackProjectClick(project.name, 'github_click', {
      project_tech: project.tech,
      project_description: project.description,
      project_order: project.order,
      github_url: project.github
    });
    
    trackButtonClick('GitHub', 'projects_page', {
      project_name: project.name,
      button_type: 'external_link'
    });
    
    window.open(project.github, '_blank');
  };

  const handleLiveDemoClick = (project) => {
    trackProjectClick(project.name, 'demo_click', {
      project_tech: project.tech,
      project_description: project.description,
      project_order: project.order,
      demo_url: project.live
    });
    
    trackButtonClick('Live Demo', 'projects_page', {
      project_name: project.name,
      button_type: 'external_link'
    });
    
    window.open(project.live, '_blank');
  };

  const handleProjectCardView = (project) => {
    trackProjectClick(project.name, 'card_view', {
      project_tech: project.tech,
      project_description: project.description,
      project_order: project.order,
      has_live_demo: !!(project.live && project.live !== "null" && !project.live.includes('youtu.be') && !project.live.includes('drive.google.com'))
    });
  };

  const handleIframeError = (projectName) => {
    setIframeErrors(prev => ({ ...prev, [projectName]: true }));
  };

  const hasLiveDemo = (project) => {
    return project.live && 
           project.live !== "null" && 
           !project.live.includes('youtu.be') && 
           !project.live.includes('drive.google.com');
  };

  const getCategoriesWithCounts = () => {
    return categories.map(cat => {
      if (cat.name === 'All') {
        return { ...cat, count: projects.length };
      }
      const count = projects.filter(p => p.category === cat.name).length;
      return { ...cat, count };
    }).filter(cat => cat.count > 0 || cat.name === 'All');
  };

  return (
    <div className="projects-page">
      {/* Header with network background */}
      <div className="projects-header">
        <div className="network-bg"></div>
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
              onMouseEnter={() => handleProjectCardView(project)}
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
                      <div className="floating-actions">
                        <div 
                          className="floating-icon github-icon"
                          onClick={() => handleGitHubClick(project)}
                          title="View on GitHub"
                        >
                          📖
                        </div>
                        <div 
                          className="floating-icon demo-icon"
                          onClick={() => handleLiveDemoClick(project)}
                          title="Open Live Demo"
                        >
                          🚀
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="iframe-error">
                      <p>Preview unavailable</p>
                      <div className="floating-actions">
                        <div 
                          className="floating-icon github-icon"
                          onClick={() => handleGitHubClick(project)}
                          title="View on GitHub"
                        >
                          📖
                        </div>
                        <div 
                          className="floating-icon demo-icon"
                          onClick={() => handleLiveDemoClick(project)}
                          title="Open Live Demo"
                        >
                          🚀
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
                  onClick={() => handleGitHubClick(project)}
                >
                  <span className="btn-icon">📖</span>
                  GitHub
                </Button>
                
                {hasLiveDemo(project) && (
                  <Button 
                    className="demo-btn"
                    onClick={() => handleLiveDemoClick(project)}
                  >
                    <span className="btn-icon">🚀</span>
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