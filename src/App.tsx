import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import User from "./pages/User";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route index element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;
