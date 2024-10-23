import { Outlet, Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

const Layout = () => {
    const navigate = useNavigate();
    
    // Check if user is logged in (e.g., if token exists in localStorage)
    const isLoggedIn = !!localStorage.getItem('access_token');
    
    // Handle logout by removing token and redirecting to login page
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token'); // Optional: remove refresh token
        navigate('/login');
    };
    
    return (
        <>
            <br />
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* Conditionally render Login or Logout based on authentication status */}
                            {!isLoggedIn ? (
                              <>
                              <Navbar.Brand href="/home_not_logged_in">Saffron Walden Book Club</Navbar.Brand>
                                <Nav.Link href="/login">Login</Nav.Link>
                           </>
                            ) : (
                              <>
                                <Navbar.Brand href="/home">Saffron Walden Book Club</Navbar.Brand>
                                <Nav.Link href="/books">Books</Nav.Link>
                                <Nav.Link href="/meetings">Meetings</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                </>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Outlet />
        </>
    );
};

export default Layout;
