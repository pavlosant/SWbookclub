import AddBook from "./AddBook";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom";
import styles from "../App.css";
const api = axios.create({
    baseURL: "http://localhost:8080"
  });


const Books = () => {
    const [showForm, setshowForm] = useState(false);
    const [books, setBooks] = useState([])
    const baseURL= "http://localhost:8000"
    
    useEffect(() => {
        const fetchData = async () =>{
          
          try {
            const {data: response} = await axios.get(baseURL+"/books/");
            setBooks(response);
          } catch (error) {
            console.error(error.message);
          }

        }
    
        fetchData();
      }, []);

    const showForms = () => {
       setshowForm(!showForm)
   }
   
       
       return (
       <>

       <Container>
       <h1>Books in BookClub List</h1>
       <br />
       <Button
         variant="primary"
         onClick={showForms}
       >
         Add book to the book club list
       </Button>
       { showForm && <AddBook showForm/> }
       </Container>
       <br />
       <br />
       <Container>
       <Row xs={2} md={3} className="g-4">
         { books.map( (book) => (  
      <Cardcomp key={book.id} book={book} />
    
    ))}
      </Row>
      </Container>
     


    </>
)}

const Cardcomp = ({book}) => {
  let meeting="sdad"
    const styles = {
        card: {
          backgroundColor: '#B7E0F2',
          borderRadius: 55,
          padding: '2rem'
        },
        cardImage: {
          objectFit: 'cover',
          borderRadius: 55
        }
     
      }
      
      

 return (
  

  
        <Col key={book.id}>
<Card  border="light" style={{width:'18rem'}} key={book.id}>
     <Card.Img variant="top" src= {book.cover} optional="true" style={styles.cardImage} />
     <Card.Body>
       <Card.Title>{book.title}</Card.Title>
       <Card.Subtitle>{book.author}</Card.Subtitle>
       <Accordion  >
        <Accordion.Header> Read Description</Accordion.Header>
        <Accordion.Body>
        <Card.Text variant="success">
         {book.description}
       </Card.Text>
        </Accordion.Body>
       </Accordion>
       <Card.Subtitle> {book.book_discussed}</Card.Subtitle>
     </Card.Body>
     </Card>
     </Col>
   
    )
};

export default Books;