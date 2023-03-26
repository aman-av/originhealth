import React,{useState} from "react";
import {Button,Row,Form} from 'react-bootstrap';
import { Link,useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Signin() {

 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      navigate('/dashboard');
    }
    catch(err) {
      setError(err.message);
      console.log(err.message);
    }
  }

  return <div>
    <Row style={{margin:'10% 20% 10% 20%'}}>
      <h1 style={{textAlign:'center'}}>Welcome Back !</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={e=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Password</Form.Label>
        <Form.Control onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        
      <Button variant="primary" type="submit">
        Sign In
      </Button>
        <p>Create new account? <Link to='/Signup'>Signin</Link> </p>
      </Form>
    </Row>
  </div>;
}

export default Signin;
