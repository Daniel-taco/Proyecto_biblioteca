import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import UserCard from './UserCard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Stack, Spinner, Container, Row, Button, Form, Col} from 'react-bootstrap';
import Menu from './Menu';
import AddBookForm from './AddBookForm';
import LendCard from './LendCard';

function LendList() {
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id_rol = sessionStorage.getItem("id_rol");
  
  const [lendData, setLendData] = useState([]);
  useEffect(()=>{

    if (!token) {
        navigate("/Proyecto_biblioteca/public/login");
      return; 
    }
    if(id_rol != 1){
        navigate("/Proyecto_biblioteca/public/")
    }

    const getLends = async() =>{
      await axios.get("http://localhost/Proyecto_biblioteca/public/api/lend_index")
      .then(function (response) {
        // manejar respuesta exitosa
        console.log(lendData);
        setLendData(response.data);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
      }); 
    }
    getLends()
  },[token, navigate])

  /*const handleAddBookClick = () => {
    navigate('/Proyecto_biblioteca/public/AddBook');
  };*/

  if (!lendData.length) return (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      )
  return (
    <>
    <Container >
      <Row>
      {lendData.map((lend) => (
        <LendCard key={lend.id}
          id={lend.id}
          id_user={lend.id_user} 
          lend_date={lend.lend_date}
          expected_return_date={lend.expected_return_date}
          lend_state= {lend.lend_state}
        />
      ))}
      </Row>
    </Container>
    </>
    
  );
  
}


export default LendList;
  