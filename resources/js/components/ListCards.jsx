import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Card_C from './Card_C';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Stack, Spinner, Container, Row} from 'react-bootstrap';
import Menu from './Menu';

function ListCards() {
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id_rol = sessionStorage.getItem("id_rol");
  
  const [bookData, setBookData]= useState({})
  useEffect(()=>{
    const redirectToLogin = () => {
      navigate("/Proyecto_biblioteca/public/login"); 
    };

    if (!token) {
      redirectToLogin();
      return; 
    }

    const getBooks = async() =>{
      await axios.get("http://localhost/Proyecto_biblioteca/public/api/book_index")
      .then(function (response) {
        // manejar respuesta exitosa
        console.log(bookData);
        setBookData(response.data);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
      });
    }
    getBooks()
  },[token, navigate])

  if (!bookData.length) return
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
  
  return (
    <>
    <Container >
      <Row>
      {bookData.map((book)=>(
        <Card_C key={book.id}
          id={book.id}
          title={book.title} 
          author={book.author}
          isbn={book.isbn}
          genre={book.genre}
          publication_year= {book.publication_year}
          available_copies= {book.available_copies}
          id_category= {book.id_category}
          editorial= {book.editorial}
          edition= {book.edition}
        />
      ))}
      </Row>
    </Container>
    </>
    
  );
  
}


export default ListCards;
