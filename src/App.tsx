import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { getBasename, ROUTES } from "./constants/paths";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import SinglePage from "./pages/SinglePage";

function App() {
  // Get basename based on environment
  const basename = getBasename();

  // Always use relative routes when using basename
  const routes = ROUTES;

  return (
    <BrowserRouter basename={basename}>
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path={routes.HOME} element={<HomePage />} />
            <Route path={routes.ABOUT} element={<AboutPage />} />
            <Route path={routes.PROJECTS} element={<ProjectsPage />} />
            <Route path={routes.CONTACT} element={<ContactPage />} />
            <Route path={routes.SINGLE_PAGE} element={<SinglePage />} />
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
