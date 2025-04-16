export const httpConfig = {
    port: 3000,
    hostname: "localhost",
    tls: false,
    portSecure: null,
    key: null,
    cert: null,
    autoListen: true
}

export const jwtConfig = {
    secret: "Cogito Ergo Soup", 
    expiration: "10s", 
    issuer: "guust", 
    maxAge: "1h"
}


export const connectIdConfig = null; // Ill figgure this out later