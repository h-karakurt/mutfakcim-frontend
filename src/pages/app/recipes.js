import Layout from "../../layouts/dashboardLayout"
import Navbar from "../../components/dashboard/navbar"
import Sidebar from "../../components/dashboard/sidebar"
import { Col, Row, Card, Accordion} from "react-bootstrap"
import { useState, useEffect } from "react";
import styled from 'styled-components'

var axios = require('axios');

const Wrapper = styled.div`
    
    .card-wrapper{
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;
    }
`

const StyledCard = styled(Card)`
    width: 49%;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #FCFFE7;

    h2{
        text-align: center;
    }
    
    ul{
        list-style-type: none;
    }

    @media screen and (max-width: 768px) {
        width: 98%;
    }
    
    @media screen and (max-width: 576px) {
        
    }
`

export default function Recipes() {
    
    const MapRecipes = (response) => {
        
        const mappedData = response.data.map((item , index) => (
            <StyledCard key={index}>
                <h2>{item.recipeName}</h2>
                
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Tarif İçeriği</Accordion.Header>
                        <Accordion.Body>
                        <ul>
                            {item.ingredients.map((subitem , subindex) => 
                            <li key={subindex}>{subitem.quantity} {subitem.ingredient_name}</li>
                            )}
                        </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <hr></hr>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Tarif Açıklaması</Accordion.Header>
                        <Accordion.Body>
                            {item.description}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </StyledCard>
        ));  
    
        return (
            <Row className="g-0 card-wrapper">
                {mappedData}
            </Row>
        );
    }

    const [recipeState , setRecipeState] = useState();

    const FetchRecipes = () => {
        
        axios({
            method: "GET",
            url: "http://localhost:3051/api/shops/recipes",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
        }).then((response) => {
            setRecipeState(MapRecipes(response));
        })
    }

    useEffect(() => {
        FetchRecipes();
    },[])

    //setUserName
    const [userName, setUserName] = useState('');
    axios({
        method: 'GET',
        url: 'http://localhost:3051/api/users/auth',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        setUserName(response.data.name)
    }).catch(function (error) {
    })

    return (
        <Wrapper>
            <Row className="g-0">
                <Col lg="2" className="pe-0">
                    <Sidebar userName={userName} />
                </Col>
                <Col className="ps-0">
                    <Navbar userName={userName} />
                    <Layout>
                        <div>
                            {recipeState}
                        </div>
                    </Layout>
                </Col>
            </Row>
        </Wrapper>
    );
}

