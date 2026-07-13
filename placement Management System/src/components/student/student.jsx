import { useState } from "react";
import Register from "../../../../footer/pages/registration/register";
import "./student.css";

function Student() {
  const [students, setStudents] = useState([]);

  const handleStudentRegistered = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  return (
    <div className="register-container">
      <Register onStudentRegistered={handleStudentRegistered} />
      {students.length > 0 && (
        <section className="students-table-section">
          <div className="students-table">
            <h3>Registered Students</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll</th>
                  <th>Section</th>
                  <th>Age</th>
                  <th>Year</th>
                  <th>CGPA</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.roll}</td>
                    <td>{s.section}</td>
                    <td>{s.age}</td>
                    <td>{s.year}</td>
                    <td>{s.cgpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default Student;
