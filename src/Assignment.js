import React from 'react';

export const Assignment = ({ assignment, index, toggleCompletion, handleEdit, paletteIndex, javaColor, microColor, algebraColor }) => {
  const assignmentIcon = (assignmentName) => {
    return assignmentName.includes('Maman') ? '📜' : '💻';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  const daysUntil = (dueDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // ensure starting at the beginning of the current day
    const assignmentDate = new Date(dueDate);
    assignmentDate.setHours(23, 59, 59, 999); // ensure we count the entire due date
    const timeDifference = assignmentDate - currentDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // use Math.floor instead of Math.ceil
    console.log(daysDifference);
    if (daysDifference === 0) {
      return { text: 'Due today until 00:00 ❗', isDueToday: true };
    } else {
      return {
        text: daysDifference < 0 ? 'Submit time over' : `${daysDifference} day(s) left`,
        isDueToday: false,
      };
    }
  };

  const dueInfo = daysUntil(assignment.dueDate);

  const assignmentColor = (name) => {
    name = name.toLowerCase();
    if (name === 'java') return javaColor;
    if (name === 'micro economics') return microColor;
    if (name === 'linear algebra') return algebraColor;
  };

  return (
    <li
      key={index}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: assignment.isCompleted ? 'lightgray' : dueInfo.isDueToday ? 'red' : assignmentColor(assignment.course),
        textDecoration: assignment.isCompleted ? 'line-through' : 'none',
      }}
      onClick={() => toggleCompletion(assignment)}
    >
      {assignment.courseIcon} {assignment.course}: {assignment.name} {assignmentIcon(assignment.name)} - Due on {formatDate(assignment.dueDate)} - {dueInfo.text}
      <button
        className='edit-button'
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(assignment);
        }}
      >
        Edit
      </button>
    </li>
  );
};
