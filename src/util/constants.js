export const mockEmissions = [
  { id: 1, name: 'Antes Que Nadie' },
  { id: 2, name: 'Nadie Dice Nada' },
  { id: 3, name: 'Duquesas' },
  { id: 4, name: 'Pachu Stream Master' }
];

export const mockPolls = [
  {
    id: 1,
    question: 'Que comiste anoche?',
    answers: ['Pollo', 'Pasta', 'Sopa', 'Nada'],
    emissions: mockEmissions[0],
    startDate: new Date()
  },
  {
    id: 2,
    question: 'Que comiste anoche?',
    answers: ['Pollo', 'Pasta', 'Sopa', 'Nada'],
    emissions: mockEmissions[2],
    startDate: new Date()
  },
  {
    id: 3,
    question: 'Que comiste anoche?',
    answers: ['Pollo', 'Pasta', 'Sopa', 'Nada'],
    emissions: mockEmissions[1],
    startDate: new Date()
  },
  {
    id: 4,
    question: 'Que comiste anoche?',
    answers: ['Pollo', 'Pasta', 'Sopa', 'Nada'],
    emissions: mockEmissions[0],
    startDate: new Date()
  }
];
