import { useState, useEffect } from "react";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditBookForm from "./EditBookForm";

function Card_C(props) {
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditClick = () => {
      setShowEditModal(true);
    };
    const handleEditModalClose = () => {
      setShowEditModal(false);
    };
    const [categoryName, setCategoryName] = useState('');
    const title = props.title
    const author = props.author
    const id_category = props.id_category
    const id = props.id
    const isbn= props.isbn
    const publication_year= props.publication_year
    const available_copies=props.available_copies
    const editorial= props.editorial
    const edition= props.edition
    const id_rol = sessionStorage.getItem("id_rol");


    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await axios.get(
                  "http://localhost/Proyecto_biblioteca/public/api/category_index"
                );
                const categoryDetails = response.data;
        
                const categoryName = categoryDetails.find((category) => category.id === props.id_category).category_name;
        
                setCategoryName(categoryName);
              } catch (error) {
                console.error(error);
              }
            };
        
            fetchCategoryDetails();
          }, [props.id_category]);

        const handleDelete = () => {
          axios.post("http://localhost/Proyecto_biblioteca/public/api/book_delete", 
          {id: id},
          {headers: {'Content-Type': 'multipart/form-data',
          'Accept':'application/json'}}
          ).then(response => {
            console.log('response');
            console.log(response);
            navigate("/Proyecto_biblioteca/public/ListCards");
            window.location.reload();
        }).catch(error =>{
            console.log(error);
        });
          };
    

    return (
        <Card className="text-center"style={{width: '18rem', margin: '10px' }}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <Card.Subtitle>Title: {title}</Card.Subtitle>
                <hr/>
                <Card.Text>Author: {author} <br/>
                ISBN: {isbn}<br/>
                Publication Year: {publication_year}<br/>
                Available Copies: {available_copies}<br/>
                Category: {categoryName}<br/>
                Editorial: {editorial}<br/>
                Edition: {edition}<br/>
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
        <EditBookForm
          show={showEditModal}
          onHide={handleEditModalClose}
          // Pasa las variables necesarias a EditBookForm
          title={title}
          author={author}
          id={id}
          isbn={isbn}
          publication_year={publication_year}
          available_copies={available_copies}
          editorial={editorial}
          edition={edition}
          id_category={id_category}
        />
        </Card>
    );
}

export default Card_C;