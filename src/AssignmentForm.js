import React, { useState } from 'react';

export const AssignmentForm = ({ handleNewAssignment }) => {
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleNewAssignment({ name: assignmentName, date: assignmentDate });
    setAssignmentName('');
    setAssignmentDate('');
    setFormVisible(false);
  };

  return (
    <>
      <button onClick={() => setFormVisible(!isFormVisible)}>{isFormVisible ? 'Close Form' : 'Add Assignment'}</button>

      {isFormVisible && (
        <form onSubmit={handleFormSubmit} className='edit-form'>
          <input type='text' value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} placeholder='Assignment name' required />
          <input type='date' value={assignmentDate} onChange={(e) => setAssignmentDate(e.target.value)} required />
          <input type='submit' value='Add assignment' />
        </form>
      )}
    </>
  );
};
