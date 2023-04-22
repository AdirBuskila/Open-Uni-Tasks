export const Assignment = ({ assignment, index, toggleCompletion, paletteIndex, javaColor, microColor, algebraColor }) => {
  const assignmentIcon = (assignmentName) => {
    return assignmentName.includes('Maman') ? '📜' : '💻';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  const daysUntil = (dueDate) => {
    const currentDate = new Date();
    const assignmentDate = new Date(dueDate);
    const timeDifference = assignmentDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

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
        backgroundColor: assignment.isCompleted ? 'lightgray' : assignmentColor(assignment.course),
        textDecoration: assignment.isCompleted ? 'line-through' : 'none',
      }}
      onClick={() => toggleCompletion(assignment)}
    >
      {assignment.courseIcon} {assignment.course}: {assignment.name} {assignmentIcon(assignment.name)} - Due on {formatDate(assignment.dueDate)} - {daysUntil(assignment.dueDate) < 0 ? 'Submit time over' : `${daysUntil(assignment.dueDate)} day(s) left`}
    </li>
  );
};
