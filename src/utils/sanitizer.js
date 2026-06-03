export const sanitizeStudent = (
  student
) => {
  return {
    ...student,
    name: student.name.trim(),
    email:
      student.email.toLowerCase(),
    department:
      student.department.toUpperCase(),
  };
};

export const sanitizeCompany = (
  company
) => {
  return {
    ...company,
    name: company.name.trim(),
  };
};

export const sanitizeDrive = (
  drive
) => {
  return {
    ...drive,
    title: drive.title.trim(),
  };
};

export const sanitizeApplication =
  (application) => {
    return application;
  };