export interface Settings {
  chromeRedirect: string;
  firefoxRedirect: string;
  chromeExtensionUrl: string;
  firefoxExtensionUrl: string;
  redirectEnabled: boolean;
}

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:4000" : "");

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
