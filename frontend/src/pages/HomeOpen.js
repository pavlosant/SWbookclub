import Container from 'react-bootstrap/Container';
import {Link} from "react-router-dom";
import bookClubImage from "../assets/book_club_image.jpeg";
const HomeOpen = () => {
    return (
    <>
  
        <Container className='hero'>
        <h1></h1>
        <h2> Welcome to the Saffron Walden Book Club website. </h2>
       
       <p>We are a friendly group of book lovers meeting every few weeks to discuss a book 
        chosed by one of our members. </p> 
        <p>We usually prefer fiction books, both modern and classics.  </p> 
        <p> If you are a member please  <a href="/login"> Login</a> to view information on the books and meetings of the club.</p>
        <img 
                    src={bookClubImage} 
                    alt="Book Club" 
                    style={{ width: '100%', height: 'auto', maxWidth: '800px', margin: '0 auto', display: 'block' }} 
                />
        <p> If you are interested in becoming a member of the book club please register and you will be contacted to confirm registration. 
         </p>
        
        </Container>
    
    
    </>
)}
export default HomeOpen;