import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import '../styles/Chatbot.css';

const StreamlitEmbed = () => {
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState([]);

  const sendQuestion = async () => {
    if (!question.trim()) return; // Prevent sending empty questions
    try {
      const res = await api.post("/vote/chatbot/", { question });
      setResponses([...responses, res.data.answer]);
      setQuestion("");
    } catch (error) {
      console.error("Error sending question:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="streamlit-embed">
        <div className="header">
          <h3>Ask me to Learn More</h3>
          <p>Type your question below and get instant answers!</p>
        </div>
        <div className="chat-section">
          <div className="input-container">
            <input
              type="text"
              className="question-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button className="send-button" onClick={sendQuestion}>
              Ask
            </button>
          </div>
          <div className="responses-container">
            {responses.length === 0 && <p>No responses yet. Ask something!</p>}
            {responses.map((response, index) => (
              <div key={index} className="response">
                <span>🤖</span> {response}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StreamlitEmbed;
