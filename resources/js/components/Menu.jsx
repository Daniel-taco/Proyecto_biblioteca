import Container from 'react-bootstrap/Container';
import React, { useContext } from 'react';
import { MyContext } from "../Context";
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function Menu() {
  const { token, setGlobalToken } = useContext(MyContext);
  const { id, setGlobalId } = useContext(MyContext);
  const { id_rol, setGlobalId_rol } = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post("http://localhost/Proyecto_biblioteca/public/api/logout",
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
      .then((response) => {
        console.log("response");
        console.log(response);
        setGlobalToken(null);
        setGlobalId(null);
        setGlobalId_rol(null);
        navigate({
          pathname: "/Proyecto_biblioteca/public/login",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="">BiblioTec</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">Home</Nav.Link>
            <Nav.Link as={Link} to="ListCards">Books</Nav.Link>
            <Nav.Link as={Link} to="UserLends">Lends</Nav.Link>
            {id_rol == '1' && (
              <>
                <Nav.Link as={Link} to="CategoryList">CategoryList</Nav.Link>
                <Nav.Link as={Link} to="LendList">LendList</Nav.Link>
                <Nav.Link as={Link} to="UserList">Users</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <Button variant="outline-light" as={Link} to="profile">Profile</Button>
          </Nav>
          <Nav>
            <Button variant="outline-light" onClick={handleLogout}>
              Log Out
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <section>
        <Container>
          <Outlet>
          </Outlet>
        </Container>
      </section>
    </>
  );
}

export default Menu;