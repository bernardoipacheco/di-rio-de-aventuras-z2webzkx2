import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const nodes = [
  {
    path: '/estante',
    image: 'https://img.usecurling.com/p/250/250?q=manga%20baobab%20tree%20savanna&color=green',
    title: 'Estante Mágica',
    color: 'border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]',
    delay: 'delay-0',
    position: 'top-[15%] left-[20%] md:top-[20%] md:left-[22%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    path: '/pelucias',
    image: 'https://img.usecurling.com/p/250/250?q=manga%20cozy%20animal%20den%20cave&color=orange',
    title: 'Refúgio das Pelúcias',
    color: 'border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.5)]',
    delay: 'delay-75',
    position: 'top-[15%] left-[80%] md:top-[20%] md:left-[78%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    path: '/contos',
    image:
      'https://img.usecurling.com/p/250/250?q=manga%20sleeping%20lion%20cub%20night&color=purple',
    title: 'Contos de Ninar',
    color: 'border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.5)]',
    delay: 'delay-100',
    position: 'top-[80%] left-[20%] md:top-[75%] md:left-[22%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    path: '/trofeus',
    image: 'https://img.usecurling.com/p/250/250?q=manga%20golden%20trophy%20sparkle&color=yellow',
    title: 'Sala de Troféus',
    color: 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]',
    delay: 'delay-150',
    position: 'top-[80%] left-[80%] md:top-[75%] md:left-[78%] -translate-x-1/2 -translate-y-1/2',
  },
  {
    path: '/missoes',
    image: 'https://img.usecurling.com/p/250/250?q=manga%20savanna%20lion%20shield&color=red',
    title: 'Missões do Reino',
    color: 'border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.5)]',
    delay: 'delay-200',
    position: 'top-[92%] left-[50%] md:top-[88%] md:left-[50%] -translate-x-1/2 -translate-y-1/2',
  },
]

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex items-center justify-center p-4 overflow-hidden">
      {/* SVG Branches Background for Map - adjusted for Savanna vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
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

      <div className="relative w-full max-w-5xl h-[650px] md:h-[800px]">
        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group flex flex-col items-center justify-center animate-float">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[40px] animate-pulse-glow opacity-90" />

            <div className="w-44 h-44 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-2 shadow-[0_0_50px_rgba(255,215,0,0.8)] transition-transform duration-500 group-hover:scale-105 border-4 border-yellow-200 relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://img.usecurling.com/p/400/400?q=manga%20savanna%20sunrise%20lion&color=orange"
                  alt="Savanna Background"
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="w-full h-full rounded-full border-4 border-white/40 flex flex-col items-center justify-center p-4 text-center z-10 bg-black/10 backdrop-blur-sm">
                <span
                  className="text-5xl md:text-6xl mb-2 drop-shadow-lg animate-bounce"
                  style={{ animationDuration: '3s' }}
                >
                  🦁
                </span>
                <h1 className="font-display font-black text-xl md:text-3xl leading-none text-white uppercase tracking-widest text-shadow-sm drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
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
              'absolute z-10 flex flex-col items-center gap-3 group transition-all duration-300 hover:scale-110 animate-float',
              node.position,
              node.delay,
            )}
          >
            <div
              className={cn(
                'w-20 h-20 md:w-32 md:h-32 rounded-full shadow-xl flex items-center justify-center relative overflow-hidden border-4 bg-white',
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

            <div className="bg-white/95 backdrop-blur-md px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-colors">
              <span className="font-display font-black text-xs md:text-lg text-orange-900 text-center whitespace-nowrap uppercase tracking-wider">
                {node.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
