import React, { useEffect, useState } from "react"

interface HomeScreenProps {
    config : any
}

export default function HomeScreen(props: HomeScreenProps) {    
  let [imageSrc, setImageSrc] = useState("")
  let onbaseToken = props.config.onbaseToken
  
    useEffect(() => {
      if(imageSrc === "") {
        fetchImage()
      } 
    })

  if(onbaseToken === "") {
      return <p>Use the devportal to generate an onbase token and place that in your config.json</p>
  }

  function fetchImage() {
    fetch(`${props.config.devportalUrl}/OnBase/Document/${props.config.docId}/jpeg/1`, 
      {
        method: "GET",
        headers: { "x-onbase-token" : onbaseToken }
      })
      .then(resp => resp.blob())
      .then(blob => setImageSrc(URL.createObjectURL(blob)))
  }

  return <div className="App">
    <header className="App-header">
      {
          imageSrc === "" ? <></> : <img src={imageSrc} alt="onbase image"/>
      }
    </header>
  </div>
}