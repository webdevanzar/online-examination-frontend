// src/Layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">

      <Header />

      <div className="relative flex-1 overflow-hidden">
        {/* BLOB BACKGROUND */}
   
        {/* PAGE CONTENT LAYER */}
        <main className="relative z-20 bg-transparent">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
