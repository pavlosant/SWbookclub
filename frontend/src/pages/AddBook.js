import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {  Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';

const api = axios.create({
    baseURL: "https://localhost:8080"
  });


function Search(){
    

    const [searchTerm, setSearchTerm] = useState('');
    const [showAPI, setshowAPI] = useState(false);
    const [books, setBooks] = useState([]);
    

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        //event.preventDefault();
        console.log(searchTerm)
        axios.request({
            method: 'get',
            url: 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm
          }).then((response) => {
            console.log(response.data.items)
            setBooks(response.data.items)
          }).catch((error) => {
            console.log(error);
          });
      }
  

    return (


        <>
        <h2>Search for book:</h2>

        <input 
        type='text'
        value={searchTerm}
        onChange= {handleChange}
        placeholder='Search'
        />
        <Button onClick={handleSubmit} type="submit" variant="primary" >Search</Button>
        {books ? <BookAPI books={books} /> : " "}
        </>
    )
}
  
function BookAPI  ({books}) {
    if (!books) {return null;}
    const onClick = (book) => {
       
         axios({
           method: "POST",
           url:"http://localhost:8000/books/",
           redirect:"follow",
           params:{
            id:book.id
           },
           data:{
             title: book.volumeInfo.title,
             author: book.volumeInfo.authors[0],
             description:book.volumeInfo.description,
             cover:book.volumeInfo.imageLinks.thumbnail,
             bookclub: "Saffron Walden Book Club",
            },  headers: {
             "Authorization": "AUTHORIZATION_KEY",
             "Content-type": "application/json"
           }
           })
          
          const all_books = axios.get("http://localhost:8000/books/")
          window.location.href="./books"
        }
    
    return (
        <>
        <div className='header'>
    <br></br>
    </div>
   
      <Container>
      <div className='Book-results'>
      <Row lg={3}> 
    { books.filter(
        book => {
            return book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && book.volumeInfo.authors && book.volumeInfo.authors[0] && book.volumeInfo.title && book.volumeInfo.description
        }
    ).map( (book) => (  
      <Card border ="primary" style={{ width: '18rem' }} key={book.id}>
      <Card.Img variant="top" src= {book.volumeInfo.imageLinks.thumbnail} optional="true" />
      <Card.Body>
        <Card.Title>{book.volumeInfo.title}</Card.Title>
        <Card.Subtitle>{book.volumeInfo.authors[0]}</Card.Subtitle>
        <Card.Text>
          {book.volumeInfo.description}
        </Card.Text>
        <Button variant="primary" onClick={() => onClick( book)}>Select this book</Button>
      </Card.Body>
      </Card>
   
    ))}
</Row>
    
    </div>
       
      </Container>
    
        </>

    )
}

const AddBook = ({showForm}) => {

    
    return (
    <>
    <Container>
   
    
    { showForm && <Search /> }
    </Container>
    
  
    

    </>
)}
export default AddBook;