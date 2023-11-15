import { useState, useContext } from "react";
import { MyContext } from "../Context";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditUserForm from "./EditUserForm";

function UserCard(props) {
    const { token, id_rol } = useContext(MyContext);
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditClick = () => {
      setShowEditModal(true);
    };
    const handleEditModalClose = () => {
      setShowEditModal(false);
      setRefresh(!refresh);
    };

    const updateComponent = () => {
      props.updateComponent();
    };
    
    const name = props.name
    const email = props.email
    const address = props.address
    const id = props.id
    const phone_number= props.phone_number
  

        const handleDelete = () => {
          axios.post("http://localhost/Proyecto_biblioteca/public/api/user_delete", 
          {id: id},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          }
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
                <Card.Subtitle>Name: {name}</Card.Subtitle>
                <hr/>
                <Card.Text>Email: {email} <br/>
                Address: {address}<br/>
                Phone Number: {phone_number}<br/>
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
        <EditUserForm
          show={showEditModal}
          onHide={handleEditModalClose}
          // Pasa las variables necesarias a EditBookForm
          name={name}
          email={email}
          id={id}
          address={address}
          phone_number={phone_number}
          updateComponent= {updateComponent}
        />
        </Card>
    );
}

export default UserCard;
