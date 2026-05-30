// Cliente del SaaS IdeaWebX — SERVER ONLY.
// La API key vive en process.env (nunca NEXT_PUBLIC) y todas las llamadas
// salen del backend de esta web, jamás del navegador.

const BASE = process.env.SAAS_BASE_URL ?? "";
const KEY = process.env.SAAS_CLIENT_API_KEY ?? "";

export type SaasResult<T> =
  | ({ ok: true } & T)
  | { ok: false; error: string; status?: number };

export type CuentaSocial = {
  id: string;
  platform: string;
  account_name: string;
  profile_image_url: string | null;
};

export type Horario = { hora: number; minuto: number };

export type ConfigRedes = {
  horarios: Horario[];
  default_social_account_id: string | null;
  auto_reply_activa: boolean;
  timezone: string;
};

export type Asset = {
  id: string;
  type: string;
  storage_url: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
};

export type PostProgramado = {
  id: string;
  type: string;
  caption: string;
  asset_ids: string[];
  scheduled_at: string;
  published_at: string | null;
  status: string;
};

export type MetricaCuenta = {
  account_name: string;
  followers: number;
  alcance_total_periodo: number;
  engagement_total_periodo: number;
  posts_publicados_periodo: number;
};

function saasConfigurado(): boolean {
  return Boolean(BASE && KEY);
}

async function saasFetch<T = Record<string, unknown>>(
  path: string,
  init?: RequestInit
): Promise<SaasResult<T>> {
  if (!saasConfigurado()) {
    return {
      ok: false,
      error:
        "El servicio de redes no está configurado (faltan SAAS_BASE_URL / SAAS_CLIENT_API_KEY).",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const isForm = init?.body instanceof FormData;
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "X-Api-Key": KEY,
        ...(init?.body && !isForm
          ? { "Content-Type": "application/json" }
          : {}),
        ...init?.headers,
      },
    });

    if (!res.ok) {
      let detalle = `HTTP ${res.status}`;
      try {
        const j = await res.json();
        if (j?.error) detalle = j.error;
      } catch {
        /* respuesta sin json */
      }
      if (res.status === 401) {
        return {
          ok: false,
          status: 401,
          error: "La conexión con el servicio de redes no está autorizada (API key inválida o revocada).",
        };
      }
      return { ok: false, status: res.status, error: detalle };
    }

    const json = (await res.json()) as T;
    return { ok: true, ...json } as SaasResult<T>;
  } catch (e) {
    const msg =
      e instanceof Error && e.name === "AbortError"
        ? "El servicio de redes tardó demasiado en responder."
        : "No se pudo conectar con el servicio de redes.";
    return { ok: false, error: msg };
  } finally {
    clearTimeout(timeout);
  }
}

// ---- Wrappers tipados ----

export function getCuentas() {
  return saasFetch<{ accounts: CuentaSocial[] }>("/api/v1/accounts");
}

export function getConfigRedes() {
  return saasFetch<{ config: ConfigRedes }>("/api/v1/config");
}

export function patchConfigRedes(body: Partial<ConfigRedes>) {
  return saasFetch<{ config: ConfigRedes }>("/api/v1/config", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function getAssets() {
  return saasFetch<{ assets: Asset[] }>("/api/v1/assets");
}

export function postAsset(file: FormData) {
  return saasFetch<{ asset_id: string; type: string; url: string }>(
    "/api/v1/assets",
    { method: "POST", body: file }
  );
}

export function getPostsProgramados(limit = 50) {
  return saasFetch<{ posts: PostProgramado[] }>(
    `/api/v1/posts?estado=scheduled&limit=${limit}`
  );
}

export function postProgramar(body: {
  type?: "feed" | "story" | "reel" | "carousel";
  caption: string;
  asset_ids: string[];
  scheduled_at: string;
  social_account_id?: string;
}) {
  return saasFetch<{ post_id: string; status: string; scheduled_at: string }>(
    "/api/v1/posts",
    { method: "POST", body: JSON.stringify({ type: "feed", ...body }) }
  );
}

export function getMetricas(dias = 30) {
  return saasFetch<{ cuentas: MetricaCuenta[] }>(
    `/api/v1/metrics/summary?dias=${dias}`
  );
}

export function postLead(body: {
  full_name: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
}) {
  return saasFetch<{ contact_id: string }>("/api/v1/leads", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
