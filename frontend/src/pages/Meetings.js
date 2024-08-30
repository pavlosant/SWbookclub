import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import AddMeeting from './AddMeeting';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";

function MeetingDisplay({meetings, title}){
    // sort meetings by most recent top 
    console.log(meetings)
    const meetings_sorted=meetings.sort((a,b) => new Date(b.meeting_date) - new Date(a.meeting_date))
    console.log("meetings sorted"+meetings_sorted)
    
    return (
        <>
        <h1 class="text-primary">{title}</h1>
        <Table striped> 
        <thead>
        <tr>
          <th>Date</th>
          <th>Location</th>
          <th>Host</th>
          <th>Book for Discussion</th>
          <th>Next to choose book</th>
        </tr>
        
      </thead>
      <tbody>
      { meetings_sorted.map( (meeting) => (
            
            <tr>
                <td key={meeting.id}>   {meeting.meeting_date} </td>
                <td key={meeting.id}>   {meeting.location} </td>
                <td key={meeting.id}>   {meeting.host_name} </td>
                <td key={meeting.id}>   <Link to={`/books/${meeting.book}`}>{meeting.book_name} </Link>  </td>
                <td key={meeting.id}>   {meeting.chooser_name} </td>
            </tr>
            
     )
 )  }
       
          </tbody>
        </Table>
        
     </>  
      )
}

const Meetings = () => {
    const navigate = useNavigate();
    let baseURL= "http://localhost:8000"   
    const [meetings, setMeetings] = useState([]);
    const [books,setBooks]=useState([])
    useEffect(()=> {
        getMeetings()
    },[])
 
function handleClick(){
        navigate("/meetings/add")

    }

function getMeetings(){
    const today = new Date().toISOString().split('T')[0];
    axios({
        method:"GET",
        url:"http://localhost:8000/meetings/"
    }).then((response) =>{
       
        const meetings =response.data
         setMeetings(meetings)
         console.log(meetings)
   
    }).catch((error)=> {
        if (error.response){
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }

    )
    
    axios({
        method:"GET",
        url:"http://localhost:8000/books/"
    }).then((response) =>{
       
        const books =response.data
         setBooks(books)
         console.log(books)
   
    }).catch((error)=> {
        if (error.response){
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }

    )
    

      }

    return (
  
    <>
    <Container>
        <Container>
    <Button
         variant="primary"
         onClick={handleClick}
       >
         Plan a new book club meeting 
       </Button>
       </Container>

    <Container>
    <MeetingDisplay meetings={meetings.filter((x) => x.meeting_date >= new Date().toISOString().split('T')[0] )} title="Future meetings"  />
   <MeetingDisplay meetings={(meetings.filter((x) => x.meeting_date < new Date().toISOString().split('T')[0]))} title="Past meetings" />

    </Container>
 
    </Container>
   
    
    </>
)}
export default Meetings;