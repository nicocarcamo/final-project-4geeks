import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await res.json();
      if (json.status === 'success') {
        setIsLoggedIn(true);
        setMessage(json.message);
      } else {
        setMessage(json.message);
      }
    } catch (err) {
        setMessage(err.response && err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/rigo-baby.jpg' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name='email'
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              name='password'
              type='password'
              onChange={handleChange}
            />

            <Button color='teal' fluid size='large' type='submit'>
              Login
            </Button>
          </Segment>
        </Form>
        {message && <Message>{message}</Message>}
        {!isLoggedIn && (
        <Message>
          New to us? <a href='/register'>Sign Up</a>
      </Message>)}
    </Grid.Column>
  </Grid>
  )
        }
