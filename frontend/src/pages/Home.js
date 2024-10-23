import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
// Use named import for jwtDecode
import { jwtDecode } from 'jwt-decode'; 

const Home = () => {
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        // Get the token from localStorage
        const token = localStorage.getItem('access_token');

        if (token) {
            // Decode the JWT token to extract the username
            const decodedToken = jwtDecode(token);
            const username = decodedToken.username || decodedToken.user; // Adjust this according to your token structure
            setUsername(username);
        }
    }, []);
    
    return (
    <>
        <Container>
        {username ? (
            <h1>Welcome, {username}! </h1>
        ) : (
            <h1>Welcome!</h1>
        )}
        <h2>Welcome to the Saffron Walden Book Club</h2>
        <p>
            For information about future and past meetings please see: <Link to="/meetings">Meetings</Link>
        </p> 
        <p>
            For the books in the reading list see: <Link to="/books">Books</Link>
        </p>
        </Container>
    </>
    );
};

export default Home;
