export const assignmentData = [
  {
    course: 'Bdida',
    courseIcon: '🧮',
    assignments: [
      { id: 'bdida-0', name: 'Mamah 01', dueDate: '2023-07-10', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713846/Open-Uni/Bdida/h7ky9nkvfjyo5u8fmfle.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713846/Open-Uni/Bdida/o6bwhlawwoklc0s3myhg.png'] },
      { id: 'bdida-1', name: 'Maman 11', dueDate: '2023-07-25', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/qnsg4g5andwy8xmpvauo.png'] },
      { id: 'bdida-2', name: 'Mamah 02', dueDate: '2023-08-02', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/uq5ykva5jn8unwvsqgbd.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/evzxvcehbczcwac9qqr9.png'] },
      { id: 'bdida-3', name: 'Maman 12', dueDate: '2023-08-08', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/hqr7cx7dvl9fmbrwl1rt.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/dhiff4yjblrjwndttx9e.png'] },
      { id: 'bdida-4', name: 'Maman 13', dueDate: '2023-08-16', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713844/Open-Uni/Bdida/cqaakpxmv8423exflqrx.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713844/Open-Uni/Bdida/vhc96ulbdildesa1atue.png'] },
      { id: 'bdida-5', name: 'Mamah 03', dueDate: '2023-08-13', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/afboignekuwgfussi4lr.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/acxokbuzjx6foycpohkr.png'] },
      { id: 'bdida-6', name: 'Maman 14', dueDate: '2023-08-23', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/sqa3x4av3tapz21b8rpq.png'] },
      { id: 'bdida-7', name: 'Mamah 04', dueDate: '2023-08-30', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/apwjri5n4ngpgamstxe3.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713845/Open-Uni/Bdida/lbcjnk3myhlpjjvyzcqn.png'] },
      { id: 'bdida-8', name: 'Maman 15', dueDate: '2023-09-05', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713846/Open-Uni/Bdida/zhzwicaduepbk4dy1hrc.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713846/Open-Uni/Bdida/yu48hzi85igwyuhdcrx2.png'] },
      { id: 'bdida-9', name: 'Mamah 05', dueDate: '2023-09-11', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713846/Open-Uni/Bdida/nwnfxhfotcarohyznsed.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713846/Open-Uni/Bdida/auvunxuxkbeu7bkd9aak.png'] },
      { id: 'bdida-10', name: 'Maman 16', dueDate: '2023-09-15', imageURL: ['https://res.cloudinary.com/dubjerksn/image/upload/v1690713846/Open-Uni/Bdida/j07px5tgaaacp1tyavtv.png', 'https://res.cloudinary.com/dubjerksn/image/upload/v1690713846/Open-Uni/Bdida/v4umrxm9ojbnsuts06bu.png'] },
    ],
    colors: ['#80E1D1', '#D5C1E8', '#F7D79C'],
  },
];
export const calculateDaysLeft = (dueDate) => {
  const due = new Date(dueDate);
  const now = new Date();
  const differenceInTime = due.getTime() - now.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

export const daysUntil = (dueDate) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // ensure starting at the beginning of the current day
  const assignmentDate = new Date(dueDate);
  assignmentDate.setHours(23, 59, 59, 999); // ensure we count the entire due date
  const timeDifference = assignmentDate - currentDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // use Math.floor instead of Math.ceil
  if (daysDifference === 0) {
    return { text: 'Due today until 00:00 ❗', isDueToday: true };
  } else {
    return {
      text: daysDifference < 0 ? 'Submit time over' : `${daysDifference} day(s) left`,
      isDueToday: false,
    };
  }
};

export const getPastDueAssignments = (assignments) => {
  const now = new Date();
  return assignments.filter((assignment) => new Date(assignment.dueDate) < now).length;
};

export const getCompletedAssignments = (assignments) => {
  return assignments.filter((assignment) => assignment.isCompleted).length;
};

export const createNewAssignment = (name, dueDate, course = 'Default Course', courseIcon = '📚', isCompleted = false) => {
  const id = course.toLowerCase() + '-' + new Date().getTime();

  return {
    id: id,
    name: name,
    dueDate: dueDate,
    course: course,
    courseIcon: courseIcon,
    isCompleted: isCompleted,
  };
};
