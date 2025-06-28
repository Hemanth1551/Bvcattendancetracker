import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import TwoDates from "./pages/BetweenDates/TwoDates";
import Landing from "./pages/Landing/LandingPage";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- import this
import PasswordBlock from "./pages/PasswordReset/Passwordreset";

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route index path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<PasswordBlock />} />
        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/twodates" element={<TwoDates />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
