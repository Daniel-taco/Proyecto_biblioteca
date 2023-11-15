import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from "../Context";
import { Form, Button, Alert, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBookForm() {
  const navigate = useNavigate();
  const { token, id_rol } = useContext(MyContext);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publication_year: '',
    available_copies: '',
    editorial: '',
    edition: '',
    id_category: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost/Proyecto_biblioteca/public/api/category_index', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!token) {
      navigate("/Proyecto_biblioteca/public/login");
      console.log(token)
      return;
    }
    if (id_rol != 1) {
      navigate("/Proyecto_biblioteca/public/")
      console.log(id_rol)
    }


    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    try {
      const response = await axios.post(
        'http://localhost/Proyecto_biblioteca/public/api/book_store',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }}
      );
      console.log(response);
      navigate('/Proyecto_biblioteca/public/ListCards');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter title"
        />
      </Form.Group>
      <Form.Group controlId="formAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Enter author"
        />
      </Form.Group>
      <Form.Group controlId="formISBN">
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleInputChange}
          placeholder="Enter ISBN"
        />
      </Form.Group>
      <Form.Group controlId="formPublicationYear">
        <Form.Label>Publication year</Form.Label>
        <Form.Control
          type="text"
          name="publication_year"
          value={formData.publication_year}
          onChange={handleInputChange}
          placeholder="Enter publication year"
        />
      </Form.Group>
      <Form.Group controlId="formAvailableCopies">
        <Form.Label>Available Copies</Form.Label>
        <Form.Control
          type="text"
          name="available_copies"
          value={formData.available_copies}
          onChange={handleInputChange}
          placeholder="Enter available copies"
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="id_category"
          value={formData.id_category}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formEditorial">
        <Form.Label>Editorial</Form.Label>
        <Form.Control
          type="text"
          name="editorial"
          value={formData.editorial}
          onChange={handleInputChange}
          placeholder="Enter editorial"
        />
      </Form.Group>
      <Form.Group controlId="formEdition">
        <Form.Label>Edition</Form.Label>
        <Form.Control
          type="text"
          name="edition"
          value={formData.edition}
          onChange={handleInputChange}
          placeholder="Enter edition"
        />
      </Form.Group>
      <Button variant="primary" onClick={handleAddBook}>
        Add Book
      </Button>
    </Form>
  );
}

export default AddBookForm;

