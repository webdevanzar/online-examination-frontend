import { Routes, Route, BrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { ExamHistory } from "./pages/ExamHistory";
import Layout from "./layouts/Layout";
import Exams from "./pages/Exams";
import Profile from "./pages/Profile";
import InstructionPage from "./pages/InstructionPage";
import CountdownPage from "./pages/CountdownPage";
import SystemCheckPage from "./pages/SystemCheckPage";
import ExamStartPage from "./pages/ExamStartPage";
import ReviewAnswersPage from "./pages/Reviewpage";
import ResultPage from "./pages/ResultPage";
import About from "./pages/About";
import Resetlink from "./pages/Resetlink";
import TypingProfileSetup from "./pages/TypingProfileSetup";
import { ExamSubmitPage } from "./pages/ExamSubmit";
import ForgotPassword from "./pages/Forgotpassword";
import ExamEnrollmentPage from "./pages/ExamEnrollmentPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import { ProtectedRouteAfterLogin } from "./middleware/ProtectedRouteAfterLogin";
import { ProtectedRoute } from "./middleware/ProtectedRoute";
import { ExamAttemptGuard } from "./middleware/ExamAttemptGuard";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRouteAfterLogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetlink" element={<Resetlink />} />
        </Route>

        {/* PAGES WITH HEADER + FOOTER */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/exam-history" element={<ExamHistory />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/countdown" element={<CountdownPage />} />
          </Route>
          <Route path="/system-check" element={<SystemCheckPage />} />
          <Route path="/instructions" element={<InstructionPage />} />
          <Route path="/exam/enroll/:examId" element={<ExamEnrollmentPage />} />
          <Route
            path="/exam/:attemptId/start"
            element={
              <ExamAttemptGuard>
                <ExamStartPage />
              </ExamAttemptGuard>
            }
          />
          <Route path="/exam-start" element={<ExamStartPage />} />
          <Route
            path="/exam-submit"
            element={<ExamSubmitPage score={0} total={0} timeTaken={0} />}
          />
          <Route path="/review/:id" element={<ReviewAnswersPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/resetlink" element={<Resetlink />} />
          <Route
            path="/typing-profile-setup"
            element={<TypingProfileSetup />}
          />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
