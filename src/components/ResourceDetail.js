import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Loader } from '@mantine/core';
import axios from 'axios';
import './ResourceDetail.css';  // Import the CSS for styling

// Function to fetch person details
const fetchPersonDetails = async (id) => {
  const { data } = await axios.get(`https://swapi.dev/api/people/${id}/`);
  return data;
};

// Function to fetch additional details (species, vehicles, starships)
const fetchDetails = async (urls) => {
  return await Promise.all(urls.map((url) => axios.get(url).then((response) => response.data)));
};

const ResourceDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [vehiclesData, setVehiclesData] = useState(null);
  const [starshipsData, setStarshipsData] = useState(null);
  const [enrichedData, setEnrichedData] = useState(null);  // For films
  const [loading, setLoading] = useState(true);

  // Fetch the person details and additional data on mount
  useEffect(() => {
    const getPerson = async () => {
      const data = await fetchPersonDetails(id);
      setPerson(data);
      const filmData = await fetchDetails(data.films);
      setEnrichedData(filmData);
      const speciesData = await fetchDetails(data.species);
      setSpeciesData(speciesData);
      const vehiclesData = await fetchDetails(data.vehicles);
      setVehiclesData(vehiclesData);
      const starshipsData = await fetchDetails(data.starships);
      setStarshipsData(starshipsData);
      setLoading(false);
    };
    getPerson();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="star-background">
      <Card className="box">
        <Text className="text text-name">Name: {person.name}</Text>
        <Text className="text text-detail">Height: {person.height}</Text>
        <Text className="text text-detail">Mass: {person.mass}</Text>
        <Text className="text text-detail">Gender: {person.gender}</Text>

        <Text className="text">Films:</Text>
        <ul>
          {enrichedData.map((film) => (
            <li key={film.title} className="text">{film.title}</li>
          ))}
        </ul>

        <Text className="text">Species:</Text>
        <ul>
          {speciesData.map((species) => (
            <li key={species.name} className="text">{species.name}</li>
          ))}
        </ul>

        <Text className="text">Vehicles:</Text>
        <ul>
          {vehiclesData.map((vehicle) => (
            <li key={vehicle.name} className="text">{vehicle.name}</li>
          ))}
        </ul>

        <Text className="text">Starships:</Text>
        <ul>
          {starshipsData.map((starship) => (
            <li key={starship.name} className="text">{starship.name}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default ResourceDetail;
