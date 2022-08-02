import styled from "styled-components";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/style/custom-styles.scss";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";

var axios = require("axios");

const CenteredDiv = styled.div`
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  background: #14a484;
  box-shadow: 0px 10px 10px 5px #62727d;
  border-radius: 1px;
  position: absolute;
  width: 50%;
  top: 25%;
  left: 25%;
  button {
    font-weight: bold;
  }
  label {
    color: white;
  }
  .form-control:focus {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    input:-webkit-autofill {
      background-color: red;
    }
  }

  .right-panel {
    background-color: #ffffff;
    padding: 15px;
  }
  .left-panel {
    padding: 3em;
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
      background-color: #ffffff;
      padding: 15px;
    }
    .left-panel {
      padding-top: 1em;
      padding-bottom: 5px;
    }
  }
`;

const Span = styled.span`
  color: white;
`;

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
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

const myStyle = {
  color: "whitesmoke",
};

export default function Login(props) {
  //post using refs
  const emailInput = useRef(null);
  const passInput = useRef(null);

  //isLoading
  const [loading, setLoading] = useState(false);

  //isChecked & setLocalstorageAuth
  const [isChecked, setChecked] = useState(localStorage.getItem("email"));

  const Spinner = () => {
    if (loading === true) {
      return (
        <SpinnerWrapper>
          <h1>{loading}</h1>
          <div id="loading"></div>
        </SpinnerWrapper>
      );
    } else {
      return null;
    }
  };

  const setAndRedirect = async() => {
    if(isChecked){
    await localStorage.setItem("email" , emailInput?.current?.value)
    }
    setLoading(false);
    window.location.href = "/shop";
  }

  function HandlePost(event) {
    event.preventDefault();
    setLoading(true);

    var form = JSON.stringify({
      email: emailInput?.current?.value,
      password: passInput?.current?.value,
    });

    axios({
      method: "POST",
      url: "https://arcane-fortress-37188.herokuapp.com/api/users/login",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: form,
    })
    .then(function (response) {
      
      setAndRedirect();
      
    })
    .catch(function (error) {
      setLoading(false);
      
      Swal.fire({
        title: "Tüh...",
        text: "Bir şeyler yanlış",
        icon: "error",
        confirmButtonText: "Tekrar Deneyelim..",
      });
      
    });
  }

  return (
    <CenteredDiv className="text-center">
      <Spinner />
      <Row className="g-0">
        <Col
          xl={{ order: "first", span: "6" }}
          lg={{ order: "first", span: "6" }}
          md={{ order: "last", span: "12" }}
          sm={{ order: "last", span: "12" }}
          xs={{ order: "last", span: "12" }}
          className="left-panel">
          <Form>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label className="text-light float-start">
                  E-Posta Adresi
                </Form.Label>
                <Form.Control
                  ref={emailInput}
                  type="text"
                  placeholder="E-posta"
                  defaultValue={localStorage.getItem("email")}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="mb-3">
                <Form.Label className="text-light float-start">
                  Şifre
                </Form.Label>
                <Form.Control
                  ref={passInput}
                  type="password"
                  placeholder="***"
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group
                className="text-light w-50"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  type="checkbox"
                  label="Beni Hatırla"
                  checked={isChecked}
                  onChange={(e) => setChecked(!isChecked)}
                />
              </Form.Group>
            </Row>

            <Row>
              <Button
                className="mt-3 w-75 m-auto"
                variant="secondary"
                onClick={HandlePost}
                type="submit"
              >
                Giriş Yap
              </Button>
            </Row>

            <Row>
              <Link style={myStyle} className="mt-3" to="#">
                Şifremi Unuttum.
              </Link>
            </Row>
          </Form>
        </Col>

        <Col
          xl={{ order: "last", span: "6" }}
          lg={{ order: "last", span: "6" }}
          md={{ order: "first", span: "12" }}
          sm={{ order: "first", span: "12" }}
          xs={{ order: "first", span: "12" }}
          className="right-panel d-flex justify-content-center align-items-center pb-5" >
          <div>
            <img src={Logo} alt="Logo" width={300} />
          </div>
        </Col>
      </Row>
    </CenteredDiv>
  );
}
