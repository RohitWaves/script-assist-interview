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
        <Loader size="xl" color="green" /> {/* Change loader color to green */}
      </div>
    );  // Show the loader while data is being fetched
  }

  return (
    <div className="table-container"> {/* Add the container class */}
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name} onClick={() => handleRowClick(item.url.split('/')[5])}>
              <td>{item.name}</td>
              <td>{item.height}</td>
              <td>{item.mass}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="table-footer">
              <p>Displaying data fetched from SWAPI (Star Wars API)</p>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default ResourceTable;
