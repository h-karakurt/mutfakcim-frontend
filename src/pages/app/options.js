import Layout from "../../layouts/dashboardLayout"
import Navbar from "../../components/dashboard/navbar"
import Sidebar from "../../components/dashboard/sidebar"
import { Col, Row, Card } from "react-bootstrap"
import { useState, useEffect } from "react";
import styled from 'styled-components'

var axios = require('axios');


export default function Options() {

    //setUserName
    const [userName, setUserName] = useState('');
    axios({
        method: 'GET',
        url: 'https://arcane-fortress-37188.herokuapp.com/api/users/auth',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        setUserName(response.data.name)
    }).catch(function (error) {
    })

    return (
        <>
            <Row className="g-0">
                <Col lg="2" className="pe-0">
                    <Sidebar userName={userName} />
                </Col>
                <Col className="ps-0">
                    <Navbar userName={userName} />
                    <Layout>
                        options
                    </Layout>
                </Col>
            </Row>
        </>
    );
}

