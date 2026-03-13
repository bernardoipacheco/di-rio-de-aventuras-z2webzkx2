import { useEffect } from 'react'
import { Crown, Sparkles } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function RafikiSeal() {
  const { showRafikiSeal, dismissRafikiSeal, xp } = useAppStore()

  useEffect(() => {
    if (showRafikiSeal) {
      const timer = setTimeout(() => {
        dismissRafikiSeal()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showRafikiSeal, dismissRafikiSeal])

  if (!showRafikiSeal) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative flex flex-col items-center justify-center animate-slide-up">
        {/* Magic glowing background */}
        <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full w-64 h-64 animate-pulse-glow" />

        <div className="relative bg-background p-8 rounded-3xl border-4 border-primary shadow-2xl flex flex-col items-center max-w-sm text-center">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-secondary p-4 rounded-full shadow-lg border-2 border-background">
            <Crown className="w-12 h-12 text-white animate-float" />
          </div>

          <h2 className="mt-8 text-3xl font-display font-bold text-primary text-shadow-sm">
            Selo do Rafiki!
          </h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            O Rei aprovou sua missão! A Savana celebra sua sabedoria.
          </p>

          <div className="mt-6 flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold text-primary">+{xp} XP Total</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
