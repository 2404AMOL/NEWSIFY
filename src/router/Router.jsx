import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // This includes both JS and Popper.js
import './Router.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import img from '../assets/images/10.png';
import Home from '../pages/Home';
import Trending from '../pages/Trending';
import Apple from '../pages/Apple';
import Tesla from '../pages/Tesla';
import Business from '../pages/Business';
import Tech from '../pages/Tech';
import Wallstreet from '../pages/Wallstreet';
import Sports from '../pages/Sports';
import Food from '../pages/Food';
import Fashion from '../pages/Fashion'
import Politics from '../pages/Politics'




function RouterPages() {
  return (
    <Router>
      <>
        <Navbar expand="lg" bg="light" className="Navbar">
          <Container fluid>
            <Navbar.Brand href="#">
              <Image src={img} rounded style={{ width: "90%", height: "100px" }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="d-flex justify-content-center me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link className="NavItems" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="NavItems" as={Link} to="/news/trending">Trending</Nav.Link>
                
                {/* Fast News Dropdown should be inside Navbar.Collapse */}
                <NavDropdown className="NavDropDown" title="Fast News" id="navbarScrollingDropdown">
                  <NavDropdown.Item className="NavDropDownItems" as={Link} to="/news/apple">Apple</NavDropdown.Item>
                  <NavDropdown.Item className="NavDropDownItems" as={Link} to="/news/tesla">Tesla</NavDropdown.Item>
                  <NavDropdown.Item className="NavDropDownItems" as={Link} to="/news/business">Business</NavDropdown.Item>
                  <NavDropdown.Item className="NavDropDownItems" as={Link} to="/news/tech">Tech</NavDropdown.Item>
                  <NavDropdown.Item className="NavDropDownItems" as={Link} to="/news/wallstreet">Wallstreet</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link as={Link} className="NavItems" to="/news/sports">Sports</Nav.Link>
                <Nav.Link as={Link} className="NavItems" to="/news/food">Food</Nav.Link>
                <Nav.Link as={Link} className="NavItems" to="/news/fashion">Fashion</Nav.Link>
                <Nav.Link as={Link} className="NavItems" to="/news/politics">Politics</Nav.Link>
              </Nav>

              {/* Search Form */}
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className="btn btn-primary">Search</Button>
              </Form> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/trending" element={<Trending />} />
          <Route path="/news/apple" element={<Apple />} />
          <Route path="/news/tesla" element={<Tesla />} />
          <Route path="/news/business" element={<Business />} />
          <Route path="/news/tech" element={<Tech />} />
          <Route path="/news/wallstreet" element={<Wallstreet />} />
          <Route path="/news/sports" element={<Sports />} />
          <Route path="/news/food" element={<Food />} />
          <Route path="/news/fashion" element={<Fashion />} />
          <Route path="/news/politics" element={<Politics />} />
        </Routes>
      </>
    </Router>
  );
}

export default RouterPages;
