import axios from "axios";
import authenticationHeader from "./authenticationHeader";

const API_URL = "http://localhost:3000/activity";

class ActivityService {
     getOngoingActivities() {
          return axios
               .get(`${API_URL}`);
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
                    params: {
                         uid: userId
                    }
               })
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