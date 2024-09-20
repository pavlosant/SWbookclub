import React from 'react'
import Container from 'react-bootstrap/Container';

const LoginPage = () => {

    let loginUser = (e) => {
        e.preventDefault()
    }

    return (
        <Container>

     
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="password" name="password" placeholder="enter password"/>
                <input type="submit"/>
            </form>
        </div>
        </Container>
    )
}

export default LoginPage