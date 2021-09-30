import React, { useEffect, useState } from "react"

//get cors working locally and get the document name out by the end of the day tomorrow... "_____"
interface HomeScreenProps {
    config : any
}

export default function HomeScreen(props: HomeScreenProps) {    
  let [name, setName] = useState("")
  let onbaseToken = props.config.onbaseToken
  
  useEffect(() => {
    if(name === "" && !onbaseToken.startsWith("use")) {
      fetchDocumentName()
    }
  })

  if(onbaseToken === "") {
      return <p>Use the devportal to generate an onbase token and place that in your config.json</p>
  }
    
  function fetchDocumentName() {
    fetch(`${props.config.devportalUrl}/OnBase/Document/${props.config.docId}`, {
      method: "GET",
      headers: { "content-type" : "application/json", "x-onbase-token" : onbaseToken }
    })
      .then(resp => resp.json())
      .then(document => setName(document.name))
      .catch(err => {
        setName("unable to get document name see dev tools for more information")
        console.log(err)
      })
  }

  return <div className="App">
    <header className="App-header">
      <p>Document name: {name}</p>
    </header>
  </div>
}