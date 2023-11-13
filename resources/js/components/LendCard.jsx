import { useState, useEffect } from "react";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditUserForm from "./EditUserForm";

function LendCard(props) {
    const id_user = props.id_user
    const lend_date = props.lend_date
    const expected_return_date = props.expected_return_date
    const id = props.id
    const lend_state= props.lend_state
    const id_rol = sessionStorage.getItem("id_rol");
    

    const handleUpdate = () => {
        const updatedLend = {
            id: id,
            id_user: id_user,
            lend_date: lend_date,
            expected_return_date: expected_return_date,
            lend_state: 'Delivered'
          };

        axios.post("http://localhost/Proyecto_biblioteca/public/api/lend_update", 
        updatedLend,
        {headers: {'Content-Type': 'multipart/form-data',
        'Accept':'application/json'}}
        ).then(response => {
          console.log('response');
          console.log(response);
          window.location.reload();
      }).catch(error =>{
          console.log(error);
      });
        };

    

    return (
        <Card className="text-center"style={{width: '18rem', margin: '10px' }}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <Card.Subtitle>Lend Number: {id}</Card.Subtitle>
                <hr/>
                <Card.Text>Id User: {id_user} <br/>
                Date Lend: {lend_date}<br/>
                Expected Return Date: {expected_return_date}<br/>
                State: {lend_state}<br/>
                </Card.Text>
                {/*<Button variant="primary">Go Somewhere</Button>*/}
            </Card.Body>
      {id_rol === "1" && (    
        <>
          <Button variant="primary" onClick={handleUpdate}>Delivered</Button>
        </>
      )}
        </Card>
    );
}

export default LendCard;
