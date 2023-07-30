import React from 'react';

const ImageButton = ({ url, index }) => {
  return (
    <button
      className='edit-button'
      onClick={(e) => {
        e.stopPropagation();
        window.open(url, '_blank');
      }}
    >
      Image {index + 1}
    </button>
  );
};

export default ImageButton;
