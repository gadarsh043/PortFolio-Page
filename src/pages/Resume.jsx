import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import resume from '@/assets/my_resume.pdf'
import './scss/resume.scss'

function Resume() {
  const [pageNumber] = useState(1);

  return (
    <div className='pdf-div'>
      <Document file={resume}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
}

export default Resume;