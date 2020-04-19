import axios from "axios";

const API_URL = "http://localhost:3000/auth";

class AuthenticationService {
     login(user) {
          return axios
               .post(`${API_URL}/login`, {
                    email: user.email,
                    password: user.password
               })
               .then((response) => {
                    if (response.data.accessToken) {
                         localStorage.setItem("user", JSON.stringify(response.data));
                    }

                    return response.data;
               });
     }

     logout() {
          localStorage.removeItem("user");
     }

     register(user) {
          return axios
               .post(`${API_URL}/register`, {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    college: user.college,
               });
     }
}

export default new AuthenticationService();