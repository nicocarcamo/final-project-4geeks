import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Context } from "../store/appContext";



export const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { store, actions } = useContext(Context);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const result = await actions.login(formData);
  //   console.log(result);
    // if (result.status === 'success') {
    //   navigate("/home");
    // }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions.login(formData, navigate);
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
        {store.loginMessage && <Message>{store.loginMessage}</Message>}
        {!isLoggedIn && (
          <Message>
            New to us? <a href='/register'>Sign Up</a>
          </Message>)}
      </Grid.Column>
    </Grid>
  )
}
