import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from "../Context";
import { Form, Button, Alert, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCategoryForm() {
  const navigate = useNavigate();
  const { token, id_rol } = useContext(MyContext);
  const [formData, setFormData] = useState({
    category_name: '',
    description: '',
  });
  useEffect(() => {

    if (!token) {
      navigate("/Proyecto_biblioteca/public/login");
      return;
    }
    if (id_rol != 1) {
      navigate("/Proyecto_biblioteca/public/")
    }
  }, []);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    const emptyFields = Object.keys(formData).filter(key => formData[key] === '');

    if (emptyFields.length > 0) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost/Proyecto_biblioteca/public/api/category_store',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      navigate('/Proyecto_biblioteca/public/CategoryList');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessageString = error.response.data.error;
        const errorMessagesArray = errorMessageString.split('\n').filter((line) => line.trim() !== '');
        setErrorMessages(errorMessagesArray);
      } else {
        setErrorMessages(['An error occurred while adding the book.']);
      }
    }
  };

  return (
    <Form>
      {errorMessages.length > 0 && (
        <Alert variant="danger">
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </Alert>
      )}
      <Form.Group controlId="formCategoryName">
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          name="category_name"
          value={formData.category_name}
          onChange={handleInputChange}
          placeholder="Enter name of category"
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter a description"
        />
      </Form.Group>
      <Button variant="primary" onClick={handleAddCategory}>
        Add Book
      </Button>
    </Form>
  );
}

export default AddCategoryForm;