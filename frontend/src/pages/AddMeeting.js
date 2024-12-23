import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

import { useState, useEffect } from 'react';
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function AddMeeting(){
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const [chooserId, setChooserId] =useState('')
    const [hostId, setHostId]=useState('')
    const [bookId, setBookId]=useState('')
    const baseURL= "http://localhost:8000"
    useEffect(() => {
        const fetchData = async () =>{
          
          try {
            const {data: response} = await axios.get(baseURL+"/books/",{
              headers: {
                'Authorization': `Bearer ${token}`,
            },
            });
            setBooks(response);
          } catch (error) {
            console.error(error.message);
          }
          try {
            const {data:response} = await axios.get(baseURL+"/users/",{
              headers: {
                'Authorization': `Bearer ${token}`,
            },
            })
            setUsers(response);
         
          }
          
          catch (error) {
            console.error(error.message);
          }
        }
    
        fetchData();
      }, []);



    const [formData, setFormData] = useState({
        meeting_date: '',
        location: '',
        book:'',
        host: '',
        chooser:'',
      });

      

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    axios({
        method: "POST",
        url:"http://localhost:8000/meetings/",
        redirect:"follow",
        params:{
         
        },
        data:{
          meeting_date: formData.meeting_date,
          location: formData.location,
          host:hostId,
          book:bookId,
          chooser: chooserId,
         },  headers: {
          'Authorization': `Bearer ${token}`,
          "Content-type": "application/json"
        }
        })
    
        navigate("/meetings")
  };
   
         
    
    return (
        <>
        <Container className="small-form-container"> 
        <h1>Create New Meeting</h1>
        
        <Form>


      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Date of Meeting</Form.Label>
        <Form.Control name="meeting_date" value={formData.meeting_date}  onChange={handleChange} type="date" placeholder="Date of meeting" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control value={formData.location} name="location" type="text" placeholder="Location" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBook">
        <Form.Label>Book to discuss: </Form.Label>
        <Form.Select value={bookId} name="book" aria-label="Default select example" onChange={(e) => setBookId(e.target.value)}>
        <option>Not yet decided</option>
        { books.map( (book) => (  
      <option key={book.id} value={book.id} >{book.title} by {book.author}</option>
        ))}
    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHost">
        <Form.Label>Host: </Form.Label>
        <Form.Select value={hostId} name="host" aria-label="Default select example" onChange={(e) => setHostId(e.target.value)}>
        <option>Not yet decided</option>
        { users.map( (user) => (  
      <option key={user.id} value={user.id}>{user.username}</option>
        ))}
    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBookChooser">
        <Form.Label>Book Chooser: </Form.Label>
        <Form.Select value={chooserId} name="chooser" aria-label="Default select example" onChange={(e) => setChooserId(e.target.value)}  >
        <option>Not yet decided</option>
        { users.map( (user) => (  
      <option key={user.id} value={user.id} >{user.username}</option>
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