import React from "react";
import { Card, Button } from "react-bootstrap";

function Card_C(props) {
    const title = props.title
    const author = props.author
    const id = props.id
    const isbn= props.isbn
    const genre = props.genre
    const publication_year= props.publication_year
    const available_copies=props.available_copies
    const id_category=props.id_category
    const editorial= props.editorial
    const edition= props.edition
    return (
        <Card className="text-center"style={{width: '18rem', margin: '10px' }}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <Card.Title>ID: {id}</Card.Title>
                <Card.Subtitle>Title: {title}</Card.Subtitle>
                <Card.Text>Author: {author} <br/>
                ISBN: {isbn}<br/>
                Genre: {genre}<br/>
                Publication Year: {publication_year}<br/>
                Available Copies: {available_copies}<br/>
                Category: {id_category}<br/>
                Editorial: {editorial}<br/>
                Edition: {edition}<br/>
                </Card.Text>
                {/*<Button variant="primary">Go Somewhere</Button>*/}
            </Card.Body>
        </Card>
    );
}

export default Card_C;