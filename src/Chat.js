import React, { useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import "./App.css";

function Chat({ user }) {
  // Assuming 'user' prop contains the current user's information
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:3001");

    websocket.onmessage = event => {
      const messageData = JSON.parse(event.data);
      displayMessage(messageData.text, messageData.sender);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [user.email]);

  const sendMessage = () => {
    if (message === "") {
      alert("Please enter a message")
      return;
    }

    if (ws.readyState === WebSocket.OPEN) {
      const messageData = { text: message, sender: user.email };
      ws.send(JSON.stringify(messageData));
      displayMessage(message, true, user.email);
      setMessage("");
    } else {
      alert("No WebSocket connection :(");
      console.log("No WebSocket connection :(");
    }
  };

  const displayMessage = (message, sender, sender_name) => {
    const isCurrentUser = sender_name === user.email;
    console.log(isCurrentUser)
    const newMessage = { text: message, sender, isCurrentUser };
    setMessages(prevMessages => prevMessages.concat(newMessage));
  };

  return (
    <div className="App">
      <FadeIn>
        <h1>Global Chat</h1>
        <p>
          Chat with other users here by typing in the box below and clicking the
          "Send" button!
        </p>
        <fieldset>
          <div
            id="messages"
            style={{ height: "60vh", overflow: "scroll", wordWrap: "break-word" }}
          >
            {messages.map((msg, index) => (
              <p
                key={index} style={{ color: msg.isCurrentUser ? "green" : "black" }}
              >
                {msg.isCurrentUser ? "You" : msg.sender}: {msg.text}
              </p>
            ))}
          </div>

          <input
            type="text"
            id="messageBox"
            placeholder="Enter message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            id="send"
            title="Send Message"
            style={{ display: "block", width: "100%" }}
            className="btn waves-effect icon-link center"
            onClick={sendMessage}
          >
            Send
          </button>
        </fieldset>
      </FadeIn>
    </div>
  );
}

export default Chat;
