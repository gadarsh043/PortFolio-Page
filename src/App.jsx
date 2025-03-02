import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import Navbar from "@/components/navbar";
import { pdfjs } from 'react-pdf';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Theme } from "@radix-ui/themes";
import Circadian from '@/components/circadian'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  const [appearance, setAppearance] = useState('dark')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 736);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
	    background: "linear-gradient(to bottom, var(--primary-color), rgba(44, 62, 80, 0))"
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "red",
      textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
    },
    text: {
      fontSize: "18px",
      color: "white",
    },
  };

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 736);
  };

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleAppearance = (changeTo) => {
    setAppearance(changeTo);
  };

  return (
    <Theme accentColor="grass" appearance={appearance}>
      <Router>
      {!isMobile && 
        (<>
          <Navbar appearance={appearance} toggleAppearance={toggleAppearance}  />
          <br />
          <AppRoutes />
          <br />
          <Circadian appearance={appearance} toggleAppearance={toggleAppearance} />
          <br />
        </>)
      }
      {isMobile && 
        (<>
          <div style={styles.container}>
            <h1 style={styles.heading}>🚧 Mobile Version In Progress 🚧</h1>
            <p style={styles.text}>Please visit this site on a desktop for the best experience.</p>
          </div>
        </>)
      }
      </Router>
    </Theme>
  );
}

App.propTypes = {
  appearance: PropTypes.string,
};

export default App;
