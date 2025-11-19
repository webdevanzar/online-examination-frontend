import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#EAFCEF] flex flex-col md:flex-row">

      {/* LEFT SIDE (Illustration + Text) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        
        <img
          src="/illustrations/exam-illustration.png" 
          alt="Exam Illustration"
          className="max-w-md w-[80%]"
        />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6 text-center">
          Exam Mastery Hub
        </h1>

        <p className="text-gray-600 text-center max-w-sm mt-3">
          Unleash Your Academic Success with Exam Mastery Hub’s 
          Exam Excellence Platform
        </p>
      </div>

      {/* RIGHT SIDE (Login Box) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:px-20">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo/masteryhub-logo.png"  
            alt="Mastery Hub Logo"
            className="h-14"
          />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md mx-auto">

          {/* Username */}
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="text"
            placeholder="johnsmith007"
            className="w-full mt-1 mb-4 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Password */}
          <label className="text-gray-700 font-medium">Password</label>
          <input
            type="password"
            placeholder="************"
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="flex justify-end mt-2">
            <Link to="/forgotpassword" className="text-green-600 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button className="w-full mt-6 bg-[#1D1F20] text-white py-3 rounded-lg text-lg hover:bg-black transition">
            Sign in
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
              className="h-5"
            />
            <span className="text-gray-700">Sign in with Google</span>
          </button>

          {/* Create Account */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Are you new?
            <Link to="/signup" className="text-green-600 font-semibold hover:underline">
              Create an Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
