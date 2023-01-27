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
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [errors, setErrors] = useState({});
  const [allFieldsRequiredMessage, setAllFieldsRequiredMessage] = useState("");


  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    let errors = {};
    const fieldsToValidate = ["username", "firstname", "lastname", "email", "password"];
    fieldsToValidate.forEach(field => {
      if (!formData[field]) {
        formValid = false;
        errors[field] = `${field} is required`;
      }
    });

    if(!formValid){
       setErrors(errors)
       setAllFieldsRequiredMessage("All fields are required")
       return
    }
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
    if (e.target.name === "password") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (!validatePassword(e.target.value)) {
        setPasswordError("Password must be at least 8 characters long, and must include uppercase and lowercase letters.");
        setIsPasswordValid(false);
      } else {
        setPasswordError(null);
        setIsPasswordValid(true);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
                type="email"
                name="email"
                placeholder="Email"
                label="Email"
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                type="password"
                name="password"
                placeholder="Password"
                label="Password"
                onChange={handleChange}
              />
            </Form.Field>
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <Button color='teal' fluid size='large' type="submit" disabled={!isPasswordValid}>Submit</Button>
            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
            {allFieldsRequiredMessage && <p style={{ color: "red" }}>{allFieldsRequiredMessage}</p>}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
