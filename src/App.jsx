import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/navbar";

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
