import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card, Header, Button, Grid, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import fondo from "../../img/mountain-wall-mural-peel-stick-152953_1800x1800.webp";
import "../../styles/perfil.css";

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.currentUser) navigate("/login");
    actions.getProfile();
  }, []);

  const extra = (
    <a>
      <i className="fa-solid fa-location-dot me-1"></i>
      16 Events near you!
    </a>
  );

  return (
    <div className="profileBackground">
		<div className="blurProfile"><img src={fondo}/></div>
      <div className="contentProfile">
        <Grid
          textAlign="center"
          style={{ height: "90vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header className="headerProfile" as="h2" textAlign="center">
              {/* <Image src="/rigo-baby.jpg" />  */}
              Mi perfil
            </Header>
            <div className="container d-flex justify-content-center mt-5">
              <Card className="cardProfile"
                // image={"https://robohash.org/" + store.profile?.username + ".png"}
                image="https://xsgames.co/randomusers/avatar.php?g=pixel"
                header={store.profile?.username}
                meta={store.profile?.firstname + " " + store.profile?.lastname}
                description={store.profile?.email}
                extra={extra}
              />
            </div>
            <Button color="teal" size="medium" type="submit" className="mt-2">
              Edit Profile
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};
