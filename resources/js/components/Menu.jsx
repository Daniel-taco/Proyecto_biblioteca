import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useNavigate} from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';


function Menu() {
  const id_rol = sessionStorage.getItem("id_rol");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/Proyecto_biblioteca/public/login');
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/Proyecto_biblioteca/public/">BiblioTec</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">Home</Nav.Link>
            <Nav.Link as={Link} to="ListCards">Books</Nav.Link>
            <Nav.Link as={Link} to="UserLends">Lends</Nav.Link>
            {id_rol === '1' && (
            <>
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