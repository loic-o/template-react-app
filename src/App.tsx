import { useEffect, useState } from 'react';
import './App.css';
import HomeScreen from './Components/ConfigInformation';

function App() {
  let [config, setConfig] = useState<any | null>(null) 

  function fetchConfig() {
    fetch("config.json")
      .then(resp => resp.json())
      .then(conf => {
        setConfig(conf)
      })
  }
  
  useEffect(() => {
    if(config === null) {
        fetchConfig()
    }
  })

  if(config === null) {
    return <p>Loading...</p>
  }
  return <HomeScreen config={config} />
}

export default App;
