import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

Vue.use(VueApollo)

new Vue({
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
