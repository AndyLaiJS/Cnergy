import ClubService from "../services/clubService";

const clubList = JSON.parse(localStorage.getItem("clubList"));
const initialState = clubList
     ? { clubList }
     : { clubList: [] }

export const club = {
     namespaced: true,
     state: initialState,
     actions: {
          createClub({ commit }, [ user, club ]) {
               return ClubService
                    .createClub(user, club)
                    .then(
                         response => {
                              commit("createClubSuccess", response.data);
                              return Promise.resolve(response);
                         },
                         error => {
                              return Promise.reject(error);
                         }
                    )
          }
     },
     mutations: {
          createClubSuccess(state, club) {
               state.clubList.push(club);
          },
     }
}