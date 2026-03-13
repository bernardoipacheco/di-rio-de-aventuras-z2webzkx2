import React from 'react'
import { Sparkles } from 'lucide-react'

export function ShineEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-yellow-300/30 backdrop-blur-sm animate-fade-in" />
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 40 + 10 // vh
        const tx = Math.cos(angle) * distance
        const ty = Math.sin(angle) * distance
        const size = Math.random() * 2 + 1 // rem

        return (
          <Sparkles
            key={i}
            className="absolute text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] animate-sparkle-fly"
            style={
              {
                '--tx': `${tx}vh`,
                '--ty': `${ty}vh`,
                width: `${size}rem`,
                height: `${size}rem`,
                animationDuration: `${Math.random() * 1 + 1}s`,
                animationDelay: `${Math.random() * 0.1}s`,
              } as React.CSSProperties
            }
          />
        )
      })}
      <div className="absolute text-8xl animate-bounce drop-shadow-2xl">🌟</div>
    </div>
  )
}
