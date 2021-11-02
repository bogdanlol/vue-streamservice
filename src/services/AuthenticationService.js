import axios from "axios";
import endpoint from  "../http-common";


let user = JSON.parse(localStorage.getItem('user'));


class AuthenticationService {
  getIsAdmin(){
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"))
    } catch {
      return
    }
    return axios.get(endpoint.baseURL+`user`,{
      headers:{
         'Authorization':  `Bearer `+ user.data.token
    } 
   })
  }

  getCurrentlyLoggedUser(){
    return axios.get(endpoint.baseURL+`user/${user.data.id}/`,{
      headers:{
         'Authorization':  `Bearer `+ user.data.token
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