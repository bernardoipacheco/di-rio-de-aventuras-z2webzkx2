export const EMOTIONS = [
  { emoji: '🥰', label: 'Amorosa' },
  { emoji: '🤩', label: 'Sonhadora' },
  { emoji: '😊', label: 'Feliz' },
  { emoji: '😛', label: 'Brincalhona' },
  { emoji: '🤓', label: 'Inteligente' },
  { emoji: '😎', label: 'Corajosa' },
  { emoji: '😴', label: 'Preguiçosa' },
  { emoji: '😶', label: 'Tímida' },
  { emoji: '😢', label: 'Triste' },
  { emoji: '😞', label: 'Desanimada' },
  { emoji: '😖', label: 'Com Medo' },
  { emoji: '😠', label: 'Braaaaaava 😠' },
  { emoji: '😁', label: 'Radiante' },
  { emoji: '😂', label: 'Engraçada' },
  { emoji: '😌', label: 'Tranquila' },
  { emoji: '😳', label: 'Surpresa' },
  { emoji: '😕', label: 'Confusa' },
  { emoji: '😟', label: 'Preocupada' },
  { emoji: '😭', label: 'Chorosa' },
  { emoji: '😫', label: 'Cansada' },
  { emoji: '😡', label: 'Furiosa' },
  { emoji: '🤧', label: 'Dodói' },
]

export const getEmotionForValue = (val: number) => {
  const index = Math.min(Math.floor((val / 100) * EMOTIONS.length), EMOTIONS.length - 1)
  return EMOTIONS[index]
}
