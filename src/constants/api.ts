interface RuntimeEnv {
  VITE_API_BASE_URL?: string
}

const runtimeEnv = (globalThis as { __APP_ENV__?: RuntimeEnv }).__APP_ENV__

export const API_CONFIG = {
  baseURL: runtimeEnv?.VITE_API_BASE_URL ?? 'https://example.com/odata',
  timeout: 15000,
} as const
