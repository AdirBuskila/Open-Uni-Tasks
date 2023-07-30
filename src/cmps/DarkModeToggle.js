import React from 'react';

function DarkModeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';
  const buttonLabel = isDark ? 'Light Mode' : 'Dark Mode';

  return (
    <button onClick={toggleTheme} className='custom-btn btn-9'>
      {buttonLabel}
    </button>
  );
}

export default DarkModeToggle;
