import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../Context';
import { Form, Button, Toast, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LendRequestForm() {
  const { token, id } = useContext(MyContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_user: id,
    lend_date: new Date().toISOString().split('T')[0],
    expected_return_date: '',
    lend_state: 'Active',
    selectedBooks: [],
  });
  const [books, setBooks] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/Proyecto_biblioteca/public/login');
    }

    axios
      .get('http://localhost/Proyecto_biblioteca/public/api/book_index', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        const filteredBooks = response.data.filter(book => book.available_copies > 0);
        setBooks(filteredBooks);
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
    const emptyFields = ['expected_return_date', 'selectedBooks'].filter(key => {
      const value = formData[key];
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return value === '';
    });

    if (emptyFields.length > 0) {
      setErrorMessages(['Please fill in all fields and select at least one book.']);
      return;
    }
    const currentDate = new Date();
    const expectedReturnDate = new Date(formData.expected_return_date + 'T00:00:00');

    if (expectedReturnDate < currentDate) {
      setErrorMessages(['Expected Return Date cannot be earlier than the current date.']);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/Proyecto_biblioteca/public/api/lend_store',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
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
              Authorization: `Bearer ${token}`,
            }
          }
        );
        await axios.post(
          `http://localhost/Proyecto_biblioteca/public/api/book_decrement_copies/${bookId}`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          }
        );
      }

      setShowSuccessToast(true);
      navigate('/Proyecto_biblioteca/public/UserLends');
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
    <div className="m-3">
      <h4 className="mb-4 font-weight-bold">APPLY FOR A LEND</h4>
      <Form>
        {errorMessages.length > 0 && (
          <Alert variant="danger">
            {errorMessages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </Alert>
        )}
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
              label={book.title + ' | Edition ' + book.edition}
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
