import { LogLevel, type Configuration } from '@azure/msal-browser'

interface AuthRuntimeEnv {
  VITE_AZURE_CLIENT_ID?: string
  VITE_AZURE_AUTHORITY?: string
  VITE_AZURE_REDIRECT_URI?: string
}

const runtimeEnv = (globalThis as { __APP_ENV__?: AuthRuntimeEnv }).__APP_ENV__

export const msalConfig: Configuration = {
  auth: {
    clientId: runtimeEnv?.VITE_AZURE_CLIENT_ID ?? '00000000-0000-0000-0000-000000000000',
    authority:
      runtimeEnv?.VITE_AZURE_AUTHORITY ?? 'https://login.microsoftonline.com/common',
    redirectUri: runtimeEnv?.VITE_AZURE_REDIRECT_URI ?? 'http://localhost:5173',
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: () => undefined,
      piiLoggingEnabled: false,
      logLevel: LogLevel.Warning,
    },
  },
}

export const loginRequest = {
  scopes: ['User.Read'],
}
