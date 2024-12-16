import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Loader } from '@mantine/core';
import axios from 'axios';
import './ResourceDetail.css';  // Import the CSS for styling

// Function to fetch user details
const fetchUserDetails = async (id) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return data;
};

// Function to fetch related data (posts)
const fetchUserPosts = async (userId) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return data;
};

const ResourceDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUserDetails(id);
      setUser(userData);
      const postsData = await fetchUserPosts(id);
      setUserPosts(postsData);
      setLoading(false);
    };

    getUser();
  }, [id]);

  if (loading) {
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
        <Text className="text text-name">Name: {user.name}</Text>
        <Text className="text text-detail">Email: {user.email}</Text>
        <Text className="text text-detail">Phone: {user.phone}</Text>
        <Text className="text text-detail">Website: {user.website}</Text>

        <Text className="text">Posts:</Text>
        {userPosts ? (
          <ul>
            {userPosts.map((post) => (
              <li key={post.id} className="text">{post.title}</li>
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
