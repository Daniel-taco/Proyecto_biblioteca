import { useState, useContext } from "react";
import { MyContext } from "../Context";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditCategoryForm(props) {
  const { token } = useContext(MyContext);
  const navigate = useNavigate();
  const id = props.id
  const [editedCategory_name, setEditedCategory_name] = useState(props.category_name);
  const [editedDescription, setEditedDescription] = useState(props.description);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleEdit = () => {
    const emptyFields = [editedCategory_name, editedDescription].filter(value => value === '');

    if (emptyFields.length > 0) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }
    const updatedCategory = {
      id: id,
      category_name: editedCategory_name,
      description: editedDescription,
    };
    axios.post("http://localhost/Proyecto_biblioteca/public/api/category_update",
      updatedCategory,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    ).then(response => {
      console.log('response');
      console.log(response);
      props.updateComponent();
    }).catch(error => {
      console.log(error);
    });
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessages.length > 0 && (
          <Alert variant="danger">
            {errorMessages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </Alert>
        )}
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editedCategory_name}
              onChange={(e) => setEditedCategory_name(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCategoryForm;
