import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Meetings from "./pages/Meetings";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import BookClub from "./pages/BookClub";
import MeetingDetail from './pages/MeetingDetail';
import AddMeeting from './pages/AddMeeting';
import BookDetail from './pages/Bookdetail';
export default function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookDetail  /> }/>
        <Route path="meetings" element={<Meetings />} />
        {/* <Route path="bookclub" element={<BookClub />} /> */}
       {/*  <Route path="contact" element={<Contact />} /> */}
        <Route path="/meetings/:meetingId" element={<MeetingDetail />}/>
        <Route path="/meetings/add" element={<AddMeeting />}/>
        <Route path="*" element={<NoPage />} />
        </Route> 
    </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
