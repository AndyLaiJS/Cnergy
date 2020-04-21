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
}

export default new ClubService();