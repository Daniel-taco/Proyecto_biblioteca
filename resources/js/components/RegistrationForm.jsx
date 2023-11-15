import React, { useState, useContext } from 'react';
import { MyContext } from '../Context';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Biblioteca from '../../../public/biblioteca.jpg'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const RegistrationForm = () => {
  const { token, setGlobalToken } = useContext(MyContext);
  const { id, setGlobalId } = useContext(MyContext);
  const { id_rol, setGlobalId_rol } = useContext(MyContext);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone_number: '',
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    e.persist();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost/Proyecto_biblioteca/public/api/register',
        formValue,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('response');
      console.log(response);
      setGlobalToken(response.data.token);
      setGlobalId(response.data.id);
      setGlobalId_rol(response.data.id_rol);
      navigate({
        pathname: "/Proyecto_biblioteca/public",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${Biblioteca})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: 0.7,
        zIndex: -1,
      }}>

      </div>
      <Container className="mt-5">
        <Row className="mb-4">
          <Col className="text-center">
            <Link to="/Proyecto_biblioteca/public/login">
              <Button variant="link">You have an account? Login</Button>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <h2 className="text-center mb-4">Create an Account</h2>
            <Form onSubmit={handleSubmit} style={{ color: 'black', borderColor: 'black', border: '1px solid black', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '5%', marginTop: '20%', zIndex: '+1', backgroundColor: 'white' }}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formValue.name}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formValue.email}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formValue.password}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  value={formValue.address}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone_number"
                  value={formValue.phone_number}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationForm;