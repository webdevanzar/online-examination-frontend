import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { ExamHistory } from "./pages/ExamHistory";
import Layout from "./layouts/Layout";
import Exams from "./pages/Exams";
import Profile from "./pages/Profie";
import Courses from "./pages/Cources";
import InstructionPage from "./pages/InstructionPage";
import CountdownPage from "./pages/CountdownPage";  
import SystemCheckPage from "./pages/SystemCheckPage";
import ExamStartPage from "./pages/ExamStartPage";
import { sampleExam } from "./utils/SampleExam";
import ExamSubmit from "./pages/ExamSubmit";
import ReviewAnswersPage from "./pages/Reviewpage";
import ResultPage from "./pages/ResultPage";
import About from "./pages/About";
import ForgotPassword from "./pages/forgotpassword";
import Resetlink from "./pages/Resetlink";


function App() {
  return (
    <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetlink" element={<Resetlink />} />
      {/* PAGES WITH HEADER + FOOTER */}
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/exam-history" element={<ExamHistory />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/exams" element={<Exams />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/countdown" element={<CountdownPage />} />
        <Route path="/system-check" element={<SystemCheckPage />} />
        <Route path="/instructions" element={<InstructionPage />} />
        <Route path="/exam-start" element={<ExamStartPage exam={sampleExam}  />} />
        <Route path="/exam-submit" element={<ExamSubmit  />} />
        <Route path="/review/:id" element={<ReviewAnswersPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/resetlink" element={<Resetlink />} />
      </Route>

    </Routes>
  );
}

export default App;

