import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Contact from './components/Contact';
import SignupPage from "./page/Signup";
import LoginPage from "./page/Login";
import TutorDashboard from "./page/TutorDashbaord";

// 1. Create a Layout component that includes Nav and Footer
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen"> {/* min-h-screen ensures footer stays down */}
        <Outlet /> {/* This renders the child route (Home, Contact, etc.) */}
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        
        {/* 2. Routes that SHOULD have Navbar & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add other main pages here */}
        </Route>

        {/* 3. Routes that SHOULD NOT have Navbar & Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<TutorDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;