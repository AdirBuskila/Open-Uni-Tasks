import React, { useState, useEffect } from 'react';
import { assignmentData, getPastDueAssignments, getCompletedAssignments } from './utils';
import './App.css';
import { Assignment } from './Assignment';
import { PaletteChooser } from './cmps/PaletteChooser';
import { CourseFilter } from './cmps/CourseFilter';
import useAssignments from './useAssignments';
import { EditAssignmentForm } from './forms/EditAssignmentForm';
import DarkModeToggle from './cmps/DarkModeToggle';
import { Progress } from './cmps/Progress';
import { AssignmentForm } from './forms/AssignmentForm';
import ShowAllButton from './cmps/ShowAllButton';
import Header from './cmps/Header';
import AssignmentList from './cmps/AssignmentList';
import Footer from './cmps/Footer';

function App() {
  // data
  const [assignments, setAssignments] = useAssignments();
  // app state
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState(assignmentData.map((course) => course.course));
  const [showAll, setShowAll] = useState(false); // New state variable for showing all assignments
  // styles
  const allColors = assignmentData.flatMap((course) => course.colors);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [paletteIndex, setPaletteIndex] = useState(localStorage.getItem('paletteIndex') || 0);

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

  const toggleShowAll = () => {
    setShowAll(!showAll); // Toggle showAll when button is clicked
  };

  const changePaletteIndex = (index) => {
    setPaletteIndex(index);
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
      <Header theme={theme} />
      <div className='toggle-btns'>
        <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
        <ShowAllButton showAll={showAll} toggleShowAll={toggleShowAll} />
      </div>
      <PaletteChooser changePaletteIndex={changePaletteIndex} colors={allColors} />
      {/* <Progress totalAssignments={assignmentData[0].assignments.length} completedAssignments={getPastDueAssignments(assignments) + getCompletedAssignments(assignments)} /> */}
      {/* <AssignmentForm handleNewAssignment={handleNewAssignment} /> */}
      <CourseFilter handleCourseFilter={handleCourseFilter} selectedCourses={selectedCourses} />
      <AssignmentList assignments={assignments} toggleCompletion={toggleCompletion} handleEdit={handleEdit} paletteIndex={paletteIndex} selectedCourses={selectedCourses} showAll={showAll} />
      {editingAssignment && <EditAssignmentForm assignment={editingAssignment} handleUpdate={handleUpdate} />}
      <Footer />
    </div>
  );
}

export default App;
