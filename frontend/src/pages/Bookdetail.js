// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams,useSearchParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const bookId = params.bookId
  
    
  const baseURL= "http://localhost:8000"
 
     useEffect(() => {
   
    axios.get(`http://localhost:8000/books/${bookId}/`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
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
   
    <>
   
  
    <Container>

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
    </Container>
    </>
  );
};

export default BookDetail;
