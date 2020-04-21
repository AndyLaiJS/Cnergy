import axios from "axios";
import authenticationHeader from "./authenticationHeader";

const API_URL = "http://localhost:3000/activity";

class ActivityService {
     getOngoingActivities(userId = "") {
          return axios
               .get(`${API_URL}`, {
                    params: { uid: userId },
               })
               .then(
                    response => response.data.activities,
               );
     }
     
     getPastActivities() {
          return axios
               .get(`${API_URL}/past`, {
                    headers: authenticationHeader()
               });
     }

     getJoinedActivities(userId) {
          return axios
               .get(`${API_URL}/join`, {
                    params: { uid: userId }
               })
               .then(
                    response => response.data,
               );
     }

     createActivity(user, activity) {
          return axios
               .post(`${API_URL}`, {
                    name: activity.name,
                    description: activity.description,
                    activityDate: activity.activityDate,
                    maxParticipants: Number(activity.maxParticipants),
                    minParticipants: Number(activity. minParticipants),
                    type: activity.type
               }, {
                    params: { uid: user.id }
               });
     }
}

export default new ActivityService();