export const PaletteChooser = ({ changePaletteIndex, colors }) => {
  return (
    <div className='buttons-container'>
      {colors.map((color, index) => (
        <button key={index} style={{ backgroundColor: color, color: 'white' }} className={`btn-${index}`} onClick={() => changePaletteIndex(index)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};
