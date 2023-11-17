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
  const [errorMessages, setErrorMessages] = useState([]);

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
    const emptyFields = Object.keys(formData).filter(key => formData[key] === '');

    if (emptyFields.length > 0) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }
    if (parseInt(formData.available_copies, 10) < 0) {
      setErrorMessages(['The number of copies cannot be negative.']);
      return;
    }
    if (parseInt(formData.edition, 10) < 1) {
      setErrorMessages(['Edition must be a positive number greater than or equal to 1.']);
      return;
    }
    const currentYear = new Date().getFullYear();
    if (parseInt(formData.publication_year, 10) > currentYear) {
      setErrorMessages(['Publication year cannot be greater than the current year.']);
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost/Proyecto_biblioteca/public/api/book_store',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(response);
      navigate('/Proyecto_biblioteca/public/ListCards');
    } catch (error) {
      console.error(error);
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
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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

