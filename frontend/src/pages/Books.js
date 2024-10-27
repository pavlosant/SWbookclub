import AddBook from "./AddBook";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom";
import "../App.css";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

const Books = () => {
    const token = localStorage.getItem('access_token');
    const [showForm, setshowForm] = useState(false);
    const [books, setBooks] = useState([]);
    const baseURL = "http://localhost:8000";
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(baseURL + "/books/", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setBooks(response);
            } catch (error) {
                console.error(error.message);
            }
        };
    
        fetchData();
    }, []);

    const showForms = () => {
        setshowForm(!showForm);
    };
   
    return (
        <>
            <Container>  
                <h1>Books in BookClub List</h1>
                <br />
                <Button variant="primary" onClick={showForms}>
                    Add book to the book club list
                </Button>
                {showForm && <AddBook showForm />}
            </Container>
            <br />
            <br />
            <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {books.map((book) => (
                        <CardComp key={book.id} book={book} />
                    ))}
                </Row>
            </Container>
        </>
    );
};

const CardComp = ({ book }) => {
    const styles = {
        card: {
            backgroundColor: '#d5a6bd',
            borderRadius: '15px',
            padding: '1rem',
        },
        cardImage: {
            objectFit: 'cover',
            borderRadius: '15px',
            height: '250px',
        },
    };

    return (
        <Col key={book.id}>
            <Card border="light" style={styles.card} className="h-100 shadow-sm">
                <Link to={`/books/${book.id}`}>
                    <Card.Img variant="top" src={book.cover} style={styles.cardImage} />
                </Link>
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle>{book.author}</Card.Subtitle>
                    <Accordion>
                        <Accordion.Header>Read Description</Accordion.Header>
                        <Accordion.Body>
                            <Card.Text>{book.description}</Card.Text>
                        </Accordion.Body>
                    </Accordion>
                    <Card.Subtitle className="mt-2">{book.book_discussed}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Books;
