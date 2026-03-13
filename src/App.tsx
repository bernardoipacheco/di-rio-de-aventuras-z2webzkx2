import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import EstanteMagica from './pages/EstanteMagica'
import RefugioPelucias from './pages/RefugioPelucias'
import ContosNinar from './pages/ContosNinar'
import SalaTrofeus from './pages/SalaTrofeus'
import MissoesReino from './pages/MissoesReino'
import AreaPais from './pages/AreaPais'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { AppProvider } from './stores/useAppStore'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/estante" element={<EstanteMagica />} />
            <Route path="/pelucias" element={<RefugioPelucias />} />
            <Route path="/contos" element={<ContosNinar />} />
            <Route path="/trofeus" element={<SalaTrofeus />} />
            <Route path="/missoes" element={<MissoesReino />} />
            <Route path="/pais" element={<AreaPais />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
