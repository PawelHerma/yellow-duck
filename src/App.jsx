import React, { useState } from "react";
import "./App.css";
const responses = [
  "Rozumiem",
  "Okej, w jaki sposób chciałbyś/chciałabyś to zrobić?",
  "Co dalej?",
  "W jaki sposób masz zamiar to osiągnąć?",
  "Jaki masz na to pomysł?",
  "To jest dobry pomysł",
  "Jak chcesz to rozwinąć?",
];

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    const response =
      responses[Math.floor(Math.random() * responses.length)];

    setMessages([
      ...messages,
      { message: input, user: true },
      { message: response, user: false },
    ]);

    setInput("");
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

export default App;