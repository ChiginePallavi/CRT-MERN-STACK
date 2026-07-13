import '../../App.css';
import './Companies.css';
import CompanyRow from './CompanyRow';

function Companies() {
  const companies = [
    { id: 1, name: 'TCS', industry: 'IT', location: 'Hyderabad', package: '6 LPA', status: 'Active' },
    { id: 2, name: 'Infosys', industry: 'Software', location: 'Bengaluru', package: '5.5 LPA', status: 'Active' },
    { id: 3, name: 'Wipro', industry: 'Consulting', location: 'Pune', package: '4.8 LPA', status: 'Pending' },
  ];

  return (
    <div className="page-card companies-page">
      <h2>Companies</h2>
      <table className="companies-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Location</th>
            <th>Package</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <CompanyRow key={company.id} company={company} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Companies;
