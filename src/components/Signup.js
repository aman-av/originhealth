import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { Link,Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUser(email, password);
      navigate('/dashboard');
    }
    catch(err) {
      setError(err.message);
      console.log(err.message);
    }
  }

  return <div>
    <Row style={{margin:'10% 20% 10% 20%'}}>
      <h1 style={{textAlign:'center'}}>Sign Up for Free</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={e=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Password</Form.Label>
        <Form.Control onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
          <p>Already have an account? <Link to='/'>Signin</Link> </p>
    </Form>
    </Row>
  </div>;
}

export default Signup;
