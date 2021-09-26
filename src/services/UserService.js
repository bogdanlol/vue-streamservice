import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));

class UserService {
    getUsers() {
        return axios.get(endpoint.baseURL+`users`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }

    getUser(id) {
        return axios.get(endpoint.baseURL+`user/${id}`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }
    postUser(user) {
        return axios.get(endpoint.baseURL+`user/create`,{
            "username": user.name,
            "password": user.password,
            "admin": user.admin,
            "team": user.team,
        },{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }

}
export default new UserService();
