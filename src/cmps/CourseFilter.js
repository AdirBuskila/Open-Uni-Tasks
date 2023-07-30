import { assignmentData } from '../utils'; // import assignmentData

export const CourseFilter = ({ handleCourseFilter, selectedCourses }) => {
  return (
    <div>
      {assignmentData.map((courseData) => (
        <label key={courseData.course}>
          <input type='checkbox' checked={selectedCourses.includes(courseData.course)} onChange={() => handleCourseFilter(courseData.course)} />
          {courseData.course}
        </label>
      ))}
    </div>
  );
};
