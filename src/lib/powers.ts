export type PowerTag = {
  id: string
  label: string
  emoji: string
  isRare?: boolean
}

export const POWER_TAGS: PowerTag[] = [
  { id: 'coragem', label: 'Coragem de Leão', emoji: '🦁' },
  { id: 'sono', label: 'Guardião do Sono', emoji: '🛡️' },
  { id: 'abraco', label: 'Mestre dos Abraços', emoji: '✨' },
  { id: 'sabedoria', label: 'Sabedoria do Rafiki', emoji: '🍃' },
  { id: 'explorador', label: 'Explorador da Savana', emoji: '🐾' },
  { id: 'ritmo', label: 'Ritmo Hakuna Matata', emoji: '🎶' },
  { id: 'segredos', label: 'Guardião de Segredos', emoji: '🤐' },
  { id: 'veloz', label: 'Veloz como o Vento', emoji: '⚡' },
  { id: 'brilho', label: 'Brilho da Pedra do Rei', emoji: '💎' },
  { id: 'amigo', label: 'Amigo de Todas as Horas', emoji: '🌈' },
  { id: 'guardiao_real', label: 'Guardião Real do Reino', emoji: '🌟', isRare: true },
]
