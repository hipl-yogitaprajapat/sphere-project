import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SidebarProvider } from './components/contextapi/SidebarContext.jsx'

createRoot(document.getElementById('root')).render(
    <SidebarProvider>
    <App />
    </SidebarProvider>
)
