import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

function UserLends() {
    const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem('id');
  const [lends, setLends] = useState([]);

  useEffect(() => {
    if (!token) {
        navigate("/Proyecto_biblioteca/public/login"); 
        return; 
      }
    const fetchLends = async () => {
      try {
        const response = await axios.get('http://localhost/Proyecto_biblioteca/public/api/lend_index');
        setLends(response.data);
      } catch (error) {
        console.error('Error fetching lends:', error);
      }
    };

    fetchLends();
  }, []);

  const handleViewAllLends = () => {
    
    navigate('/Proyecto_biblioteca/public/lends');
  };

  if (!Array.isArray(lends)) {
    return <div>Error fetching lends</div>;
  }

  const userLends = lends.filter(lend => lend.id_user === Number(userId));

  return (
    <>
    <Row>
        <Col>
          <Button variant="primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleViewAllLends}>
            Apply for a lend
          </Button>
        </Col>
      </Row>
    <Row xs={1} md={2} lg={3}>
      {userLends.length === 0 ? (
        <Col>No lends for this user</Col>
      ) : (
        userLends.map(lend => (
          <Col key={lend.id}>
            <Card style={{ margin: '10px' }}>
              <Card.Body>
                <Card.Title>Lend ID: {lend.id}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Date: {lend.lend_date}</ListGroupItem>
                <ListGroupItem>Return Date: {lend.expected_return_date}</ListGroupItem>
                <ListGroupItem>State: {lend.lend_state}</ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        ))
      )}
    </Row>
    </>
  );
}

export default UserLends;
