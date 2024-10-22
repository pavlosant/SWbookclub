import axios from 'axios';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            
            const { access, refresh } = response.data;

            // Store tokens in localStorage
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            
            // Now you can use the access token in future API requests
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Container> 
        <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        </Container>
    );
};

export default Login;
