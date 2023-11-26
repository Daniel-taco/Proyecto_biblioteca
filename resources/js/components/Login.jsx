import React, { useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "../Context";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import Biblioteca from '../../../public/biblioteca.jpg'

function Login() {
  const { token, setGlobalToken } = useContext(MyContext);
  const { id, setGlobalId } = useContext(MyContext);
  const { id_rol, setGlobalId_rol } = useContext(MyContext);
  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    e.persist();
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault()) e.preventDefault();
    const formData = new FormData();
    formData.append("email", formValue.email);
    formData.append("password", formValue.password);
    axios.post("http://localhost/Proyecto_biblioteca/public/api/login", formData, 
    {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response");
        console.log(response);
        setGlobalToken(response.data.token);
        setGlobalId(response.data.id);
        setGlobalId_rol(response.data.id_rol);
        navigate({
          pathname: "/Proyecto_biblioteca/public",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <Image
        src={Biblioteca}
        fluid
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
                
    <Container className="mt-5">
      <Row className="mb-4">
        <Col className="text-center">
          <Link to="/Proyecto_biblioteca/public/register">
            <Button variant="link" style={{ color:'black'}}>You don't have an account? Register</Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Form onSubmit={handleSubmit} style={{ color:'black', borderColor:'black',border: '1px solid black',borderRadius: '8px',boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',padding:'5%',marginTop: '20%',zIndex:'+1', backgroundColor:'white'}}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "24px", fontWeight: "bold" }}>
                Sign In
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                value={formValue.email}
                onChange={onChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={formValue.password}
                onChange={onChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;
