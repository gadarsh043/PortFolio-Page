// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
