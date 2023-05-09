export const assignmentData = [
  {
    course: 'Java',
    courseIcon: '👩‍💻',
    assignments: [
      { id: 'java-1', name: 'Maman 11', dueDate: '2023-04-27' },
      { id: 'java-2', name: 'Maman 12', dueDate: '2023-05-13' },
      { id: 'java-3', name: 'Maman 13', dueDate: '2023-05-27' },
      { id: 'java-4', name: 'Maman 14', dueDate: '2023-06-10' },
      { id: 'java-5', name: 'Opal 2', dueDate: '2023-06-17' },
    ],
    colors: ['#4caf50', '#1D267D', '#D25380'],
  },
  {
    course: 'Linear Algebra',
    courseIcon: '🧮',
    assignments: [
      { id: 'algebra-1', name: 'Maman 12', dueDate: '2023-04-27' },
      { id: 'algebra-2', name: 'Maman 13', dueDate: '2023-05-18' },
      { id: 'algebra-3', name: 'Maman 14', dueDate: '2023-06-22' },
      { id: 'algebra-4', name: 'Mamah 01', dueDate: '2023-04-30' },
      { id: 'algebra-5', name: 'Mamah 02', dueDate: '2023-05-21' },
      { id: 'algebra-6', name: 'Mamah 03', dueDate: '2023-06-23' },
    ],
    colors: ['#e53935', '#5C469C', '#E08E6D'],
  },
  {
    course: 'Micro Economics',
    courseIcon: '📈',
    assignments: [
      { id: 'economics-1', name: 'Maman 12', dueDate: '2023-04-29' },
      { id: 'economics-2', name: 'Maman 13', dueDate: '2023-05-11' },
      { id: 'economics-3', name: 'Maman 14', dueDate: '2023-06-01' },
      { id: 'economics-4', name: 'Maman 15', dueDate: '2023-06-12' },
    ],
    colors: ['#fb8c00', '#D4ADFC', '#F6C391'],
  },
];
export const calculateDaysLeft = (dueDate) => {
  const due = new Date(dueDate);
  const now = new Date();
  const differenceInTime = due.getTime() - now.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
