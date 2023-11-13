import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCategoryForm() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id_rol = sessionStorage.getItem("id_rol");
  const [formData, setFormData] = useState({
    category_name: '',
    description: '',
  });
  useEffect(() => {
    
    if (!token) {
      navigate("/Proyecto_biblioteca/public/login");
    return; 
    }
    if (id_rol != 1){
      navigate("/Proyecto_biblioteca/public/")
    }
    

    
  },[]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        'http://localhost/Proyecto_biblioteca/public/api/category_store',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      console.log(response);
      navigate('/Proyecto_biblioteca/public/CategoryList');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form>
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