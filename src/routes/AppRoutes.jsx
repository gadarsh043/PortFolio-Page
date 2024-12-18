// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
