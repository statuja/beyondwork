import "./App.css";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  // handler functions
  const sendToServer = () => {
    // connect with server endpoint here(may be with data or without data)
    fetch("http://localhost:5000/server/test", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        data: username,
      }),
    })
      // get response back here
      .then((response) => response.json())
      .then((message) => console.log(message))
      // show error if no response
      .catch(() => console.log("failed response"));
  };
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <button onClick={sendToServer}>Send</button>
      </header>
    </div>
  );
}

export default App;
