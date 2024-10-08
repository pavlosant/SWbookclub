import {Outlet, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Layout = () => {
    return (
        <>
        <br></br>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="/">Saffron Walden Book Club</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/books">Books</Nav.Link>
        <Nav.Link href="/meetings">Meetings</Nav.Link>
      {/*   <Nav.Link href="/contact">Contact</Nav.Link>
        <Nav.Link href="/bookclub">BookClub</Nav.Link> */}
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        
        <Outlet />
        </>
    )
}



export default Layout;