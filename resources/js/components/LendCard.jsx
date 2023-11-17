import { useContext, useState, useEffect } from "react";
import { MyContext } from "../Context";
import React from "react";
import { Card, Button, Alert } from "react-bootstrap";

function LendCard(props) {
  const [userName, setUserName] = useState('');
  const id_user = props.id_user
  const lend_date = props.lend_date
  const expected_return_date = props.expected_return_date
  const id = props.id
  const lend_state = props.lend_state
  const { token, id_rol } = useContext(MyContext);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  

  useEffect(() => {
    setShowDeleteButton(lend_state === 'Delivered');

    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `http://localhost/Proyecto_biblioteca/public/api/user_show/${id_user}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, [lend_state]);

  const updateComponent = () => {
    props.updateComponent();
  };


  const handleUpdate = () => {
    const updatedLend = {
      id: id,
      id_user: id_user,
      lend_date: lend_date,
      expected_return_date: expected_return_date,
      lend_state: 'Delivered'
    };

    axios.post("http://localhost/Proyecto_biblioteca/public/api/lend_update",
      updatedLend,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    ).then(response => {
      console.log('response');
      console.log(response);
      handleBookIncrement();
      updateComponent();
    }).catch(error => {
      console.log(error);
    });
  };
  const handleBookIncrement = () => {
    axios.get("http://localhost/Proyecto_biblioteca/public/api/book_lending_index", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },


    })
      .then(response => {
        const lendings = response.data.filter(lending => lending.id_lend === id);
        lendings.forEach(lending => {
          handleIncrementCopies(lending.id_book);
        });
      })
      .catch(error => {
        console.error('Error fetching lendings:', error);
      });
  };
  const handleDelete = () => {
    axios.post(
      "http://localhost/Proyecto_biblioteca/public/api/lend_delete",
      { id: id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        updateComponent();
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessageString = error.response.data.error;
          const errorMessagesArray = errorMessageString.split('\n').filter((line) => line.trim() !== '');
          setErrorMessages(errorMessagesArray);
        } else {
          setErrorMessages(['An error occurred while adding the book.']);
        }
      });
  };
  const handleIncrementCopies = (idBook) => {
    axios.post(`http://localhost/Proyecto_biblioteca/public/api/book_increment_copies/${idBook}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log(`Book increment response for book ${idBook}:`, response);
      })
      .catch(error => {
        console.error(`Error incrementing copies for book ${idBook}:`, error);
      });
  };



  return (
    <Card className="text-center" style={{ width: '18rem', margin: '10px' }}>
      {errorMessages.length > 0 && (
        <Alert variant="danger">
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </Alert>
      )}
      <Card.Body>
        <Card.Subtitle>Lend Number: {id}</Card.Subtitle>
        <hr />
        <Card.Text>
          User: {userName} <br />
          Id User: {id_user} <br />
          Date Lend: {lend_date}<br />
          Expected Return Date: {expected_return_date}<br />
          State: {lend_state}<br />
        </Card.Text>
      </Card.Body>
      {showDeleteButton && (
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      )}
      
      {id_rol == "1" && lend_state !== 'Delivered' && (
        <>
          <Button variant="primary" onClick={handleUpdate}>Delivered</Button>
        </>
      )}
    </Card>
  );
}

export default LendCard;
