import React, { useState } from 'react';
import { createNewAssignment } from '../utils';

export const AssignmentForm = ({ handleNewAssignment }) => {
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);

  const saveAssignment = (assignment) => {
    // validate the assignment object
    if (!assignment.id || !assignment.name || !assignment.dueDate || !assignment.course || assignment.isCompleted === undefined) {
      console.error('Invalid assignment object', assignment);
      return;
    }

    // then save it to the local storage
    let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    assignments.push(assignment);
    localStorage.setItem('assignments', JSON.stringify(assignments));
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    const name = event.target[0].value;
    const dueDate = event.target[1].value;
    const course = event.target[2].value;
    const courseIcon = event.target[3].value;

    const newAssignment = createNewAssignment(name, dueDate, course, courseIcon, false);

    saveAssignment(newAssignment);
    setFormVisible(false);
  }

  return (
    <>
      <button onClick={() => setFormVisible(!isFormVisible)}>{isFormVisible ? 'Close Form' : 'Add Assignment'}</button>

      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className='edit-form'>
          <input type='text' value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} placeholder='Assignment name' />
          <input type='date' value={assignmentDate} onChange={(e) => setAssignmentDate(e.target.value)} />
          <input type='text' name='course' placeholder='Course' /> {/* added */}
          <input type='text' name='courseIcon' placeholder='Course Icon' /> {/* added */}
          <button type='submit' value='Add assignment'>
            Add
          </button>
        </form>
      )}
    </>
  );
};
