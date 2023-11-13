import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import UserCard from './UserCard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Stack, Spinner, Container, Row, Button, Form, Col} from 'react-bootstrap';
import Menu from './Menu';
import AddBookForm from './AddBookForm';

function UserList() {
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id_rol = sessionStorage.getItem("id_rol");
  
  const [userData, setUserData] = useState([]);
  useEffect(()=>{
    if (!token) {
      navigate("/Proyecto_biblioteca/public/login");
    }
    if (id_rol != 1){
      navigate("/Proyecto_biblioteca/public/");
    }

    const getUsers = async() =>{
      await axios.get("http://localhost/Proyecto_biblioteca/public/api/user_index")
      .then(function (response) {
        // manejar respuesta exitosa
        console.log(userData);
        setUserData(response.data);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
      }); 
    }
    getUsers()
  },[token, navigate])

  /*const handleAddBookClick = () => {
    navigate('/Proyecto_biblioteca/public/AddBook');
  };*/

  if (!userData.length) return (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      )
  return (
    <>
    <Container >
      <Row>
      {userData.map((user) => (
        <UserCard key={user.id}
          id={user.id}
          name={user.name} 
          email={user.email}
          address={user.address}
          phone_number= {user.phone_number}
        />
      ))}
      </Row>
    </Container>
    </>
    
  );
  
}


export default UserList;
  