import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

import { useState, useEffect } from 'react';
import { Form } from "react-bootstrap";
import axios from "axios";
function AddMeeting(){
    const today = new Date().toISOString().split('T')[0];
    console.log(today)
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const baseURL= "http://localhost:8000"
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
        meeting_date: {today},
        location: '',
        book:'',
        host: '',
        book_chooser:'',
      });

      

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios({
        method: "POST",
        url:"http://localhost:8000/meetings/",
        redirect:"follow",
        params:{
         
        },
        data:{
          meeting_date: formData.meeting_date,
          location: formData.location,
          host:formData.host,
          book:formData.book,
          book_choser: formData.book_chooser.id,
         },  headers: {
          "Authorization": "AUTHORIZATION_KEY",
          "Content-type": "application/json"
        }
        })
    // Here, we'll add the code to post the form data using Axios
  };
    //    meeting_date
   // location 
   // host = models.ForeignKey(User, on_delete=models.CASCADE)
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
        <Form.Control name="meeting_date" value={formData.meeting_date}  format="DD-MM-YYYY"   onChange={handleChange} type="date" placeholder="Date of meeting" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control value={formData.location} name="location" type="text" placeholder="Location" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBook">
        <Form.Label>Book to discuss: </Form.Label>
        <Form.Select value={formData.book.key} name="book" aria-label="Default select example" onChange={handleChange}>
        <option>Not yet decided</option>
        { books.map( (book) => (  
      <option key={book.id} >{book.title} by {book.author}</option>
        ))}
    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHost">
        <Form.Label>Host: </Form.Label>
        <Form.Select value={formData.key} name="host" aria-label="Default select example" onChange={handleChange}>
        <option>Not yet decided</option>
        { users.map( (user) => (  
      <option key={user.id} >{user.username}</option>
        ))}
    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBookChooser">
        <Form.Label>Book Chooser: </Form.Label>
        <Form.Select value={formData.key} name="book_chooser" aria-label="Default select example" onChange={handleChange}  >
        <option>Not yet decided</option>
        { users.map( (user) => (  
      <option key={user.id} >{user.username}</option>
        ))}
    </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
       
        </Container>
        
        </>
    )
}

export default AddMeeting