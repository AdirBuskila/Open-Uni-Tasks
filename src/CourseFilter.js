export const CourseFilter = ({ handleCourseFilter, selectedCourses }) => {
  return (
    <div>
      {['Java', 'Linear Algebra', 'Micro Economics'].map((course) => (
        <label key={course}>
          <input type='checkbox' checked={selectedCourses.includes(course)} onChange={() => handleCourseFilter(course)} />
          {course}
        </label>
      ))}
    </div>
  );
};
