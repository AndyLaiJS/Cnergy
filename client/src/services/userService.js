import axios from "axios";

const API_URL = "http://localhost:3000/user";

class UserService {
     updatePassword(userId, password) {
          return axios
               .patch(`${API_URL}/pwd`, {
                    password: password
               }, {
                    params: { uid: userId }
               });
     }
}

export default new UserService();