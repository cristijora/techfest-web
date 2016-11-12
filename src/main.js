import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//plugin setup
Vue.use(VueRouter);
Vue.use(VueResource);

/*import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
import VuetablePaginationDropdown  from 'vuetable-2/src/components/VuetablePaginationDropdown.vue';

Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination)
Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown)*/
import App from './App'

//router setup
import routes from './routes/routes'
const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})


  router.beforeEach(function (to, from, next) {
    var store = router.app.$store;
    initializeStateFromLocalStorage(router.app.$store);
    next()
  })

function initializeStateFromLocalStorage(store) {
  var state = store.state;
  if (!state.user) {
    let user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      store.commit('setUser', user);
    }
  }
  if(state.token) return;
  let token =  localStorage.getItem('token');
  if(token){
    store.commit('setToken',token);
  }

}
//vuex store
import store from './vuex/store'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

Vue.http.options.xhr = {withCredentials: true}
