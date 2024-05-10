import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Table from 'react-bootstrap/Table';


function MeetingDisplay({meetings, title}){
    // sort meetings by most recent top 
    const meetings_sorted=meetings.sort((a,b) => new Date(b.meeting_date) - new Date(a.meeting_date))
    return (
        <>
        <h1 class="text-primary">{title}</h1>
        <Table striped> 
        <thead>
        <tr>
          <th>Date</th>
          <th>Location</th>
          <th>Host</th>
        </tr>
        
      </thead>
      <tbody>
      { meetings_sorted.map( (meeting) => (
            
            <tr>
                <td key={meeting.id}>   {meeting.meeting_date} </td>
                <td key={meeting.id}>   {meeting.location} </td>
                <td key={meeting.id}>   {meeting.host_name} </td>
            </tr>
              
     )
 )  }
       
          </tbody>
        </Table>
        
     </>  
      )
}

const Meetings = () => {
    
    let baseURL= "http://localhost:8000/api"   
    const [meetings, setMeetings] = useState([]);
    useEffect(()=> {
        getMeetings()
    },[])
 


function getMeetings(){
    const today = new Date().toISOString().split('T')[0];
    axios({
        method:"GET",
        url:baseURL+"/meetings/"
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
    console.log("Today "+today)
    
    const futuremeetings = meetings.filter((x) => x.meeting_date > today );
    const pastmeetings = meetings.filter((x) => x.meeting_date < today );
    console.log(pastmeetings)
      }

    return (
  
    <>
    <Container>
    
    <Container>
    <MeetingDisplay meetings={meetings.filter((x) => x.meeting_date > new Date().toISOString().split('T')[0] )} title="Future meetings"  />
   <MeetingDisplay meetings={(meetings.filter((x) => x.meeting_date < new Date().toISOString().split('T')[0]))} title="Past meetings" />

    </Container>
 
    </Container>
   
    
    </>
)}
export default Meetings;