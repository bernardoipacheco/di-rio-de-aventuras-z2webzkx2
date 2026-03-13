import { Link } from 'react-router-dom'
import { Book, Tent, Moon, Trophy, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const nodes = [
  {
    path: '/estante',
    icon: Book,
    title: 'Estante Mágica',
    color: 'bg-accent',
    delay: 'delay-0',
    position: 'md:top-[15%] md:left-[20%] top-[10%] left-[10%]',
  },
  {
    path: '/pelucias',
    icon: Tent,
    title: 'Refúgio das Pelúcias',
    color: 'bg-secondary',
    delay: 'delay-75',
    position: 'md:top-[15%] md:left-[80%] top-[10%] right-[10%]',
  },
  {
    path: '/contos',
    icon: Moon,
    title: 'Contos de Ninar',
    color: 'bg-indigo-500',
    delay: 'delay-100',
    position: 'md:top-[70%] md:left-[20%] bottom-[20%] left-[10%]',
  },
  {
    path: '/trofeus',
    icon: Trophy,
    title: 'Sala de Troféus',
    color: 'bg-primary',
    delay: 'delay-150',
    position: 'md:top-[70%] md:left-[80%] bottom-[20%] right-[10%]',
  },
  {
    path: '/missoes',
    icon: ShieldCheck,
    title: 'Missões do Reino',
    color: 'bg-green-500',
    delay: 'delay-200',
    position: 'md:top-[85%] md:left-[50%] bottom-[5%] left-[50%] -translate-x-1/2',
  },
]

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex items-center justify-center p-4 overflow-hidden">
      {/* SVG Branches Background for Map */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            d="M50,50 Q35,32 20,15"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary"
          />
          <path
            d="M50,50 Q65,32 80,15"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary"
          />
          <path
            d="M50,50 Q35,60 20,70"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary"
          />
          <path
            d="M50,50 Q65,60 80,70"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary"
          />
          <path
            d="M50,50 Q50,65 50,85"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary"
          />
        </svg>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] md:h-[800px]">
        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group flex flex-col items-center justify-center animate-float">
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl animate-pulse-glow" />
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center border-4 border-transparent p-4 text-center">
                <span className="text-4xl mb-2">🐾</span>
                <h1 className="font-display font-bold text-xl md:text-2xl leading-tight text-foreground">
                  Diário de Aventuras
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <Link
            key={i}
            to={node.path}
            className={cn(
              'absolute z-10 flex flex-col items-center gap-2 group transition-all duration-300 hover:scale-110 animate-fade-in-up md:-translate-x-1/2 md:-translate-y-1/2',
              node.position,
              node.delay,
            )}
          >
            <div
              className={cn(
                'w-20 h-20 md:w-24 md:h-24 rounded-3xl shadow-lg flex items-center justify-center text-white relative overflow-hidden',
                node.color,
              )}
            >
              <div className="absolute inset-0 bg-black/10 transition-opacity opacity-0 group-hover:opacity-100" />
              <node.icon className="w-10 h-10 md:w-12 md:h-12 animate-float" />
            </div>
            <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-border">
              <span className="font-display font-bold text-sm md:text-base text-center whitespace-nowrap">
                {node.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
