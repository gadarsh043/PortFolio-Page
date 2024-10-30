import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import Navbar from "@/components/navbar";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <AppRoutes />
    </Router>
  );
}

export default App;
