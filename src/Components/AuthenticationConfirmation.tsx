import React, { useEffect } from "react"
import { RouteComponentProps } from "react-router"
import { IdpConfig } from "../Services/AuthenticationService"

//add HXP login support to the template that's going to be huge for selling this...
interface AuthenticationConfirmationProps extends RouteComponentProps {
    idpConfig: IdpConfig
    onAuthenticated(token: string) : void
}

export default function AuthenticationConfirmation(props: AuthenticationConfirmationProps) {
    console.log("auth confirm render", props.idpConfig)
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code')
        if(code == null) {
            throw 'unable to get authentication'
        }
    
        fetch('https://auth.iam.dev.hxp.hyland.com/idp/connect/token', {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': "authorization_code",
                'code': code,
                'redirect_uri': props.idpConfig.redirect_uri,
                'code_verifier': localStorage.getItem("pkce_code_verifier") as string,
                'client_id': props.idpConfig.client_id
            })
          })
          .then(resp => resp.json())
          .then(token => {
                console.log("token recieved", token)
                if(token.error) {
                    throw 'unable to get token ' + token.error
                }
    
                props.onAuthenticated(token.access_token)
                props.history.push("/")
            })
            .catch(err => {
                console.log(err)
                throw "unable to perform token exchange"
            }) 
    },[])

    return <div>Loading...</div>
}