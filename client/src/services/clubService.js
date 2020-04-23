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

     joinClub(userId, clubId, reason) {
          console.log(`userId = ${userId}`);
          console.log(`clubId = ${clubId}`)
          console.log(`reason = ${reason}`);
          return axios
               .post(`${API_URL}/join`, {
                    id: clubId,
                    reason: reason
               }, {
                    params: { uid: userId }
               })
               .then(response => {
                    console.log("ini response");
                    console.log(response);
                    return response;
               })
               .catch(err => {
                    console.log("error coy");
                    console.log(err);
                    return err.response;
               })
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

     getPendingClubRequest(userId, clubId) {
          console.log("in service");
          console.log(userId);
          console.log(clubId);
          return axios
               .get(`${API_URL}/pending`, {
                    params: {
                         cid: clubId,
                         uid: userId,
                    }
               })
               .then(response => response)
               .catch(err => err.response);
     }

     acceptClubRequest(userId, requestUserId, requestClubId) {
          return axios
               .post(`${API_URL}/accept`, {
                    userId: requestUserId,
                    clubId: requestClubId
               }, {
                    params: { uid: userId }
               })
               .then(response => response)
               .catch(err => err.response);
     }

     rejectClubRequest(userId, requestUserId, requestClubId) {
          return axios
               .delete(`${API_URL}/reject`, {
                    userId: requestUserId,
                    clubId: requestClubId
               }, {
                    params: { uid: userId }
               })
               .then(response => response)
               .catch(err => err.response);
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