const SUPABASE_URL = "https://vavppeevglpvyfoorfje.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdnBwZWV2Z2xwdnlmb29yZmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODEwNTksImV4cCI6MjA5MjQ1NzA1OX0.3PI_2nJsIHaJUzvEc_cNggcwbv147Q2aGlRhVdBncuA";

export async function authenticateUser(email: string, password: string): Promise<{ success: boolean; token?: string; userId?: string; email?: string; error?: string }> {
  try {
    console.log("[CozyLock Extension] Authenticating user:", email);
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error_description || data.message || data.msg || "Invalid email or password";
      console.error("[CozyLock Extension] Auth failed:", errorMsg);
      return { success: false, error: errorMsg };
    }

    console.log("[CozyLock Extension] Auth successful. User ID:", data.user?.id);
    return {
      success: true,
      token: data.access_token,
      userId: data.user?.id,
      email: data.user?.email || email,
    };
  } catch (err: any) {
    console.error("[CozyLock Extension] Auth network error:", err);
    return { success: false, error: "Network error connecting to authentication server." };
  }
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const stored = await new Promise<any>((res) =>
      chrome.storage.local.get("userAuth", (d: any) => res(d.userAuth ?? {}))
    );
    const refreshToken = stored.refreshToken;
    if (!refreshToken) return null;

    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const newToken = data.access_token;
    const newRefresh = data.refresh_token;
    if (newToken) {
      await chrome.storage.local.set({
        userAuth: { ...stored, token: newToken, refreshToken: newRefresh ?? refreshToken },
      });
    }
    return newToken ?? null;
  } catch {
    return null;
  }
}

async function getValidToken(token: string): Promise<string | null> {
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const pad = base64.length % 4;
      const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
      const payload = JSON.parse(atob(padded));
      if (payload.exp && payload.exp - Date.now() / 1000 < 60) {
        return (await refreshAccessToken()) ?? token;
      }
    }
  } catch {}
  return token;
}

export async function syncBlockEvent(
  token: string,
  sessionId: string,
  url: string,
  type: string = "navigation_blocked",
  domain?: string,
  details?: Record<string, any>
): Promise<void> {
  if (!token) {
    console.warn("[CozyLock Extension] syncBlockEvent skipped: no auth token available");
    return;
  }
  token = (await getValidToken(token)) ?? token;

  let userId: string | null = null;
  try {
    const base64Url = token.split(".")[1];
    if (base64Url) {
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const pad = base64.length % 4;
      const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
      const jsonPayload = decodeURIComponent(
        atob(padded)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const parsed = JSON.parse(jsonPayload);
      userId = parsed.sub || parsed.user_id || null;
    }
  } catch (e) {
    console.warn("[CozyLock Extension] JWT decode warning:", e);
  }

  if (!userId) {
    console.warn("[CozyLock Extension] syncBlockEvent skipped: could not extract user_id from JWT");
    return;
  }

  const resolvedDomain = domain || (url ? (() => { try { return new URL(url).hostname; } catch { return url; } })() : "unknown");
  const now = new Date().toISOString();

  console.log("[CozyLock Extension] Logging distraction:", { type, domain: resolvedDomain, url });

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/distraction_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${token}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        user_id: userId,
        type,
        domain: resolvedDomain,
        blocked_at: now,
        timestamp: now,
        details: details || { url, timestamp: now },
      }),
    });
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error("[CozyLock Extension] Failed to insert distraction_log:", res.status, errBody);
    } else {
      console.log("[CozyLock Extension] Distraction log saved successfully for:", resolvedDomain);
    }
  } catch (err) {
    console.warn("[CozyLock Extension] Failed to sync block event:", err);
  }
}

export async function fetchBlocklist(token: string): Promise<string[]> {
  if (!token) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blocklist_sites?select=domain&is_active=eq.true`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.warn("[CozyLock Extension] Failed to fetch blocklist:", res.status);
      return [];
    }
    const data = await res.json();
    return (data || []).map((row: { domain: string }) => row.domain).filter(Boolean);
  } catch (err) {
    console.warn("[CozyLock Extension] Error fetching blocklist:", err);
    return [];
  }
}
