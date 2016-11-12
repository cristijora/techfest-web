/**
 * Created by cristian.jora on 30.10.2016.
 */
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
import config from './../config/apiRoutes'
import toastr from 'toastr'

const store = new Vuex.Store({
  state: {
    user: null,
    errorMessage: '',
    products:[],
    payments:[],
    lastPayments:[],
    totalPayments:0
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setErrorMessage(state, message){
      state.errorMessage = message;
    },
    setPayments(state,payments){
      state.payments = payments;
    },
    setLastPayments(state,payments){
      state.lastPayments = payments;
    },
    setProducts(state, products){
      state.products = products;
    },
    addPayment(state,payment){
      state.payments.unshift(payment);
      var lastPayment={
        date:payment.date,
        amount:payment.amount
      }
      state.lastPayments.unshift(lastPayment);
      state.user.balance+=payment.amount;
      state.totalPayments+=1;
    },
    setPaymentCount(state,count){
      state.totalPayments=count;
    }
  },

  actions: {
    addPayment({commit},payment){
      commit(types.ADD_PAYMENT,payment);
    },
    login({commit}, user){
      commit(types.SET_ERROR_MESSAGE, "");
      Vue.http.post(config.routes.login, user).then((response) => {
        console.log(response.data);
        var data = response.data;
        if (data.id) {
          var userData={
            token:data.id,
            id:data.userId
          };
          commit(types.SET_USER, data.user);
          localStorage.setItem("user", data.user.id);
          localStorage.setItem("userData", JSON.stringify(data.user));
          Vue.http.headers.common['Authorization'] = data.id;
        };
      }, (response) => {
        console.log(response.data);
        if (response.data && response.data.error && response.data.error.message) {
          commit(types.SET_ERROR_MESSAGE, response.data.error.message)
        }
        else {
          commit(types.SET_ERROR_MESSAGE, "Could not connect to the server")
        }
      });
    },

    getPayments({commit, state}){
      var userId = state.user.id;
      var route = config.routes.payments +"?filter[where][receiverId]="+state.user.id+"&filter[include]=sender&filter[include]=receiver&filter[order]=date%20DESC&filter[limit]=10";
      Vue.http.get(route).then((response) => {
        commit(types.SET_PAYMENTS, response.data);
      }, (response)=> {
        handleError(response, commit);
      })
    },
    getPaymentCount({commit,state}){
      var route =config.routes.paymentCount+state.user.id;
      Vue.http.get(route).then((response) => {
        commit(types.SET_PAYMENT_COUNT, response.data.count);
      }, (response)=> {
        handleError(response, commit);
      })
    },
    getLastPayments({commit,state}){
      var route =config.routes.lastPayments+state.user.id;
      Vue.http.get(route).then((response) => {

        commit(types.SET_LAST_PAYMENTS, response.data);
      }, (response)=> {
        handleError(response, commit);
      })
    }

  },

  getters: {
    user: state => {
      return state.user;
    },
    payments: state => {
      return state.payments;
    },
    totalPayments:state=>state.totalPayments,
    lastPayments:state=>state.lastPayments
  }

});

var types = {
  SET_USER: 'setUser',
  SET_PAYMENTS: 'setPayments',
  SET_LAST_PAYMENTS: 'setLastPayments',
  SET_PAYMENT_COUNT: 'setPaymentCount',
  SET_ERROR_MESSAGE:'setErrorMessage',
  ADD_PAYMENT:'addPayment'
};

function handleError(response, commit) {
  console.log(response.data);
  if (response.data && response.data.message) {
    commit(types.SET_ERROR_MESSAGE, response.data.message)
    toastr.error(response.data.message, "Something went wrong!")
  }
  else {
    var msg = "Could not connect to the server";
    commit(types.SET_ERROR_MESSAGE, msg)
    toastr.error(msg, "Something went wrong!")
  }
}

export default store;
