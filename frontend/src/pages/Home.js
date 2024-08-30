import Container from 'react-bootstrap/Container';
import {Link} from "react-router-dom";
const Home = () => {
    return (
    <>
  
        <Container>
        <h1></h1>
        <h2> This is the website for the Saffron Walden Book Club</h2>
       <p>For information about future and past meetings please see: <Link to="/meetings">Meetings</Link>
        </p> 
        
        <p> For the books in the reading list see: <Link to="/books">Books</Link> </p>
        </Container>
    
    
    </>
)}
export default Home;