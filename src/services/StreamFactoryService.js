import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));
class StreamFactoryService {
    postStreamFactoryService(formData){
        return axios.post(endpoint.baseURL+`stream-factory/upload`,formData,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token,
                'Content-Type': 'multipart/form-data'
            }})
      
        }
}
export default new StreamFactoryService();
