import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import AddNotificationPage from "./pages/admin/AddNotificationPage";
import EditNotificationPage from "./pages/admin/EditNotificationPage";
import ReviewNotificationPage from "./pages/admin/ReviewNotificationPage";
import Navbar from "./components/Navbar/Navbar";
import Navigation from "./components/Navigation/Navigation";
import SearchBar from "./components/SearchBar/SearchBar";
import Footer from "./components/Footer/Footer";
import CategoryView from "./features/notifications/components/ListView/CategoryView";
import UserNotificationDetailPage from "./features/notifications/components/ListView/UserNotificationDetailPage";
import SignUpPopup from "./components/SignUpPopup";
import { checkAuthStatus } from "./services/api";
import VerifyAccountPopup from "./components/VerifyAccount";

const POPUP_INTERVAL = 90 * 1000;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideSearchBar =
    matchPath("/notification/:id", location.pathname) !== null ||
    matchPath("/admin/review/:id", location.pathname) !== null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check auth status on first load (persists login via cookies)
  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuthStatus(); // calls /api/auth/me with cookies
      setIsAuthenticated(authStatus);
      setCheckingAuth(false);

      if (!authStatus && !showVerifyPopup) {
        setShowAuthPopup(true);
        timerRef.current = setInterval(
          () => setShowAuthPopup(true),
          POPUP_INTERVAL
        );
      }
    };

    verifyAuth();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthPopup(false);
    setShowVerifyPopup(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Called when backend says "User is not confirmed"
  const handleRequireVerification = (email: string) => {
    setPendingEmail(email);
    setShowAuthPopup(false);
    setShowVerifyPopup(true);
    // Stop the periodic popup while user is verifying
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  if (checkingAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      {!isAdminRoute && <Navigation />}
      {!hideSearchBar && !isAdminRoute && <SearchBar />}

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route
            path="/admin/addNotification"
            element={<AddNotificationPage />}
          />
          <Route path="/admin/edit/:id" element={<EditNotificationPage />} />
          <Route
            path="/admin/review/:id"
            element={<ReviewNotificationPage />}
          />
          <Route
            path="/notification/category/:category"
            element={<CategoryView />}
          />
          <Route
            path="/notification/:id"
            element={<UserNotificationDetailPage />}
          />
        </Routes>
      </main>

      <Footer />

      {/* Auth (login/register) popup */}
      <SignUpPopup
        show={showAuthPopup && !isAuthenticated}
        onClose={() => setShowAuthPopup(false)}
        onAuthSuccess={handleAuthSuccess}
        onRequireVerification={handleRequireVerification}
      />

      {/* Account verification popup (email + OTP) */}
      <VerifyAccountPopup
        show={showVerifyPopup && !isAuthenticated}
        email={pendingEmail}
        onClose={() => setShowVerifyPopup(false)}
        onVerified={handleAuthSuccess}
      />
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
