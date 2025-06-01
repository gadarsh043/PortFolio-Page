import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Flex, Card, Text, Button, Separator } from "@radix-ui/themes";
import './scss/projects.scss';
import { trackProjectClick, trackPageView, trackButtonClick } from '@/utils/analytics';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
      // Track page view
      trackPageView('/projects', 'Projects - Adarsh Gella Portfolio');

      const fetchProjects = async () => {
          const querySnapshot = await getDocs(collection(db, "projects"));
          const projectsData = querySnapshot.docs.map(doc => doc.data());
          projectsData.sort((a,b) => a.order - b.order);
          setProjects(projectsData);
      };

      fetchProjects();
  }, []);

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
      has_live_demo: !!(project.live && project.live !== "null")
    });
  };

  return (
    <Flex direction="column" className="works" style={{paddingTop: '0px'}}>
      <Text size="8" weight="bold" className="title" style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>My Projects</Text>
      <Separator />
      <Flex wrap="wrap" gap="4" justify="center">
        {projects.map((proj, index) => (
          <Card 
            key={index} 
            className="project-card"
            onMouseEnter={() => handleProjectCardView(proj)}
          >
            <Text weight="bold">{proj.name}</Text>
            <br />
            <Text style={{display: 'flex', minHeight: '60px', justifyContent: 'center'}}>{proj.description}</Text>
            <Text size="1">Tech Stack: {proj.tech}</Text>
            <br />
            <Flex gap="3" margintop="2" style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={() => handleGitHubClick(proj)}>GitHub</Button>
              {proj.live && proj.live !== "null" && (
                <Button onClick={() => handleLiveDemoClick(proj)}>Live Demo</Button>
              )}
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}

export default Projects;