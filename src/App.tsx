// App.tsx (only AppLayout shown; rest unchanged)
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
import { checkAuthStatus, logoutUser } from "./services/api";
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

  const [givenName, setGivenName] = useState<string | undefined>(undefined);
  const [familyName, setFamilyName] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check auth status on first load
  useEffect(() => {
    const verifyAuth = async () => {
      const { isAuthenticated, user } = await checkAuthStatus();
      setIsAuthenticated(isAuthenticated);
      if (isAuthenticated && user) {
        setGivenName(user.given_name);
        setFamilyName(user.family_name);
        setUserEmail(user.email);
      } else {
        setGivenName(undefined);
        setFamilyName(undefined);
        setUserEmail(undefined);
      }
      setCheckingAuth(false);

      if (!isAuthenticated) {
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

  const handleAuthSuccess = async () => {
    // immediately fetch user info after login
    const { isAuthenticated, user } = await checkAuthStatus();
    setIsAuthenticated(isAuthenticated);

    if (isAuthenticated && user) {
      setGivenName(user.given_name);
      setFamilyName(user.family_name);
      setUserEmail(user.email);
    }

    setShowAuthPopup(false);
    setShowVerifyPopup(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const handleRequireVerification = (email: string) => {
    setPendingEmail(email);
    setShowAuthPopup(false);
    setShowVerifyPopup(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleLogout = async () => {
    await logoutUser(); // clears cookies on backend
    setIsAuthenticated(false);
    setShowVerifyPopup(false);
    setShowAuthPopup(true);
    if (!timerRef.current) {
      timerRef.current = setInterval(
        () => setShowAuthPopup(true),
        POPUP_INTERVAL
      );
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
      <Navbar
        isAuthenticated={isAuthenticated}
        givenName={givenName}
        familyName={familyName}
        userEmail={userEmail}
        onLogout={handleLogout}
        onShowAuthPopup={() => setShowAuthPopup(true)}
      />

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

      <SignUpPopup
        show={showAuthPopup && !isAuthenticated}
        onClose={() => setShowAuthPopup(false)}
        onAuthSuccess={handleAuthSuccess}
        onRequireVerification={handleRequireVerification}
      />

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
