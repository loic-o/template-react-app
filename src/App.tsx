import './App.css';
import { useEffect, useState } from 'react';
import HomeScreen from './Components/ConfigInformation';
import { BrowserRouter, Route } from "react-router-dom"
import AuthenticationConfirmation from './Components/AuthenticationConfirmation';
import AuthenticationService from './Services/AuthenticationService';

//add HXP auth support to the template....that'll demo better in the paper we have to write for this.
function App() {
  let [config, setConfig] = useState<any | null>(null) 
  let [token, setToken] = useState<string | null>(null)

  function fetchConfig() {
    fetch("config.json")
      .then(resp => resp.json())
      .then(conf => {
        setConfig(conf)
        fetchToken(conf)
      })
  }
  
  function fetchToken(config : any) {
    if(window.location.pathname === "/") {
      let authService = new AuthenticationService(config.idpConfig)
      authService.getToken()
    }
  }

  function onAuthenticated(token: string) {
    setToken(token)
  }

  useEffect(() => {
    if(config === null) {
        fetchConfig()
    }
  })

  if(config === null && token == null) {
    return <p>Loading...</p>
  }

  return  <BrowserRouter> 
      <Route exact path="/" render={(props) => <HomeScreen accessToken={token as string} config={config} />}></Route>
      <Route path="/authentication-confirmation" render={(authProps) => <AuthenticationConfirmation idpConfig={config.idpConfig} history={authProps.history} match={authProps.match} location={authProps.location} onAuthenticated={onAuthenticated} />} />
  </BrowserRouter>
}

export default App;
