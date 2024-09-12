// import { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [input, setInput] = useState("");
//   const [ans, setAns] = useState("");
//   const inputBox = (e) => {
//     setInput(e.target.value);
//   };
//   async function generateAnswer() {
//     console.log("...loading");
//     const response = await axios({
//       url: " https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCJQ1Dd37sxXWLdfbzPhWIjEQoi8llJiAI",
//       method: "post",
//       data: { contents: [{ parts: [{ text: input }] }] },
//     });

//     setAns(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
//     setInput("");
//   }
//   return (
//     <>
//       <div>
//         <h1>my ai companion</h1>
//         <textarea
//           cols="30"
//           rows="30"
//           value={input}
//           placeholder="ask me anything"
//           onChange={inputBox}
//         ></textarea>
//         <button onClick={generateAnswer}>generate ans</button>
//         <p>{ans}</p>
//       </div>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputBox = (e) => {
    setInput(e.target.value);
  };

  async function generateAnswer() {
    setLoading(true);
    console.log("...loading");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCJQ1Dd37sxXWLdfbzPhWIjEQoi8llJiAI",
      method: "post",
      data: { contents: [{ parts: [{ text: input }] }] },
    });

    const answer =
      response["data"]["candidates"][0]["content"]["parts"][0]["text"];

    setChat([...chat, { question: input, answer }]);
    setInput("");
    setLoading(false);
  }

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat with me</h1>
      <div className="chat-box">
        {chat.map((item, index) => (
          <div key={index} className="chat-message">
            <p className="question">You: {item.question}</p>
            <div className="answer">
              {item.answer.split("\n").map((line, i) => (
                <p key={i}> {line}</p>
              ))}
            </div>
          </div>
        ))}
        {loading && <p className="loading">Loading...</p>}
      </div>
      <div className="input-section">
        <textarea
          className="chat-input"
          cols="30"
          rows="2"
          value={input}
          placeholder="Ask me anything..."
          onChange={inputBox}
        ></textarea>
        <button className="send-button" onClick={generateAnswer}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
