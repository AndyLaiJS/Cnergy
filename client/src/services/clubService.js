import axios from "axios";

const API_URL = "http://localhost:3000/club";

class ClubService {
     createClub(user, club) {
          return axios
               .post(`${API_URL}`, {
                    name: club.name,
                    description: club.description
               }, {
                    params: { uid: user.id }
               });
     }
     joinClub(userId, data) {
          return axios
               .post(`${API_URL}/join`, {
                    id: data.id,
                    reason: data.reason
               }, {
                    params: { uid: userId }
               })
               .then(response => response.data);
     }
     getClubs(userId = "") {
          return axios
               .get(`${API_URL}`, {
                    params: { uid: userId },
               })
               .then(response => response.data);
     }
     getJoinedClubs(userId) {
          return axios
               .get(`${API_URL}/join`, {
                    params: { uid: userId }
               })
               .then(response => response.data );
     }
     updateClub(userId, clubId, description) {
          return axios
               .put(`${API_URL}`, {
                    id: clubId,
                    description: description
               }, {
                    params: { uid: userId }
               })
               .then(response => response)
               .catch(err => err.response);
     }
}

export default new ClubService();