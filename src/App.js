import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EB1 from './EB1';
import EB2 from './EB2';
import EB3 from './EB3';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Component } from 'react';
class App extends Component {
 render(){
  return (
    <BrowserRouter>
    
    <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">EB1</Nav.Link>
            <Nav.Link href="/eb2">EB2</Nav.Link>
            <Nav.Link href="/eb3">EB3</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
   <Routes>
    <Route  path='/' exact element={<EB1/>}/> 
    <Route  path='/eb2' exact element={<EB2/>}/> 
    <Route  path='/eb3' exact element={<EB3/>}/> 

    </Routes>
    </BrowserRouter>

  );}
}

export default App;
