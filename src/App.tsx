import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import User from "./pages/User";
import History from "./pages/History";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
         <Route path="/user"  element={<User />} />
         <Route path="/history" element={<History />} />
         


      </Routes>
  );
}

export default App;
