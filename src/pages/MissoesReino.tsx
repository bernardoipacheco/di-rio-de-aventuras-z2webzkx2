import { useEffect, useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Calendar as CalendarIcon, BookOpen, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import useAppStore, { Task, SchoolTask } from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

export default function MissoesReino() {
  const {
    tasks,
    schoolTasks,
    submitTask,
    approveTask,
    completeSchoolTask,
    xp,
    levelText,
    showRafikiSeal,
    lastReward,
    dismissRafikiSeal,
  } = useAppStore()

  const [searchParams] = useSearchParams()
  const taskIdParam = searchParams.get('taskId')

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const taskListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (taskIdParam) {
      const foundSchoolTask = schoolTasks.find((t) => t.id === taskIdParam)
      if (foundSchoolTask && foundSchoolTask.date) {
        setSelectedDate(new Date(foundSchoolTask.date + 'T12:00:00'))
        setTimeout(() => {
          document
            .getElementById(`task-${taskIdParam}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 300)
      } else {
        const foundTask = tasks.find((t) => t.id === taskIdParam)
        if (foundTask && foundTask.date) {
          setSelectedDate(new Date(foundTask.date + 'T12:00:00'))
          setTimeout(() => {
            document
              .getElementById(`task-${taskIdParam}`)
              ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 300)
        }
      }
    }
  }, [taskIdParam, schoolTasks, tasks])

  useEffect(() => {
    if (showRafikiSeal) {
      const timer = setTimeout(() => dismissRafikiSeal(), 5000)
      return () => clearTimeout(timer)
    }
  }, [showRafikiSeal, dismissRafikiSeal])

  const selectedDateStr = selectedDate.toISOString().split('T')[0]
  const todayStr = new Date().toISOString().split('T')[0]

  const dayTasks = tasks.filter((t) => t.date === selectedDateStr)
  const daySchoolTasks = schoolTasks.filter((t) => t.date === selectedDateStr)

  const pendingOrTodoTasks = dayTasks.filter((t) => t.status !== 'completed')
  const completedTasks = dayTasks.filter((t) => t.status === 'completed')

  const pendingOrTodoSchoolTasks = daySchoolTasks.filter((t) => t.status !== 'completed')
  const completedSchoolTasks = daySchoolTasks.filter((t) => t.status === 'completed')

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
      approveTask(task.id)
    }
  }

  const handleSchoolTaskAction = (task: SchoolTask) => {
    if (task.status !== 'completed') {
      completeSchoolTask(task.id)
    }
  }

  const getFormatDateTitle = () => {
    if (selectedDateStr === todayStr) return 'Hoje na Savana'

    const d = new Date(selectedDateStr + 'T12:00:00')
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    if (selectedDateStr === tomorrow.toISOString().split('T')[0]) return 'Amanhã na Savana'

    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
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

        {/* Playful Calendar */}
        <div className="w-full bg-[#DEB887]/30 p-4 md:p-6 rounded-3xl border-4 border-dashed border-[#DEB887] mb-8 shadow-sm relative overflow-hidden animate-slide-up backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://img.usecurling.com/p/400/100?q=leaves&color=yellow')] opacity-10 pointer-events-none mix-blend-multiply" />

          <div className="flex items-center justify-center gap-2 mb-5 relative z-10">
            <CalendarIcon className="w-6 h-6 text-[#8B4513]" />
            <h2 className="text-[#8B4513] font-display font-black text-2xl uppercase tracking-wider">
              Calendário Mágico
            </h2>
          </div>

          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar justify-start sm:justify-center relative z-10 px-2">
            {Array.from({ length: 14 }).map((_, i) => {
              const d = new Date()
              d.setDate(d.getDate() - 3 + i)
              const dStr = d.toISOString().split('T')[0]
              const isSelected = selectedDateStr === dStr
              const isToday = dStr === todayStr

              const hasTasks = tasks.some((t) => t.date === dStr && t.status !== 'completed')
              const hasSchool = schoolTasks.some((t) => t.date === dStr && t.status !== 'completed')

              return (
                <button
                  key={dStr}
                  onClick={() => setSelectedDate(d)}
                  className={cn(
                    'flex flex-col items-center justify-center min-w-[4.5rem] md:min-w-[5rem] p-3 rounded-2xl border-[3px] transition-all snap-center shadow-sm',
                    isSelected
                      ? 'bg-gradient-to-b from-orange-400 to-orange-500 border-orange-200 text-white scale-110 shadow-lg ring-4 ring-orange-400/30'
                      : isToday
                        ? 'bg-gradient-to-b from-yellow-200 to-yellow-300 border-yellow-400 text-yellow-900'
                        : 'bg-white/90 border-[#DEB887] text-[#8B4513] hover:bg-orange-50 hover:scale-105',
                  )}
                >
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-90 mb-1">
                    {d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
                  </span>
                  <span className="text-2xl md:text-3xl font-black font-display leading-none drop-shadow-sm">
                    {d.getDate()}
                  </span>
                  <div className="flex gap-1.5 mt-2 h-2.5">
                    {hasTasks && (
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm border border-white" />
                    )}
                    {hasSchool && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm border border-white" />
                    )}
                    {!hasTasks && !hasSchool && <div className="w-2.5 h-2.5" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex justify-center gap-6 mt-2 text-xs md:text-sm font-bold text-[#8B4513] relative z-10 bg-white/50 w-fit mx-auto px-4 py-1.5 rounded-full">
            <div className="flex items-center gap-1.5 uppercase tracking-wide">
              <div className="w-3 h-3 rounded-full bg-red-500 border border-white shadow-sm" />{' '}
              Missões
            </div>
            <div className="flex items-center gap-1.5 uppercase tracking-wide">
              <div className="w-3 h-3 rounded-full bg-blue-500 border border-white shadow-sm" />{' '}
              Aulas
            </div>
          </div>
        </div>

        {/* Savannah Scroll Interface */}
        <div
          className="relative mx-auto w-full max-w-full animate-slide-up pb-20 overflow-visible"
          ref={taskListRef}
        >
          {/* Top Wooden Rod */}
          <div className="h-8 md:h-10 bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] rounded-full mx-[-0.25rem] md:mx-[-1rem] shadow-[0_4px_10px_rgba(0,0,0,0.4)] relative z-20 flex items-center justify-between px-1 md:px-2">
            <div className="w-4 md:w-6 h-12 md:h-14 bg-gradient-to-r from-[#D2691E] to-[#8B4513] rounded-full border-2 border-[#5C3A21] -ml-2 md:-ml-4 shadow-md" />
            <div className="w-4 md:w-6 h-12 md:h-14 bg-gradient-to-r from-[#D2691E] to-[#8B4513] rounded-full border-2 border-[#5C3A21] -mr-2 md:-mr-4 shadow-md" />
          </div>

          {/* Paper Content */}
          <div className="bg-[#FFF6E5] border-x-[6px] md:border-x-[12px] border-[#DEB887] py-8 md:py-12 px-3 sm:px-10 shadow-2xl relative z-10 min-h-[500px] flex flex-col items-center mx-1 md:mx-0">
            {/* Title */}
            <div className="text-center mb-8 w-full px-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-[#5C3A21] tracking-wider mb-2 drop-shadow-sm uppercase capitalize">
                {getFormatDateTitle()}
              </h1>
              <div className="w-24 md:w-32 h-1 md:h-1.5 bg-[#8B4513] mx-auto rounded-full opacity-40" />
            </div>

            {daySchoolTasks.length === 0 && dayTasks.length === 0 ? (
              <div className="w-full max-w-xl text-center py-10 bg-[#DEB887]/20 rounded-2xl border-2 border-dashed border-[#DEB887] mb-8">
                <span className="text-4xl block mb-3">🌅</span>
                <p className="text-[#8B4513] font-bold text-lg">
                  Dia livre! Nenhuma aula ou missão programada para esta data.
                </p>
              </div>
            ) : (
              <div className="w-full space-y-8 max-w-xl">
                {/* School Tasks Section */}
                {(pendingOrTodoSchoolTasks.length > 0 || completedSchoolTasks.length > 0) && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h3 className="font-display font-black text-xl text-blue-900 uppercase tracking-widest">
                        Aulas e Estudos
                      </h3>
                    </div>

                    {pendingOrTodoSchoolTasks.map((task) => (
                      <div
                        key={task.id}
                        id={`task-${task.id}`}
                        className={cn(
                          'bg-white/90 rounded-2xl p-4 border-l-8 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden relative',
                          task.priority === 'Urgente'
                            ? 'border-red-500 ring-2 ring-red-200'
                            : 'border-blue-500',
                          taskIdParam === task.id
                            ? 'ring-4 ring-yellow-400 animate-pulse-glow'
                            : '',
                        )}
                      >
                        {task.priority === 'Urgente' && (
                          <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg uppercase">
                            Urgente
                          </div>
                        )}
                        <div className="flex-1 text-center sm:text-left w-full min-w-0">
                          <h4 className="font-display font-bold text-lg md:text-xl text-[#5C3A21] leading-tight mb-2 truncate whitespace-normal break-words">
                            {task.title}
                          </h4>
                          <span className="text-xs md:text-sm font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full inline-block">
                            📚 Estudo
                          </span>
                        </div>
                        <Button
                          onClick={() => handleSchoolTaskAction(task)}
                          className="w-full sm:w-auto rounded-full font-bold text-sm md:text-base h-10 md:h-12 px-4 md:px-6 transition-all duration-300 border-b-4 active:border-b-0 active:translate-y-1 bg-blue-500 hover:bg-blue-600 text-white border-blue-700 shadow-md shrink-0"
                        >
                          Concluir Aula ✨
                        </Button>
                      </div>
                    ))}

                    {completedSchoolTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-blue-50/50 rounded-2xl p-4 border-2 border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-70"
                      >
                        <div className="flex-1 text-center sm:text-left flex items-center gap-2 justify-center sm:justify-start">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                          <h4 className="font-bold text-blue-900 line-through decoration-blue-300">
                            {task.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Regular Tasks Section */}
                {(pendingOrTodoTasks.length > 0 || completedTasks.length > 0) && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 pt-4 border-t-2 border-dashed border-[#DEB887]">
                      <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                      <h3 className="font-display font-black text-xl text-orange-900 uppercase tracking-widest">
                        Missões da Savana
                      </h3>
                    </div>

                    {pendingOrTodoTasks.map((task) => (
                      <div
                        key={task.id}
                        id={`task-${task.id}`}
                        className={cn(
                          'bg-white/90 rounded-2xl p-4 border-2 border-[#DEB887] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden',
                          taskIdParam === task.id
                            ? 'ring-4 ring-yellow-400 animate-pulse-glow'
                            : '',
                        )}
                      >
                        <div className="flex-1 text-center sm:text-left w-full min-w-0">
                          <h4 className="font-display font-bold text-lg md:text-xl text-[#5C3A21] leading-tight mb-2 truncate whitespace-normal break-words">
                            {task.title}
                          </h4>
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
                            {task.status === 'pending' ? 'Esperando o Rei...' : task.buttonLabel}
                          </Button>
                        </div>
                      </div>
                    ))}

                    {completedTasks.length > 0 && (
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                        {completedTasks.map((t) => (
                          <div
                            key={t.id}
                            className="flex items-center gap-1.5 bg-[#DEB887]/30 px-3 py-1.5 rounded-full text-sm font-medium text-[#5C3A21] opacity-70"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            {t.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
