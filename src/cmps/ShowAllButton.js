function ShowAllButton({ showAll, toggleShowAll }) {
  return (
    <button className='custom-btn btn-9' onClick={toggleShowAll}>
      {showAll ? 'Hide Overdue' : 'Show All'}
    </button>
  );
}

export default ShowAllButton;
