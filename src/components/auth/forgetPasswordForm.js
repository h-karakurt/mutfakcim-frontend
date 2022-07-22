import styled, { keyframes } from "styled-components";
import { Form, Button, Col, Row } from "react-bootstrap";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../assets/style/custom-styles.scss";

var axios = require("axios");

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
  border: 5px solid #76b852;
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

const CenteredDiv = styled.div`
    background: #76b852;
    box-shadow: 0px 10px 10px 5px black;
    border-radius: 10px;
    padding: 3em;
    width: 50%;
    position: absolute;
    top: 25%;
    left: 25%;
  
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
      height: 100%;
      .right-panel {
        padding: 15px;
      }
      .left-panel {
        padding-top: 1em;
        padding-bottom: 5px;
      }
    }
  `;
  const Header = styled.h1`
    color: white;
  `;

  const Text = styled.p`
    color: white;
  `;
  
  const GoBack = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    color: white;
    display: none;
    @media screen and (max-width: 576px) {
      display: block;
    }
  `

export default function ForgetPassword() {
  const emailInput = useRef(null);
  const navigate = useNavigate();

  //loader
  const Spinner = () => {
    if(loading === true){
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

  const [loading , setLoading] = useState(false)

  function HandlePost(event) {
    event.preventDefault();
    
    setLoading(true);
    
    const emailData = JSON.stringify({ email: emailInput?.current?.value });
    console.log(emailData);
    axios({
      method: "POST",
      url: "https://arcane-fortress-37188.herokuapp.com/api/users/forgetpassword",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: emailData,
    }).then(function (response) {
      Swal.fire({
        title: "E-postanı kontrol et!",
        text: `Şifreni değiştirebilmen için eposta hesabına 6 haneli bir doğrulama kodu gönderdik`,
        icon: "success",
        confirmButtonText: "Tamam",
      }).then(() => {
        navigate("/auth/forgetpassword/confirm");
      });
      setLoading(false);
    }).catch(function (error) {
      Swal.fire({
        title: "Tüh",
        text: `Şifren değiştirilirken bir şey oldu`,
        icon: "error",
        confirmButtonText: "Tamam",
      })
      setLoading(false);
    })
  }

  return (
    <CenteredDiv className="text-center">
      <Spinner/>
      <GoBack onClick={() => {window.location.href = "../auth/login"}}>
        <i class="fa-solid fa-angle-left fa-2x"></i>
      </GoBack>
      <Row>
        <Col xl={{order: "first" , span: "6"}} lg={{order: "first" , span: "6"}} md={{order: "last" , span: "12"}} sm={{order: "last" , span: "12"}} xs={{order: "last" , span: "12"}} className="left-panel">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-light float-start">
                E-postanızı giriniz
              </Form.Label>
              <Form.Control
                ref={emailInput}
                type="text"
                placeholder="E-posta"
              />
            </Form.Group>

            <Button
              className="mt-5"
              variant="secondary"
              type="submit"
              onClick={HandlePost}
            >
              Sonraki Adım
            </Button>
          </Form>
        </Col>

        <Col xl={{order: "last" , span: "6"}} lg={{order: "last" , span: "6"}} md={{order: "first" , span: "12"}} sm={{order: "first" , span: "12"}} xs={{order: "first" , span: "12"}} className="right-panel">
          <div className="mt-5">
            <Header>Şifrenizi Değiştirin</Header>
            <Text className="mt-5 mb-5">
              Şifrenizi Değiştirebilmek için e-postanıza 6 haneli doğrulama kodu
              yollayacağız
            </Text>
          </div>
        </Col>
      </Row>
    </CenteredDiv>
  );
}
