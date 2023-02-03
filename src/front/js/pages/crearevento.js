import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import MapPicker from "../component/MapPicker";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import ImagenUploaded from "../component/ImageUpload";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import backgroundCrearE from "../../img/mountain-wall-mural-peel-stick-152953_1800x1800.webp";
import "../../styles/crearEvento.css";
import TimePicker from "react-time-picker";

export const CrearEvento = () => {
  const [message, setMessage] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { store, actions } = useContext(Context);
  // const [eventImage, setEventImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.currentUser) navigate("/login");
  }, []);

  // const updateSelectedAddress = (address) => {
  // 	setSelectedAddress((currentAddrees) => {
  // 		return currentAddrees = address;
  // 	})
  // 	console.log(selectedAddress)
  // };

  // const updateSelectedAddress = (address) => {
  // 	setSelectedAddress(address)
  // 	console.log(selectedAddress)
  // }

  const [formData, setFormData] = useState({
    nombreevento: "",
    descripcion: "",
    integrantes: "",
    publicooprivado: "",
    valor: "",
    ubicacion: "",
    imagen: null,
    address: selectedAddress,
    is_active: true,
  });

  // const uploadImage = (files) =>{
  //   cdh92emp
  // }

  // const onDrop = async (files) => {
  //   const file = files[0];

  //   // Carga la imagen a Cloudinary y obtiene la URL de la imagen
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "cdh92emp");

  //   const response = await axios.post(
  //     "https://api.cloudinary.com/v1_1/ddx94eu6o/image/upload",
  //     formData
  //   );

  const updateSelectedAddress = (address) => {
    setSelectedAddress((currentAddrees) => {
      return (currentAddrees = address);
    });
    console.log(selectedAddress);
  };

  // const updateSelectedAddress = (address) => {
  // 	setSelectedAddress(address)
  // 	console.log(selectedAddress)
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    actions.createEvent(formData, navigate, setMessage);
  };

  //   setEventImage(response.data.secure_url);
  // };

  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="crearEventoDiv">
      <div className="backgroundCrearE"></div>
      <Grid
        className="gridCrearEvento"
        textAlign="center"
        style={{ height: "90vh" }}
        verticalAlign="middle"
      >
        <Grid.Column className="gridColumCrearEvento" style={{ maxWidth: 450 }}>
          <Header className="headerCrearEvento" as="h2" textAlign="center">
            Crear Nuevo Evento
          </Header>
          <Segment className="segmentCrearEvento">
            <Form size="large" onSubmit={handleSubmit}>
              <Form.Field>
                <Form.Input
                  name="nombreevento"
                  placeholder="Nombre del Evento"
                  label="Nombre del Evento"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="descripcion"
                  placeholder="Descripcion"
                  label="Descripcion"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="integrantes"
                  placeholder="Cantidad de Integrantes"
                  label="Cantidad de Integrantes"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  name="publicooprivado"
                  placeholder="Público o Privado"
                  label="Público o Privado"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <ImagenUploaded />
                {/* <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {eventImage ? (
                    <img src={eventImage} alt="Uploaded Image" width="50px" height="50px" />
                  ) : (
                    <p className="pImg">
                      Arrastra y suelta una imagen aquí o haz clic para
                      seleccionar una imagen
                    </p>
                  )}
                </div> */}
                {/* <Form.Input
                  name="imagen"
                  placeholder="Seleccione un archivo"
                  label="Imagen del evento"
                  type="file"
                  onChange={handleChange}
                /> */}
              </Form.Field>
              {/* <Form.Field>
                <TimePicker />
              </Form.Field> */}
              <Form.Field>
                <Form.Input
                  name="ubicacion"
                  placeholder="Ubicacion"
                  label="Ubicacion"
                  onChange={handleChange}
                  value={selectedAddress}
                />
              </Form.Field>
              <Button color="teal" fluid size="large" type="submit">
                Submit
              </Button>
              {message && <Message>{message}</Message>}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
      <MapPicker onAddressChange={updateSelectedAddress} />
    </div>
  );
};
