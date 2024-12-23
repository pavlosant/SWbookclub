import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';

const api = axios.create({
    baseURL: "http://localhost:8000"
});

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const handleChange = (event) => setSearchTerm(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
            .then(response => setBooks(response.data.items))
            .catch(error => console.error(error));
    }

    return (
        <>
            <h2>Search for book:</h2>
            <input 
                type='text'
                value={searchTerm}
                onChange={handleChange}
                placeholder='Search'
            />
            <Button onClick={handleSubmit} type="submit" variant="primary">Search</Button>
            {books.length > 0 && <BookAPI books={books} />}
        </>
    );
}

function BookAPI({ books }) {
    const token = localStorage.getItem('access_token');

    const onClick = async (book) => {
        try {
            await axios.post("http://localhost:8000/books/", {
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors[0],
                description: book.volumeInfo.description,
                cover: book.volumeInfo.imageLinks.thumbnail,
                bookclub: "Saffron Walden Book Club",
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            });
            // Reload the page to show updated books
            window.location.reload();
        } catch (error) {
            console.error("Failed to add book:", error);
        }
    }

    return (
        <Container>
            <div className='Book-results'>
                <Row lg={3}>
                    {books.filter(book => book.volumeInfo && book.volumeInfo.imageLinks?.thumbnail && book.volumeInfo.authors && book.volumeInfo.title && book.volumeInfo.description).map(book => (
                        <Card border="primary" style={{ width: '18rem' }} key={book.id}>
                            <Card.Img variant="top" src={book.volumeInfo.imageLinks.thumbnail} />
                            <Card.Body>
                                <Card.Title>{book.volumeInfo.title}</Card.Title>
                                <Card.Subtitle>{book.volumeInfo.authors[0]}</Card.Subtitle>
                                <Card.Text>{book.volumeInfo.description}</Card.Text>
                                <Button variant="primary" onClick={() => onClick(book)}>Select this book</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

const AddBook = ({ showForm }) => (
    <Container>{showForm && <Search />}</Container>
);

export default AddBook;
