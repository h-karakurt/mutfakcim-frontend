import { Col, Row, Form, Button, Offcanvas} from "react-bootstrap"
import styled from "styled-components";
import Logo from "../assets/images/Logo.svg"
import Typewriter from "typewriter-effect";
import "../assets/style/Landing.scss"
import { useState } from "react";

var axios = require("axios");

const green = '#76B852';

const Background = styled.div`
    background-color: #FCFFE7;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`

const Navbar = styled.nav`
    .desktop{
        z-index: 999;
        display: flex;
        position: sticky;
        top: 0;
        justify-content: space-between;
        padding: 10px 50px;
        
        .right{
            width: 40%;
            @media screen and (max-width: 992px) {
                width: 70%;
            }
        }

        ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            list-style-type: none;
            height: 100%;
            
            li{
                a{
                    color: black;
                    text-decoration: none;
                    font-weight: light;
                    transition: .3s;

                }
            }
        }
    }
    
    .mobile{
        display: none;
        span{
            margin-left: 10px;
        }
    }

    @media screen and (max-width: 768px) {
        .desktop{
            display: none;
        }
        .mobile{
            display: block;
        }
    }

    
`

const Wrapper = styled.div` 
    
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    
    .main-banner{
        width: 50%;
        position: absolute;
        bottom: 200px;
        z-index: 999;
        h1{
            margin-bottom: 40px;
            .emphasis-green{
                color: ${green};
                font-weight: lighter;
            }
            .emphasis-black{
                color:  #000;
                font-weight: bold;
            }
        }
        p{
            margin-top: 20px;
        }
        small{
            font-size: 18px;
        }
        .buttons{
            display: flex;
            flex-direction: column;
        }
       
    }
    @media screen and (max-width: 768px) {
        width: 100%;

        .main-banner{
            width: 80%;
            margin-left: 20px;
            bottom: 200px;

            h3{
                font-size: 20px;
            }

            p{
                font-size: 15px;
            }

            small{
                font-size: 14px;
            }
        }
    }
`

const OffSwitch = styled(Form)`
    position: fixed;
    bottom: 0;
    right: 10px;
    font-weight: bold;
`

const StyledOffcanvas = styled(Offcanvas)`
    background-color: #FCFFE7;
    width: 90vw;
    ul{
        list-style-type: none;
        li{
            margin-bottom: 30px;
        }
    }
    
    a{
        text-decoration: none;
        color: black;
    }
`

const FloatingSvg = () => {
    return(
        <div className="wrap">
            <span className="svg">
            🍗  
            </span>
            <span className="svg">
            🥥  
            </span>
            <span className="svg">
            🧁
            </span>
            <span className="svg">
            🥕  
            </span>
            <span className="svg">
            🥝  
            </span>
            <span className="svg">
            🍏  
            </span>
            <span className="svg">
            🍉  
            </span>
            <span className="svg">
            🍌  
            </span>
            <span className="svg">
            🥩  
            </span>
            <span className="svg">
            🍔
            </span>
        </div>
    );
}

//get username
const LoginButtonHandler = () => {
    axios({
        method: "GET",
        url: "http://localhost:3051/api/users/auth",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
    .then(() => {
        {window.location.href = "/shop"}
    })
      .catch(function () {
        {window.location.href = "/auth/login"}
    });
} 

export default function Landing() {

    document.body.style.overflow = "hidden"
    
    //offcanvas
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //raining food
    const [food , setFood] = useState(true);

    return (
        <Background>
            {food === true ? <FloatingSvg/> : null}
            <OffSwitch>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label={food === true ? "Yemek Görmek İstemiyorum!" : "😔"}
                    onChange={()=>{food === true ? setFood(false) : setFood(true)}  }
                />
            </OffSwitch>
            
            <Navbar>
                <div className="desktop">
                    <div className="left">
                        <img src={Logo} alt='Logo'/>
                    </div>
                    <div className="right">
                        <ul>
                            <li><a href="#">Muftakçım Nedir? 🙋</a></li>
                            <li><a href="/auth/login">Giriş Yap🛒</a></li>
                            <li><a href="/auth/register">Kayıt Ol✨</a></li>
                        </ul>
                    </div>
                </div>

                <div className='mobile'>
                    <span onClick={handleShow}>
                        <i className="fa-solid fa-bars fa-2x"></i>
                    </span>
                
                    <StyledOffcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>
                                <img className='logo' src={Logo} alt="Logo" />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul>
                                <li><a href="#">Muftakçım Nedir? 🙋</a></li>
                                <li><a href="/auth/login">Giriş Yap🛒</a></li>
                                <li><a href="/auth/register">Kayıt Ol✨</a></li>
                            </ul>
                        </Offcanvas.Body>
                    </StyledOffcanvas>
                </div>
            </Navbar>

            <Wrapper>
                <div className="main-banner">
                    <h1>
                        <span className="emphasis-black">Mutfak</span><span className="emphasis-green">çım</span><small> ile</small>
                    </h1> 
                    
                    <h3>
                        <Typewriter
                        options={{
                            loop: true,
                            wrapperClassName: "typewriter",
                            delay: 70,
                        }}
                        onInit={(typewriter)=> {
                        
                        typewriter
                        .typeString("Alışverişlerini kolayca kaydet.")
                        .pauseFor(2000)
                        .deleteAll()
                        .typeString("Tariflerini mutfağına göre incele.")
                        .pauseFor(2000)
                        .deleteAll()
                        .typeString("Kayıtlarını cebine göre tut.")
                        .pauseFor(2000)
                        .deleteAll()
                        .start();
                        }}
                        />
                    </h3>
                    
                    <p>Mutfakçım, kullanıcılarının mutfak giderlerini daha etkin kullanabilmeleri için geliştirildi. Mutfakçım, kullanıcıların mutfak finansmanında daha ekonomik olmalarını sağlar.</p>
                
                    <div className="buttons">
                        <div className="mb-2">
                            <Button href="/auth/register">Hemen Kayıt Ol!</Button><small> (Tamamen Ücretsiz💁)</small>
                        </div>
                        <small className="mb-2"> ya da </small>
                        <div>
                            <Button variant="dark" href="/auth/login" onClick={LoginButtonHandler}>Giriş Yap!</Button>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Background>
    );
}

