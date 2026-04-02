export type Question = {
  question: string
  options: string[]
  correctIndex: number
}

export const MOCK_QUIZZES: Record<string, Question[]> = {
  b1: [
    {
      question: 'Quem é o sábio que acompanhou a jornada?',
      options: ['Rafiki', 'Zazu', 'Timão', 'Pumba'],
      correctIndex: 0,
    },
    {
      question: 'Onde se passa a maior parte da história?',
      options: ['Na selva escura', 'Nas terras do reino', 'No deserto', 'Na montanha de gelo'],
      correctIndex: 1,
    },
    {
      question: 'O que o Leão aprendeu em sua jornada?',
      options: ['A voar', 'A nadar', 'A ser sábio e corajoso', 'A cozinhar insetos'],
      correctIndex: 2,
    },
  ],
  b2: [
    {
      question: 'Onde o leão encontrou sua voz?',
      options: ['No vale', 'Nas montanhas', 'No rio', 'Na caverna'],
      correctIndex: 1,
    },
    {
      question: 'Qual é o nome da lenda contada no livro?',
      options: ['O Grande Rugido', 'A Pequena Pata', 'O Vento Forte', 'O Sol Nascente'],
      correctIndex: 0,
    },
    {
      question: 'O que o rugido do leão representava?',
      options: ['Fome', 'Medo', 'Sua verdadeira força', 'Sono'],
      correctIndex: 2,
    },
  ],
  default: [
    {
      question: 'Quem é o personagem principal desta história?',
      options: ['Um filhote', 'Um pássaro', 'Um elefante', 'Uma zebra'],
      correctIndex: 0,
    },
    {
      question: 'Qual foi o maior desafio enfrentado?',
      options: ['Atravessar o rio', 'Encontrar o caminho', 'Vencer o medo', 'Fazer novos amigos'],
      correctIndex: 2,
    },
    {
      question: 'Como a história termina?',
      options: [
        'Com uma grande festa',
        'Todos vão dormir',
        'O herói aprende uma lição',
        'Eles viajam longe',
      ],
      correctIndex: 2,
    },
  ],
}
