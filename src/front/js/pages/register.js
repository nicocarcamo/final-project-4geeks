import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

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
      const res = await fetch(`${process.env.BACKEND_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await res.json();
      setMessage(json.message);
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
          <Image src="/rigo-baby.jpg" /> Create New Account
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
