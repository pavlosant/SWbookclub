import Container from 'react-bootstrap/Container';
import {Link} from "react-router-dom";
const HomeOpen = () => {
    return (
    <>
  
        <Container>
        <h1></h1>
        <h2> This is the website for the Saffron Walden Book Club</h2>
        
       <p>We are a friendly group of book lovers meeting once every 6-8 weeks to discuss a book 
        chosed by one of our group. The books are usually fiction and range from classics to modern, 
        scifi to love stories. </p> 
        <p> If you are a member please  <a href="/login"> Login</a> to view information on the books and meetings of the club.</p>
        <p> If you are interested in becoming a member of the book club please contact one of the book club members. </p>
        </Container>
    
    
    </>
)}
export default HomeOpen;