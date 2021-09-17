import React from "react"

//make this look better and then check it in :)

interface HomeScreenProps {
    config : any
    accessToken: string
}

export default function HomeScreen(props: HomeScreenProps) {    
    return <div className="App">
    <header className="App-header">
      <img src="logo.svg" className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <p>
        Here are your Config Values
      </p>
      <div>
        {
          Object.keys(props.config).filter(key => key != "idpConfig").map(key => <div>
              <p>{key}</p>
              <p>{props.config[key]}</p>
            </div>)
        }
      </div>
      <p>
        Here's your HXP access token this is for demonstration purposes and shouldn't be shown in production.
      </p>
      <p>{props.accessToken}</p>
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
}