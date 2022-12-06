import React from "react";
import './Documents.css'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  return (
    <Card className="card">
      <Card.Img variant="top" src="/src/assests/lodhalogo.png" />
      <Card.Body>
        <Card.Title>Lodha Logo</Card.Title>
        <Card.Text>
          Logo of official lodha community
          Test document
        </Card.Text>
        <Button variant="primary" src="/">View document</Button>
      </Card.Body>

      <Card.Img variant="top" src="/src/assests/lodhalogo.png" />
      <Card.Body>
        <Card.Title>Lodha Logo</Card.Title>
        <Card.Text>
          Logo of official lodha community
          Test document
        </Card.Text>
        <Button variant="primary" src="/">View document</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;