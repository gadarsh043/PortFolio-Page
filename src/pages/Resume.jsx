import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import './scss/resume.scss';
import PropTypes from 'prop-types';

function Resume({isMobile}) {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const bucketName = "resume";
    const fileName = "resume.pdf";
    const publicUrl = `https://fmcjrkoabikaexixbppg.supabase.co/storage/v1/object/public/${bucketName}/${fileName}`;
    setPdfUrl(publicUrl);
  }, []);

  const [pageNumber] = useState(1);

  const handleDownload = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className={`pdf-div ${isMobile ? 'mwebPdf' : ''}`} onClick={handleDownload}>
      {pdfUrl && <Document file={pdfUrl}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>}
    </div>
  );
}

Resume.propTypes = {
    isMobile: PropTypes.bool
};

export default Resume;