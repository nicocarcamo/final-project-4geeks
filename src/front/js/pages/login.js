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
import {Icon} from 'semantic-ui-react'


export const Login = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //icon importation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { store, actions } = useContext(Context);
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = 
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);
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
                  placeholder="Dirección de email"
                  name="email"
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  className="input"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Contraseña"
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
                  Ingresa
                </Button>
              </Segment>
            </Form>
            {message && <Message className="messageError">{message}</Message>}
            {!isLoggedIn}
              <Message className="msg">
             Eres nuevo?
                <br></br>
                <a href="/register">
            
                  <i class="user plus icon"></i>
 Regístrate
                </a>
                <br></br>
                <br></br>

                Olvidaste la contraseña?                <br></br>
                <a href="/recupera">
            
                  <i class="user plus icon"></i>
 Recupérala
                </a>
              </Message>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};
