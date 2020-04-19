import AuthenticationService from "../services/authenticationService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
     ? { status: { loggedIn: true }, user }
     : { status: { loggedIn: false }, user: null };

export const auth = {
     namespaced: true,
     state: initialState,
     actions: {
          login({ commit }, user) {
               return AuthenticationService
                    .login(user)
                    .then(
                         user => {
                              commit("login success", user);
                              return Promise.resolve(user);
                         },
                         error => {
                              commit("login failure");
                              return Promise.reject(error);
                         }
                    );
          },
          logout({ commit }) {
               AuthenticationService.logout();
               commit("logout");
          },
          register({ commit }, user) {
               return AuthenticationService
                    .register(user)
                    .then(
                         response => {
                              commit("register success", user);
                              return Promise.resolve(response.data);
                         },
                         error => {
                              commit("register failure", error);
                              return Promise.reject(error);
                         }
                    );
          }
     },
     mutations: {
          loginSuccess(state, user) {
               state.status.loggedIn = true;
               state.user = user;
          },
          loginFailure(state) {
               state.status.loggedIn = false;
               state.user = null;
          },
          logout(state) {
               state.status.loggedIn = false;
               state.user = null;
          },
          registerSuccess(state) {
               state.status.loggedIn = false;
          },
          registerFailure(state) {
               state.status.loggedIn = false;
          }
     }
};