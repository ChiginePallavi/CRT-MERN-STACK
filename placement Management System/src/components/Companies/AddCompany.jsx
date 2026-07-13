import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Companies.css';

function AddCompany() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    package: '',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const newCompany = { id: Date.now(), ...formData };
    const updatedCompanies = [...existingCompanies, newCompany];
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    alert('Company added successfully!');
    navigate('/companies');
  };

  return (
    <div className="page-card companies-page">
      <h2>Add Company</h2>
      <form className="company-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Industry</label>
          <input name="industry" value={formData.industry} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Package</label>
          <input name="package" value={formData.package} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Save Company</button>
      </form>
    </div>
  );
}

export default AddCompany;
