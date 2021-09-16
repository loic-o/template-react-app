import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [config, setConfig] = useState(null) 
  
  function fetchConfig() {
    fetch("config.json")
      .then(resp => resp.json())
      .then(conf => setConfig(conf))
  }
  
  useEffect(() => {
    if(config === null) {
        fetchConfig()
    }
  })

  if(config === null) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Config Values
        </p>
        {
          Object.keys(config).map(key => 
                <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                  <p>{key}</p>
                  <p>{config[key]}</p>
                </div>)
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
