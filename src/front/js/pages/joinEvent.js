import React, { useState } from 'react';

function EventDetail(props) {
  const [joined, setJoined] = useState(false);

  function handleJoinEvent() {
    fetch('/api/events/' + props.event.id + '/join', {
      method: 'POST',
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        setJoined(true);
      }
    });
  }

  return (
    <div>
      <h1>{props.event.name}</h1>
      <p>{props.event.description}</p>
      {joined ? (
        <p>You have joined this event.</p>
      ) : (
        <button onClick={handleJoinEvent}>Join Event</button>
      )}
    </div>
  );
}