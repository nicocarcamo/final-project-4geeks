import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export function OrganizacionEvento() {
 

  return (
    <div id="album" class="d-flex justify-content-center my-5">
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
            <a class="author">Matt</a>
            <div class="metadata">
              <span class="date">Today at 5:42PM</span>
            </div>
            <div class="text">How artistic!</div>
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
            <a class="author">Elliot Fu</a>
            <div class="metadata">
              <span class="date">Yesterday at 12:30AM</span>
            </div>
            <div class="text">
              <p>This has been very useful for my research. Thanks as well!</p>
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
                <a class="author">Jenny Hess</a>
                <div class="metadata">
                  <span class="date">Just now</span>
                </div>
                <div class="text">Elliot you are always so right :)</div>
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
            <a class="author">Joe Henderson</a>
            <div class="metadata">
              <span class="date">5 days ago</span>
            </div>
            <div class="text">Dude, this is awesome. Thanks so much</div>
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
