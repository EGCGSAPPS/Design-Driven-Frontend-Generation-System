import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { MsalProvider } from '@azure/msal-react'
import { App } from './app/App'
import { authService } from './services/auth/authService'
import { store } from './store/store'
import './styles/global.css'

;(globalThis as { __APP_ENV__?: ImportMetaEnv }).__APP_ENV__ = import.meta.env

await authService.initialize()

const root = createRoot(document.getElementById('root')!)
const msalInstance = authService.getInstance()

const appTree = (
  <Provider store={store}>
    <App />
  </Provider>
)

root.render(
  <StrictMode>
    {msalInstance ? <MsalProvider instance={msalInstance}>{appTree}</MsalProvider> : appTree}
  </StrictMode>,
)
