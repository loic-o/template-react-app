import { encode as base64encode } from "base64-arraybuffer";
const randomstring = require("randomstring");

export interface IdpConfig {
    idpUrl: string
    response_type: string
    client_id: string
    redirect_uri: string
    scope: string
}

export default class AuthenticationService {
    constructor(private idpConfig: IdpConfig) {

    }
    
    async getToken() {
        var code_verifier = randomstring.generate(128);
        this.generateCodeChallenge(code_verifier).then(challenge => {
            localStorage.setItem("pkce_code_verifier", code_verifier);            
            const idpUrl = `${this.idpConfig.idpUrl}/connect/authorize?response_type=${this.idpConfig.response_type}&client_id=${this.idpConfig.client_id}&redirect_uri=${this.idpConfig.redirect_uri}&scope=${this.idpConfig.scope}&code_challenge=${challenge}&code_challenge_method=S256`
            window.location.href  = idpUrl
        })
    }

    //base-64url encode the hash of the string
    private async generateCodeChallenge(codeVerifier : string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest("SHA-256", data);
        return base64encode(digest)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=/g, "");
      }
}