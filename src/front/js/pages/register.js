import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  ModalActions,
  Segment,
} from "semantic-ui-react";
import "../../styles/register.css";
import logo from "../../img/logo2_style.png";
import backgroundRegister from "../../img/mountain-wall-mural-peel-stick-152953_1800x1800.webp";
import {Icon} from 'semantic-ui-react'


export const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


    //icon importation
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = 
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    is_active: true,
  });
  const [message, setMessage] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [errors, setErrors] = useState({});
  const [allFieldsRequiredMessage, setAllFieldsRequiredMessage] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    let errors = {};
    const fieldsToValidate = [
      "username",
      "firstname",
      "lastname",
      "email",
      "password",
    ];
    fieldsToValidate.forEach((field) => {
      if (!formData[field]) {
        formValid = false;
        errors[field] = `${field} is required`;
      }
    });

    if (!formValid) {
      setErrors(errors);
      setAllFieldsRequiredMessage("Todos los campos son requeridos.");
      return;
    }
    actions.register(formData, navigate, setMessage);
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (!validatePassword(e.target.value)) {
        setPasswordError(
          "La contraseña debe tener al menos 8 caracteres, letras mayúsculas, letras minúsculas y números."
        );
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
    <div className="contentRegister">
      <div className="blurRegister">
        {/* <img src={backgroundRegister} /> */}
      </div>
      <div className="innerContentRegister">
        <Grid
          className="formRegister"
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header
              className="headerRegister d-flex"
              as="h2"
              color="teal"
              textAlign="center"
            >
              <Image src={logo} /> <span>Crea Una Nueva Cuenta</span>
            </Header>
            <Segment className="segmentRegister">
              <Form className="register" size="large" onSubmit={handleSubmit}>
                <Form.Field>
                  <Form.Input
                    className="input"
                    type="text"
                    name="username"
                    placeholder="Nombre de Usuario"
                    label="Nombre de Usuario"
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    className="input"
                    type="text"
                    name="firstname"
                    placeholder="Primer Nombre"
                    label="Primer Nombre"
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    className="input"
                    type="text"
                    name="lastname"
                    placeholder="Apellido"
                    label="Apellido"
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    label="Email"
                    onChange={handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    label="Constraseña"
                    onChange={handleChange}
                  />
                </Form.Field>
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
                                <Form.Field>
                  <Form.Input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Confirmar contraseña"
                    label="Confirmar constraseña"
                    // onChange={handleChange2}
                  />
                </Form.Field>
                <Button
                  className="button"
                  color="teal"
                  fluid
                  size="large"
                  type="submit"
                  disabled={!isPasswordValid}
                >
                  Crear Cuenta
                </Button>
                {/* {errors.username && <p style={{ color: "red" }}>{errors.username}</p>} */}
                {allFieldsRequiredMessage && (
                  <p style={{ color: "red" }}>{allFieldsRequiredMessage}</p>
                )}
                {/* {message && <p style={{ color: "green" }}>{message}</p>}
            {createError && <p style={{ color: "red" }}>{createError}</p>}             */}
              </Form>
              {message && <Message>{message}</Message>}
            </Segment>
            <Message className="msgRegister">
              Ya tienes una cuenta?{" "}
              <br></br>
              <a href="/login">
              <i class="user icon"></i>
Ingresa
              </a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};
