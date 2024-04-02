import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure that this imports the necessary CSS for your chat component

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:3001");

        websocket.onopen = () => console.log("A client connected");
        websocket.onmessage = event => {
            const newMessage = event.data;
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };
        websocket.onclose = () => console.log("A client disconnected");

        setWs(websocket);

        // Cleanup on component unmount
        return () => {
            websocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws) {
            ws.send(message);
            setMessages(prevMessages => [...prevMessages, message]);
            setMessage('');
        } else {
            console.log("No WebSocket connection :(");
        }
    };

    return (
        <div className="container">
            <h1>Classifieds Global Chat</h1>
            <p>
                Chat with other users of the TMU classifieds here by typing in the box below and clicking the "Send" button!
            </p>
            <fieldset>
                <div id="messages" style={{ height: '60vh', overflow: 'scroll', wordWrap: 'break-word' }}>
                    {messages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>

                <p>
                    <input 
                        type="text" 
                        id="messageBox" 
                        placeholder="Enter message here"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </p>
                <p>
                    <button 
                        id="send" 
                        title="Send Message" 
                        style={{ display: 'block', width: '100%', padding: '10px' }}
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </p>
            </fieldset>
        </div>
    );
}

export default Chat;
