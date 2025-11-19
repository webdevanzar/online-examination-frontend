import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { Layout } from "./layouts/layout";
import { ExamHistory } from "./pages/ExamHistory";

function App() {
  return (
    <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

      {/* PAGES WITH HEADER + FOOTER */}
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/exam-history" element={<ExamHistory />} />
      </Route>

    </Routes>
  );
}

export default App;
