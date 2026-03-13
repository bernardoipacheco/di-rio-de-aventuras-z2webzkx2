import { useMemo } from 'react'
import { Sun, CloudRain, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import useAppStore from '@/stores/useAppStore'
import { useToast } from '@/hooks/use-toast'

export function RelatorioHarmonia() {
  const { emotionHistory } = useAppStore()
  const { toast } = useToast()

  const insight = useMemo(() => {
    const high = emotionHistory.filter((d) => d.value >= 70)
    const low = emotionHistory.filter((d) => d.value < 70)
    const avgHigh = high.reduce((a, b) => a + b.xp, 0) / (high.length || 1)
    const avgLow = low.reduce((a, b) => a + b.xp, 0) / (low.length || 1)
    const diff = avgLow ? Math.round(((avgHigh - avgLow) / avgLow) * 100) : 0

    if (diff > 0) {
      return `Nos dias de maior humor, a produtividade nas missões aumentou ${diff}%! A alegria é o melhor combustível da Savana.`
    }
    return `A harmonia está equilibrada! Continue incentivando missões nos dias mais desafiadores para manter a chama acesa.`
  }, [emotionHistory])

  const handleExport = () => {
    window.print()
    toast({
      title: 'Relatório Preparado! 🖨️',
      description: 'O registro da semana está pronto para ser salvo.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 py-2 print:hidden">
        <div>
          <h2 className="text-2xl font-display font-bold text-[#5C3A21] mb-1">
            Relatório de Harmonia
          </h2>
          <p className="text-muted-foreground text-sm">
            Evolução emocional e produtividade dos últimos 7 dias.
          </p>
        </div>
        <Button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md w-full sm:w-auto"
        >
          <Download className="w-4 h-4 mr-2" /> Salvar Registro
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 sm:px-0">
        <Card className="border-2 border-blue-200/60 shadow-sm rounded-2xl overflow-hidden bg-white/80">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-display font-bold text-lg text-blue-900 mb-6 text-center">
              Clima nas Terras do Reino
            </h3>
            <div className="relative pl-8 h-[250px]">
              <Sun className="absolute top-0 left-0 w-6 h-6 text-amber-500 animate-pulse" />
              <CloudRain className="absolute bottom-6 left-0 w-6 h-6 text-slate-400" />
              <ChartContainer
                config={{ value: { label: 'Nível de Humor', color: '#3b82f6' } }}
                className="h-full w-full"
              >
                <ResponsiveContainer>
                  <LineChart
                    data={emotionHistory}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontWeight: 'bold' }}
                      dy={10}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={false} domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={4}
                      dot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200/60 shadow-sm rounded-2xl overflow-hidden bg-white/80">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-display font-bold text-lg text-orange-900 mb-6 text-center">
              Resumo de Atividades (XP)
            </h3>
            <div className="h-[250px]">
              <ChartContainer
                config={{ xp: { label: 'Cristais/XP Ganhos', color: '#f97316' } }}
                className="h-full w-full"
              >
                <ResponsiveContainer>
                  <BarChart
                    data={emotionHistory}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffedd5" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#c2410c', fontWeight: 'bold' }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#c2410c', fontWeight: 'bold' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                    <Bar dataKey="xp" fill="#f97316" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-2 sm:px-0 pb-4">
        <Card className="border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md rounded-2xl">
          <CardContent className="p-6 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center shrink-0 shadow-inner border-2 border-amber-400">
              <span className="text-3xl">🦁</span>
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-amber-900 mb-2 uppercase tracking-wide">
                Sabedoria do Dia
              </h3>
              <p className="text-amber-800 font-medium text-lg leading-relaxed">{insight}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
