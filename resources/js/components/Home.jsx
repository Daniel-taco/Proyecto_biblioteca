import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
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
          <h1>Bienvenido a nuestra biblioteca virtual</h1>
          <p>
            Explora nuestra colección de libros y realiza préstamos desde la comodidad de tu hogar.
          </p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Nuestros Servicios</Card.Title>
              <Card.Text>
                Ofrecemos una amplia variedad de servicios para satisfacer tus necesidades de lectura.
                Ya sea que estés buscando libros impresos o versiones electrónicas, ¡tenemos algo para todos!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Descubre Nuevos Libros</Card.Title>
              <Card.Text>
                Explora nuestra vasta colección de libros, desde clásicos atemporales hasta las últimas novedades.
                Nuestro catálogo está diseñado para satisfacer todos los gustos y géneros.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Encuentra tu Próxima Lectura</Card.Title>
              <Card.Text>
                Utiliza nuestras herramientas de búsqueda y filtros para encontrar fácilmente tu próxima lectura favorita.
                Personaliza tus búsquedas por categoría, autor, editorial y más.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={12} className="text-center">
          <Button variant="primary" href="/Proyecto_biblioteca/public/UserLends">
            Ver Préstamos
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
