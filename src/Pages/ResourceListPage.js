import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Loader, TextInput, Box } from '@mantine/core';
import ResourceTable from '../components/ResourceTable';

const fetchPeople = async () => {
  const res = await fetch('https://swapi.dev/api/people/'); // using the fetch web api
  return res.json();
};

const ResourceListPage = () => {
  const { data, isLoading, error } = useQuery('people', fetchPeople);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query
  const filteredData = data
    ? data.results.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data</div>;

  return (
    <Box>
      <TextInput
        placeholder="Search..."
        mb="md"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {
        filteredData.length === 0 ? (
             <h4 style={{textAlign:"center"}}>No Data Found</h4>
        ) : (
            <ResourceTable data={filteredData} />
        )
      }
     

    </Box>
  );
};

export default ResourceListPage;
