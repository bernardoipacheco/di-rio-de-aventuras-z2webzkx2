import {
  Shield,
  Check,
  X,
  LogOut,
  Settings,
  BarChart3,
  Edit3,
  Activity,
  BookOpen,
  ScrollText,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useNavigate } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
import { useEffect } from 'react'
import { RelatorioHarmonia } from '@/components/RelatorioHarmonia'

export default function AreaPais() {
  const navigate = useNavigate()
  const {
    tasks,
    books,
    schoolTasks,
    approveTask,
    rejectTask,
    approveBook,
    rejectBook,
    approveSchoolTask,
    rejectSchoolTask,
    isParentAuthenticated,
    setParentAuthenticated,
    customRewards,
    updateCustomReward,
    emotionHistory,
  } = useAppStore()

  useEffect(() => {
    if (!isParentAuthenticated) {
      navigate('/')
    }
  }, [isParentAuthenticated, navigate])

  if (!isParentAuthenticated) {
    return null
  }

  const handleLogout = () => {
    setParentAuthenticated(false)
    navigate('/')
  }

  const pendingTasks = tasks.filter((t) => t.status === 'pending')
  const pendingBooks = books.filter((b) => b.status === 'pending')
  const pendingSchoolTasks = schoolTasks.filter((st) => st.status === 'pending')

  const totalPending = pendingTasks.length + pendingBooks.length + pendingSchoolTasks.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF6E5] to-white print:bg-white print:min-h-0">
      <div className="container py-8 max-w-5xl animate-fade-in print:py-0">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white/80 p-6 rounded-3xl border-2 border-[#DEB887] shadow-sm backdrop-blur-md print:hidden">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-300">
              <Shield className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-black text-[#5C3A21] uppercase tracking-wide">
                Conselho dos Mestres
              </h1>
              <p className="text-[#8B4513] font-medium opacity-80">Área Restrita Administrativa</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 shadow-sm"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair para a Savana
          </Button>
        </div>

        <Tabs defaultValue="pendentes" className="w-full">
          <TabsList className="w-full flex-wrap sm:flex-nowrap bg-[#DEB887]/20 p-2 rounded-2xl h-auto mb-8 border border-[#DEB887]/50 shadow-inner print:hidden gap-2">
            <TabsTrigger
              value="pendentes"
              className="flex-1 sm:flex-none rounded-xl py-3 px-4 font-bold text-[#8B4513] data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm transition-all"
            >
              <Check className="w-4 h-4 mr-2 hidden sm:inline" /> Pendentes
              {totalPending > 0 && (
                <span className="ml-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalPending}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="tesouros"
              className="flex-1 sm:flex-none rounded-xl py-3 px-4 font-bold text-[#8B4513] data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm transition-all"
            >
              <Settings className="w-4 h-4 mr-2 hidden sm:inline" /> Tesouros
            </TabsTrigger>
            <TabsTrigger
              value="humor"
              className="flex-1 sm:flex-none rounded-xl py-3 px-4 font-bold text-[#8B4513] data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm transition-all"
            >
              <BarChart3 className="w-4 h-4 mr-2 hidden sm:inline" /> Humor
            </TabsTrigger>
            <TabsTrigger
              value="harmonia"
              className="flex-1 sm:flex-none rounded-xl py-3 px-4 font-bold text-blue-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all border border-transparent data-[state=active]:border-blue-700 bg-blue-50/50"
            >
              <Activity className="w-4 h-4 mr-2 hidden sm:inline" /> Harmonia
            </TabsTrigger>
          </TabsList>

          <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border-2 border-[#DEB887]/40 shadow-xl p-2 sm:p-6 min-h-[500px] print:border-0 print:shadow-none print:p-0">
            <TabsContent value="pendentes" className="m-0 animate-fade-in-up print:hidden">
              <div className="px-4 py-2 mb-4">
                <h2 className="text-2xl font-display font-bold text-[#5C3A21] mb-2">
                  Aprovações do Reino
                </h2>
                <p className="text-muted-foreground">
                  Analise as missões concluídas e as novas adições para a Estante Mágica.
                </p>
              </div>

              {totalPending === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-[#FFF6E5]/50 rounded-3xl border-2 border-dashed border-[#DEB887]/50 m-4">
                  <div className="text-6xl mb-4 opacity-50 grayscale">🦁</div>
                  <h3 className="font-display font-bold text-xl text-[#8B4513]">
                    Tudo limpo por aqui!
                  </h3>
                  <p className="text-[#8B4513]/70">Não há itens aguardando aprovação no momento.</p>
                </div>
              ) : (
                <div className="grid gap-4 p-2 sm:p-4">
                  {pendingTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="border-2 border-[#DEB887]/40 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                              Missão: {task.category}
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-xl text-[#5C3A21]">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 font-bold px-3 py-1 rounded-lg border border-orange-200">
                              +{task.xpReward} XP
                            </span>
                            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-lg border border-blue-200">
                              +{task.crystalsReward} 💎
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                          <Button
                            variant="outline"
                            onClick={() => rejectTask(task.id)}
                            className="flex-1 md:flex-none border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl h-12"
                          >
                            <X className="w-4 h-4 mr-2" /> Pedir mais Treino
                          </Button>
                          <Button
                            onClick={() => approveTask(task.id)}
                            className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white rounded-xl h-12 shadow-md hover:shadow-lg transition-all"
                          >
                            <Check className="w-4 h-4 mr-2" /> Dar Selo do Rafiki
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {pendingBooks.map((book) => (
                    <Card
                      key={book.id}
                      className="border-2 border-purple-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-purple-50/30"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                              <BookOpen className="w-3 h-3" /> Novo Livro
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-xl text-purple-950">
                            {book.title}
                          </h4>
                          <p className="text-purple-800/80 text-sm mt-1 font-medium">
                            {book.totalPages} páginas
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                          <Button
                            variant="outline"
                            onClick={() => rejectBook(book.id)}
                            className="flex-1 md:flex-none border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-12"
                          >
                            <X className="w-4 h-4 mr-2" /> Recusar
                          </Button>
                          <Button
                            onClick={() => approveBook(book.id)}
                            className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 shadow-md hover:shadow-lg transition-all"
                          >
                            <Check className="w-4 h-4 mr-2" /> Aprovar Livro
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {pendingSchoolTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="border-2 border-blue-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-blue-50/30"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                              <ScrollText className="w-3 h-3" /> Nova Tarefa
                            </span>
                            <span className="bg-white border border-blue-200 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                              {task.priority}
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-xl text-blue-950">
                            {task.title}
                          </h4>
                          <p className="text-blue-800/80 text-sm mt-1 font-medium">
                            Para: {task.dueDate}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                          <Button
                            variant="outline"
                            onClick={() => rejectSchoolTask(task.id)}
                            className="flex-1 md:flex-none border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-12"
                          >
                            <X className="w-4 h-4 mr-2" /> Recusar
                          </Button>
                          <Button
                            onClick={() => approveSchoolTask(task.id)}
                            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 shadow-md hover:shadow-lg transition-all"
                          >
                            <Check className="w-4 h-4 mr-2" /> Aprovar Tarefa
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="tesouros" className="m-0 animate-fade-in-up print:hidden">
              <div className="px-4 py-2 mb-6">
                <h2 className="text-2xl font-display font-bold text-[#5C3A21] mb-2">
                  Baú do Reino
                </h2>
                <p className="text-muted-foreground">
                  Personalize as recompensas reais que podem ser resgatadas com Cristais.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                {customRewards.map((reward) => (
                  <Card
                    key={reward.id}
                    className="border-2 border-[#DEB887]/40 shadow-sm rounded-2xl group focus-within:border-amber-400 transition-colors"
                  >
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl border border-amber-200 shrink-0 shadow-inner">
                        {reward.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label
                          htmlFor={reward.id}
                          className="text-sm font-bold text-[#8B4513] uppercase tracking-wider flex items-center gap-2"
                        >
                          Nome da Recompensa <Edit3 className="w-3 h-3 opacity-50" />
                        </Label>
                        <Input
                          id={reward.id}
                          value={reward.name}
                          onChange={(e) => updateCustomReward(reward.id, e.target.value)}
                          className="font-bold text-lg text-[#5C3A21] bg-[#FFF6E5]/50 border-[#DEB887] focus-visible:ring-amber-500 rounded-xl"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="humor" className="m-0 animate-fade-in-up print:hidden">
              <div className="px-4 py-2 mb-6">
                <h2 className="text-2xl font-display font-bold text-[#5C3A21] mb-2">
                  Monitoramento Emocional
                </h2>
                <p className="text-muted-foreground">
                  Evolução dos sentimentos registrados nas pelúcias nos últimos 7 dias.
                </p>
              </div>

              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0 sm:p-6">
                  <div className="bg-[#FFF6E5]/30 p-4 sm:p-8 rounded-[2rem] border-2 border-[#DEB887]/30 shadow-inner">
                    <ChartContainer
                      config={{
                        value: {
                          label: 'Nível de Humor',
                          color: 'hsl(var(--primary))',
                        },
                      }}
                      className="h-[350px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={emotionHistory}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#DEB887"
                            opacity={0.4}
                          />
                          <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8B4513', fontWeight: 'bold' }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8B4513', fontWeight: 'bold' }}
                            domain={[0, 100]}
                          />
                          <ChartTooltip
                            content={<ChartTooltipContent indicator="line" />}
                            cursor={{ stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '4 4' }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#f59e0b"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            activeDot={{ r: 6, fill: '#ea580c', stroke: '#fff', strokeWidth: 3 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="harmonia" className="m-0 animate-fade-in-up">
              <RelatorioHarmonia />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
