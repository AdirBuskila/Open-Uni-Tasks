import PropTypes from 'prop-types';

export const Progress = ({ totalAssignments, completedAssignments }) => {
  const progressPercentage = (completedAssignments / totalAssignments) * 100;

  return (
    <div className='progress'>
      <div className='progress-bar' style={{ width: `${progressPercentage}%` }}>
        {completedAssignments}/{totalAssignments} - {progressPercentage.toFixed(2)}%
      </div>
    </div>
  );
};

Progress.propTypes = {
  totalAssignments: PropTypes.number.isRequired,
  completedAssignments: PropTypes.number.isRequired,
};
