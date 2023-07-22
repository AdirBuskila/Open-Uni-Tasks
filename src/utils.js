export const assignmentData = [
  // ... existing data
  {
    course: 'Bdida',
    courseIcon: '🧮',
    assignments: [
      { id: 'bdida-1', name: 'Maman 11', dueDate: '2023-07-25' },
      { id: 'bdida-2', name: 'Mamah 02', dueDate: '2023-08-02' },
      { id: 'bdida-3', name: 'Maman 12', dueDate: '2023-08-08' },
      { id: 'bdida-4', name: 'Maman 13', dueDate: '2023-08-16' },
      { id: 'bdida-5', name: 'Mamah 03', dueDate: '2023-08-13' },
      { id: 'bdida-6', name: 'Maman 14', dueDate: '2023-08-23' },
      { id: 'bdida-7', name: 'Mamah 04', dueDate: '2023-08-30' },
      { id: 'bdida-8', name: 'Maman 15', dueDate: '2023-09-05' },
      { id: 'bdida-9', name: 'Mamah 02', dueDate: '2023-09-11' },
      { id: 'bdida-10', name: 'Maman 16', dueDate: '2023-09-15' },
    ],
    colors: ['#e53935', '#5C469C', '#E08E6D'], // I've used the same colors as for 'Linear Algebra'. Adjust these as needed.
  },
];
export const calculateDaysLeft = (dueDate) => {
  const due = new Date(dueDate);
  const now = new Date();
  const differenceInTime = due.getTime() - now.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

export const daysUntil = (dueDate) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // ensure starting at the beginning of the current day
  const assignmentDate = new Date(dueDate);
  assignmentDate.setHours(23, 59, 59, 999); // ensure we count the entire due date
  const timeDifference = assignmentDate - currentDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // use Math.floor instead of Math.ceil
  if (daysDifference === 0) {
    return { text: 'Due today until 00:00 ❗', isDueToday: true };
  } else {
    return {
      text: daysDifference < 0 ? 'Submit time over' : `${daysDifference} day(s) left`,
      isDueToday: false,
    };
  }
};