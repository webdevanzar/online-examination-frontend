import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../Components/InputField";
import { useStudentRegister } from "../services/auth";
import { useNavigate } from "react-router-dom";

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
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-()\s]+$/, "Enter a valid phone number"),
  password: passwordSchema,
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date"),
  gender: z.enum(["male", "female", "other"]),
});

type SignupForm = z.infer<typeof signupSchema>;

const SignUp = () => {
  const navigate = useNavigate();
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
          navigate("/login");
        },
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#EAFCEF] flex flex-col md:flex-row">
      {/* LEFT ILLUSTRATION AREA */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <img
          src="src/assets/intro.png"
          alt="Illustration"
          className="w-80 md:w-[70%]"
        />

        <h1 className="text-3xl font-bold text-gray-800 text-center mt-6">
          Join Mastery Hub
        </h1>
        <p className="text-gray-600 text-center max-w-sm mt-3">
          Create your account and start your secure proctored exams journey.
        </p>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:px-16">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img
              src="/src/assets/examHub.png"
              alt="Mastery Hub Logo"
              className="h-12"
            />
          </div>

          <h2 className="text-xl font-bold text-center text-gray-800">
            Create Account
          </h2>

          {/* FORM GRID */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4 mt-4"
            >
              <InputField<SignupForm>
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
              />

              <InputField<SignupForm>
                name="email"
                label="Email"
                type="email"
                placeholder="example@email.com"
              />

              <InputField<SignupForm>
                name="phone"
                label="Phone"
                type="tel"
                placeholder="+91 9876543210"
              />

              <InputField<SignupForm>
                name="password"
                label="Password"
                type="password"
                placeholder="********"
              />

              <InputField<SignupForm>
                name="dob"
                label="Date of Birth"
                type="date"
              />

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <Controller
                  control={methods.control}
                  name="gender"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <select
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || "")}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          error ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {error && (
                        <span className="absolute left-10 -bottom-2 px-2 bg-white text-red-500 text-[10px]">
                          {error.message || "This field is required"}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              {/* SIGN UP BUTTON */}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition shadow mt-6 disabled:opacity-60"
              >
                {registerMutation.isPending ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </FormProvider>

          {/* OR DIVIDER */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-500">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* GOOGLE SIGNUP */}
          <button
            type="button"
            className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          >
            <img
              src="src/assets/googlelogo.png"
              alt="Google Logo"
              className="h-5"
            />
            <span className="text-gray-700 font-medium">
              Sign Up with Google
            </span>
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
