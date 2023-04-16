import React, { useState } from "react";
import axios from 'axios';
import "./AppPremium.css";


function AppPremium() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    const response = axios.post('http://localhost:8080/api/chat', {
      message: input
    }).then(response => {
      const { message } = response.data
      console.log(response.data)
  
      setMessages([
        ...messages,
        { message: input, user: true },
        { message: message, user: false },
      ]);
  
      setInput("");
    })
  };

  return (
    <div className="App">
      <div className="chat">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? "user" : "bot"}`}
          >
            <div className="message-content">{message.message}</div>
          </div>
        ))}
        <div className="input">
          <input value={input} onChange={handleInput} />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default AppPremium;