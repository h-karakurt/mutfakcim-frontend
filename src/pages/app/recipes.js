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
        flex-direction: column
    }
`

const StyledCard = styled(Card)`
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #FCFFE7;

    h2{
        text-align: center;
    }
    
    ul{
        list-style-type: none;
    }

    .vertical-line{
        border-right: 1px solid black;
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
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>{item.recipeName}</Accordion.Header>
                        <Accordion.Body>
                        <Row>
                            <Col sm="4" className="vertical-line">
                                <ul>
                                {item.ingredients.map((subitem , subindex) => 
                                <li key={subindex}>{subitem.quantity} {subitem.ingredient_name}</li>
                                )}
                                </ul>
                            </Col>
                            <Col sm="8">
                            {item.description}
                            </Col>
                        </Row>
                        
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </StyledCard>
        ));  
    
        return (
            <div className="card-wrapper">
                {mappedData}
            </div>
        );
    }

    const [recipeState , setRecipeState] = useState();

    const FetchRecipes = () => {
        
        axios({
            method: "GET",
            url: "https://arcane-fortress-37188.herokuapp.com/api/shops/recipes",
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

