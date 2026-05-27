import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { auth } from "../utils/auth";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.login(username, password);
      auth.saveToken(token);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-cyan-400/25 bg-slate-900/60 p-7 shadow-neon backdrop-blur-xl"
      >
        <h1 className="text-2xl font-bold text-cyan-100">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-300">Secure control panel access.</p>
        <label className="mt-5 block text-sm text-slate-200">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cyan-400/30 bg-slate-950/70 px-3 py-2"
            required
          />
        </label>
        <label className="mt-4 block text-sm text-slate-200">
          Password
          <div className="mt-1 flex gap-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-cyan-400/30 bg-slate-950/70 px-3 py-2"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="rounded-lg border border-cyan-400/30 bg-slate-950/70 px-3 py-2 text-xs text-cyan-100"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
        <button
          disabled={loading}
          className="mt-6 w-full rounded-lg border border-violet-300/40 bg-violet-500/20 px-4 py-2 font-medium text-violet-100 transition hover:bg-violet-500/30 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;
