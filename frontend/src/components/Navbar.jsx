import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const linkStyle = (path) =>
    `px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-100 text-blue-600"
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/jobs"
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          JobPortal
        </Link>

        {/* Links */}
        <div className="flex items-center gap-3">
          
          {user?.role !== "ADMIN" && (
            <Link to="/applied-jobs" className={linkStyle("/applied-jobs")}>
              Applied Jobs
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link to="/admin" className={linkStyle("/admin")}>
              Admin Dashboard
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="ml-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 shadow-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
