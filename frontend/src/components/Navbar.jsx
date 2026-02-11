import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";


export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) return null; 

  const handelLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <Link to="/jobs" className="text-xl font-bold">
        Job Portal
      </Link>

      <div className="flex items-center gap-4">

        {user?.role !== "ADMIN" && (
  <Link to="/applied-jobs">Applied Jobs</Link>
)}

        {user.role === "ADMIN" && <Link to="/admin">Admin</Link>}

        <button
          onClick={handelLogOut}
          className="rounded bg-red-500 px-3 py-1 text-white"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
