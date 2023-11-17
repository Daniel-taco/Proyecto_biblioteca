import { useState, useContext } from "react";
import { MyContext } from "../Context";
import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditCategoryForm from "./EditCategoryForm";

function CategoryCard(props) {
  const { token, id_rol } = useContext(MyContext);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditClick = () => {
    setShowEditModal(true);
  };
  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const updateComponent = () => {
    props.updateComponent();
  };
  const category_name = props.category_name
  const description = props.description
  const id = props.id
  const [errorMessages, setErrorMessages] = useState([]);

  const handleDelete = () => {
    axios.post("http://localhost/Proyecto_biblioteca/public/api/category_delete",
      { id: id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    ).then(response => {
      console.log('response');
      console.log(response);
      updateComponent();
    }).catch(error => {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessageString = error.response.data.error;
        const errorMessagesArray = errorMessageString.split('\n').filter((line) => line.trim() !== '');
        setErrorMessages(errorMessagesArray);
      } else {
        setErrorMessages(['An error occurred while adding the book.']);
      }
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
        <Card.Subtitle>Category: {category_name}</Card.Subtitle>
        <hr />
        <Card.Text>Description: {description} <br />
        </Card.Text>
      </Card.Body>
      {id_rol == "1" && (
        <>
          <Button variant="primary" onClick={handleEditClick}>Edit</Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}
      <EditCategoryForm
        show={showEditModal}
        onHide={handleEditModalClose}
        category_name={category_name}
        description={description}
        id={id}
        updateComponent={updateComponent}
      />
    </Card>
  );
}

export default CategoryCard;