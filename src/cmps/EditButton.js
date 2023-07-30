import React from 'react';

const EditButton = ({ handleEdit, assignment }) => {
  return (
    <button
      className='edit-button'
      onClick={(e) => {
        e.stopPropagation();
        handleEdit(assignment);
      }}
    >
      Edit
    </button>
  );
};

export default EditButton;
