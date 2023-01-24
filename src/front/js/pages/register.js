import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    is_active: true
  });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/api/register`, formData);
      setMessage(res.data.message);
    } catch (err) {
        setMessage(err.response && err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/rigo-baby.jpg" /> Register to your account
        </Header>
        <Segment>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Input
                name="username"
                placeholder="Username"
                label="Username"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                name="firstname"
                placeholder="First Name"
                label="First Name"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                name="lastname"
                placeholder="Last Name"
                label="Last Name"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                name="email"
                placeholder="Email"
                label="Email"
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                name="password"
                placeholder="Password"
                label="Password"
                onChange={handleChange}
              />
            </Form.Field>
            <Button color='teal' fluid size='large' type="submit">Submit</Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
