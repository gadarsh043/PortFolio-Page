import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import './scss/resume.scss'

function Resume() {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const bucketName = "resume";
    const fileName = "resume.pdf";
    const publicUrl = `https://fmcjrkoabikaexixbppg.supabase.co/storage/v1/object/public/${bucketName}/${fileName}`;
    setPdfUrl(publicUrl);
  }, []);

  const [pageNumber] = useState(1);

  return (
    <div className='pdf-div'>
      {pdfUrl && <Document file={pdfUrl}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>}
    </div>
  );
}

export default Resume;