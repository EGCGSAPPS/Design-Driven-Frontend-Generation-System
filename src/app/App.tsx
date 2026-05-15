import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '../routes/AppRouter'

export const App = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
)
