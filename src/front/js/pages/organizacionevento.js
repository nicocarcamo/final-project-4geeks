import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import {Icon} from 'semantic-ui-react'

export function OrganizacionEvento() {
   //icon importation
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const { store, actions } = useContext(Context);
   const styleLink = document.createElement("link");
   styleLink.rel = "stylesheet";
   styleLink.href = 
   "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
   document.head.appendChild(styleLink);

  return (
    <div id="album" class="d-flex justify-content-center my-5">
            <div className="backgroundCrearE"></div>
      <div class="ui piled compact segment p-4">
        <div class="floating ui red label">9</div>
        <div class="ui card">
          <div class="blurring dimmable image">
            <div class="ui inverted dimmer">
              <div class="content">
                <div class="center">
                  <div class="ui red button view">Ver</div>
                </div>
              </div>
            </div>
            <img class="center" src="src/front/img/rigo-baby.jpg" />
          </div>
          <span class="date  d-flex justify-content-end mx-4">
            <i class="history icon"></i>
            05/01/2023
          </span>
          <div class="content m-3">
            <div class="meta"></div>
            <div class="m-2">
              <h2>Nombre Evento</h2>
              <div class="description">Descripción:</div>
              <div class="description">Integrantes:</div>
              <div class="description">Ubicación:</div>
              <div class="description">Pubico</div>
              <div class="description">Valor</div>
              <Link to="/unirseevento" class="my-4 d-flex justify-content-end">
                Volver a eventos
                <i class="calendar icon red"> </i>
              </Link>
            </div>
          </div>
          <div class="extra content">
            <div class="ui right labeled button" tabindex="0">
            </div>
            <div class="ui left labeled right floated button" tabindex="0">
              <a class="ui basic green right pointing label">Compartir!</a>
              <div class="ui red icon tiny button">
                <i class="external share large icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui threaded comments mx-5">
        <h3>Conversa con los otros integrantes!</h3>
        <div class="comment">
          <a class="avatar">
            <img src="/images/avatar/small/matt.jpg" />
          </a>
          <div class="content">
            <a class="author">Matías</a>
            <div class="metadata">
              <span class="date">Hoy a las 5:42PM</span>
            </div>
            <div class="text">Nos vemos hoy?</div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
        </div>
        <div class="comment">
          <a class="avatar">
            <img src="/images/avatar/small/elliot.jpg" />
          </a>
          <div class="content">
            <a class="author">Roberto Celedón</a>
            <div class="metadata">
              <span class="date">Ayer a las 12:30AM</span>
            </div>
            <div class="text">
              <p>Sí, recuerden llevar pelota!</p>
            </div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
          <div class="comments">
            <div class="comment">
              <a class="avatar">
                <img src="/images/avatar/small/jenny.jpg" />
              </a>
              <div class="content">
                <a class="author">Camila Ibañez</a>
                <div class="metadata">
                  <span class="date">Ahora</span>
                </div>
                <div class="text">Sí! Yo llevo la mía</div>
                <div class="actions">
                  <a class="reply">Reply</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment">
          <a class="avatar">
            <img src="/images/avatar/small/joe.jpg" />
          </a>
          <div class="content">
            <a class="author">Caro</a>
            <div class="metadata">
              <span class="date">5 días atrás</span>
            </div>
            <div class="text">Acuérdense que va a hacer calor, lleven agua!</div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
        </div>
        <form class="ui reply form">
          <div class="field">
            <textarea></textarea>
          </div>
          <div class="ui blue labeled submit icon button">
            <i class="icon edit"></i> Add Reply
          </div>
        </form>
      </div>
    </div>
  );
}
