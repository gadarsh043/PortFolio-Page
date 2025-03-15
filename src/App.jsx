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
        <>
          <Navbar appearance={appearance} toggleAppearance={toggleAppearance}  isMobile={isMobile} />
          <br />
          <AppRoutes />
          <br />
          <Circadian appearance={appearance} toggleAppearance={toggleAppearance} />
          <br />
        </>
      </Router>
    </Theme>
  );
}

App.propTypes = {
  appearance: PropTypes.string,
};

export default App;
