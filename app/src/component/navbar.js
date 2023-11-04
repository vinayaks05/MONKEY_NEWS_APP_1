import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
function Navigation() {
  const storedItems = window.localStorage.getItem("userInfo");
  const [userInfo, setUserInfo] = React.useState(storedItems)
  React.useEffect(()=>{
    localStorage.setItem("userInfo", userInfo)
  }, [userInfo])
  console.log("LocalDATAIN NAV", (window.localStorage.getItem("userInfo")))
  
  const history = useNavigate()
  function logout(){
    localStorage.clear();
    history('/home')
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={'/home'}>News</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/home'} >Home</Nav.Link>
            <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
            <Nav.Link as={Link} to={'/signup'}>SignUp</Nav.Link>
            <Nav.Link as={Link} to={'/saved'}>Saved</Nav.Link>
            {localStorage.getItem("userInfo")?
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;