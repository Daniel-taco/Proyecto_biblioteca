// EditBookForm.js
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditBookForm(props) {
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedAuthor, setEditedAuthor] = useState(props.author);
  const [editedIsbn, setEditedIsbn] = useState(props.isbn);
  const [editedGenre, setEditedGenre] = useState(props.genre);
  const [editedPublication_year, setEditedPublication_year] = useState(props.publication_year);
  const [editedAvailable_copies, setEditedAvailable_copies] = useState(props.available_copies);
  const [editedCategoryName, setEditedCategoryName] = useState(props.categoryName);
  const [editedEditorial, setEditedEditorial] = useState(props.editorial);
  const [editedEdition, setEditedEdition] = useState(props.edition);

  // ... Agrega más estados según sea necesario para otras propiedades

  const handleEdit = () => {
    // Implementa la lógica para enviar los datos editados a la API
    // Puedes utilizar axios u otra librería para hacer la solicitud PUT
    // ...

    // Cerrar el modal después de la edición
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={editedAuthor}
              onChange={(e) => setEditedAuthor(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formIsbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={editedIsbn}
              onChange={(e) => setEditedIsbn(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              value={editedGenre}
              onChange={(e) => setEditedGenre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPublicationYear">
            <Form.Label>Publication year</Form.Label>
            <Form.Control
              type="text"
              value={editedPublication_year}
              onChange={(e) => setEditedPublication_year(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAvailableCopies">
            <Form.Label>Available Copies</Form.Label>
            <Form.Control
              type="text"
              value={editedAvailable_copies}
              onChange={(e) => setEditedAvailable_copies(e.target.value)}
            />
          </Form.Group>

          {/* ... Agrega más campos según sea necesario para otras propiedades */}
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

export default EditBookForm;
