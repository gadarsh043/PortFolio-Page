// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import PropTypes from 'prop-types';

const AppRoutes = ({isMobile}) => {
  return (
    <Routes>
      <Route path="/" element={<Home isMobile={isMobile} />} />
      <Route path="/resume" element={<Resume isMobile={isMobile} />} />
      <Route path="/contact" element={<Contact isMobile={isMobile} />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

AppRoutes.propTypes = {
    isMobile: PropTypes.bool
};

export default AppRoutes;
