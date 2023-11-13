import { useState, useEffect } from "react";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditCategoryForm from "./EditCategoryForm";

function CategoryCard(props) {
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditClick = () => {
      setShowEditModal(true);
    };
    const handleEditModalClose = () => {
      setShowEditModal(false);
    };
    const category_name = props.category_name
    const description = props.description
    const id = props.id
    const id_rol = sessionStorage.getItem("id_rol");

        const handleDelete = () => {
          axios.post("http://localhost/Proyecto_biblioteca/public/api/category_delete", 
          {id: id},
          {headers: {'Content-Type': 'multipart/form-data',
          'Accept':'application/json'}}
          ).then(response => {
            console.log('response');
            console.log(response);
            navigate("/Proyecto_biblioteca/public/CategoryList");
            window.location.reload();
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
      {id_rol === "1" && (    
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
        />
        </Card>
    );
}

export default CategoryCard;