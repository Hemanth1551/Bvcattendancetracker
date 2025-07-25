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
import { Navigate } from "react-router-dom";
import StudentAttendance from "./pages/StudentAttedance/StudentAttedance";
import Dd from "./pages/collegeDays/CollegeDays";
import Students from "./pages/Student/Students";
import StudentTodayAttendance from "./pages/TodayAttendance/todayAttedance";


export default function App() {
  const isLoggedIn = !!localStorage.getItem("student");

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
{/*         <Route index path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} /> */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Landing />}
        />
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/home" /> : <SignIn />}
        />
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
          <Route path="/days" element={<Dd />} />
          <Route path="/studentatt" element={<StudentAttendance />} />
          <Route path="/studenttodayatt" element={<StudentTodayAttendance />} />

          <Route path="/student" element={<Students />} />


        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
