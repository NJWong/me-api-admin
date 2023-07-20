import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

import './style.css'

import App from './App.vue'
import { createAppRouter } from './router'

const app = createApp(App)

app.use(createAppRouter(app))
app.use(VueQueryPlugin)

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH_0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH_0_AUDIENCE,
    }
  })
)

app.mount('#app')
