"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/auth-context";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Use string | null for error state
  const router = useRouter();
  const { setUser, setIsAuthenticated, isAuthenticated } = useAuth();

  // If the user is authenticated, redirect to the home page immediately
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirect to homepage if user is authenticated
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state before making the API call
    try {
      const response = await axios.post("/api/login", { email, password });
      const { user } = response.data;
      setUser(user);
      setIsAuthenticated(true);
      router.push("/"); // Redirect to home or dashboard after successful login
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials.");
    }
  };

  if (isAuthenticated) return null;
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Simplify your e-commerce management with our user-friendly admin
          dashboard.
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot password?
            </a>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="text-center mt-6">
            <p className="text-gray-600">Or Login with</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                type="button"
              >
                Google
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-2"
                type="button"
              >
                Facebook
              </button>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {`Don't have an account?`}
              <a
                className="font-bold text-blue-500 hover:text-blue-800"
                href="#"
              >
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
