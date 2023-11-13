import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditUserForm(props) {
  const navigate = useNavigate();
  const id = props.id
  const [editedName, setEditedName] = useState(props.name);
  const [editedEmail, setEditedEmail] = useState(props.email);
  const [editedAddress, setEditedAddress] = useState(props.address);
  const [editedPhone_number, setEditedPhone_number] = useState(props.phone_number);


  const handleEdit = () => {
      const updatedUser = {
        id: id,
        name: editedName,
        email: editedEmail,
        address: editedAddress,
        phone_number: editedPhone_number
      };
    axios.post(`http://localhost/Proyecto_biblioteca/public/api/user_update/${id}`, 
        updatedUser,
        {headers: {'Content-Type': 'multipart/form-data',
        'Accept':'application/json'}}
        ).then(response => {
            console.log('response');
            console.log(response);
            window.location.reload();
            navigate("/Proyecto_biblioteca/public/UserList");
        }).catch(error =>{
            console.log(error);
        });
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={editedPhone_number}
              onChange={(e) => setEditedPhone_number(e.target.value)}
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

export default EditUserForm;