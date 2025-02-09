"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/verify"); // A protected API route to check JWT token
        setLoading(false);
        router.push("/dashboard"); // Redirect to login if not authenticated
      } catch (error) {
        console.log(error);
        router.push("/auth/login"); // Redirect to login if not authenticated
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/login", { email, password });
      router.push("/cart"); // Redirect to cart page on successful login
    } catch (error) {
      console.log(error);
      setError("Login failed");
    }
  };
  if (loading) return <div>Loading...</div>;
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
          {error && <p>{error}</p>}
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