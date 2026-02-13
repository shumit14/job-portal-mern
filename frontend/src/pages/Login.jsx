import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/jobs");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) return;

    const res = await dispatch(loginUser({ email, password }));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/jobs");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-500 font-medium">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}
