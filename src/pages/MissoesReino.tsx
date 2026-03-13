import { ShieldCheck, ThumbsUp, Clock, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'

const categoryColors = {
  Higiene: 'bg-blue-100 text-blue-700 border-blue-200',
  Organização: 'bg-orange-100 text-orange-700 border-orange-200',
  Sabedoria: 'bg-purple-100 text-purple-700 border-purple-200',
  Ajuda: 'bg-green-100 text-green-700 border-green-200',
}

export default function MissoesReino() {
  const { tasks, submitTask } = useAppStore()

  const pendingOrTodoTasks = tasks.filter((t) => t.status !== 'completed')
  const completedTasks = tasks.filter((t) => t.status === 'completed')

  return (
    <div className="container py-8 max-w-4xl animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-green-600 mb-4 flex items-center justify-center gap-3">
          <ShieldCheck className="w-10 h-10" /> Missões do Reino
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Cumpra suas tarefas para ganhar o Selo do Rafiki!
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-foreground">Missões Ativas</h2>
        {pendingOrTodoTasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-3xl">
            Todas as missões ativas foram concluídas! 🎉
          </p>
        ) : (
          <div className="grid gap-4">
            {pendingOrTodoTasks.map((task) => (
              <Card
                key={task.id}
                className="border-2 rounded-3xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`rounded-full px-3 py-1 text-xs border ${categoryColors[task.category]}`}
                      >
                        {task.category}
                      </Badge>
                      <span className="text-sm font-bold text-primary">+{task.xpReward} XP</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{task.title}</h3>
                  </div>

                  <div className="w-full md:w-auto flex justify-end">
                    {task.status === 'todo' ? (
                      <Button
                        onClick={() => submitTask(task.id)}
                        className="w-full md:w-auto rounded-full font-bold bg-green-500 hover:bg-green-600 text-white"
                      >
                        <ThumbsUp className="w-5 h-5 mr-2" />
                        Pedir Aprovação
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        disabled
                        className="w-full md:w-auto rounded-full font-bold bg-amber-100 text-amber-700 opacity-100"
                      >
                        <Clock className="w-5 h-5 mr-2" />
                        Aguardando o Rei
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold text-muted-foreground mb-6">
              Missões Concluídas
            </h2>
            <div className="grid gap-4 opacity-70">
              {completedTasks.map((task) => (
                <Card key={task.id} className="border-2 rounded-3xl bg-muted/30">
                  <CardContent className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <h3 className="font-display font-bold text-lg line-through text-muted-foreground">
                        {task.title}
                      </h3>
                    </div>
                    <span className="text-sm font-bold text-primary">+{task.xpReward} XP</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
