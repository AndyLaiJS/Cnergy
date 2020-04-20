import UserService from "../services/userService";

const _user = JSON.parse(localStorage.getItem("user"));
const initialState = _user
     ? { status: { loggedIn: true }, user: _user }
     : { status: { loggedIn: false }, user: null };

export const user = {
     namespaced: true,
     state: initialState,
     actions: {
          updatePassword({ commit }, [userId, password]) {
               return UserService
                    .updatePassword(userId, password)
                    .then(
                         response => {
                              commit("updatePasswordSuccess", password);
                              return Promise.resolve(response);
                         },
                         error => {
                              return Promise.reject(error);
                         }
                    )
          }
     },
     mutations: {
          updatePasswordSuccess(state, password) {
               state.user.password = password;
          },
     }
};