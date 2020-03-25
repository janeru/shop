import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactBootstrap, { Jumbotron, Container, Tabs, Tab, Button, Col, Grid, Panel, FormGroup } from 'react-bootstrap';
import ControlledTabs from './ControlledTabs'

const App = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>商品</h1>
        </Container>
      </Jumbotron>

      {ControlledTabs()}
    </div>

  );
}

export default App;
