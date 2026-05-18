# Authentication System

## Overview

> **Note:** The current implementation does not include authentication. This document provides guidance for implementing Azure AD authentication with MSAL if needed.

Authentication has been removed from the base application to provide a clean starting point. If you need to add authentication, you can integrate Microsoft Authentication Library (MSAL) for Azure AD authentication with React integration.

## When to Add Authentication

Consider adding authentication when:

- Your application requires user identity verification
- You need to protect certain routes from unauthorized access
- API calls require authentication tokens
- You need role-based access control (RBAC)

## Recommended Architecture (if implementing)

### Authentication Flow

```
User Access → MSAL Redirect → Azure AD Login → Token Response → Set Active Account → App Access
```

## Implementation Guide

### Package Installation

```bash
yarn add @azure/msal-browser @azure/msal-react
```

### Core Files to Create

#### 1. MSAL Configuration (`services/auth/msalConfig.ts`)

```typescript
import { type Configuration, type PopupRequest } from "@azure/msal-browser";
import { jwtDecode } from "jwt-decode";
import { msalInstance } from "./main";

const scopes = import.meta.env.VITE_MSAL_SCOPES.split(" ");

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: import.meta.env.VITE_MSAL_AUTHORITY,
    redirectUri: import.meta.env.VITE_APP_PATH,
    postLogoutRedirectUri: import.meta.env.VITE_APP_PATH,
    OIDCOptions: {
      defaultScopes: scopes,
    },
  },
  system: {
    // allowNativeBroker: false,
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
};
```

### 2. Token Management

#### Acquire Access Token

```typescript
export const acquireAccessToken = async (): Promise<string | null> => {
  try {
    let activeAccount = msalInstance.getActiveAccount();

    if (!activeAccount) {
      console.log(
        "No active account found. Prompting user to select an account.",
      );
      const response = await msalInstance.acquireTokenPopup({
        scopes: ["User.Read"],
      });
      activeAccount = response.account;
      if (activeAccount) {
        msalInstance.setActiveAccount(activeAccount);
      }
    }

    const accessTokenRequest = {
      scopes: scopes,
    };

    const response = await msalInstance.acquireTokenSilent({
      account: activeAccount,
      ...accessTokenRequest,
    });

    return response.accessToken;
  } catch (error) {
    console.error("Failed to acquire token:", error);
    return null;
  }
};
```

#### Acquire User Information

```typescript
export const acquireUserName = async (): Promise<string | null> => {
  try {
    let activeAccount = msalInstance.getActiveAccount();

    if (!activeAccount) {
      const response = await msalInstance.acquireTokenPopup({
        scopes: ["User.Read"],
      });
      activeAccount = response.account;
      if (activeAccount) {
        msalInstance.setActiveAccount(activeAccount);
      }
    }

    const accessTokenRequest = {
      scopes: scopes,
    };

    const response = await msalInstance.acquireTokenSilent({
      account: activeAccount,
      ...accessTokenRequest,
    });

    const accessToken = response.accessToken;
    const decodedToken: any = jwtDecode(accessToken);
    const email = decodedToken?.email;
    const name = decodedToken?.name;

    if (email) {
      sessionStorage.setItem("email", email);
    }

    if (name) {
      sessionStorage.setItem("name", name);
    }

    return name;
  } catch (error) {
    console.error("Failed to acquire user name:", error);
    return null;
  }
};
```

### 3. MSAL Instance Initialization (`main.tsx`)

```typescript
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth-config.ts";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(async () => {
  const accounts = msalInstance.getAllAccounts();

  if (accounts.length === 1) {
    // Use the single account if only one exists
    msalInstance.setActiveAccount(accounts[0]);
  } else if (accounts.length > 1) {
    // Use acquireTokenPopup for built-in account picker
    try {
      const response = await msalInstance.acquireTokenPopup({
        scopes: ["User.Read"],
      });
      if (response.account) {
        msalInstance.setActiveAccount(response.account);
      }
    } catch (error) {
      console.error("Error during account selection:", error);
    }
  }

  // Add event callback for login success
  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  // Handle page reload
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      window.location.reload();
    }
  });

  // Render app
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter basename={import.meta.env.VITE_APP_PATH}>
        <Provider store={store}>
          <App />
          <ToastProvider />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
```

### 4. App Component with MSAL Provider (`App.tsx`)

```typescript
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./main";
import { RouterComponent } from "./Router";

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
        <RouterComponent />
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
}

export default App;
```

## Logout Implementation

### Logout Handler (in Layout Component)

```typescript
const handleLogout = async () => {
  try {
    const currentAccount = msalInstance.getActiveAccount();
    if (currentAccount) {
      await msalInstance.logoutRedirect({
        account: currentAccount,
        postLogoutRedirectUri: import.meta.env.VITE_APP_PATH,
      });
    } else {
      console.error("No active account found for logout.");
    }
  } catch (error) {
    console.error("Error during logout: ", error);
  }
};
```

## API Integration

### Using Access Token in API Calls

```typescript
import { acquireAccessToken } from "@/auth-config";

// Example API call with authentication
const fetchData = async () => {
  const accessToken = await acquireAccessToken();

  const response = await fetch(`${API_URL}/endpoint`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
};
```

## Environment Configuration

Required environment variables in `.env`:

```env
VITE_MSAL_CLIENT_ID=your-azure-ad-client-id
VITE_MSAL_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
VITE_MSAL_SCOPES=api://your-api-id/.default
VITE_APP_PATH=/your-app-base-path
```

## User Session Management

### Storing User Data

```typescript
// Store in sessionStorage
sessionStorage.setItem("email", email);
sessionStorage.setItem("name", name);

// Retrieve user data
const userName = sessionStorage.getItem("name");
const userEmail = sessionStorage.getItem("email");
```

## Protected Routes

See [Protected Route Implementation](./06_ROUTING_STRUCTURE.md#protected-routes) for route-level authentication guards.

## Key Features

- ✅ **Single Sign-On (SSO)** - Azure AD integration
- ✅ **Silent Token Refresh** - Automatic token renewal
- ✅ **Multi-Account Support** - Handle multiple logged-in accounts
- ✅ **Secure Logout** - Complete session cleanup
- ✅ **JWT Decoding** - Extract user information from tokens
- ✅ **Session Persistence** - Maintain user state across page reloads

## Best Practices

1. **Never expose client secrets** - Use environment variables
2. **Use HTTPS in production** - Secure token transmission
3. **Implement token refresh** - Handle expired tokens gracefully
4. **Clear sessions on logout** - Remove all cached data
5. **Validate tokens** - Check token expiration and validity
6. **Handle errors** - Provide user-friendly error messages
7. **Use redirect flow** - Better UX than popup for authentication

## Troubleshooting

### Common Issues

1. **No active account found**
   - Solution: Call `acquireTokenPopup` to prompt user login

2. **Token expired**
   - Solution: Use `acquireTokenSilent` which automatically refreshes

3. **Redirect loop**
   - Solution: Check `redirectUri` and `postLogoutRedirectUri` configuration

4. **CORS errors**
   - Solution: Ensure API allows the application's origin
