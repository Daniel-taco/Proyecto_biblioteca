// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// UserList.js
// ... (importaciones)

const UserCard = ({ id, name, email, address, phone, id_rol }) => (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
        <Card.Text>{address}</Card.Text>
        <Card.Text>{phone}</Card.Text>
        {id_rol !== undefined && (
          <Card.Text>{`Role: ${id_rol}`}</Card.Text>
        )}
        <Link to={`/Proyecto_biblioteca/public/users/${id}`}>
          <Button variant="primary">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
  
  const UserList = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost/Proyecto_biblioteca/public/api/user_index');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    return (
      <div>
        <h1>User List</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      </div>
    );
  };
  
  export default UserList;
  