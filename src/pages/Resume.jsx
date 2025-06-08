import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import './scss/resume.scss';
import PropTypes from 'prop-types';
import { trackPageView, trackButtonClick } from '@/utils/analytics';
import fallbackResume from '@/assets/resume.pdf';

function Resume({isMobile}) {
  const [pdfUrl, setPdfUrl] = useState("");
  const [usesFallback, setUsesFallback] = useState(false);

  useEffect(() => {
    // Track page view
    trackPageView('/resume', 'Resume - Adarsh Gella Portfolio');
    
    const bucketName = "resume";
    const fileName = "resume.pdf";
    const publicUrl = `https://fmcjrkoabikaexixbppg.supabase.co/storage/v1/object/public/${bucketName}/${fileName}`;
    setPdfUrl(publicUrl);
  }, []);

  const [pageNumber] = useState(1);

  const handleSupabaseError = () => {
    console.log('Supabase resume failed, using fallback');
    setPdfUrl(fallbackResume);
    setUsesFallback(true);
  };

  const handleDownload = () => {
    trackButtonClick('Resume Download', 'resume_page', {
      file_url: pdfUrl,
      device_type: isMobile ? 'mobile' : 'desktop',
      is_fallback: usesFallback
    });
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className={`pdf-div ${isMobile ? 'mwebPdf' : ''}`} onClick={handleDownload}>
      {pdfUrl &&  <Document file={pdfUrl} onLoadError={handleSupabaseError}>
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      }
    </div>
  );
}

Resume.propTypes = {
    isMobile: PropTypes.bool
};

export default Resume;