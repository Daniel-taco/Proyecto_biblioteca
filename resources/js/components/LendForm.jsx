import React, { useState, useEffect } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LendRequestForm() {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_user: sessionStorage.getItem('id'),
    lend_date: new Date().toISOString().split('T')[0],
    expected_return_date: '',
    lend_state: 'Active',
    selectedBooks: [],
  });
  const [books, setBooks] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const redirectToLogin = () => {
      navigate('/Proyecto_biblioteca/public/login');
    };

    if (!token) {
      redirectToLogin();
      return;
    }

    axios
      .get('http://localhost/Proyecto_biblioteca/public/api/book_index')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error getting the list of books:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookSelection = (bookId) => {
    const selectedBooks = [...formData.selectedBooks];
    const index = selectedBooks.indexOf(bookId);

    if (index === -1) {
      selectedBooks.push(bookId);
    } else {
      selectedBooks.splice(index, 1);
    }

    setFormData({ ...formData, selectedBooks });
  };

  const handleAddLend = async () => {
    try {
      const response = await axios.post(
        'http://localhost/Proyecto_biblioteca/public/api/lend_store',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      const lendId = response.data.id;

      for (const bookId of formData.selectedBooks) {
        await axios.post(
          'http://localhost/Proyecto_biblioteca/public/api/book_lending_store',
          { id_lend: lendId, id_book: bookId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );
        await axios.post(
          `http://localhost/Proyecto_biblioteca/public/api/book_decrement_copies/${bookId}`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );
      }

      setShowSuccessToast(true);
      navigate('/Proyecto_biblioteca/public/ListCards');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-3">
      <h4 className="mb-4 font-weight-bold">APPLY FOR A LEND</h4>
      <Form>
        <Form.Group controlId="formExpectedReturnDate">
          <Form.Label>Expected Return Date</Form.Label>
          <Form.Control
            type="date"
            name="expected_return_date"
            value={formData.expected_return_date}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBooks">
          <Form.Label>Books</Form.Label>
          {books.map((book) => (
            <Form.Check
              key={book.id}
              type="checkbox"
              label={book.title}
              checked={formData.selectedBooks.includes(book.id)}
              onChange={() => handleBookSelection(book.id)}
            />
          ))}
        </Form.Group>

        <Button variant="primary" onClick={handleAddLend}>
          Solicitar Préstamo
        </Button>

        <Toast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          delay={3000}
          autohide
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            zIndex: 1,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Loan successfully requested</Toast.Body>
        </Toast>
      </Form>
    </div>
  );
}

export default LendRequestForm;