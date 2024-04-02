import React, { useState, useEffect } from "react";
import "./App.css";

function Chat({ user }) {
  // Assuming 'user' prop contains the current user's information
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:3001");

    websocket.onopen = () => console.log("Connected to the chat server");
    websocket.onmessage = event => {
        const messageData = JSON.parse(event.data);
        displayMessage(messageData.text, messageData.sender);
    };
    
    websocket.onclose = () => console.log("Disconnected from the chat server");

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [user.given_name]);

  const sendMessage = () => {
    console.log(user.given_name);
    if (ws) {
      const messageData = { text: message, sender: user.given_name };
      ws.send(JSON.stringify(messageData));
      displayMessage(message, true, user.given_name);
      setMessage("");
    } else {
      console.log("No WebSocket connection :(");
    }
  };

  const displayMessage = (message, sender, sender_name) => {
    const isCurrentUser = sender_name === user.given_name;
    console.log(isCurrentUser)
    const newMessage = { text: message, sender, isCurrentUser };
    setMessages(prevMessages => prevMessages.concat(newMessage));
  };

  return (
    <div className="container">
      <h1>Classifieds Global Chat</h1>
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
          style={{ display: "block", width: "100%", padding: "10px" }}
          onClick={sendMessage}
        >
          Send
        </button>
      </fieldset>
    </div>
  );
}

export default Chat;
