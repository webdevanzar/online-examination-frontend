import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import type { Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  rules?: object;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const InputField = <T extends FieldValues>({
  name,
  label,
  rules = {},
  type = "text",
  placeholder = "",
  disabled = false,
  className = "",
  icon,
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useFormContext<T>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={`space-y-1.5 ${className}`}>
          <label className="block text-sm font-bold text-slate-700 ml-1">
            {label}
          </label>
          <div className="relative group">
            {icon && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
                {icon}
              </div>
            )}
            <input
              {...field}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value || "")}
              type={type === "password" && showPassword ? "text" : type}
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full bg-slate-50 border ${
                error ? "border-red-500 bg-red-50/30" : "border-slate-200"
              } rounded-2xl ${icon ? "pl-11" : "px-4"} pr-11 py-3.5 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 focus:bg-white outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            />

            {type === "password" && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-green-600 transition-colors"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
          {error && (
            <p className="mt-1 text-xs font-bold text-red-500 ml-1">
              {error.message || "This field is required"}
            </p>
          )}
        </div>
      )}
    />
  );
};
