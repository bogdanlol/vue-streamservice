import axios from "axios";
import endpoint from  "../http-common";


let user = JSON.parse(localStorage.getItem('user'));


class AuthenticationService {
  getCurrentlyLoggedUser(){
    return axios.get(endpoint.baseURL+`user/${user.data.id}/`,{
      headers:{
         'Authorization':  `Bearer `+ user.data.access
    }}
    )
  }
  
  postLogin(username,password) {
    return axios.post(endpoint.baseURL+"login",{
      username: username,
      password: password
    })
  }

  
}

export default new AuthenticationService();