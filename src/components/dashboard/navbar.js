import { Navbar, Container, Nav } from "react-bootstrap"
import "../../assets/style/custom-styles.scss"
import styled from 'styled-components'
import Swal from 'sweetalert2'

var axios = require('axios');

export default function NNavbar(props) {

  const NavbarCustom = styled(Navbar)`
    background-color: #ffffff;
    .username{
      color: black;
      margin-right: 20px;
      span{
        font-weight: bold;
      }
    }
    .logout{
      font-weight: bold;
    }
    @media screen and (max-width: 1400px) {
      
    }
    @media screen and (max-width: 1200px) {
    
    }
    @media screen and (max-width: 992px) {
      display: none;
    }
    @media screen and (max-width: 768px) {
      
    }
    @media screen and (max-width: 576px) {
      
    }
    
  `
  
  function logOut() {
    axios({
      method: 'POST',
      url: 'https://arcane-fortress-37188.herokuapp.com/api/users/logout',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      Swal.fire({
        title: 'Çıkış Yapılıyor!',
        text: 'Hemen sizi giriş sayfasına yönlendiriyoruz',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      }).then(function () {
        window.location.href = '/auth/login';
      })
    }).catch(function (error) {
    })
  }

  return (
    <>
      <NavbarCustom expand="lg">
        <Container>
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <Nav.Link className="username">Kullanıcı: <span>{props.userName}</span></Nav.Link>
              <Nav.Link onClick={logOut} className="logout"><i className="fa-solid fa-door-open"></i> Çıkış</Nav.Link>
            </Nav>
        </Container>
      </NavbarCustom>
    </>
  );
}