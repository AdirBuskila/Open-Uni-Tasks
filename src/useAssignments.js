import { useState, useEffect } from 'react';
import { assignmentData } from './utils';

const useAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  const updateAssignments = () => {
    const storedDueDates = JSON.parse(localStorage.getItem('dueDates')) || {};
    const finishedAssignments = JSON.parse(localStorage.getItem('finishedAssignments')) || [];
    const allAssignments = assignmentData.flatMap((course) =>
      course.assignments.map((assignment) => ({
        ...assignment,
        course: course.course,
        color: course.color,
        courseIcon: course.courseIcon,
      }))
    );
    const updatedAssignments = allAssignments.map((assignment) => {
      const dueDate = storedDueDates[assignment.id] || assignment.dueDate;
      const isCompleted = finishedAssignments.some((finished) => finished.course === assignment.course && finished.name === assignment.name);
      return { ...assignment, dueDate, isCompleted };
    });

    // Sort the assignments by their due dates
    updatedAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    setAssignments(updatedAssignments);
  };

  useEffect(() => {
    updateAssignments();
  }, []);

  return [assignments, setAssignments];
};

export default useAssignments;
