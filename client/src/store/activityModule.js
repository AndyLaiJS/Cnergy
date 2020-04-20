import ActivityService from "../services/activityService";

const joinedActivities = JSON.parse(localStorage.getItem("joinedActivities"));
const initialState = joinedActivities
     ? { joinedActivities }
     : { joinedActivities: null }

export const activity = {
     namespaced: true,
     state: initialState,
     actions: {
          getJoinedActivities({ commit }, user) {
               return ActivityService
                    .getJoinedActivities(user.id)
                    .then(
                         response => {
                              commit("fetchJoinedActivitiesSuccess", response.data)
                              return Promise.resolve(response.data);
                         },
                         error => {
                              commit("fetchJoinedActivitiesFailure");
                              return Promise.reject(error);
                         }
                    )
          },
          createActivity({ commit }, [ user, activity ]) {
               return ActivityService
                    .createActivity(user, activity)
                    .then(
                         response => {
                              return Promise.resolve(response);
                         },
                         error => {
                              return Promise.reject(error);
                         }
                    );
          }
     },
     mutations: {
          fetchJoinedActivitiesSuccess(state, joinedActivities) {
               state.joinedActivities = joinedActivities;
          },
          fetchJoinedActivitiesFailure(state) {
               state.joinedActivities = null;
          }
     }
}