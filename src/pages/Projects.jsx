import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Flex, Card, Text, Button, Separator } from "@radix-ui/themes";
import './scss/projects.scss';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
      const fetchProjects = async () => {
          const querySnapshot = await getDocs(collection(db, "projects"));
          const projectsData = querySnapshot.docs.map(doc => doc.data());
          projectsData.sort((a,b) => a.order - b.order);
          setProjects(projectsData);
      };

      fetchProjects();
  }, []);    

  return (
    <Flex direction="column" className="works" style={{paddingTop: '0px'}}>
      <Text size="8" weight="bold" className="title" style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>My Projects</Text>
      <Separator />
      <Flex wrap="wrap" gap="4" justify="center">
        {projects.map((proj, index) => (
          <Card key={index} className="project-card">
            <Text weight="bold">{proj.name}</Text>
            <br />
            <Text style={{display: 'flex', minHeight: '60px', justifyContent: 'center'}}>{proj.description}</Text>
            <Text size="1">Tech Stack: {proj.tech}</Text>
            <br />
            <Flex gap="3" margintop="2" style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={() => window.open(proj.github, '_blank')}>GitHub</Button>
              {proj.live && proj.live !== "null"  && <Button onClick={() => window.open(proj.live, '_blank')}>Live Demo</Button>}
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}

export default Projects;