
import React, { Component, useState, useEffect } from 'react';
import ReactBootstrap, { Tabs, Tab, Card, Button, Row, Col } from 'react-bootstrap';
import jsonData from "./hw2";
import axios from 'axios'
const ControlledTabs = () => {
    const [key, setKey] = useState('home');
    const [shopping, setShopping] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        axios.get(`${process.env.REACT_APP_API}/query`)
            .then((response) => {
                console.log(response.data)
                var resData = response.data.data
                setShopping(resData)

            })
            .catch(error => alert('Error loading'))


    }
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="所有商品">

                    <Row>

                        {shopping.map((data) => {
                            return <Col xs={6} md={4} sm={4}>
                                <Card className="wholeCard">
                                    <Card.Img variant="top" src={data.image} />
                                    <Card.Body>
                                        <Card.Title>{data.name}</Card.Title>

                                        <Card.Text>
                                            產品價格 ${data.price}
                                        </Card.Text>

                                        <div className="btnGroup">
                                            <Button variant="primary">修改</Button>
                                            <Button variant="primary">刪除</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>


                        })}
                    </Row>


                </Tab>
                <Tab eventKey="profile" title="新增">
                    456
       </Tab>

            </Tabs>
        </div>
    );
}

export default ControlledTabs;