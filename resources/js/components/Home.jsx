import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { MyContext } from "../Context";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
  const { token, setGlobalToken } = useContext(MyContext);
  const { id, setGlobalId } = useContext(MyContext);
  const { id_rol, setGlobalId_rol } = useContext(MyContext);
    const navigate = useNavigate();
    useEffect(()=>{
          if (!token) {
            navigate("/Proyecto_biblioteca/public/login"); 
            return; 
          }
        },[])
  return (
    <Container>
      <Row className="mt-5">
        <Col md={12} className="text-center">
          <h1>Welcome to BiblioTEC</h1>
          <p>
            Explore our book collection and borrow books from the comfort of your home.
          </p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Our Services</Card.Title>
              <Card.Text>
                We offer a wide variety of services to meet your reading needs.
                Whether you are looking for print books or electronic versions, we have something for everyone!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Discover New Books</Card.Title>
              <Card.Text>
                Explore our vast collection of books, from timeless classics to the latest releases.
                Our catalog is designed to satisfy all tastes and genres.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Find your Next Reading</Card.Title>
              <Card.Text>
                Use our search tools and filters to easily find your next favorite read.
                Customize your searches by category, author, publisher and more.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={12} className="text-center">
          <Button variant="primary" href="/Proyecto_biblioteca/public/ListCards">
            Search Books
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
