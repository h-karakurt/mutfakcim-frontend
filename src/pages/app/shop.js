import Layout from "../../layouts/dashboardLayout";
import Navbar from "../../components/dashboard/navbar";
import Sidebar from "../../components/dashboard/sidebar";
import {
  Col,
  Row,
  Form,
  Modal,
  Button,
  Table,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

var axios = require("axios");

/*styled-components*/


const ShopsCard = styled.div`
  .header{
    display: none;
    text-align: center;
  }
  .shop{
    margin: 0px 10px;
    margin-bottom: 20px;
    ul{
      list-style: none;
      padding-left: 0;
    }
    li{
      border-bottom: 1px solid black;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
    li:last-child{
      border-bottom: 0;
    }
    span{
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  
  height: 75vh;
  overflow-y: auto;

  @media screen and (max-width: 992px) {
    margin-top: 20px;
    
    .header{
    display: block;
    }
  }
`

const Wrapper = styled.div`
  .modal-button{
    margin: 0 10px;
  }
  .padding-zero{
    padding: 10px 0;
  }

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
  height: 100vh;

  #loading {
  display: inline-block;
  width: 60px;
  margin-top: 40vh;
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

export default function Dashboard() {
  
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

  //setUserName
  const [userName, setUserName] = useState("");

  //get username
  axios({
    method: "GET",
    url: "https://arcane-fortress-37188.herokuapp.com/api/users/auth",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    setUserName(response.data.name);
  })
  .catch(function (error) {
    /* Swal.fire({
      title: "Giriş Tanımlanamadı!",
      text: "Lütfen Giriş Yaparak Tekrar Deneyiniz",
      icon: "error",
      confirmButtonText: "Pekala.",
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      setLoading(false);
      window.location.href = "../";
    }) */
  });


  return (
    <Wrapper>
      <Row className="g-0">
        <Col lg="2" className="pe-0">
          <Sidebar userName={userName} />
        </Col>
        <Col className="ps-0">
          <Navbar userName={userName} />
          <Layout>
            <Spinner/>
            <Row>
              <Col>
                <Card className="mb-3 cream-bg">
                  <Card.Header>Alışveriş Ekle</Card.Header>
                  <Card.Body className="d-flex justify-content-evenly padding-zero">
                    
                  </Card.Body>
                </Card>
              
              <Button className="w-100" >Alışverişi Kaydet</Button>
              
              </Col>
              <Col>
                <ShopsCard>
                  <h4 className="header">Alışverişlerim</h4>
                </ShopsCard>
              </Col>
            </Row>
          </Layout>
        </Col>
      </Row>
    </Wrapper>
  );
}
