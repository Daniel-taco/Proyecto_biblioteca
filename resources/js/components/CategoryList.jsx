import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import CategoryCard from './CategoryCard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Stack, Spinner, Container, Row, Button, Form, Col} from 'react-bootstrap';
import Menu from './Menu';
import AddBookForm from './AddBookForm';

function CategoryList() {
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id_rol = sessionStorage.getItem("id_rol");
  
  const [categoryData, setCategoryData] = useState([]);
  
  useEffect(()=>{
    if (!token) {
      navigate("/Proyecto_biblioteca/public/login");
      return; 
    }
    if(id_rol !=1){
        navigate("/Proyecto_biblioteca/public/");
    }

    const getCategories = async() =>{
      await axios.get("http://localhost/Proyecto_biblioteca/public/api/category_index")
      .then(function (response) {
        // manejar respuesta exitosa
        console.log(categoryData);
        setCategoryData(response.data);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
      }); 
    }
    
    getCategories()
  },[token, navigate])

  const handleAddCategoryClick = () => {
    navigate('/Proyecto_biblioteca/public/AddCategory');
  };

  if (!categoryData.length) return (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      )
  return (
    <>
    <Container >
        {id_rol === '1' && (
        <Button variant="primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAddCategoryClick}>
          Add Category
        </Button>
      )}
      <Row>
      {categoryData.map((category) => (
        <CategoryCard key={category.id}
          id={category.id}
          category_name={category.category_name} 
          description={category.description}
        />
      ))}
      </Row>
    </Container>
    </>
    
  );
  
}


export default CategoryList;