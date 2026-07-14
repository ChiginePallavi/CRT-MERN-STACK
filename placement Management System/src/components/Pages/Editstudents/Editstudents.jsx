import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Editstudent.css';

function Editstudents() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    cgpa: '',
    remarks: '',
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const existing = savedStudents.find((student) => String(student.id) === String(id));
    if (existing) {
      setFormData({
        fullName: existing.fullName || '',
        email: existing.email || '',
        phone: existing.phone || '',
        department: existing.department || '',
        year: existing.year || '',
        cgpa: existing.cgpa || '',
        remarks: existing.remarks || '',
      });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const savedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const nextStudents = savedStudents.map((student) =>
      String(student.id) === String(id)
        ? { ...student, ...formData }
        : student
    );

    if (!id) {
      nextStudents.push({ id: Date.now(), ...formData });
    }

    localStorage.setItem('students', JSON.stringify(nextStudents));
    setStatus('Student details saved successfully!');
    setTimeout(() => navigate('/students'), 1200);
  };

  const handleCancel = () => {
    navigate('/students');
  };

  return (
    <div className="editstudent-page">
      <div className="editstudent-card">
        <h1>Edit Student</h1>
        <p>Update student records using the fields below, then click Save Changes.</p>

        <div className="editstudent-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Academic Year</label>
            <input
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Enter year (e.g. 3rd year)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cgpa">CGPA</label>
            <input
              id="cgpa"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              placeholder="Enter CGPA"
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="remarks">Remarks</label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Add any notes or remarks"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        {status && <p className={status.includes('saved') ? 'success-text' : 'error-text'}>{status}</p>}
      </div>
    </div>
  );
}

export default Editstudents;
