import {
  PublicClientApplication,
  type AccountInfo,
  type AuthenticationResult,
  type SilentRequest,
} from '@azure/msal-browser'
import { loginRequest, msalConfig } from './msalConfig'

const canUseMsal =
  typeof window !== 'undefined' &&
  typeof window.crypto !== 'undefined' &&
  typeof window.crypto.subtle !== 'undefined'

let msalInstance: PublicClientApplication | null = null

const getMsalInstance = (): PublicClientApplication | null => {
  if (!canUseMsal) {
    return null
  }

  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig)
  }

  return msalInstance
}

const getActiveAccount = (): AccountInfo | null => getMsalInstance()?.getActiveAccount() ?? null

const setActiveFromCache = (): void => {
  const instance = getMsalInstance()
  if (!instance) {
    return
  }

  const account = instance.getAllAccounts()[0]
  if (account) {
    instance.setActiveAccount(account)
  }
}

export const authService = {
  getInstance(): PublicClientApplication | null {
    return getMsalInstance()
  },
  async initialize(): Promise<void> {
    const instance = getMsalInstance()
    if (!instance) {
      return
    }

    await instance.initialize()
    setActiveFromCache()
  },
  async login(): Promise<AuthenticationResult | null> {
    const instance = getMsalInstance()
    if (!instance) {
      return null
    }

    const response = await instance.loginPopup(loginRequest)
    instance.setActiveAccount(response.account)
    return response
  },
  async logout(): Promise<void> {
    const instance = getMsalInstance()
    if (!instance) {
      return
    }

    await instance.logoutPopup()
  },
  isAuthenticated(): boolean {
    return Boolean(getActiveAccount())
  },
  async getToken(): Promise<string | null> {
    const instance = getMsalInstance()
    const account = getActiveAccount()
    if (!instance || !account) {
      return null
    }

    const request: SilentRequest = {
      ...loginRequest,
      account,
    }

    const response = await instance.acquireTokenSilent(request)
    return response.accessToken
  },
}
