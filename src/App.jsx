import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import Navbar from "@/components/navbar";
import Widget from "@/components/widget";
import { pdfjs } from 'react-pdf';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Theme } from "@radix-ui/themes";
import Circadian from '@/components/circadian'
import lightModeIcon from '@/assets/light-mode2.png';
import darkModeIcon from '@/assets/dark-mode.png';
import { initChatbotWakeup } from '@/services/chatbotWakeup';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  const [appearance, setAppearance] = useState('dark')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 736);
  const isDarkMode = appearance === 'dark';

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 736);
  };

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // Initialize chatbot wakeup service when app loads
    // This will preemptively wake up the chatbot API to reduce cold start delays
    initChatbotWakeup();

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleAppearance = (changeTo) => {
    setAppearance(changeTo);
  };

  return (
    <Theme accentColor="grass" appearance={appearance} className="container">
      <Router basename="/">
        <>
          <Navbar appearance={appearance} toggleAppearance={toggleAppearance}  isMobile={isMobile} />
          <br />
          <AppRoutes isMobile={isMobile}/>
          <br />
          {!isMobile ? 
            <>
              <Circadian appearance={appearance} toggleAppearance={toggleAppearance} />
              <br />
            </>
            :
            <>
              <div className="mwebToggleAppearance" style={{position: 'fixed', bottom: '25px', right: '25px'}} onClick={() => toggleAppearance(isDarkMode ? 'light' : 'dark')}>
                  <div className={`themeToggleSwitch ${isDarkMode ? 'dark' : 'light'}`} style={{width: '30px', backgroundColor: 'darkslategray'}}>
                      <img 
                          src={isDarkMode ? darkModeIcon : lightModeIcon} 
                          alt={isDarkMode ? "Dark Mode" : "Light Mode"} 
                          className="themeIcon"
                      />
                  </div>
              </div>
            </>
          }
          <Widget />
        </>
      </Router>
    </Theme>
  );
}

App.propTypes = {
  appearance: PropTypes.string,
};

export default App;
