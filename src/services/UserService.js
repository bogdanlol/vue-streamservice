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
    getUsersByTeam(id) {
        return axios.get(endpoint.baseURL+`user/team/${id}`,{
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
    getCurrentUser() {
        return axios.get(endpoint.baseURL+`user/current`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }
    postUser(userObj) {
        return axios.post(endpoint.baseURL+`user/create`,{
            "username": userObj.name,
            "password": userObj.password,
            "admin": userObj.admin,
            "teamId": userObj.team,
        },{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }
    putUser(userObj,id){
        return axios.put(endpoint.baseURL+`user/${id}`,{
          "username": userObj.name,
          "password": userObj.password,
          "admin":userObj.admin,
          "teamId":userObj.team

        },{
          headers:{
              'Authorization': 'Bearer ' + user.data.token
          },
      });
    }
    deleteUser(id){
        return axios.delete(endpoint.baseURL+`users/${id}`,{
          headers:{
              'Authorization': 'Bearer ' + user.data.token
          },
      });
      }

}
export default new UserService();
