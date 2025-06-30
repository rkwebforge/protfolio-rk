import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import SinglePage from "./pages/SinglePage";

function App() {
  // Use basename only for production (GitHub Pages)
  const basename = import.meta.env.PROD ? "/protfolio-rk" : "";

  return (
    <BrowserRouter basename={basename}>
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/protfolio-rk" element={<HomePage />} />
            <Route path="/protfolio-rk/about" element={<AboutPage />} />
            <Route path="/protfolio-rk/projects" element={<ProjectsPage />} />
            <Route path="/protfolio-rk/contact" element={<ContactPage />} />
            <Route path="/protfolio-rk/single-page" element={<SinglePage />} />
            {/* Catch-all route that redirects to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
