import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import useAppStore, { Task } from '@/stores/useAppStore'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

export default function MissoesReino() {
  const {
    tasks,
    submitTask,
    approveTask,
    xp,
    levelText,
    showRafikiSeal,
    lastReward,
    dismissRafikiSeal,
  } = useAppStore()

  useEffect(() => {
    if (showRafikiSeal) {
      const timer = setTimeout(() => dismissRafikiSeal(), 5000)
      return () => clearTimeout(timer)
    }
  }, [showRafikiSeal, dismissRafikiSeal])

  const pendingOrTodoTasks = tasks.filter((t) => t.status !== 'completed')
  const completedTasks = tasks.filter((t) => t.status === 'completed')

  const evolutionIcon =
    levelText === 'Rei'
      ? 'https://img.usecurling.com/p/100/100?q=manga%20lion%20king&color=orange'
      : levelText === 'Explorador'
        ? 'https://img.usecurling.com/p/100/100?q=manga%20lion%20teen&color=yellow'
        : 'https://img.usecurling.com/p/100/100?q=manga%20lion%20cub&color=yellow'

  const progressPercent = Math.min((xp / 1000) * 100, 100)

  const handleTaskAction = (task: Task) => {
    if (task.status === 'todo') {
      submitTask(task.id)
    } else if (task.status === 'pending') {
      // Simulation: Clicking a pending task immediately approves it for demonstration purposes
      approveTask(task.id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffb07c] via-[#ffd085] to-[#fff3b0] p-4 pt-6 md:p-8 animate-fade-in relative overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Control */}
        <div className="mb-6 flex">
          <Button
            variant="outline"
            asChild
            className="rounded-full bg-white/80 backdrop-blur-sm border-orange-300 text-orange-900 hover:bg-orange-100 shadow-sm font-bold"
          >
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a Savana
            </Link>
          </Button>
        </div>

        {/* Dynamic Simba XP Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/60 p-5 rounded-[2rem] backdrop-blur-md mb-10 border-4 border-white shadow-xl animate-slide-down">
          <div className="w-24 h-24 rounded-full border-[6px] border-orange-400 bg-orange-50 flex-shrink-0 shadow-inner overflow-hidden relative group">
            <img
              src={evolutionIcon}
              alt={levelText}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-yellow-400/20 mix-blend-overlay" />
          </div>
          <div className="flex-1 w-full mt-2 sm:mt-0">
            <div className="flex justify-between items-end mb-2 px-1">
              <div>
                <span className="text-orange-900/60 font-bold text-xs uppercase tracking-wider block mb-1">
                  Evolução do Leão
                </span>
                <span className="font-display font-black text-2xl md:text-3xl text-orange-900 tracking-wide uppercase leading-none drop-shadow-sm">
                  {levelText}
                </span>
              </div>
              <span className="text-orange-900 font-black text-lg bg-white/80 px-4 py-1 rounded-full shadow-sm border border-orange-100">
                {xp} XP
              </span>
            </div>
            <Progress
              value={progressPercent}
              className="h-5 bg-orange-200 border-2 border-orange-100 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-orange-600 [&>div]:rounded-full shadow-inner"
            />
          </div>
        </div>

        {/* Savannah Scroll Interface */}
        <div className="relative mx-auto w-full max-w-full animate-slide-up pb-20 overflow-visible">
          {/* Top Wooden Rod */}
          <div className="h-8 md:h-10 bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] rounded-full mx-[-0.25rem] md:mx-[-1rem] shadow-[0_4px_10px_rgba(0,0,0,0.4)] relative z-20 flex items-center justify-between px-1 md:px-2">
            <div className="w-4 md:w-6 h-12 md:h-14 bg-gradient-to-r from-[#D2691E] to-[#8B4513] rounded-full border-2 border-[#5C3A21] -ml-2 md:-ml-4 shadow-md" />
            <div className="w-4 md:w-6 h-12 md:h-14 bg-gradient-to-r from-[#D2691E] to-[#8B4513] rounded-full border-2 border-[#5C3A21] -mr-2 md:-mr-4 shadow-md" />
          </div>

          {/* Paper Content */}
          <div className="bg-[#FFF6E5] border-x-[6px] md:border-x-[12px] border-[#DEB887] py-8 md:py-12 px-3 sm:px-10 shadow-2xl relative z-10 min-h-[500px] flex flex-col items-center mx-1 md:mx-0">
            {/* Title */}
            <div className="text-center mb-8 md:mb-10 w-full px-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#5C3A21] tracking-wider mb-2 md:mb-3 drop-shadow-sm uppercase">
                Missões do Reino
              </h1>
              <div className="w-24 md:w-32 h-1 md:h-1.5 bg-[#8B4513] mx-auto rounded-full opacity-40" />
            </div>

            {/* Interactive Mission Cards */}
            <div className="w-full space-y-3 md:space-y-4 max-w-xl">
              {pendingOrTodoTasks.length === 0 ? (
                <p className="text-[#8B4513] text-center py-6 md:py-8 font-bold text-base md:text-lg bg-[#DEB887]/20 rounded-xl md:rounded-2xl border-2 border-dashed border-[#DEB887]">
                  Todas as missões ativas foram concluídas! A Savana está em paz. 🌅
                </p>
              ) : (
                pendingOrTodoTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white/80 rounded-xl md:rounded-2xl p-3 md:p-4 border-2 border-[#DEB887] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 overflow-hidden"
                  >
                    <div className="flex-1 text-center sm:text-left w-full min-w-0">
                      <h3 className="font-display font-bold text-lg md:text-xl text-[#5C3A21] leading-tight mb-2 md:mb-1 truncate whitespace-normal break-words">
                        {task.title}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3">
                        <span className="text-xs md:text-sm font-bold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          +{task.xpReward} XP
                        </span>
                        <span className="text-xs md:text-sm font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap">
                          +{task.crystalsReward} 💎
                        </span>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto shrink-0 flex flex-col items-center">
                      <Button
                        onClick={() => handleTaskAction(task)}
                        className={cn(
                          'w-full sm:w-auto rounded-full font-bold text-sm md:text-base h-10 md:h-12 px-4 md:px-6 transition-all duration-300 border-b-4 active:border-b-0 active:translate-y-1 whitespace-normal text-center leading-tight',
                          task.status === 'pending'
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300'
                            : 'bg-green-500 hover:bg-green-600 text-white border-green-700 shadow-md',
                        )}
                        style={{ height: 'auto', minHeight: '40px', padding: '8px 16px' }}
                      >
                        {task.status === 'pending' ? 'Esperando o Rafiki...' : task.buttonLabel}
                      </Button>
                      {task.status === 'pending' && (
                        <p className="text-[9px] md:text-[10px] text-center text-[#A0522D] mt-1.5 opacity-70 font-bold uppercase tracking-widest leading-tight">
                          Toque p/ simular
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Completed Tasks Minimal List */}
            {completedTasks.length > 0 && (
              <div className="w-full max-w-xl mt-10 border-t-2 border-dashed border-[#DEB887] pt-6 opacity-60 hover:opacity-100 transition-opacity">
                <h4 className="text-[#8B4513] font-bold text-center mb-4 uppercase tracking-widest text-sm">
                  Missões Concluídas
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {completedTasks.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-1.5 bg-[#DEB887]/30 px-3 py-1.5 rounded-full text-sm font-medium text-[#5C3A21]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rafiki's Seal & Rewards Dedicated Space */}
            <div className="mt-14 w-full flex flex-col items-center pb-4">
              <div
                className={cn(
                  'w-40 h-40 relative flex items-center justify-center rounded-full transition-all duration-500',
                  showRafikiSeal ? 'border-0' : 'border-4 border-dashed border-[#DEB887]',
                )}
              >
                {showRafikiSeal ? (
                  <svg
                    className="w-32 h-32 text-red-600 drop-shadow-xl animate-bounce"
                    style={{ animationDuration: '3s' }}
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  >
                    <path
                      d="M50,15 C25,15 15,35 15,60 C15,85 35,90 50,90 C65,90 85,85 85,60 C85,35 75,15 50,15 Z"
                      strokeDasharray="300"
                      strokeDashoffset="300"
                      className="animate-rafiki-draw"
                    />
                    <path
                      d="M35,45 Q40,40 45,45"
                      strokeDasharray="50"
                      strokeDashoffset="50"
                      className="animate-rafiki-draw"
                      style={{ animationDelay: '0.3s' }}
                    />
                    <path
                      d="M65,45 Q60,40 55,45"
                      strokeDasharray="50"
                      strokeDashoffset="50"
                      className="animate-rafiki-draw"
                      style={{ animationDelay: '0.3s' }}
                    />
                    <path
                      d="M40,70 Q50,80 60,70"
                      strokeDasharray="50"
                      strokeDashoffset="50"
                      className="animate-rafiki-draw"
                      style={{ animationDelay: '0.6s' }}
                    />
                  </svg>
                ) : (
                  <div className="text-center opacity-30 flex flex-col items-center">
                    <span className="text-5xl block mb-2 filter grayscale">🐾</span>
                    <span className="text-xs font-black uppercase tracking-widest text-[#8B4513]">
                      Selo do Rei
                    </span>
                  </div>
                )}
              </div>

              {showRafikiSeal && lastReward && (
                <div className="mt-6 text-center animate-slide-up flex flex-col items-center">
                  <p className="font-display font-black text-3xl text-orange-600 mb-4 drop-shadow-sm uppercase">
                    Aprovado pelo Rei!
                  </p>
                  <div className="flex flex-col gap-3 items-center w-full">
                    <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-yellow-100 to-yellow-50 px-6 py-3 rounded-full border-2 border-yellow-400 shadow-lg min-w-[280px]">
                      <span className="font-black text-yellow-800 text-lg uppercase tracking-wide">
                        Cristais do Reino
                      </span>
                      <span className="font-black text-2xl text-yellow-600 flex items-center gap-1">
                        +{lastReward.crystals} 💎
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-orange-100 to-orange-50 px-6 py-3 rounded-full border-2 border-orange-400 shadow-lg min-w-[280px]">
                      <span className="font-black text-orange-800 text-lg uppercase tracking-wide">
                        XP de Evolução
                      </span>
                      <span className="font-black text-2xl text-orange-600 flex items-center gap-1">
                        +{lastReward.xp} 🦁
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Wooden Rod */}
          <div className="h-8 md:h-10 bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] rounded-full mx-[-0.25rem] md:mx-[-1rem] shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative z-20 flex items-center justify-between px-1 md:px-2 -mt-1 md:-mt-2">
            <div className="w-4 md:w-6 h-12 md:h-14 bg-gradient-to-r from-[#D2691E] to-[#8B4513] rounded-full border-2 border-[#5C3A21] -ml-2 md:-ml-4 shadow-md" />
            <div className="w-4 md:w-6 h-12 md:h-14 bg-gradient-to-r from-[#D2691E] to-[#8B4513] rounded-full border-2 border-[#5C3A21] -mr-2 md:-mr-4 shadow-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
