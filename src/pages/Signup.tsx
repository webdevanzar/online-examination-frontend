import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../Components/InputField";
import { useStudentGoogleAuth, useStudentRegister } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  Chrome,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .max(32, "Must be at most 32 characters")
  .regex(/[A-Z]/, "Must include an uppercase letter")
  .regex(/[a-z]/, "Must include a lowercase letter")
  .regex(/\d/, "Must include a number")
  .transform((password) => password.trim());

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-()\s]+$/, "Enter a valid phone number"),
  password: passwordSchema,
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date"),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender",
  }),
});

type SignupForm = z.infer<typeof signupSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { googleLogin, isPending: isGooglePending } = useStudentGoogleAuth();
  const registerMutation = useStudentRegister();

  const methods = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      dob: "",
      gender: undefined as unknown as SignupForm["gender"],
    },
  });

  const onSubmit = async (data: SignupForm) => {
    registerMutation.mutate(
      {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phone,
        password: data.password,
        dob: data.dob,
        gender: data.gender,
      },
      {
        onSuccess: () => {
          toast.success("Account created! Please sign in.");
          navigate("/login");
        },
        onError: (error: unknown) => {
          let message = "Registration failed";
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
      <div className="hidden md:flex md:w-1/3 relative bg-slate-900 items-center justify-center p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#16a34a_0%,transparent_50%)] opacity-20" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-left"
        >
          <div className="mb-8 inline-flex p-4 rounded-3xl bg-green-500/10 border border-green-500/20 backdrop-blur-xl">
            <Users size={40} className="text-green-500" />
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Join the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-400">
              Mastery Hub
            </span>
          </h1>

          <p className="text-lg text-slate-400 font-medium mb-10 leading-relaxed">
            Start your journey towards academic excellence with our secure
            proctored environment.
          </p>

          <ul className="space-y-4">
            {[
              "Real-time AI Monitoring",
              "Expert Certified Exams",
              "Comprehensive Analytics",
              "Instant Feedback",
            ].map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-slate-300 font-bold"
              >
                <ShieldCheck size={18} className="text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Signup Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-white overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-green-600 items-center justify-center shadow-xl shadow-green-500/20 mb-6 md:hidden">
              <Zap className="text-white fill-white" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">
              Welcome to the future of learning
            </p>
          </div>

          <div className="bg-white rounded-4xl shadow-2xl shadow-slate-200/60 p-2 border border-slate-100">
            <div className="p-6 md:p-10">
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Grid Layout for Desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField<SignupForm>
                      name="fullName"
                      label="Full Name"
                      placeholder="John Doe"
                      icon={<User size={18} />}
                    />
                    <InputField<SignupForm>
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      icon={<Mail size={18} />}
                    />
                    <InputField<SignupForm>
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 9961057130"
                      icon={<Phone size={18} />}
                    />
                    <InputField<SignupForm>
                      name="dob"
                      label="Date of Birth"
                      type="date"
                      icon={<Calendar size={18} />}
                    />
                    <InputField<SignupForm>
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      icon={<Lock size={18} />}
                    />

                    {/* Gender Selector - Standardized */}
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-slate-700 ml-1">
                        Gender
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
                          <Users size={18} />
                        </div>
                        <Controller
                          control={methods.control}
                          name="gender"
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <select
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(e.target.value || "")
                                }
                                className={`w-full bg-slate-50 border ${
                                  error
                                    ? "border-red-500 bg-red-50/30"
                                    : "border-slate-200"
                                } rounded-2xl pl-11 pr-10 py-3.5 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 focus:bg-white outline-none transition-all font-medium text-slate-900 appearance-none`}
                              >
                                <option value="" disabled>
                                  Select Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                              {error && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-red-500 text-xs mt-1 ml-1 font-bold"
                                >
                                  {error.message}
                                </motion.p>
                              )}
                            </>
                          )}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="group relative w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:scale-100 overflow-hidden mt-4"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2">
                      {registerMutation.isPending
                        ? "Joining..."
                        : "Create Account"}
                      {!registerMutation.isPending && (
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </span>
                  </button>
                </form>
              </FormProvider>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-slate-400">
                  <span className="bg-white px-4">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => googleLogin()}
                  disabled={isGooglePending}
                  className="w-full py-4 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  <Chrome size={20} className="text-blue-500" />
                  <span>Google Account</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-500 font-bold mt-10">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 transition-colors underline decoration-2 underline-offset-4"
            >
              Log in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
