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


function QuickAddModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="modal-button" onClick={handleShow}>Hızlı Ürün Ekle</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hızlı Ürün Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select
              className="mb-3 p-2"
              aria-label="Default select example"
            >
              <option>Kategori Seç</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Select
              className="mb-3 p-2"
              aria-label="Default select example"
            >
              <option>Ürünü Seç</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Ürünü Ekle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const DeleteShop = (shopid) => {
  
  Swal.fire({
    title: "Emin Misin?",
    text: "Bu Alışverişin Kaderi Senin Ellerinde",
    icon: "question",
    confirmButtonText: "Sil Gitsin.",
    showCancelButton: true,
    cancelButtonText: "İstemiyorum",
  }).then((result) => {
    
    if(result.isConfirmed) {
      
      axios({
      method: "DELETE",
      url: `http://localhost:3051/api/shops/${shopid}`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      }).then((response)=>{
        Swal.fire({
          title: "👋",
          text: "Gitti..",
          icon: "success",
          confirmButtonText: "Tamam.",
        }).then(() => {window.location.reload()})
      })
      .catch((err) => {
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

const formatDate = (dateString) => {
  const options = {weekday: "long", year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

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

  //setting usestate data rows
  const [row, setRow] = useState([]);

  //disable saveShop on empty rows
  const [saveDisabled , setSaveDisabled] = useState(true);

  /*DATA STATES*/
  const [savedShop, setSavedShop] = useState();
  const [historyOptions , setHistoryOptions] = useState();

  const [loading , setLoading] = useState(true)

  //modal Show
  const [modalShow, setModalShow] = useState(false);

  //setUserName
  const [userName, setUserName] = useState("");

  //get username
  axios({
    method: "GET",
    url: "http://localhost:3051/api/users/auth",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    setUserName(response.data.name);
  })
  .catch(function (error) {
    Swal.fire({
      title: "Giriş Tanımlanamadı!",
      text: "Lütfen Giriş Yaparak Tekrar Deneyiniz",
      icon: "error",
      confirmButtonText: "Pekala.",
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      setLoading(false);
      window.location.href = "../";
    })
  });

  //initialize shops on page load
  useEffect(() => {
    initializeShop()
  },[])

  const initializeShop = async() => {
    setLoading(true);
    
    await axios({
      method: "GET",
      url: "http://localhost:3051/api/shops/getShops",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      
      setLoading(false)
      
      /*ADD PRODUCT MODAL*/
      setSavedShop(shopMapper(res.data));
    
      /*HISTORY ADD MODAL*/
      setHistoryOptions(hisoryOptionMapper(res.data))
      

    }).catch(function (error) {
      
      setLoading(false)
      Swal.fire({
        title: "Hata",
        text: "Alışverişlerine ulaşamadık",
        icon: "error",
        confirmButtonText: "Tamam.",
      }).then(() => {
        //window.location.reload();
      })

    });
    
  }

  const shopMapper = (response) => {
    const shopTableData = response.map((item , index) => 
      <Card className="shop cream-bg">
        <Card.Header>
          <h3>{item.totalPrice}₺</h3> <span className="me-5">{formatDate(item.date)}</span>
        </Card.Header>
        <Card.Body>
        <ul key={index}>
        {item.product.map((subitem , subindex) => 
          <li key={subindex}>{subitem.productName} {subitem.unitPrice}₺ {subitem.quantity}{subitem.unit} {subitem.category}</li>
        )}
        </ul>
        <span type="submit" onClick={() => {DeleteShop(item._id)}}>❌</span>
        </Card.Body>
      </Card>
    );

    return (
      <>
        {shopTableData}
      </>
    );
  }

  
  const hisoryOptionMapper = (response) => {
      
    const OptionData = response.map((item , index) => (
      
      <>
      
      {item.product.map((subitem , subindex) =>   

        <option value={subitem.productName}>
          {subitem.productName} - {subitem.unitPrice}₺ - {subitem.quantity}{subitem.unit}
        </option>
        
      )}
      </>
    ));
  
    return (
        <>
          <option value={"empty"}>Please select</option>
          {OptionData}
        </>
    );
  }

  //Post Axios Alışverişi Kaydet

  function SaveShop() {
    setLoading(true)
    axios({
      method: "POST",
      url: "http://localhost:3051/api/shops/createShop",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: row,
    }).then((response) => {
      Swal.fire({
        title: "👍",
        text: "ALışveriş Oluşturuldu",
        icon: "success",
        confirmButtonText: "Tamam.",
      }).then(()=>{
        initializeShop();
      })
      }).then(function () {setLoading(false); setRow([])})
      .catch(function () {setLoading(false)});
  }

  //=========================================================================================================

  //ADD PRODUCT MODAL
  
  //=========================================================================================================

  function AddProductModal() {
    //handle Modal Operations
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    

    //handle inputs
    const [addFormData, setAddFormData] = useState({
      productName: "",
      productPrice: "",
      productUnit: "",
      productCat: "",
    });

    //set units
    const [unit, setUnit] = useState("Birim");

    //set unit disabled
    const [unitDisabled, setUnitDisabled] = useState(true);

    const setUnitDisabledFunc = () => {
      if (unit === "Birim") {
        setUnitDisabled(true);
      } else {
        setUnitDisabled(false);
      }
    };

    useEffect(() => {
      setUnitDisabledFunc();
    }, [unit]);

    const handleAddFormChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;

      setAddFormData(newFormData);
      
    };

    const handleAddFormSubmit = (event) => {
      event.preventDefault();

      const newRow = {
        productName: addFormData.productName,
        productPrice: addFormData.productPrice,
        productUnit: addFormData.productUnit,
        productUnitType: unit,
        productCat: addFormData.productCat,
      };

      if (newRow.productName && +newRow.productPrice>0 && newRow.productCat && +newRow.productUnit>0) {
        const newRows = [...row, newRow];

        setRow(newRows);

        Swal.fire({
          title: "Başarılı!",
          text: "Ürün Eklendi",
          icon: "success",
          confirmButtonText: "Tamamdır.",
          timer: 700,
          timerProgressBar: true,
        }).then(function () {setSaveDisabled(false)});
      } else {
        Swal.fire({
          title: "Başarısız!",
          text: "Ürün Eklenemedi",
          icon: "error",
          confirmButtonText: "Tamamdır.",
          timer: 700,
          timerProgressBar: true,
        });
      }
    };

    return (
      <>
        <Button className="modal-button" onClick={handleShow}>
          Ürün Ekle
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ürün Ekle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Form.Group className="mb-3" >
                  <Form.Label>Ürün İsmi</Form.Label>
                  <Form.Control
                    required
                    onChange={handleAddFormChange}
                    name="productName"
                    type="text"
                    placeholder="Ürün"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Fiyat</Form.Label>
                    <Form.Control
                      required
                      onChange={handleAddFormChange}
                      name="productPrice"
                      type="number"
                      placeholder="TL"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Birim: {unit}</Form.Label>
                    <Form.Control
                      required
                      onChange={handleAddFormChange}
                      name="productUnit"
                      disabled={unitDisabled}
                      type="number"
                      placeholder={unit}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Birim Seçimi</Form.Label>
                  <Form.Select
                    onChange={(e) => setUnit(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option>Birim</option>
                    <option value="kg">kg</option>
                    <option value="gr">gr</option>
                    <option value="L">L</option>
                    <option value="mL">mL</option>
                    <option value="Tane">Tane</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Select
                    required
                    name="productCat"
                    onChange={handleAddFormChange}
                    aria-label="Default select example"
                  >
                    <option></option>
                    <option value="İçecek">İçecek</option>
                    <option value="Süt ürünleri ve Kahvaltılık">
                      Süt ürünleri ve Kahvaltılık
                    </option>
                    <option value="Meyve ve Sebze">Meyve ve Sebze</option>
                    <option value="Atıştırmalık">Atıştırmalık</option>
                    <option value="Unlu Mamüller">Unlu Mamüller</option>
                    <option value="Hazır veya Donuk Gıda">
                      Hazır veya Donuk Gıda
                    </option>
                    <option value="Temel Gıda">Temel Gıda</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Kapat
            </Button>
            <Button  onClick={handleAddFormSubmit} variant="primary">
              Ürünü Ekle
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  //=========================================================================================================
  //  HISORY PRODUCT MODAL
  //=========================================================================================================
  
  function HistoryAddModal() {
    //handle Modal Operations
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //handle selected option
    const [selectedInput , setSelectedInput] = useState("empty");

    //all details of selected option
    const [selectedOptionDetails , setSelectedOptionDetails] = useState();

    useEffect(() => {
      axios({
        method: "GET",
        url: "http://localhost:3051/api/shops/getShops",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        
        //filter
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].product.reduce(function(filtered, option) {
          
            if (option.productName === selectedInput) {
              
              var someNewValue = {
                productName: option.productName,
                productPrice: option.unitPrice,
                productUnit: option.quantity,
                productUnitType: option.unit,
                productCat: option.category,
              }

              console.log(someNewValue);
              setSelectedOptionDetails(someNewValue)
            }
            
            return filtered;
          },[]);
          
        }

        setLoading(false)
  
      }).catch(function (error) {
        
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: "Hata",
          text: "Alışverişlerine ulaşamadık",
          icon: "error",
          confirmButtonText: "Tamam.",
        }).then(() => {
          
          window.location.reload();

        })
      });
    },[selectedInput])

    const handleAddFormSubmit = (event) => {
      event.preventDefault();
      
      console.log(selectedOptionDetails);

      const newRows = [...row, selectedOptionDetails];
      setRow(newRows);

      console.log(newRows);

      Swal.fire({
        title: "Başarılı!",
        text: "Ürün Eklendi",
        icon: "success",
        confirmButtonText: "Tamamdır.",
        timer: 700,
        timerProgressBar: true,
      }).then(function () {setSaveDisabled(false)});
    } 
    

    return (
      <>
        <Button className="modal-button" onClick={handleShow}>
          Geçmişten Ürün Ekle
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Geçmişten Ürün Ekle
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col lg="12">
                  <Form.Label>Geçmiş Ürünler</Form.Label>
                  <Form.Select value={selectedInput} onChange={e => setSelectedInput(e.target.value)}>                     
                    {historyOptions}
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Kapat
            </Button>
            <Button onClick={handleAddFormSubmit} variant="primary">
              Ürünü Ekle
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  //create table for add product modal
  const CreateTableModal = () => {
    const tableData = row.map((rows) => (
      <tr key={rows.productName}>
        <td>{rows.productName}</td>
        <td>{rows.productPrice}₺</td>
        <td>
          {rows.productUnit}&nbsp;
          {rows.productUnitType}
        </td>
        <td>{rows.productCat}</td>
      </tr>
    ));  

    return (
      <Table className="cream-bg rounded" striped bordered hover>
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Fiyat</th>
            <th>Birim</th>
            <th>Kategori</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </Table>
    );
  };
  
  //create table for saved shops
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
                    <AddProductModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <HistoryAddModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <QuickAddModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </Card.Body>
                </Card>
              
              <CreateTableModal />
              <Button className="w-100"disabled={saveDisabled} onClick={SaveShop}>Alışverişi Kaydet</Button>
              
              </Col>
              <Col>
                <ShopsCard>
                  <h4 className="header">Alışverişlerim</h4>
                  {savedShop}
                </ShopsCard>
              </Col>
            </Row>
          </Layout>
        </Col>
      </Row>
    </Wrapper>
  );
}
