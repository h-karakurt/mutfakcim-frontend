import styled from 'styled-components'
import {NavLink} from "react-router-dom";
import Logo from '../../assets/images/Logo.png'
import { Offcanvas, Button } from "react-bootstrap"
import { useState } from "react";
import Swal from 'sweetalert2'
import {Nav} from "react-bootstrap"

var axios = require('axios');


const SideContainer = styled.div`
    background-color: #ffffff;
    height: 100%;
    img.logo{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        display: block;
        padding-top: 10px;
    }
    .mobile{
        display: none;
        align-items: center;
        justify-content: space-between;
        
        & > span{
            margin-left: 10px;
        }
        
        .username{
            color: black;
            span{
                font-weight: bold;
            }
        }
        
        .logout{
        font-weight: bold;
        color: #000;
        }
        
    }

    @media screen and (max-width: 1400px) {
    
    }
    @media screen and (max-width: 1200px) {
        
    }
    @media screen and (max-width: 992px) {
        .mobile{
            display: flex;
        }
        .desktop{
            display: none;
        }
        height: auto;

    }
    @media screen and (max-width: 768px) {
        
    }
    @media screen and (max-width: 576px) {
        
    }
`
const List = styled.ul`
    list-style: none;
    padding: 1px;
`
const ListElement = styled.li`
    font-weight: bold;
    border-bottom: 1px solid #14a4842a;

    &:hover{
        background-color: #14a484;
        transition: .2s;
    }
    transition: .2s;

    .bottom{
        
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

const Link1 = styled(NavLink)`
    text-decoration: none;
    color: black;
    height: 100%;
    width: 100%;
    display: block;
    padding: 10px;
    ${ListElement}:hover & {
        color: white;
        transition: .2s;

    }
    transition: .2s;
    i{
        margin-right: 20px;
    }
    
`

export default function Sidebar(props){
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    return(
        <SideContainer>
            <div className="desktop">
                <img className='logo' src={Logo} alt="Logo" />
                <List>
                    <ListElement ><Link1 to="/shop"><i className="fa-solid fa-basket-shopping fa-lg"></i>Alışveriş</Link1></ListElement>
                    <ListElement ><Link1 to="/inventory"><i className="fa-regular fa-snowflake fa-lg"></i>Sanal Buzdolabı</Link1></ListElement>
                    <ListElement><Link1 to="/recipes"><i className="fa-solid fa-bread-slice fa-lg"></i>Tarifler</Link1></ListElement>
                    <ListElement><Link1 to="/stats"><i className="fa-solid fa-chart-line fa-lg"></i>İstatistikler</Link1></ListElement>
                    {/* <ListElement><Link1 className='bottom' to="/options"><i className="fa-solid fa-gear"></i>Ayarlar</Link1></ListElement> */}

                </List>
            </div>
        
            <div className='mobile'>
                <span onClick={handleShow}>
                    <i className="fa-solid fa-bars fa-2x"></i>
                </span>
                
                <Nav>
                    <Nav.Link className="username">Merhaba <span>{props.userName}👋</span></Nav.Link>
                    <Nav.Link onClick={logOut} className="logout"><i className="fa-solid fa-door-open"></i> Çıkış</Nav.Link>
                </Nav>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <img className='logo' src={Logo} alt="Logo" />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <List>
                            <ListElement ><Link1 to="/shop"><i className="fa-solid fa-basket-shopping"></i>Alışveriş</Link1></ListElement>
                            <ListElement ><Link1 to="/inventory"><i className="fa-regular fa-snowflake"></i>Sanal Buzdolabı</Link1></ListElement>
                            <ListElement><Link1 to="/recipes"><i className="fa-solid fa-bread-slice"></i>Tarifler</Link1></ListElement>
                            <ListElement><Link1 to="/stats"><i className="fa-solid fa-chart-line"></i>İstatistikler</Link1></ListElement>
                            {/* <ListElement><Link1 className='bottom' to="/options"><i className="fa-solid fa-gear"></i>Ayarlar</Link1></ListElement> */}

                        </List>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        
        </SideContainer>

        
    );
}
