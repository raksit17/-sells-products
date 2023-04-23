CREATE TABLE courses (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255)
);

CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email_address VARCHAR(255),
  graduation_year INT
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY,
  student_id INT,
  course_id INT,
  enrollment_date DATETIME,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);