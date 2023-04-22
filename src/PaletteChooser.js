export const PaletteChooser = ({ changePaletteIndex }) => {
  return (
    <div className='buttons-container'>
      <button className='btn-0' onClick={() => changePaletteIndex(0)}>
        1
      </button>
      <button className='btn-1' onClick={() => changePaletteIndex(1)}>
        2
      </button>
      <button className='btn-2' onClick={() => changePaletteIndex(2)}>
        3
      </button>
    </div>
  );
};
