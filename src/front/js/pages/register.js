import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'



export const Register = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png' /> Register to your account
      </Header>
      <Form size='large'>
    <Segment>
    <Form>
    <Form.Field>
      <Form.Input 
        name="username" 
        placeholder="Username" 
        label="Username"/>
    </Form.Field>
    <Form.Field>
      <Form.Input 
        name="firstname" 
        placeholder="First Name" 
        label="First Name"/>
    </Form.Field>
    <Form.Field>
      <Form.Input 
        name="lastname" 
        placeholder="Last Name" 
        label="Last Name"/>
    </Form.Field>
    <Form.Field>
      <Form.Input 
        name="mail" 
        placeholder="Email"
        label="Email"/>
    </Form.Field>
    <Form.Field>
      <Form.Input 
        name="password" 
        placeholder="Password"
        label="Password"/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
  </Segment>
</Form>
    </Grid.Column>
  </Grid>
    )

