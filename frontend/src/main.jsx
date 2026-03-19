import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
  <App />
  </ThemeProvider>
  <Toaster />
  </Provider>
  
)
