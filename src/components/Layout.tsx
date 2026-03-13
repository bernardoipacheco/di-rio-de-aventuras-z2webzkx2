import { Outlet, useLocation, Link } from 'react-router-dom'
import { Music, Music2, Home, Lock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import useAppStore from '@/stores/useAppStore'
import { RafikiSeal } from './RafikiSeal'

export default function Layout() {
  const { xp, levelText, isMusicPlaying, toggleMusic } = useAppStore()
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Calculate percentage (max 1000 for demo)
  const progressPercent = Math.min((xp / 1000) * 100, 100)

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Top Global Bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/20 px-4 py-3 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full max-w-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden flex-shrink-0 bg-secondary flex items-center justify-center">
            {/* Manga Simba Avatar placeholder */}
            <span className="text-2xl">🦁</span>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-foreground">Cecília - {levelText}</span>
              <span className="text-primary">{xp} XP</span>
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

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full overflow-y-auto z-10">
        <Outlet />
      </main>

      {/* Parents Area Lock - Hidden cleverly */}
      <div className="fixed bottom-4 right-4 z-40 opacity-30 hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-black/5">
          <Link to="/pais">
            <Lock className="w-4 h-4 text-foreground" />
          </Link>
        </Button>
      </div>

      <RafikiSeal />
    </div>
  )
}
