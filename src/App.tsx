import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { getBasename, ROUTES } from "./constants/paths";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import SinglePage from "./pages/SinglePage";

// A fresh visit to "/" lands on the single page. The router gives only the
// initial page-load entry the "default" key, so clicking Home still opens HomePage.
function HomeRoute() {
  const { key } = useLocation();
  return key === "default" ? (
    <Navigate to={ROUTES.SINGLE_PAGE} replace />
  ) : (
    <HomePage />
  );
}

function App() {
  // Get basename based on environment
  const basename = getBasename();

  // Always use relative routes when using basename
  const routes = ROUTES;

  return (
    <BrowserRouter basename={basename}>
      {/* Content sits above the fixed background canvas (see AppWrapper) */}
      <div className="relative z-10 min-h-screen text-fg">
        <Navbar />
        <main>
          <Routes>
            <Route path={routes.HOME} element={<HomeRoute />} />
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
