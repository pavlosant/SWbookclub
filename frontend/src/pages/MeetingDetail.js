import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container';

function MeetingDetail({meeting}){
    const {meetingID} = useParams()
    return (
        <>
        <Container>
        <h1>Meeting Details</h1>
        </Container>
        
        </>
    )
}

export default MeetingDetail