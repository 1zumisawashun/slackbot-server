import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { functions, httpsCallable } from "./libs/firebase";
import { pushToSlack } from "./helpers/pushToSlack";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const helloWorld = httpsCallable(functions, "helloWorld");
  const url = import.meta.env.VITE_SLACK_INCOMING_WEBHOOK;

  const handleClick = () => {
    helloWorld();
    // helloWorld({ name: "shun" }).then((result) => {
    //   console.log("success");
    //   const data = result.data;
    //   alert(data);
    // });
  };

  const handleSlack = () => {
    const data = {
      text: "yo some text",
    };
    axios.post(url, JSON.stringify(data));
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleSlack}>slack</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
