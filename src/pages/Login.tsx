import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full justify-center  bg-gray-50">


        {/* Right Side Card */}
        <div className="w-2/3 flex justify-center">
          <div className="bg-white shadow-md p-10 rounded-xl w-full max-w-md">
            <p className="text-gray-500 mb-1">Please enter your details</p>
            <h1 className="text-3xl font-bold mb-6">Welcome back</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <label className="text-sm font-medium">Email address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg mt-1 mb-3 focus:outline-none"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm -mt-2 mb-2">
                  Email is required
                </p>
              )}

              {/* Password */}
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg mt-1 mb-3 focus:outline-none"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm -mt-2 mb-2">
                  Password is required
                </p>
              )}

              {/* Remember + Forgot password */}
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" {...register("remember")} />
                  <span>Remember for 30 days</span>
                </label>
                <button className="text-blue-600 text-sm hover:underline">
                  Forgot password
                </button>
              </div>

              {/* Blue Sign Up Button */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700"
              >
                Sign in
              </button>

              {/* Google Button */}
              <button
                type="button"
                className="w-full py-2 border rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  className="w-5 h-5"
                  alt=""
                />
                <span>Sign in with Google</span>
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm mt-6">
              Don’t have an account?{" "}
             <Link to="/register" className="text-blue-600 hover:underline cursor-pointer">
               Sign up
               </Link>
             </p>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
