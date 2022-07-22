import Layout from "../../layouts/dashboardLayout"
import Navbar from "../../components/dashboard/navbar"
import Sidebar from "../../components/dashboard/sidebar"
import { Col, Row, Card } from "react-bootstrap"
import { useState, useEffect } from "react";
import styled from 'styled-components'

var axios = require('axios');

const StyledCard = styled(Card)`
    margin-bottom: 10px;
    padding: 10px 10px;
    p{
            font-size: 16px;
            margin-bottom: 0;
        }
    
        span{
        color: #76b852;
        font-weight: bold;
    }

    @media screen and (max-width: 768px) {
        p{
            font-size: 16px;
        }
    }
    
    @media screen and (max-width: 576px) {
        p{
            font-size: 14px;
        }
    }

`

const StyledUl = styled.ul`
    padding-left: 10px;
    list-style-type: none;
`

const MapStats = (response) => {
    return(
        <StyledUl>
            <StyledCard>
                <p>Bu aylık harcamanız <span>{response.data.monthPrice}₺</span> 💸</p>
            </StyledCard>
            
            <StyledCard>
                <p>Bu haftalık harcamanız <span>{response.data.weekPrice}₺</span> 💸</p>
            </StyledCard>
            
            <StyledCard>
                <p>Bu günlük harcamanız <span>{response.data.dayPrice}₺</span> 💸</p>
            </StyledCard>

            <StyledCard>
                <p>Önceki ayın harcaması <span>{response.data.prevMonthPrice}₺</span> 💸</p>
            </StyledCard>

            <StyledCard>
                <p>En çok harcama yaptığnız kategori <span>{response.data.mostSpent}</span> 💸</p>
            </StyledCard>
           
        </StyledUl>
    )
};

export default function Stats() {

    const [statsState , setStatsState] = useState()

    //stats
    const FetchStats = () => {
    
        axios({
            method: "GET",
            url: "https://arcane-fortress-37188.herokuapp.com/api/shops/stats",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
        }).then((response) => {
            setStatsState(MapStats(response))
            console.log(response.data);
        })
    }

    useEffect(() => {
        FetchStats();
    },[])

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
                        {statsState}
                    </Layout>
                </Col>
            </Row>
        </>
    );
}

