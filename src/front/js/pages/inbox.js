import React, { useContext, useRef, useState } from "react";
// import { Context } from "../store/appContext";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { Button } from "semantic-ui-react";
import { async } from "@firebase/util";
import "../../styles/inbox.css";

firebase.initializeApp({
  apiKey: "AIzaSyB-d4_LjPuLy2Yyg1Llqtb4bmJbZsxs1gw",
  authDomain: "chatevento1.firebaseapp.com",
  projectId: "chatevento1",
  storageBucket: "chatevento1.appspot.com",
  messagingSenderId: "510865355547",
  appId: "1:510865355547:web:6ef466e41f3e872746d9be",
  measurementId: "G-481LG8DY42",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignIn() {
  const signGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button className="sign" onClick={signGoogle}>Sign in with Google</button>
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign" onClick={() => auth.signOut()}>
        {" "}
        Sign Out{" "}
      </button>
    )
  );
}

function Chat() {
  const messagesRef = firestore.collection("messages");

  const consulta = messagesRef.orderBy("createdAt");  //.limit(number)

  const [messages] = useCollectionData(consulta, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const jumpBottom = useRef()

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    jumpBottom.current.scrollIntoView({behavior: 'smooth'})
  };

  return (
    <div>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <div ref={jumpBottom}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input className="inputChat"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit"> Send </button>
      </form>
    </div>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`} key={uid}>
      <img className="avatarChat" src={photoURL} />
      <p className="parrafo">{text}</p>
    </div>
  );
}

export const Inbox = () => {
  //   const { store, actions } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <div className="chat">
      <header>
        <SignOut />
      </header>
		{/* project.meetmeup@gmail.com - 4geeks4life */}
      <section>{user ? <Chat /> : <SignIn />}</section>
      {/* <section><Chat /></section> */}
    </div>
  );
};
