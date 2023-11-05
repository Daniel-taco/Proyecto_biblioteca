import React from "react";
import { Card, Button } from "react-bootstrap";

function Card_C(props) {
    const firstName = props.name
    const email = props.email
    const id = props.id
    const id_rol = props.id_rol
    const address= props.address
    return (
        <Card style={{ width: '18rem' }}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <Card.Title>ID: {id}</Card.Title>
                <Card.Subtitle>Nombre: {firstName}</Card.Subtitle>
                <Card.Text>Email: {email}</Card.Text>
                <Card.Text>Rol: {id_rol}</Card.Text>
                <Card.Text>Direccion: {address}</Card.Text>
                {/*<Button variant="primary">Go Somewhere</Button>*/}
            </Card.Body>
        </Card>
    )
}

export default Card_C;