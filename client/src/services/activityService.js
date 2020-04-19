import axios from "axios";
import authenticationHeader from "./authenticationHeader";

const API_URL = "http://localhost:3000/activity";

class ActivityService {
     getOngoingActivities () {
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
          console.log("This is in activityService.js")
          return axios
               .get(`${API_URL}/join`, {
                    params: {
                         uid: userId
                    }
               })
     }
}

export default new ActivityService();