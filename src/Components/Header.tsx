import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiBell, FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { colors } from "../utils/colortheme";
import Notification from "./Notification";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="px-3 py-1 rounded-md text-white font-bold"
            style={{ background: colors.green }}
          >
            EX
          </div>
          <h1
            className="text-xl font-semibold"
            style={{ color: colors.darkText }}
          >
            ExamHub
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-10 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-green-700 transition ${
                isActive ? "border-b-2 border-green-700 pb-1" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cources"
            className={({ isActive }) =>
              `hover:text-green-700 transition ${
                isActive ? "border-b-2 border-green-700 pb-1" : ""
              }`
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/exams"
            className={({ isActive }) =>
              `hover:text-green-700 transition ${
                isActive ? "border-b-2 border-green-700 pb-1" : ""
              }`
            }
          >
            Exams
          </NavLink>
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* Refresh */}
          <NavLink
            to="/exam-history"
            className={({ isActive }) =>
              isActive ? "bg-green-400 rounded-xl text-white" : "text-green-700"
            }
          >
            <button className="w-10 h-10 rounded-xl border-2 flex items-center justify-center hover:bg-gray-100">
              <FaHistory size={20} className="text-green-700" />
            </button>
          </NavLink>

          {/* Notification */}
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 rounded-xl border-2 flex items-center justify-center hover:bg-gray-100"
          >
            <FiBell size={20} className="text-green-700" />
          </button>

          {/* DESKTOP MENU BUTTON */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-xl border-2 flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              <FiMenu size={22} className="text-green-700" />
            </button>

            {/* DESKTOP DROP MENU */}
            {dropdownOpen && (
              <div
                className="
                  absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border p-4 z-50
                  transform origin-top-right transition-all duration-200 ease-out
                  animate-[fadeInScale_0.2s_ease-out]
                "
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiUser size={24} className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>

                <hr className="my-3" />
                <NavLink to="/profile">
                  <button className="flex items-center gap-3 w-full py-2 px-3 rounded-lg bg-green-50 text-green-700 font-medium">
                    <FiUser /> View Profile
                  </button>
                </NavLink>

                <button className="flex items-center justify-center gap-3 w-full py-2 px-3 rounded-lg bg-red-500 text-white font-semibold mt-4">
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="relative md:hidden">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-gray-100"
            >
              <FiMenu size={22} className="text-green-700" />
            </button>

            {/* MOBILE DROPDOWN */}
            {mobileMenu && (
              <div
                className="
                  absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border p-5 z-50
                  transform origin-top-right transition-all duration-200 ease-out
                  animate-[fadeInScale_0.2s_ease-out]
                "
              >
                {/* Close */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setMobileMenu(false)}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-100"
                  >
                    <FiX size={22} className="text-red-500" />
                  </button>
                </div>

                {/* LINKS */}
                <div className="space-y-4 flex flex-col text-lg">
                  <Link
                    to="/"
                    onClick={() => setMobileMenu(false)}
                    className="hover:bg-blue-200 rounded-xs p-0.5"
                  >
                    Home
                  </Link>
                  <Link
                    to="/courses"
                    onClick={() => setMobileMenu(false)}
                    className="hover:bg-blue-200 rounded-xs p-0.5"
                  >
                    Courses
                  </Link>
                  <Link
                    to="/exams"
                    onClick={() => setMobileMenu(false)}
                    className="hover:bg-blue-200 rounded-xs p-0.5"
                  >
                    Exams
                  </Link>
                </div>

                <hr className="my-5" />

                {/* USER INFO */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiUser size={22} className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>

                <button className="w-full flex items-center gap-3 py-3 px-4 rounded-lg bg-green-50 text-green-700 font-medium">
                  <FiUser size={20} /> View Profile
                </button>

                <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-red-500 text-white font-semibold mt-6">
                  <FiLogOut size={20} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <Notification sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
