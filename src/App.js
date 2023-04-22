import React, { useState, useEffect } from 'react';
import { assignmentData } from './utils';
import './App.css';
import { Assignment } from './Assignment';
import { PaletteChooser } from './PaletteChooser';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [paletteIndex, setPaletteIndex] = useState(localStorage.getItem('paletteIndex') || 0);
  const [javaColor, setJavaColor] = useState(assignmentData[0].colors[paletteIndex]);
  const [microColor, setMicroColor] = useState(assignmentData[1].colors[paletteIndex]);
  const [algebraColor, setAlgebraColor] = useState(assignmentData[2].colors[paletteIndex]);

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

    const finishedAssignments = JSON.parse(localStorage.getItem('finishedAssignments')) || [];
    const updatedAssignments = filteredAssignments.map((assignment) => {
      const isCompleted = finishedAssignments.some((finished) => finished.course === assignment.course && finished.name === assignment.name);
      return { ...assignment, isCompleted };
    });

    setAssignments(updatedAssignments);
  }, []);

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

  return (
    <div className='App'>
      <h1>Semester 2023-B</h1>
      <PaletteChooser changePaletteIndex={changePaletteIndex} />
      <ul>
        {assignments.map((assignment, index) => (
          <Assignment assignment={assignment} index={index} toggleCompletion={toggleCompletion} paletteIndex={paletteIndex} javaColor={javaColor} microColor={microColor} algebraColor={algebraColor} />
        ))}
      </ul>
    </div>
  );
}

export default App;
