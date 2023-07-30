import { Assignment } from '../Assignment';

function AssignmentList({ assignments, toggleCompletion, handleEdit, paletteIndex, selectedCourses, showAll }) {
  return (
    <ul>
      {assignments
        .filter((assignment) => {
          let dueDate = new Date(assignment.dueDate);
          dueDate.setHours(23, 59, 59);
          return (showAll || dueDate >= new Date()) && selectedCourses.includes(assignment.course);
        })
        .map((assignment, index) => (
          <Assignment assignment={assignment} index={index} toggleCompletion={toggleCompletion} handleEdit={handleEdit} paletteIndex={paletteIndex} />
        ))}
    </ul>
  );
}

export default AssignmentList;
