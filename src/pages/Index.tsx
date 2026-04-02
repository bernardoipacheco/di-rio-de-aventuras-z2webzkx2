import { Link } from 'react-router-dom'
import { AlertCircle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'

const nodes = [
  {
    path: '/estante',
    image: 'https://img.usecurling.com/p/250/250?q=manga%20baobab%20tree%20savanna&color=green',
    title: 'Estante Mágica',
    color: 'border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]',
    delay: 'delay-0',
    position: 'top-[14%] left-[28%] md:top-[20%] md:left-[22%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    path: '/pelucias',
    image: 'https://img.usecurling.com/p/250/250?q=manga%20cozy%20animal%20den%20cave&color=orange',
    title: 'Refúgio das Pelúcias',
    color: 'border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.5)]',
    delay: 'delay-75',
    position: 'top-[24%] left-[72%] md:top-[20%] md:left-[78%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    path: '/contos',
    image:
      'https://img.usecurling.com/p/250/250?q=manga%20sleeping%20lion%20cub%20night&color=purple',
    title: 'Contos de Ninar',
    color: 'border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.5)]',
    delay: 'delay-100',
    position: 'top-[70%] left-[26%] md:top-[75%] md:left-[22%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    path: '/trofeus',
    image: 'https://img.usecurling.com/p/250/250?q=manga%20golden%20trophy%20sparkle&color=yellow',
    title: 'Sala de Troféus',
    color: 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]',
    delay: 'delay-150',
    position: 'top-[70%] left-[74%] md:top-[75%] md:left-[78%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    path: '/missoes',
    image: 'https://img.usecurling.com/p/250/250?q=manga%20savanna%20lion%20shield&color=red',
    title: 'Missões do Reino',
    color: 'border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.5)]',
    delay: 'delay-200',
    position: 'top-[84%] left-[50%] md:top-[88%] md:left-[50%] -translate-x-1/2 -translate-y-1/2',
  },
]

export default function Index() {
  const { schoolTasks } = useAppStore()

  const urgentTasks = schoolTasks.filter(
    (t) => t.priority === 'Urgente' && t.status !== 'completed',
  )

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex flex-col items-center justify-start md:justify-center p-2 sm:p-4 overflow-x-hidden pt-8 md:pt-4 pb-16 md:pb-4">
      {/* SVG Branches Background for Map - adjusted for Savanna vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-40 hidden md:block">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            d="M50,50 Q36,35 22,20"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <path
            d="M50,50 Q64,35 78,20"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <path
            d="M50,50 Q36,62 22,75"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <path
            d="M50,50 Q64,62 78,75"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <path
            d="M50,50 Q50,69 50,88"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mobile SVG Branches Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 md:hidden">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            d="M50,50 Q36,35 24,16"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <path
            d="M50,50 Q64,35 76,26"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <path
            d="M50,50 Q36,60 26,70"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <path
            d="M50,50 Q64,60 74,70"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
          <path
            d="M50,50 Q50,67 50,84"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative w-full max-w-5xl h-[700px] sm:h-[750px] md:h-[800px] shrink-0 my-auto">
        {/* Urgent Alert Banner */}
        {urgentTasks.length > 0 && (
          <Link
            to="/missoes"
            className="absolute -top-4 md:top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:gap-3 bg-gradient-to-b from-red-500 to-red-700 text-white px-3 py-2 md:px-6 md:py-3 rounded-full shadow-[0_10px_30px_rgba(220,38,38,0.5)] border-2 md:border-4 border-yellow-400 hover:scale-105 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-down w-[95%] max-w-[320px] md:max-w-none md:w-auto justify-center"
          >
            <div className="bg-yellow-400 text-red-700 rounded-full p-1 md:p-1.5 shadow-inner shrink-0">
              <AlertCircle className="w-3.5 h-3.5 md:w-5 md:h-5 animate-pulse" strokeWidth={3} />
            </div>
            <span className="font-display font-black text-[10px] sm:text-xs md:text-base uppercase tracking-wider text-shadow-sm drop-shadow-md whitespace-nowrap">
              {urgentTasks.length}{' '}
              {urgentTasks.length === 1 ? 'Tarefa Urgente!' : 'Tarefas Urgentes!'}
            </span>
            <ChevronRight
              className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform text-yellow-300 shrink-0"
              strokeWidth={3}
            />
          </Link>
        )}

        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center pointer-events-none">
          <div className="relative group flex flex-col items-center justify-center animate-float pointer-events-auto">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[40px] animate-pulse-glow opacity-90" />

            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-2 shadow-[0_0_50px_rgba(255,215,0,0.8)] transition-transform duration-500 group-hover:scale-105 border-4 border-yellow-200 relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://img.usecurling.com/p/400/400?q=manga%20savanna%20sunrise%20lion&color=orange"
                  alt="Savanna Background"
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="w-full h-full rounded-full border-4 border-white/40 flex flex-col items-center justify-center p-2 sm:p-4 text-center z-10 bg-black/10 backdrop-blur-sm">
                <span
                  className="text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2 drop-shadow-lg animate-bounce"
                  style={{ animationDuration: '3s' }}
                >
                  🦁
                </span>
                <h1 className="font-display font-black text-sm sm:text-xl md:text-3xl leading-tight text-white uppercase tracking-widest text-shadow-sm drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                  Diário de
                  <br />
                  Aventuras
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
              'absolute z-10 flex flex-col items-center gap-2 md:gap-3 group transition-all duration-300 hover:scale-110 animate-float',
              node.position,
              node.delay,
            )}
          >
            <div
              className={cn(
                'w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full shadow-xl flex items-center justify-center relative overflow-hidden border-[3px] md:border-4 bg-white',
                node.color,
              )}
            >
              <img
                src={node.image}
                alt={node.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity opacity-0 group-hover:opacity-100" />
            </div>

            <div className="bg-white/95 backdrop-blur-md px-2 md:px-5 py-1 md:py-2 rounded-xl md:rounded-full shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-colors max-w-[100px] md:max-w-none w-full flex items-center justify-center">
              <span className="font-display font-black text-[10px] leading-[1.1] md:leading-normal sm:text-xs md:text-lg text-orange-900 text-center uppercase tracking-wider block">
                {node.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
