import { useState } from 'react'
import { Shield, Check, X, LogOut } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'

export default function AreaPais() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const { tasks, approveTask } = useAppStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === '1234') {
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setPin('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
        <Card className="w-full max-w-sm rounded-3xl shadow-xl border-4 border-muted bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
            <CardTitle className="font-display text-2xl">Área dos Pais</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Digite o PIN para acessar (Dica: 1234)
                </p>
                <Input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className={`text-center text-2xl tracking-widest rounded-2xl h-14 font-bold bg-muted/30 ${error ? 'border-destructive focus-visible:ring-destructive bg-destructive/5' : ''}`}
                  placeholder="****"
                  maxLength={4}
                />
                {error && (
                  <p className="text-sm text-destructive font-bold animate-shake">PIN Incorreto</p>
                )}
              </div>
              <Button type="submit" className="w-full h-12 rounded-2xl font-bold text-lg">
                Entrar
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => navigate('/')}
              >
                Voltar para o App
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const pendingTasks = tasks.filter((t) => t.status === 'pending')

  return (
    <div className="container py-8 max-w-4xl animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" /> Painel de Controle
          </h1>
          <p className="text-muted-foreground">Gerencie as atividades da Cecília</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="rounded-full bg-white/50"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sair da Área
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="rounded-3xl border-2 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display flex items-center justify-between">
              Aprovações Pendentes
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">
                {pendingTasks.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingTasks.length === 0 ? (
              <div className="text-muted-foreground text-center py-8 bg-muted/20 rounded-2xl border border-dashed">
                <p>Nenhuma tarefa aguardando aprovação no momento.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border shadow-sm rounded-2xl gap-4 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">{task.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="bg-muted px-2 py-0.5 rounded-full">{task.category}</span>
                        <span>•</span>
                        <span className="font-semibold text-primary">+{task.xpReward} XP</span>
                        <span>•</span>
                        <span className="font-semibold text-blue-600 flex items-center gap-1">
                          +{task.crystalsReward} <span className="text-xs">💎</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="flex-1 sm:flex-none border-destructive text-destructive hover:bg-destructive hover:text-white rounded-xl h-11"
                      >
                        <X className="w-4 h-4 mr-2" /> Rejeitar
                      </Button>
                      <Button
                        className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white rounded-xl h-11 shadow-sm"
                        onClick={() => approveTask(task.id)}
                      >
                        <Check className="w-4 h-4 mr-2" /> Aprovar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Placeholder for Emotional Thermometer Dashboard */}
        <Card className="rounded-3xl border-2 shadow-sm opacity-70 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display">Histórico Emocional (Em Breve)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center bg-muted/30 rounded-2xl border border-dashed">
              <p className="text-muted-foreground font-medium">
                Gráficos de evolução emocional aparecerão aqui.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
