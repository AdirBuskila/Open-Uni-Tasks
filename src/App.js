import React, { useState, useEffect } from 'react';
import './App.css';

const assignmentData = [
  {
    course: 'Java',
    courseIcon: '👩‍💻',
    assignments: [
      { name: 'Maman 12', dueDate: '2023-05-13' },
      { name: 'Maman 13', dueDate: '2023-05-27' },
      { name: 'Maman 14', dueDate: '2023-06-10' },
      { name: 'Opal 2', dueDate: '2023-06-17' },
    ],
    color: '#4caf50',
  },
  {
    course: 'Linear Algebra',
    courseIcon: '🧮',
    assignments: [
      { name: 'Maman 12', dueDate: '2023-04-27' },
      { name: 'Maman 13', dueDate: '2023-05-18' },
      { name: 'Maman 14', dueDate: '2023-06-22' },
      { name: 'Mamah 01', dueDate: '2023-04-30' },
      { name: 'Mamah 02', dueDate: '2023-05-21' },
      { name: 'Mamah 03', dueDate: '2023-06-23' },
    ],
    color: '#2196f3',
  },
  {
    course: 'Micro Econimics',
    courseIcon: '📈',
    assignments: [
      { name: 'Maman 12', dueDate: '2023-04-20' },
      { name: 'Maman 13', dueDate: '2023-05-11' },
      { name: 'Maman 14', dueDate: '2023-06-01' },
      { name: 'Maman 15', dueDate: '2023-06-12' },
    ],
    color: '#d86a36',
  },
];

function App() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const allAssignments = assignmentData.flatMap((course) =>
      course.assignments.map((assignment) => ({
        ...assignment,
        course: course.course,
        color: course.color,
        courseIcon: course.courseIcon,
      }))
    );
    allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Filter assignments with due dates that have not passed
    const filteredAssignments = allAssignments.filter((assignment) => {
      return new Date(assignment.dueDate) > currentDate;
    });

    setAssignments(filteredAssignments);
  }, []);

  const daysUntil = (dueDate) => {
    const currentDate = new Date();
    const assignmentDate = new Date(dueDate);
    const timeDifference = assignmentDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const assignmentIcon = (assignmentName) => {
    return assignmentName.includes('Maman') ? '📜' : '💻';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  return (
    <div className='App'>
      <h1>Semester 2023-B</h1>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index} style={{ backgroundColor: assignment.color }}>
            {assignment.courseIcon} {assignment.course}: {assignment.name} {assignmentIcon(assignment.name)} - Due on {formatDate(assignment.dueDate)} - {daysUntil(assignment.dueDate) < 0 ? 'Submit time over' : `${daysUntil(assignment.dueDate)} day(s) left`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
