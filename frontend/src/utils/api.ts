export interface Settings {
  chromeRedirect: string;
  firefoxRedirect: string;
  chromeExtensionUrl: string;
  firefoxExtensionUrl: string;
  redirectEnabled: boolean;
}

const resolveProductionApiBase = (): string => {
  const hostname = window.location.hostname;

  // Support split Vercel projects such as `<name>-frontend.vercel.app`
  // where the backend is deployed at `<name>.vercel.app`.
  if (hostname.endsWith("-frontend.vercel.app")) {
    return `https://${hostname.replace("-frontend.vercel.app", ".vercel.app")}`;
  }

  return window.location.origin;
};

const configuredBase = import.meta.env.VITE_API_BASE_URL?.trim();
const isLocalhostBase =
  configuredBase?.startsWith("http://localhost") || configuredBase?.startsWith("https://localhost");

const API_BASE =
  configuredBase && !(import.meta.env.PROD && isLocalhostBase)
    ? configuredBase
    : import.meta.env.DEV
      ? "http://localhost:4000"
      : resolveProductionApiBase();

const makeUrl = (path: string) => `${API_BASE}${path}`;

export const api = {
  login: async (username: string, password: string): Promise<{ token: string }> => {
    const response = await fetch(makeUrl("/api/admin/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error("Invalid credentials");
    return response.json();
  },
  getSettings: async (): Promise<Settings> => {
    const response = await fetch(makeUrl("/api/settings"));
    if (!response.ok) throw new Error("Failed to load settings");
    return response.json();
  },
  updateSettings: async (settings: Settings, token: string): Promise<Settings> => {
    const response = await fetch(makeUrl("/api/settings"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(settings)
    });
    if (!response.ok) throw new Error("Failed to update settings");
    return response.json();
  }
};
