export const PaletteChooser = ({ changePaletteIndex }) => {
  return (
    <div className='buttons-container'>
      <button style={{ backgroundColor: '#4caf50', color: 'white' }} className='btn-0' onClick={() => changePaletteIndex(0)}>
        1
      </button>
      <button style={{ backgroundColor: '#1D267D', color: 'white' }} className='btn-1' onClick={() => changePaletteIndex(1)}>
        2
      </button>
      <button style={{ backgroundColor: '#D25380', color: 'white' }} className='btn-2' onClick={() => changePaletteIndex(2)}>
        3
      </button>
    </div>
  );
};
