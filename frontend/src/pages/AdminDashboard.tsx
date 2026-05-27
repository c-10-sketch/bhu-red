import { FormEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api, type Settings } from "../utils/api";
import { auth } from "../utils/auth";

const emptySettings: Settings = {
  chromeRedirect: "",
  firefoxRedirect: "",
  chromeExtensionUrl: "",
  firefoxExtensionUrl: "",
  redirectEnabled: true
};

const AdminDashboard = () => {
  const token = auth.getToken();
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.getSettings();
        setSettings(response);
      } catch {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  if (!token) return <Navigate to="/admin/login" replace />;

  const onSave = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const updated = await api.updateSettings(settings, token);
      setSettings(updated);
      setMessage("Settings saved successfully.");
    } catch {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen p-6">
      <section className="mx-auto max-w-4xl rounded-2xl border border-cyan-400/25 bg-slate-900/55 p-7 shadow-neon backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-100">Admin Dashboard</h1>
          <button
            onClick={() => {
              auth.clearToken();
              window.location.href = "/admin/login";
            }}
            className="rounded-lg border border-rose-300/40 bg-rose-500/15 px-4 py-2 text-sm text-rose-100"
          >
            Logout
          </button>
        </div>
        {loading ? (
          <p className="text-slate-300">Loading settings...</p>
        ) : (
          <form onSubmit={onSave} className="grid gap-4">
            <label className="text-sm text-slate-200">
              Chrome Redirect URL
              <input
                value={settings.chromeRedirect}
                onChange={(e) => setSettings({ ...settings, chromeRedirect: e.target.value })}
                className="mt-1 w-full rounded-lg border border-cyan-400/30 bg-slate-950/70 px-3 py-2"
                required
              />
            </label>
            <label className="text-sm text-slate-200">
              Firefox Redirect URL
              <input
                value={settings.firefoxRedirect}
                onChange={(e) => setSettings({ ...settings, firefoxRedirect: e.target.value })}
                className="mt-1 w-full rounded-lg border border-cyan-400/30 bg-slate-950/70 px-3 py-2"
                required
              />
            </label>
            <label className="text-sm text-slate-200">
              Chrome Extension URL
              <input
                value={settings.chromeExtensionUrl}
                onChange={(e) => setSettings({ ...settings, chromeExtensionUrl: e.target.value })}
                className="mt-1 w-full rounded-lg border border-cyan-400/30 bg-slate-950/70 px-3 py-2"
                required
              />
            </label>
            <label className="text-sm text-slate-200">
              Firefox Extension URL
              <input
                value={settings.firefoxExtensionUrl}
                onChange={(e) => setSettings({ ...settings, firefoxExtensionUrl: e.target.value })}
                className="mt-1 w-full rounded-lg border border-cyan-400/30 bg-slate-950/70 px-3 py-2"
                required
              />
            </label>
            <label className="mt-1 flex items-center gap-3 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={settings.redirectEnabled}
                onChange={(e) => setSettings({ ...settings, redirectEnabled: e.target.checked })}
              />
              Redirect Enabled
            </label>
            {message && <p className="text-sm text-emerald-300">{message}</p>}
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <button
              disabled={saving}
              className="mt-2 w-fit rounded-lg border border-violet-300/40 bg-violet-500/20 px-5 py-2 font-medium text-violet-100"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;
