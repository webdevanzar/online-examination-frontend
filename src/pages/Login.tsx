import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../Components/InputField";
import { useStudentLogin } from "../services/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useStudentLogin();
  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#EAFCEF] flex flex-col md:flex-row">

      {/* LEFT SIDE (Illustration + Text) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        
        <img
          src="/src/assets/Intro.png" 
          
          className="max-w-md w-[80%]"
        />
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6 text-center">
          ExamHub
        </h1>

        <p className="text-gray-600 text-center max-w-sm mt-3">
          Unleash Your Academic Success with ExamHub’s 
          Exam Excellence Platform
        </p>
      </div>

      {/* RIGHT SIDE (Login Box) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:px-20">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/src/assets/exhu.png"  
            
            className="h-12"
          />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md mx-auto">

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {/* Email */}
              <InputField<LoginForm>
                name="email"
                label="Email"
                type="email"
                placeholder="example@email.com"
                className="mb-4"
              />

              {/* Password */}
              <InputField<LoginForm>
                name="password"
                label="Password"
                type="password"
                placeholder="************"
              />

              <div className="flex justify-end mt-2">
                <Link to="/forgotpassword" className="text-green-600 text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button type="submit" disabled={loginMutation.isPending} className="w-full mt-6 bg-[#1D1F20] text-white py-3 rounded-lg text-lg hover:bg-black transition disabled:opacity-60">
                {loginMutation.isPending ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </FormProvider>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <img
              src="src/assets/googlelogo.png"
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
