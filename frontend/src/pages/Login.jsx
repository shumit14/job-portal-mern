import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";



export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/jobs')
      }
    })

  }

  const togglePassword = ()=>{
    setShowPassword(prev=>!prev)
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border p-6 shadow"
      >
        <h2 className="mb-4 text-center text-2xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={formData.password}
  onChange={handleChange}
  className="input"
  required
/>
<button
  type="button"
  onMouseDown={() => setShowPassword(true)}
  onMouseUp={() => setShowPassword(false)}
  onMouseLeave={() => setShowPassword(false)}
>
  <Eye size={20} />
</button>

        {error && (
          <p className="mb-2 text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      <Link to="/register" className="text-blue-600">
        Create account
      </Link>
      </form>
    </div>
  )
}