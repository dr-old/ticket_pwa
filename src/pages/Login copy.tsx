import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import InputText from "../components/InputText";
import { useAuth } from "../context/useAuth";
import { login } from "../services/userService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      auth.loginAction(data);
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      toast.error(
        "Login failed: " + error.response?.data?.message || error.message
      );
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 dark:bg-gray-800 font-poppins">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 dark:bg-gray-900 p-8 sm:rounded-lg shadow-md h-full sm:h-auto w-full max-w-md text-gray-600 dark:text-gray-400">
        <div className="flex justify-center mb-4">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            className="h-8 w-auto"
          />
        </div>
        <h1 className="text-lg mb-7 font-medium text-center text-gray-800 dark:text-gray-200">
          Dashboard Kit
        </h1>
        <h1 className="text-xl md:text-2xl mb-2 font-semibold text-center text-gray-900 dark:text-gray-100">
          Log In to Dashboard Kit
        </h1>
        <h5 className="text-xs mb-10 text-center text-gray-700 dark:text-gray-400">
          Enter your email and password below
        </h5>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="email"
                  name="email"
                  placeholder="Email address"
                  labelLeft="Email"
                  type="email"
                  autoComplete="email"
                  error={errors.email?.message}
                />
              )}
            />
          </div>
          <div className="sm:col-span-6">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="password"
                  name="password"
                  placeholder="Password"
                  iconSuffix={
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEye : faEyeSlash}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="cursor-pointer"
                    />
                  }
                  labelLeft="Password"
                  labelRight="Forgot password?"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  error={errors.password?.message}
                />
              )}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 hover:bg-blue-600 mt-7 font-medium text-white px-4 py-2 rounded-lg w-full shadow-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
        <h5 className="text-xs mt-10 text-center text-gray-700 dark:text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 font-semibold cursor-pointer">
            Sign Up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
