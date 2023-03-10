import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import logo from "../../img/logo2_style.png";
import fondo from "../../img/background.jpg";

export const Login = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    actions.login(formData, navigate, setMessage);
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="content">
      <div className="blur"></div>
      <div className="innerContent">
        <Grid className="gridInnerContent"
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header className="headerLogin" as="h2" color="teal" textAlign="center">
              <Image src={logo} />
              {/* <span>Log-in</span> */}
            </Header>
            <Form className="login" size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  className="input"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  className="input"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />

                <Button
                  className="button"
                  color="teal"
                  fluid
                  size="large"
                  type="submit"
                >
                  Login
                </Button>
              </Segment>
            </Form>
            {message && <Message className="messageError">{message}</Message>}
            {!isLoggedIn && (
              <Message className="msg">
                <span> New to us?</span>
                <a href="/register">
                <br/>
                  <span>
                    <i className="fa-solid fa-angle-right"></i>Sign Up
                  </span>
                </a>
              </Message>
            )}
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};
