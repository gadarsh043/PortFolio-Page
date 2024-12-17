import { Flex, Card, Text, Button, Separator } from "@radix-ui/themes";
import './scss/works.scss';

function works() {
    const projects = [
        { 
            name: "Portfolio Website",
            description: "The codebase for this portfolio, showcasing my skills and projects.",
            tech: "React, SCSS",
            github: "https://github.com/gadarsh043/PortFolio-Page"
        },
        { 
            name: "Blogger's Hub",
            description: "A dynamic blogging platform with real-time updates.",
            tech: "Vue, Firebase, SCSS",
            github: "https://github.com/gadarsh043/blogPage",
            live: "https://g-akarsh-monu.netlify.app/"
        },
        { 
            name: "PhotoShare",
            description: "A photo-sharing application with MongoDB integration.",
            tech: "React, MongoDB, SCSS",
            github: "https://github.com/gadarsh043/photoSharingApp",
            live: "https://youtu.be/k5Rc1Fi5kbU?si=RCmhSil41hWrcb-A"
        },
        { 
            name: "QuinBook",
            description: "A lightweight Facebook-inspired social networking platform.",
            tech: "Vue, SCSS",
            github: "https://github.com/gadarsh043/QuinBook-UI",
            live: "https://drive.google.com/file/d/1AX8LXC3HQwssu-Yb2lT6jEcIvIt9uXS8/view?usp=sharing"
        },
        { 
            name: "CowBull Game",
            description: "An interactive guessing game like 'Mastermind'.",
            tech: "Vue, SCSS",
            github: "https://github.com/gadarsh043/cow_bull_game",
            live: "https://cow-bull-game.netlify.app/"
        },
        {
            name: "VSCode Assist Plugin",
            description: "Plugin to help developers with Jest test cases effortlessly.",
            tech: "JavaScript, VSCode Plugin",
            github: "https://github.com/gadarsh043/QB-Assist-VsCode-Plugin"
        },
        { 
            name: "IP Tracker",
            description: "A tool to locate and track IP addresses.",
            tech: "Vue, SCSS",
            github: "https://github.com/gadarsh043/ip-tracker",
            live: "https://ip-tracking-website.netlify.app"
        },
        { 
            name: "TakeInterview",
            description: "A streamlined UI for managing and conducting technical interviews.",
            tech: "Vue, SCSS",
            github: "https://github.com/gadarsh043/TakeInterview-UI"
        },
        {
            name: "Coffee Billing App",
            description: "A simple and efficient coffee shop billing system for tracking orders.",
            tech: "Vue, SCSS",
            github: "https://github.com/gadarsh043/CustomerBillingSystem-UI"
        },
    ];      

  return (
    <Flex direction="column" className="works" style={{paddingTop: '0px'}}>
      <Text size="8" weight="bold" className="title" style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>My Works</Text>
      <Separator />
      <Flex wrap="wrap" gap="4" justify="center">
        {projects.map((proj, index) => (
          <Card key={index} className="project-card">
            <Text weight="bold">{proj.name}</Text>
            <br />
            <Text style={{display: 'flex', height: '50px', justifyContent: 'center'}}>{proj.description}</Text>
            <Text size="1">Tech Stack: {proj.tech}</Text>
            <br />
            <Flex gap="3" marginTop="2" style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={() => window.open(proj.github, '_blank')}>GitHub</Button>
              {proj.live && <Button onClick={() => window.open(proj.live, '_blank')}>Live Demo</Button>}
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}

export default works;