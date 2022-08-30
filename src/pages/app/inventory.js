import "../../assets/style/inventory.scss"
import Layout from "../../layouts/dashboardLayout"
import Navbar from "../../components/dashboard/navbar"
import Sidebar from "../../components/dashboard/sidebar"
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { Col, Row, Button, Card } from "react-bootstrap"
import { useEffect, useState, useRef } from "react";

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
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    background-color: #FCFFE7;

    ul{
        width: 300px;

        margin-top: 15px;
        li{
            display: inline-block;
            margin-right: 10px;
        }
    }
    .buttons{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        button{
            margin: 0 10px;
        }
    }
    @media screen and (max-width: 768px) {
        width: 98%;
    }
    
    @media screen and (max-width: 576px) {
        ul{
            width: 200px;
        }
    }
`

const InventoryTable = (response , amountInput) => {

    const tableData = response.data.map((item , index) => (
        <StyledCard>
            <ul key={index}>
                <li>{item.productName}</li>
                <li>
                {item.quantity}&nbsp;
                {item.unit}
                </li>
                <li>{item.category}</li>
            </ul>

            <div className="buttons">
                <Button size="sm" onClick={() => {ReduceSwalBox(item.productName)}} >Eksilt</Button>
                
                <Button size="sm" variant='danger' onClick={() => {DeleteInventory(item.productName)}} >Bitir</Button>
            </div>
        </StyledCard>
    ));  

    return (
        <Row className="g-0 card-wrapper">
            {tableData}
        </Row>
    );
};

const DeleteInventory = (name) => {
    
    var form = {
        name: name
    }

    Swal.fire({
        title: "Emin Misin?",
        text: "Envanterdeki Ürünü Bitiriyorsun",
        icon: "question",
        confirmButtonText: "Bitir",
        showCancelButton: true,
        cancelButtonText: "İstemiyorum",
      }).then((result) => {
        
        if(result.isConfirmed) {
            axios({
                method: "POST",
                url: "http://localhost:3051/api/shops/inventory/delete",
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
                data: form,
            }).then(() => {
                
            Swal.fire({
                title: "👋",
                text: "Bitti..",
                icon: "success",
                confirmButtonText: "Tamam.",
                }).then(() => {window.location.reload()})     
            
            }).catch((err)=> {
                Swal.fire({
                    title: "Bir Şey Oldu",
                    text: "Bu ürünü malesef silemedik..",
                    icon: "error",
                    confirmButtonText: "Tamam.",
                })
            })
        }
    })
}

const ReduceSwalBox = (name) => {
    
    const res = Swal.fire({
        title: 'Eksilt',
        input: 'number',
        inputAttributes: {
            step: 'any'
          },
        inputLabel: 'Eksiltilecek Miktar',
        inputPlaceholder: 'Eksiltilecek miktarı giriniz.'
    }).then((res) => {
        if(res.value > 0){
            ReduceInventory(name , res.value);
        }
        
    }).catch((err)=> {
        console.log(err);
    })
}

const ReduceInventory = (name , amount) => {

    var form = {
        name: name,
        quantity: amount
    }

    Swal.fire({
        title: "Emin Misin?",
        text: "Envanterdeki Ürünü " + amount + " Eksiltiyorsun",
        icon: "question",
        confirmButtonText: "Eksilt",
        showCancelButton: true,
        cancelButtonText: "İstemiyorum",
      }).then((result) => {
        
        if(result.isConfirmed) {
            axios({
                method: "POST",
                url: "http://localhost:3051/api/shops/inventory/update",
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
                data: form,
            }).then(() => {
                
            Swal.fire({
                title: "👋",
                text: "Eksiltildi",
                icon: "success",
                confirmButtonText: "Tamam.",
                }).then(() => {window.location.reload()})     
            
            }).catch((err)=> {
                Swal.fire({
                    title: "Bir Şey Oldu",
                    text: "Bu ürünü malesef eksiltemedik..",
                    icon: "error",
                    confirmButtonText: "Tamam.",
                })
            })
        }
    })
}

export default function Inventory() {
    
    //inventory table create
    const [inventoryTableState , SetInventoryTableState] = useState()

    //amount ref
    const amountInput = useRef();

    const fetchInventory = () => {
        axios({
            method: "GET",
            url: "http://localhost:3051/api/shops/inventory",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
                SetInventoryTableState(InventoryTable(response , amountInput))
          })
    } 

    useEffect(() => {
        fetchInventory();
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
                        {inventoryTableState}
                    </Layout>
                </Col>
            </Row>
        </Wrapper>
    );
}

