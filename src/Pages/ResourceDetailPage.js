import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResourceDetail from '../components/ResourceDetail';
import { Loader } from '@mantine/core';

// Function to fetch user details by ID
const fetchUserDetails = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
};

const ResourceDetailPage = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getResource = async () => {
      const data = await fetchUserDetails(id);
      setResource(data);
    };
    getResource();
  }, [id]);

  if (!resource) return <Loader />;

  return <ResourceDetail resource={resource} />;
};

export default ResourceDetailPage;
