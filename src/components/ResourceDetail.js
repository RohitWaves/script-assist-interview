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
      
      // Fetch related data concurrently
      const filmData = fetchDetails(data.films);
      const speciesData = fetchDetails(data.species);
      const vehiclesData = fetchDetails(data.vehicles);
      const starshipsData = fetchDetails(data.starships);

      // Wait for all the promises to resolve
      const [films, species, vehicles, starships] = await Promise.all([filmData, speciesData, vehiclesData, starshipsData]);

      setEnrichedData(films);
      setSpeciesData(species);
      setVehiclesData(vehicles);
      setStarshipsData(starships);
      setLoading(false);
    };
    getPerson();
  }, [id]);

  if (loading) {
    // Display the loader while data is being fetched
    return (
      <div className="star-background">
        <Card className="box">
          <Loader />
          <Text className="text">Loading...</Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="star-background">
      <Card className="box">
        <Text className="text text-name">Name: {person.name}</Text>
        <Text className="text text-detail">Height: {person.height}</Text>
        <Text className="text text-detail">Mass: {person.mass}</Text>
        <Text className="text text-detail">Gender: {person.gender}</Text>

        <Text className="text">Films:</Text>
        {enrichedData ? (
          <ul>
            {enrichedData.map((film) => (
              <li key={film.title} className="text">{film.title}</li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}

        <Text className="text">Species:</Text>
        {speciesData ? (
          <ul>
            {speciesData.map((species) => (
              <li key={species.name} className="text">{species.name}</li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}

        <Text className="text">Vehicles:</Text>
        {vehiclesData ? (
          <ul>
            {vehiclesData.map((vehicle) => (
              <li key={vehicle.name} className="text">{vehicle.name}</li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}

        <Text className="text">Starships:</Text>
        {starshipsData ? (
          <ul>
            {starshipsData.map((starship) => (
              <li key={starship.name} className="text">{starship.name}</li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}
      </Card>
    </div>
  );
};

export default ResourceDetail;
