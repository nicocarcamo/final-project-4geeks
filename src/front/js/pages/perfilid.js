import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card, Header, Button, Grid, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import {Icon} from 'semantic-ui-react'


export const PerfilId = () => {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();

    //icon importation
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = 
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

  useEffect(() => {
    if (!store.currentUser) navigate("/login");
  }, []);

  useEffect(() => {
    actions
      .getUser(id)
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>Loading...</div>;

  const extra = (
    <a>
      <i className="fa-solid fa-location-dot me-1"></i>
      16 Events near you!
    </a>
  );

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "90vh", border: "thin solid lightgray" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <div className="container d-flex justify-content-center mt-5">
            <h1>Perfil de Usuario</h1>
          </div>
          <div className="container d-flex justify-content-center m-2">
            <Image
              src={`https://robohash.org/${id}.png`}
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                objectFit: "cover",
                overflow: "hidden",
                margin: "0 auto",
                border: "thin solid lightgray",
              }}
            />
          </div>
          <Card className="container d-flex justify-content-center">

              <div>
                <h3 className="container d-flex justify-content-center my-2">
                  {store.users?.username}
                </h3>
              </div>

              <div>
                <h6 className="container d-flex justify-content-center my-1">{`${store.users?.firstname} ${store.users?.lastname}`}</h6>
              </div>
              <div>
                {" "}
                <p className="container d-flex justify-content-center mb-3">{`${store.users?.email} ${store.users?.is_active}`}</p>
              </div>
          </Card>

          <Button color="teal" size="medium" type="submit" className="mt-2">
Follow          </Button>
        </Grid.Column>
      </Grid>
    </>
  );
};
