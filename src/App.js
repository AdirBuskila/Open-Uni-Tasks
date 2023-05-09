import React, { useState, useEffect } from 'react';
import { assignmentData } from './utils';
import './App.css';
import { Assignment } from './Assignment';
import { PaletteChooser } from './PaletteChooser';
import { CourseFilter } from './CourseFilter';
import useAssignments from './useAssignments';
import { EditAssignmentForm } from './EditAssignmentForm';

function App() {
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [assignments, setAssignments] = useAssignments();
  const [paletteIndex, setPaletteIndex] = useState(localStorage.getItem('paletteIndex') || 0);
  const [javaColor, setJavaColor] = useState(assignmentData[0].colors[paletteIndex]);
  const [microColor, setMicroColor] = useState(assignmentData[1].colors[paletteIndex]);
  const [algebraColor, setAlgebraColor] = useState(assignmentData[2].colors[paletteIndex]);
  const [selectedCourses, setSelectedCourses] = useState(assignmentData.map((course) => course.course));

  useEffect(() => {
    setJavaColor(assignmentData[0].colors[paletteIndex]);
    setMicroColor(assignmentData[1].colors[paletteIndex]);
    setAlgebraColor(assignmentData[2].colors[paletteIndex]);
    localStorage.setItem('paletteIndex', paletteIndex);
  }, [paletteIndex]);

  const toggleCompletion = (assignment) => {
    const updatedAssignments = assignments.map((item) => (item.course === assignment.course && item.name === assignment.name ? { ...item, isCompleted: !item.isCompleted } : item));
    setAssignments(updatedAssignments);

    // Update the finished assignments in local storage
    const finishedAssignments = updatedAssignments.filter((item) => item.isCompleted);
    localStorage.setItem('finishedAssignments', JSON.stringify(finishedAssignments));
  };

  const changePaletteIndex = (index) => {
    setPaletteIndex(index);
  };

  // App.js
  const handleUpdate = (id, dueDate) => {
    const updatedAssignments = assignments.map((assignment) => (assignment.id === id ? { ...assignment, dueDate } : assignment));

    setAssignments(updatedAssignments);
    setEditingAssignment(null);

    // Save the updated assignments to local storage
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));

    // Manually update the due date in local storage
    const storedDueDates = JSON.parse(localStorage.getItem('dueDates')) || {};
    storedDueDates[id] = dueDate;
    localStorage.setItem('dueDates', JSON.stringify(storedDueDates));
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
  };

  const handleCourseFilter = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((item) => item !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  return (
    <div className='App'>
      <h1>Semester 2023-B</h1>
      <PaletteChooser changePaletteIndex={changePaletteIndex} />
      <CourseFilter handleCourseFilter={handleCourseFilter} selectedCourses={selectedCourses} />
      <ul>
        {assignments
          .filter((assignment) => {
            let dueDate = new Date(assignment.dueDate);
            dueDate.setHours(23, 59, 59); // set the time to the end of the day
            return dueDate >= new Date() && selectedCourses.includes(assignment.course);
          })
          .map((assignment, index) => (
            <Assignment assignment={assignment} index={index} toggleCompletion={toggleCompletion} handleEdit={handleEdit} paletteIndex={paletteIndex} javaColor={javaColor} microColor={microColor} algebraColor={algebraColor} />
          ))}
      </ul>
      {editingAssignment && <EditAssignmentForm assignment={editingAssignment} handleUpdate={handleUpdate} />}
      <p>Made by Adir Buskila</p>
    </div>
  );
}

export default App;
