import React, { useState } from 'react';

export const EditAssignmentForm = ({ assignment, handleUpdate }) => {
  const [dueDate, setDueDate] = useState(assignment.dueDate);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(assignment.id, dueDate);
  };

  return (
    <form onSubmit={handleSubmit} className='edit-form'>
      <input type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button type='submit'>Update</button>
    </form>
  );
};
