export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isValidPhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

export const validateStudent = (
  student
) => {
  return (
    student.studentId &&
    student.name &&
    isValidEmail(student.email) &&
    student.cgpa >= 0 &&
    student.cgpa <= 10 &&
    isValidPhone(student.phone)
  );
};

export const validateCompany = (
  company
) => {
  return (
    company.companyId &&
    company.name &&
    company.package > 0 &&
    company.minimumCgpa >= 0 &&
    company.minimumCgpa <= 10
  );
};

export const validateDrive = (
  drive
) => {
  return (
    drive.driveId &&
    drive.companyId &&
    ["online", "offline", "hybrid"].includes(
      drive.mode
    ) &&
    drive.rounds.length > 0
  );
};

export const validateApplication =
  (application) => {
    return (
      application.applicationId &&
      application.studentId &&
      application.driveId
    );
  };