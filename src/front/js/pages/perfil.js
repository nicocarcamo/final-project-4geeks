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

  //   return (
  //     <div className="profileBackground">
  // 		<div className="blurProfile"></div>
  //       <div className="contentProfile">
  //         <Grid className="gridProfile"
  //           textAlign="center"
  //           // style={{ height: "90vh" }}
  //           verticalAlign="middle"
  //         >
  //           <Grid.Column style={{ maxWidth: 450 }}>
  //             <Header className="headerProfile" as="h2" textAlign="center">
  //               {/* <Image src="/rigo-baby.jpg" />  */}
  //               Mi perfil
  //             </Header>
  //             <div className="container d-flex justify-content-center mt-5">
  //               <Card className="cardProfile"
  //                 // image={"https://robohash.org/" + store.profile?.username + ".png"}
  //                 image="https://xsgames.co/randomusers/avatar.php?g=pixel"
  //                 header={store.profile?.username}
  //                 meta={store.profile?.firstname + " " + store.profile?.lastname}
  //                 description={store.profile?.email}
  //                 extra={extra}
  //               />
  //             </div>
  //             <Button color="teal" size="medium" type="submit" className="mt-2">
  //               Edit Profile
  //             </Button>
  //           </Grid.Column>
  //         </Grid>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "90vh", border: "thin solid lightgray" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <div className="container d-flex justify-content-center mt-5">
            <h1>Mi Perfil</h1>
          </div>
          <div className="container d-flex justify-content-center m-2">
            <Card
              style={{
                borderRadius: "50%",
                width: "250px",
                height: "250px",
                objectFit: "cover",
                overflow: "hidden",
                margin: "0 auto",
                border: "thin solid lightgray",
              }}
              image={"https://robohash.org/" + store.profile?.id + ".png"}
              // image="https://xsgames.co/randomusers/avatar.php?g=pixel"
              header={store.profile?.username}
              meta={store.profile?.firstname + " " + store.profile?.lastname}
              description={store.profile?.email}
              extra={extra}
            />
          </div>
          <Card className="container d-flex justify-content-center">
            <div>
              <h3 className="container d-flex justify-content-center my-2">
                {store.users?.username}
              </h3>
            </div>

            <div>
              <h6 className="container d-flex justify-content-center my-1">{`${store.profile?.firstname} ${store.profile?.lastname}`}</h6>
            </div>
            <div>
              <p className="container d-flex justify-content-center mb-3">{`${store.profile?.email}`}</p>
            </div>
          </Card>

          <Button color="teal" size="medium" type="submit" className="mt-2">
            Editar mi Perfil{" "}
          </Button>
        </Grid.Column>
      </Grid>
    </>
  );
};
