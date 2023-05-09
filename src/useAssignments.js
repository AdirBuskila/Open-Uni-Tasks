// useAssignments.js
import { useState, useEffect } from 'react';
import { assignmentData } from './utils';

const useAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const allAssignments = assignmentData.flatMap((course) =>
      course.assignments.map((assignment) => ({
        ...assignment,
        course: course.course,
        color: course.color,
        courseIcon: course.courseIcon,
      }))
    );
    allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Filter assignments with due dates that have not passed
    const filteredAssignments = allAssignments.filter((assignment) => {
      return new Date(assignment.dueDate) > currentDate;
    });
    const storedDueDates = JSON.parse(localStorage.getItem('dueDates')) || {};
    const finishedAssignments = JSON.parse(localStorage.getItem('finishedAssignments')) || [];
    const updatedAssignments = allAssignments.map((assignment) => {
      const dueDate = storedDueDates[assignment.id] || assignment.dueDate;
      const isCompleted = finishedAssignments.some((finished) => finished.course === assignment.course && finished.name === assignment.name);
      return { ...assignment, dueDate, isCompleted };
    });

    setAssignments(updatedAssignments);
  }, []);

  return [assignments, setAssignments];
};

export default useAssignments;
