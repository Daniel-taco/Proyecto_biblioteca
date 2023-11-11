import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const RegistrationForm = () => {
  const [formValue, setformValue] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone_number: ''
}) 
const navigate = useNavigate();
const onChange = (e) => {
    e.persist();
    setformValue({...formValue, [e.target.name]:e.target.value});
}

  const handleSubmit = (e) => {
    if (e && e.preventDefault()) e.preventDefault();
        const formData = new FormData();
        formData.append("name", formValue.name)
        formData.append("email", formValue.email)
        formData.append("password", formValue.password)
        formData.append("address", formValue.address)
        formData.append("phone_number", formValue.phone_number)
        axios.post("http://localhost/Proyecto_biblioteca/public/api/register", 
        formData,
        {headers: {'Content-Type': 'multipart/form-data',
        'Accept':'application/json'}}
        ).then(response => {
            console.log('response');
            console.log(response);
            navigate("/Proyecto_biblioteca/public/ListCards");
        }).catch(error =>{
            console.log(error);
        });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
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

      <Form.Group className="mb-3" controlId="formEmail">
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

      <Form.Group className="mb-3" controlId="formPassword">
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

      <Form.Group className="mb-3" controlId="formAddress">
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

      <Form.Group className="mb-3" controlId="formPhoneNumber">
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

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegistrationForm;






