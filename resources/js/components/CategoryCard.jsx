import { useState, useContext } from "react";
import { MyContext } from "../Context";
import React from "react";
import { Card, Button } from "react-bootstrap";
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

        const handleDelete = () => {
          axios.post("http://localhost/Proyecto_biblioteca/public/api/category_delete", 
          {id: id},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }}
          ).then(response => {
            console.log('response');
            console.log(response);
            updateComponent();
        }).catch(error =>{
            console.log(error);
        });
          };
    

    return (
        <Card className="text-center"style={{width: '18rem', margin: '10px' }}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <Card.Subtitle>Category: {category_name}</Card.Subtitle>
                <hr/>
                <Card.Text>Description: {description} <br/>
                </Card.Text>
                {/*<Button variant="primary">Go Somewhere</Button>*/}
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
          // Pasa las variables necesarias a EditBookForm
          category_name={category_name}
          description={description}
          id={id}
          updateComponent= {updateComponent}
        />
        </Card>
    );
}

export default CategoryCard;