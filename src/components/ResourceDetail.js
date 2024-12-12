import React from 'react';
import { Text, Box } from '@mantine/core';
import './ResourceDetail.css'; // Import the CSS file

const ResourceDetail = ({ resource }) => {
  return (
    <div className="star-background"> {/* Background to mimic Star Wars */}
      <Box className="box"> {/* Box container with Star Wars styling */}
        <Text className="text text-name">Name: {resource.name}</Text>
        <Text className="text text-detail">Height: {resource.height}</Text>
        <Text className="text text-detail">Mass: {resource.mass}</Text>
        <Text className="text text-detail">Hair Color: {resource.hair_color}</Text>
        {/* Add more details as needed */}
      </Box>
    </div>
  );
};

export default ResourceDetail;
