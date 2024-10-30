// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Resume from "@/pages/Resume";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  );
};

export default AppRoutes;
