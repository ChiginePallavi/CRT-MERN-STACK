function CompanyRow({ company }) {
  return (
    <tr>
      <td>{company.name}</td>
      <td>{company.industry}</td>
      <td>{company.location}</td>
      <td>{company.package}</td>
      <td>{company.status}</td>
    </tr>
  );
}

export default CompanyRow;
