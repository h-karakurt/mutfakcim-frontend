import styled from "styled-components";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/style/custom-styles.scss";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";

var axios = require("axios");

//Styled Components

const CenteredDiv = styled.div`
  
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  background: #14a484;
  box-shadow: 0px 10px 10px 5px #62727d;
  width: 50%;
  position: absolute;
  top: 25%;
  left: 25%;
  .right-panel {
    background-color: #ffffff;
    padding: 15px;
    .custom-input {
      color: white;
      &:focus {
        box-shadow: 0 0 0 0.25rem #14a484aa;
        border-color: #14a484;;
      }
    }
  }
  .left-panel {
    padding: 3em;
  }
  
  .absolute{
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    img{
      width: 250px;
    }
  }

  button{
    font-weight: bold;
  }

  @media screen and (max-width: 1400px) {
    width: 50%;
    top: 25%;
    left: 25%;
    .left-panel {
    padding: 2em;
  }
  }
  @media screen and (max-width: 1200px) {
    width: 70%;
    top: 15%;
    left: 15%;
  }
  @media screen and (max-width: 992px) {
    width: 60%;
    top: 20%;
    left: 20%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    top: 10%;
    left: 10%;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    top: 0%;
    left: 0%;
    height: 100vh;
    @media screen and (max-height: 600px) {
      height: unset;
    }
    .right-panel {
      padding: 15px;
    }
    .left-panel {
      padding-top: 1em;
      padding-bottom: 5px;
    }
  
  }
`
const Header = styled.h1`
  color: black;
  font-weight: bold;
`

const Text = styled.p`
  color: black;
  font-weight: bold;
`

const Span = styled.span`
  color: white;
`

const SpinnerWrapper = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  z-index: 99999;
  background-color: #00000077;
  height: 100%;

  #loading {
  display: inline-block;
  width: 60px;
  margin-top: 25%;
  height: 60px;
  border: 5px solid #14a484;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
`

const myStyle = {
  color: "whitesmoke",
}


export default function Register() {

  //isLoading 
  const [loading , setLoading] = useState(false)

  const Spinner = () => {
    if(loading == true){
      return(
        <SpinnerWrapper>
          <h1>{loading}</h1>
          <div id="loading"></div>
        </SpinnerWrapper>
      );
    }else{
      return(
        null
      );
    }
  }

  //post using refs
  const emailInput = useRef(null);
  const nameInput = useRef(null);
  const passInput = useRef(null);
  const passRepeatInput = useRef(null);
  
  const navigate = useNavigate();

  function HandlePost(event) {
    setLoading(true);

    event.preventDefault();

    console.log(" Email : " + emailInput?.current?.value);
    console.log(" Name : " + nameInput?.current?.value);
    console.log(" Pass : " + passInput?.current?.value);
    console.log(" RePass : " + passRepeatInput?.current?.value);

    var form = JSON.stringify({
      email: emailInput?.current?.value,
      name: nameInput?.current?.value,
      password: passInput?.current?.value,
    });

    console.log(form);

    axios({
      method: "POST",
      url: "https://arcane-fortress-37188.herokuapp.com/api/users",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: form,
    }).then(function (response) {
        console.log(JSON.stringify(response.data));
        
        setLoading(false);

        Swal.fire({
          title: "E-postanı kontrol et!",
          text: `Merhaba ${nameInput?.current?.value}, lütfen hesabını oluşturmak için sana göndermiş olduğumuz maile bak (spam klasörüne bakmayı unutma)`,
          icon: "success",
          confirmButtonText: "Tamam",
        });
        
        navigate("/auth/confirm");
      })
      .catch(function (error) {
        
        setLoading(false);

        if (error.response.status === 400) {
          Swal.fire({
            title: "Tüh...",
            text: "Bu email ile zaten bir hesap oluşturulmuş",
            icon: "error",
            confirmButtonText: "Tekrar Deneyelim..",
          });
        }else{
          Swal.fire({
            title: "Tüh...",
            text: "Bir sorun var",
            icon: "error",
            confirmButtonText: "Tekrar Deneyelim..",
          });
        }
      });
  }

  //States for verification
  const [nameState, getNameState] = useState("");

  return (
    <CenteredDiv className="text-center">
      {<Spinner/>}
      <Row className="g-0">
        <Col xl={{order: "first" , span: "6"}} lg={{order: "first" , span: "6"}} md={{order: "last" , span: "12"}} sm={{order: "last" , span: "12"}} xs={{order: "last" , span: "12"}}  className="left-panel">
          <Form autoComplete="off">
            <Form.Group className="mb-1 mb-md-3">
              <Form.Label className="text-light float-start">
                E-Posta Adresi
              </Form.Label>
              <Form.Control
                className="custom-input"
                required
                ref={emailInput}
                type="email"
                placeholder="E-posta"
              />
            </Form.Group>

            <Form.Group className="mb-1 mb-md-3">
              <Form.Label className="text-light float-start">
                Şifre
              </Form.Label>
              <Form.Control
                autoComplete="false"
                className="custom-input"
                required
                ref={passInput}
                type="password"
                placeholder="******"
              />
            </Form.Group>

            <Form.Group className="mb-1 mb-md-3">
              <Form.Label className="text-light float-start">
                Şifre Tekrar
              </Form.Label>
              <Form.Control
                autoComplete="false"
                className="custom-input"
                required
                ref={passRepeatInput}
                type="password"
                placeholder="******"
              />
            </Form.Group>

            <Button
              className="mt-3"
              variant="secondary"
              onClick={HandlePost}
              type="submit"
            >
              Kayıt Ol!
            </Button>
            <Row>
              <Span className="mt-3">
                Hesabınız var mı?{" "}
                <Link style={myStyle} className="mt-3" to="/auth/login">
                  Giriş Yapın
                </Link>
              </Span>
            </Row>
          </Form>
        </Col>

        <Col xl={{order: "last" , span: "6"}} lg={{order: "last" , span: "6"}} md={{order: "first" , span: "12"}} sm={{order: "first" , span: "12"}} xs={{order: "first" , span: "12"}} className="right-panel">
          <img src={Logo} alt='Logo'/>
          <Form.Group className="mb-3">
            <Form.Control
              autoFocus
              className="mt-3 custom-input text-center"
              value={nameState}
              onChange={(event) => getNameState(event.target.value)}
              required
              ref={nameInput}
              type="text"
              placeholder="Size nasıl hitap edelim?"
            />
          </Form.Group>

          <div className="mt-1 mt-md-3 ">
            <Header>Hemen Kayıt Oluşturun.</Header>
            <Text className="mt-1 mt-md-3">
              Seni burada görmek çok güzel {nameState}.
            </Text>
          </div>
        </Col>
      </Row>
    </CenteredDiv>
  );
}

