import { useEffect, useState } from 'react';
import './App.css';
import HomeScreen from './Components/ConfigInformation';

//can we get hxp auth working without having to make an idp client for each application? 
//we should be able to do that if we use the state prameter in the devportal 
//so that would redirect users to the app and do the token injection...
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
