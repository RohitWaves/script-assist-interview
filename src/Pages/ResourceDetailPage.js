import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResourceDetail from '../components/ResourceDetail';
import { Loader } from '@mantine/core';

const fetchResource = async (id) => {
  const res = await fetch(`https://swapi.dev/api/people/${id}/`);
  return res.json();
};

const ResourceDetailPage = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getResource = async () => {
      const data = await fetchResource(id);
      setResource(data);
    };
    getResource();
  }, [id]);

  if (!resource) return <Loader />;

  return <ResourceDetail resource={resource} />;
};

export default ResourceDetailPage;
