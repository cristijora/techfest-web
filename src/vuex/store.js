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
    mood: [],
    behaviour: [],
    events: []
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setToken(state, token){
      state.token = token;
      localStorage.setItem("token", state.token);
    },
    setErrorMessage(state, message){
      state.errorMessage = message;
    },
    setUserSettings(state, settings){
      state.user.settings = settings;
      localStorage.setItem("userData", JSON.stringify(state.user));
    },
    setMood(state, mood){

      state.mood = mood;
    },
    setBehavior(state, behavior){
      behavior.forEach((el)=> {
        el.checked = false
      });
      state.behaviour = behavior;
    },

    setEvents(state, events){
      state.events = events;
    }
  },

  actions: {
    login({commit}, params){
      commit(types.SET_ERROR_MESSAGE, "");

      Vue.http.post(config.routes.login, params.user).then((response) => {
        console.log(response.data);
        var data = response.data;
        if (data.id) {
          var userData={
            token:data.id,
            id:data.userId
          };
          commit(types.SET_USER, userData);
          commit(types.SET_TOKEN, userData.token);
          localStorage.setItem("user", data.userId);
          localStorage.setItem("userData", JSON.stringify(userData));
          Vue.http.headers.common['Authorization'] = data.id;
          store.dispatch('getSettings');
        };
        params.successCallback();
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

    register({commit}, params){
    },

    getSettings({commit, state}){
      var userId = state.user.userId ? state.user.userId : state.user.id;
      var route = config.routes.get_settings + userId;
      Vue.http.headers.common['authorization'] = state.token;
      Vue.http.get(route).then((response) => {
        commit(types.SET_USER_SETTINGS, response.data.settings);
        commit(types.SET_USER, response.data);
      }, (response)=> {
        handleError(response, commit);
      })
    },

    updateSettings({commit, state}, params){
      var userId = state.user.userId ? state.user.userId : state.user.id;
      var route = config.routes.get_settings + userId;
      commit(types.SET_USER_SETTINGS, params.settings)
      Vue.http.headers.common['authorization'] = state.token;
      Vue.http.put(route, state.user).then((response) => {
        //Successfully updated settings
        commit(types.SET_USER_SETTINGS, response.data.settings);
        params.successCallback();
      }, (response)=> {
        handleError(response, commit);
      })
    },

    getMoodData({commit, state}, page){
      Vue.http.headers.common['Authorization'] = state.user.token;
      var userId = state.user.userId ? state.user.userId : state.user.id;
      var pageNumber = page;
      if (!page) pageNumber = 1;
      var route = config.routes.get_mood;

      Vue.http.get(route).then((response) => {
        commit(types.SET_MOOD, response.data);
      }, (response)=> {
        handleError(response, commit);
      })
    },

    getBehaviourData({commit, state}, page){
      Vue.http.headers.common['authorization'] = state.token;
      var pageNumber = page;
      if (!page) pageNumber = 1;
      var route = config.routes.get_behaviour;

      Vue.http.get(route).then((response) => {
        commit(types.SET_BEHAVIOR, response.data);
      }, (response)=> {
        handleError(response, commit);
      })
    },

    getEvents({commit, state}, callback){
      var route = config.routes.getEvents + state.user.id;
      Vue.http.headers.common['authorization'] = state.token;
      Vue.http.get(route).then((response) => {
        commit(types.SET_USER_EVENTS, response.data);
        callback();
      }, (response)=> {
        handleError(response, commit);
      })
    },

    addEvents({commit, state}, params){
      var route = config.routes.events ;
      Vue.http.headers.common['authorization'] = state.token;
      Vue.http.post(route, params).then((response) => {
          toastr.success('Add new event', 'Event added successfully', {timeOut: 1000});
      }, (response)=> {
        handleError(response, commit);
      });
    },

    deleteEvent({commit, state}, eventId){
      var route = config.routes.events + eventId;
      Vue.http.headers.common['authorization'] = state.token;
      Vue.http.delete(route).then((response) => {
        toastr.success('Delete event', 'Event deleted successfully', {timeOut: 1000});
      }, (response)=> {
        handleError(response, commit);
      });
    },

    updateEvent({commit,state}, params){
      Vue.http.headers.common['authorization'] = state.token;
      Vue.http.put(config.routes.events, params).then((response) => {
        toastr.success('Update event', 'Event updated successfully', {timeOut: 1000});
      }, (response)=> {
        handleError(response, commit);
      });

    }
  },

  getters: {
    user: state => {
      return state.user;
    },
    settings: state=> {
      if (state.user && state.user.settings) {
        return state.user.settings;
      }
      else {
        return [];
      }
    },
    mood: state=> {
      return state.mood;
    },
    behaviour: state=> {
      return state.behaviour;
    },
    events: state => {
      return state.events;
    },
    errorMessage: state=>{
      return state.errorMessage;
    },
    errorWrapper: state=>{
      if(state.errorMessage)
        return true;
      return false;
    },
    alertType: state=>{
      if(state.errorMessage)
        return  'alert-danger';
      return  '';
    }
  }

});

var types = {
  SET_USER: 'setUser',
  SET_TOKEN: 'setToken',
  SET_USER_SETTINGS: 'setUserSettings',
  SET_MOOD: 'setMood',
  SET_BEHAVIOR: 'setBehavior',
  SET_ERROR_MESSAGE: 'setErrorMessage',
  SET_USER_EVENTS: 'setEvents'
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
