import logo from './logo.svg';
import './App.css';
import { Container, Button, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';

const api = axios.create({
  baseURL: "https://localhost:8080"
});

 function LoadBooks() {
  let text="Wolf Hall"
  const [books,setBooks]=useState([])
  function getBooks(){
    axios.request({
      method: 'get',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + text
    }).then((response) => {
      console.log(response.data.items)
      setBooks(response.data.items)
    }).catch((error) => {
      console.log(error);
    });
    
  }
  const [mounted, setMounted] = useState(false)
  if(!mounted){
   getBooks()
  }

  useEffect(() => {
    setMounted(true)
  },[])

  const onClick = (book) => {
   let title=book.volumeInfo.title
   let book_image=book.volumeInfo.imageLinks.thumbnail
   let author=book.volumeInfo.authors[0]
    axios({
      method: "POST",
      url:"http://localhost:8000/api/books/",
      data:{
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        description:book.volumeInfo.description,
       },  headers: {
        "Authorization": "AUTHORIZATION_KEY",
        "Content-type": "application/json"
      }
      })
      
  }
  return (
    <>
   <div className='header'>
    <br></br>
    </div>
    <div className="App">
      <Container>
      <div className='Book-results'>
      <Row lg={3}> 
    { books.map( (book) => (  
      <Card border ="primary" style={{ width: '18rem' }} key={book.id}>
      <Card.Img variant="top" src={book.volumeInfo.imageLinks.thumbnail} />
      <Card.Body>
        <Card.Title>{book.volumeInfo.title}</Card.Title>
        <Card.Subtitle>{book.volumeInfo.authors[0]}</Card.Subtitle>
        <Card.Text>
          {book.volumeInfo.description}
        </Card.Text>
        <Button variant="primary" onClick={() => onClick( book)}>Select this book</Button>
      </Card.Body>
      </Card>
   
    ))},
</Row>
    <h1>{books.length}</h1>
    </div>
       
      </Container>
    
      <div className='Card-row'>
    <BasicExample /> 
    </div>
    </div>
    
    
    </>
    
  );
}

function BasicExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}


