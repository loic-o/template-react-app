import React from "react"

//fix this so it builds, and make sure we can import builds, deplouy them, etc...
interface HomeScreenProps {
    config : any
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
          Object.keys(props.config).filter(key => key !== "idpConfig").map(key => <div>
              <p>{key}</p>
              <p>{props.config[key]}</p>
            </div>)
        }
      </div>
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