import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { ExamHistory } from "./pages/ExamHistory";
import Layout from "./layouts/Layout";
import Exams from "./pages/Exams";
import Profile from "./pages/Profie";
import Courses from "./pages/Cources";



function App() {
  return (
    <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

      {/* PAGES WITH HEADER + FOOTER */}
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/exam-history" element={<ExamHistory />} />
        <Route path="/cources" element={<Courses />} />
        <Route path="/exams" element={<Exams />} /> 
        <Route path="/profile" element={<Profile />} />

       
         
      </Route>

    </Routes>
  );
}

export default App;
