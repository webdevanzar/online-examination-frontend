import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../Components/InputField";
import { useStudentGoogleAuth, useStudentLogin } from "../services/auth";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, Zap, Chrome } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { googleLogin, isPending: isGooglePending } = useStudentGoogleAuth();
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
          toast.success("Welcome back!");
          navigate("/");
        },
        onError: (error: unknown) => {
          let message = "Login failed";
          if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || error.message;
          } else if (error instanceof Error) {
            message = error.message;
          }
          toast.error(message);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Decorative Left Side */}
      <div className="hidden md:flex md:w-1/2 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#22c55e_0%,transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#10b981_0%,transparent_50%)] opacity-20" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg text-center md:text-left"
        >
          <div className="mb-8 inline-flex p-4 rounded-3xl bg-green-500/10 border border-green-500/20 backdrop-blur-xl">
            <ShieldCheck size={48} className="text-green-500" />
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
            Unleash Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-400">
              Potential
            </span>
          </h1>

          <p className="text-xl text-slate-400 font-medium mb-12 leading-relaxed">
            Experience the future of secure, proctored examinations with
            ExamHub's excellence platform.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Zap className="text-green-500 mb-3" size={24} />
              <div className="text-white font-bold">Fast Results</div>
              <div className="text-slate-500 text-sm font-medium mt-1">
                Instant analysis
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <ShieldCheck className="text-green-500 mb-3" size={24} />
              <div className="text-white font-bold">AI Protected</div>
              <div className="text-slate-500 text-sm font-medium mt-1">
                Secure environment
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
      </div>

      {/* Login Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20 relative bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-10"
        >
          {/* Logo & Header */}
          <div className="text-center md:text-left">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="inline-flex w-16 h-16 rounded-2xl bg-green-600 items-center justify-center shadow-2xl shadow-green-500/20 mb-8"
            >
              <Zap className="text-white fill-white" size={32} />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Student Login
            </h2>
            <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">
              Welcome back to ExamHub
            </p>
          </div>

          <div className="bg-white rounded-4xl shadow-2xl shadow-slate-200/60 p-2 border border-slate-100">
            <div className="p-8 space-y-8">
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <InputField<LoginForm>
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="student@example.com"
                    icon={<Mail size={18} />}
                  />

                  <div className="space-y-1">
                    <InputField<LoginForm>
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="••••••••••••"
                      icon={<Lock size={18} />}
                    />
                    <div className="flex justify-end">
                      <Link
                        to="/forgotpassword"
                        className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="group relative w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:scale-100 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2">
                      {loginMutation.isPending ? "Signing in..." : "Sign In"}
                      {!loginMutation.isPending && (
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </span>
                  </button>
                </form>
              </FormProvider>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
                  <span className="bg-white px-4 text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={() => googleLogin()}
                disabled={isGooglePending}
                className="w-full py-4 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:scale-100"
              >
                <Chrome size={20} className="text-blue-500" />
                <span>Google Account</span>
              </button>
            </div>
          </div>

          <p className="text-center text-slate-500 font-bold">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 hover:text-green-700 transition-colors underline decoration-2 underline-offset-4"
            >
              Start Free Today
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Decorative Blob - Mobile Only */}
      <div className="md:hidden absolute -top-24 -left-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -z-10" />
      <div className="md:hidden absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
    </div>
  );
};

export default LoginPage;
