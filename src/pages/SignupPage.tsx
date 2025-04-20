import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginOptions from "../components/auth/LoginOptions";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Sign Up Form */}
      <div className="w-full bg-[#131828] md:w-1/2 lg:w-5/12 xl:w-4/12 p-10 flex flex-col justify-center">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="text-2xl text-white font-bold mb-2">Create Account</h1>
          <p className="text-gray-400 mb-8">
            Get started by creating your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2.5 bg-[#1e293b] text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-2.5 bg-[#1e293b] text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    const input = document.getElementById(
                      "password"
                    ) as HTMLInputElement;
                    input.type =
                      input.type === "password" ? "text" : "password";
                  }}
                >
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-600 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#131828] text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <LoginOptions />
          </div>

          <p className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary-light">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Welcome Back */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 xl:w-8/12 bg-primary items-center justify-center p-12">
        <div className="max-w-xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Welcome Back</h2>
          <p className="text-xl text-white/80">
            Sign in to access your account and continue your journey with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
