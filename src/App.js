import React, { useState, useEffect } from 'react';
import { assignmentData, getPastDueAssignments, getCompletedAssignments } from './utils';
import './App.css';
import { Assignment } from './Assignment';
import { PaletteChooser } from './PaletteChooser';
import { CourseFilter } from './CourseFilter';
import useAssignments from './useAssignments';
import { EditAssignmentForm } from './EditAssignmentForm';
import DarkModeToggle from './DarkModeToggle';
import { Progress } from './Progress';
import { AssignmentForm } from './AssignmentForm';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [paletteIndex, setPaletteIndex] = useState(localStorage.getItem('paletteIndex') || 0);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);

  const [editingAssignment, setEditingAssignment] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState(assignmentData.map((course) => course.course));
  const [assignments, setAssignments] = useAssignments();

  const allColors = assignmentData.flatMap((course) => course.colors);

  useEffect(() => {
    localStorage.setItem('paletteIndex', paletteIndex);
  }, [paletteIndex]);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleCompletion = (assignment) => {
    const updatedAssignments = assignments.map((item) => (item.course === assignment.course && item.name === assignment.name ? { ...item, isCompleted: !item.isCompleted } : item));
    setAssignments(updatedAssignments);

    // Update the finished assignments in local storage
    const finishedAssignments = updatedAssignments.filter((item) => item.isCompleted);
    localStorage.setItem('finishedAssignments', JSON.stringify(finishedAssignments));
  };

  const changePaletteIndex = (index) => {
    setPaletteIndex(index);
    setSelectedCourseIndex(index); // set selected course index when palette index changes
  };

  // Handle //
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

  const handleNewAssignment = (newAssignment) => {
    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className='App'>
      <h1>
        {theme === 'dark' ? '🌙' : '🌞'} 2023-Summer {theme === 'dark' ? '🌙' : '🌞'}
      </h1>
      <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
      <PaletteChooser changePaletteIndex={changePaletteIndex} colors={allColors} />
      <Progress totalAssignments={assignmentData[0].assignments.length} completedAssignments={getPastDueAssignments(assignments) + getCompletedAssignments(assignments)} />
      {/* <AssignmentForm handleNewAssignment={handleNewAssignment} /> */}
      <CourseFilter handleCourseFilter={handleCourseFilter} selectedCourses={selectedCourses} />
      <ul>
        {assignments
          .filter((assignment) => {
            let dueDate = new Date(assignment.dueDate);
            dueDate.setHours(23, 59, 59); // set the time to the end of the day
            return dueDate >= new Date() && selectedCourses.includes(assignment.course);
          })
          .map((assignment, index) => (
            <Assignment assignment={assignment} index={index} toggleCompletion={toggleCompletion} handleEdit={handleEdit} paletteIndex={paletteIndex} />
          ))}
      </ul>
      {editingAssignment && <EditAssignmentForm assignment={editingAssignment} handleUpdate={handleUpdate} />}
      <p>Made by Adir Buskila</p>
    </div>
  );
}

export default App;
