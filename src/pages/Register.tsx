import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import InputText from "../components/InputText";
import { signUp } from "../services/userService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormValues {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data: any) => {
      console.log("Sign Up successful:", data);
      // localStorage.setItem("token", data.token);
      // auth.loginAction(data);
      navigate("/login");
      toast.success("Sign Up successful!");
      // Redirect to dashboard or another page if needed
      // history.push("/dashboard");
    },
    onError: (error: any) => {
      console.error(
        "Sign Up failed:",
        error.response?.data?.message || error.message
      );
      toast.error(
        "Sign Up failed: " + error.response?.data?.message || error.message
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
        className="bg-gray-100 dark:bg-gray-900 p-8 sm:rounded-lg shadow-md w-full md:w-96 text-gray-600 dark:text-gray-400">
        <h1 className="text-xl md:text-2xl mb-2 font-semibold text-center text-gray-900 dark:text-gray-100">
          Sign Up to Dashboard Kit
        </h1>
        <h5 className="text-xs mb-10 text-center text-gray-700 dark:text-gray-400">
          Enter your details below
        </h5>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <Controller
              name="fullname"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="fullname"
                  name="fullname"
                  placeholder="Your Name"
                  labelLeft="Full name"
                  autoComplete="name"
                  error={errors.fullname?.message}
                />
              )}
            />
          </div>
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
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  error={errors.password?.message}
                />
              )}
            />
          </div>
          <div className="sm:col-span-6">
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirm Password is required",
                validate: (value: any) =>
                  value === control._formValues.password ||
                  "Passwords do not match",
              }}
              render={({ field }) => (
                <InputText
                  {...field}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  iconSuffix={
                    <FontAwesomeIcon
                      icon={confirmPasswordVisible ? faEye : faEyeSlash}
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      className="cursor-pointer"
                    />
                  }
                  labelLeft="Confirm Password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
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
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
        <h5 className="text-xs mt-10 text-center text-gray-700 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 font-semibold cursor-pointer">
            Log In
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Register;
