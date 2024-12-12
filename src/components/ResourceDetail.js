import React from 'react';
import { Text, Box } from '@mantine/core';

const ResourceDetail = ({ resource }) => {
  return (
    <Box>
      <Text>Name: {resource.name}</Text>
      <Text>Height: {resource.height}</Text>
      <Text>Mass: {resource.mass}</Text>
      <Text>Hair Color: {resource.hair_color}</Text>
      {/* Add more details */}
    </Box>
  );
};

export default ResourceDetail;
