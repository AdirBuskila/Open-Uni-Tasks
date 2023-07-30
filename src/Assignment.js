import React from 'react';
import { assignmentData, daysUntil } from './utils'; // import assignmentData
import ImageButton from './cmps/ImageButton';
import EditButton from './cmps/EditButton';

export const Assignment = ({ assignment, index, toggleCompletion, handleEdit, paletteIndex }) => {
  const assignmentIcon = (assignmentName) => {
    return assignmentName.includes('Maman') ? '📜' : '💻';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  const dueInfo = daysUntil(assignment.dueDate);

  const assignmentColor = (name) => {
    const courseInfo = assignmentData.find((course) => course.course.toLowerCase() === name.toLowerCase());
    return courseInfo ? courseInfo.colors[paletteIndex % courseInfo.colors.length] : 'black';
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
      <div className='btn-container'>
        {assignment.imageURL.map((url, i) => (
          <ImageButton url={url} index={i} key={i} />
        ))}
        <EditButton handleEdit={handleEdit} assignment={assignment} />
      </div>
    </li>
  );
};
