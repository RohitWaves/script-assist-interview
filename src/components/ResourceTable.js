import React, { useState, useEffect } from 'react';
import { Table, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './ResourceTable.css'; // Import the CSS file

const ResourceTable = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setLoading(false);  // Data is fetched, set loading to false
    }
  }, [data]);

  const handleRowClick = (id) => {
    navigate(`/resources/${id}`);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader size="xl" color="green" />
      </div>
    );
  }

  return (
    <div className="table-container">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item.id)}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="table-footer">
              <p>Displaying data fetched from JSONPlaceholder</p>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default ResourceTable;
