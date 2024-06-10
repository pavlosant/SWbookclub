import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

import { useState, useEffect } from 'react';
import { Form } from "react-bootstrap";
import axios from "axios";
function AddMeeting(){
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const baseURL= "http://localhost:8000/api"
    useEffect(() => {
        const fetchData = async () =>{
          
          try {
            const {data: response} = await axios.get(baseURL+"/books/");
            setBooks(response);
          } catch (error) {
            console.error(error.message);
          }
          try {
            const {data:response} = await axios.get(baseURL+"/users/")
            setUsers(response);
          }
          catch (error) {
            console.error(error.message);
          }
        }
    
        fetchData();
      }, []);



    const [formData, setFormData] = useState({
        location: '',
        host_name: '',
        meeting_date: '',
      });

      

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, we'll add the code to post the form data using Axios
  };
    //    meeting_date
   // location 
   // host = models.ForeignKey(User, on_delete=models.CASCADE)
   // book_club = models.ForeignKey(BookClub, on_delete=models.CASCADE)
   // book_chooser = models.ForeignKey(
// all_books
    // host_name
    return (
        <>
        <Container>
        <h1>Create New Meeting</h1>
        
        <Form>


      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Date of Meeting</Form.Label>
        <Form.Control  value={formData.name}  onChange={handleChange} type="date" placeholder="Date of meeting" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="Location" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBook">
        <Form.Label>Book to discuss: </Form.Label>
        <Form.Select aria-label="Default select example">
        <option>Not yet decided</option>
        { books.map( (book) => (  
      <option key={book.id} >{book.title} by {book.author}</option>
        ))}
    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHost">
        <Form.Label>Host: </Form.Label>
        <Form.Select aria-label="Default select example">
        <option>Not yet decided</option>
        { users.map( (user) => (  
      <option key={user.id} >{user.username}</option>
        ))}
    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBookChooser">
        <Form.Label>Book Chooser: </Form.Label>
        <Form.Select aria-label="Default select example">
        <option>Not yet decided</option>
        { users.map( (user) => (  
      <option key={user.id} >{user.username}</option>
        ))}
    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
       
        </Container>
        
        </>
    )
}

export default AddMeeting