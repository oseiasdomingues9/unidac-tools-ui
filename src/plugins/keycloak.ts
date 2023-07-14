import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'
import Keycloak from "keycloak-js";
import { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types";


export const keycloak = {
    install(app : any) {
        app.use(VueKeycloakJs,{
            init: {
                onLoad: "login-required",                
                pkceMethod: 'S256',
                checkLoginIframe: false
            },
            config: {
                url: 'http://localhost:8180/',
                clientId: 'unidac-tools-ui',
                realm: 'unidac-tools'
            },
            onReady (keycloak: Keycloak) {
                console.log('Keycloak ready', keycloak)
                app.provide('keycloak', keycloak)
            } 
        })
    }
}
  
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties  {
      $keycloak: VueKeycloakInstance
    }
}



