import React from 'react';
import { daysUntil } from './utils';

export const Assignment = ({ assignment, index, toggleCompletion, handleEdit, paletteIndex, javaColor, microColor, algebraColor }) => {
  const assignmentIcon = (assignmentName) => {
    return assignmentName.includes('Maman') ? '📜' : '💻';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
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
