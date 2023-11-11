// UserCard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UserCard = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost/Proyecto_biblioteca/public/api/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{userData.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{userData.email}</Card.Subtitle>
        <Card.Text>{userData.address}</Card.Text>
        <Card.Text>{userData.phone}</Card.Text>
        {userData.id_rol !== undefined && (
          <Card.Text>{`Role: ${userData.id_rol}`}</Card.Text>
        )}
        <Button variant="primary">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
