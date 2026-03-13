import { useRef, useState } from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { Music, Music2, Home, ShieldCheck } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import useAppStore from '@/stores/useAppStore'

export default function Layout() {
  const { xp, crystals, levelText, isMusicPlaying, toggleMusic, setParentAuthenticated } =
    useAppStore()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const isMissoes = location.pathname === '/missoes'

  const [isPinModalOpen, setIsPinModalOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const pressTimer = useRef<NodeJS.Timeout | null>(null)

  // Calculate percentage (max 1000 for demo)
  const progressPercent = Math.min((xp / 1000) * 100, 100)

  const handlePointerDown = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current)
    pressTimer.current = setTimeout(() => {
      setIsPinModalOpen(true)
    }, 3000)
  }

  const handlePointerUp = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current)
  }

  const handlePinComplete = (value: string) => {
    setPin(value)
    if (value.length === 4) {
      if (value === '1234') {
        setParentAuthenticated(true)
        setIsPinModalOpen(false)
        setPin('')
        navigate('/pais')
      } else {
        setPinError(true)
        setTimeout(() => {
          setPin('')
          setPinError(false)
        }, 800)
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Top Global Bar - Hidden on /missoes as it has its own prominent specialized header */}
      {!isMissoes && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/20 px-4 py-3 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between transition-all duration-300">
          <div className="flex-1 w-full max-w-xl flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden flex-shrink-0 bg-secondary flex items-center justify-center shadow-inner cursor-pointer select-none touch-none active:scale-95 transition-transform"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerCancel={handlePointerUp}
              title="Segure para Área dos Pais"
            >
              <span className="text-2xl pointer-events-none">🦁</span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-sm font-bold items-center">
                <span className="text-foreground">Cecília - {levelText}</span>
                <div className="flex gap-3">
                  <span className="text-blue-600 flex items-center gap-1">{crystals} 💎</span>
                  <span className="text-primary">{xp} XP</span>
                </div>
              </div>
              <Progress value={progressPercent} className="h-3" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isHome && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full border-primary/50 text-primary hover:bg-primary/10"
              >
                <Link to="/">
                  <Home className="w-5 h-5" />
                </Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMusic}
              className="rounded-full text-secondary hover:text-secondary hover:bg-secondary/10"
            >
              {isMusicPlaying ? (
                <Music className="w-6 h-6 animate-pulse" />
              ) : (
                <Music2 className="w-6 h-6 opacity-50" />
              )}
            </Button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full overflow-y-auto z-10">
        <Outlet />
      </main>

      {/* Secret PIN Modal */}
      <Dialog open={isPinModalOpen} onOpenChange={setIsPinModalOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700 rounded-3xl shadow-2xl">
          <DialogHeader className="text-center pb-4 pt-2">
            <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full border-2 border-amber-500/50 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <ShieldCheck className="w-8 h-8 text-amber-500" />
            </div>
            <DialogTitle className="font-display text-2xl tracking-widest text-amber-500 uppercase">
              Conselho dos Mestres
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Digite o código secreto para acessar o painel de controle.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={handlePinComplete}
              className="gap-4"
              autoFocus
            >
              <InputOTPGroup className="gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <InputOTPSlot
                    key={idx}
                    index={idx}
                    className={`w-14 h-14 text-2xl font-bold rounded-xl border-2 transition-all ${
                      pinError
                        ? 'border-red-500 text-red-500 animate-shake bg-red-500/10'
                        : 'border-slate-600 bg-slate-800/50 text-amber-400 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {pinError && <p className="text-red-400 mt-4 font-medium text-sm">Código incorreto</p>}
            {!pinError && (
              <p className="text-slate-500 mt-4 text-xs font-medium tracking-widest uppercase">
                Dica: 1234
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
