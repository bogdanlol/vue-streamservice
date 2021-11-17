import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));
class CategoryService {

  getCategories() {
      return axios.get(endpoint.baseURL+`categories`,{
        headers:{
            'Authorization': 'Bearer ' + user.data.token
        },
    });
  }
  getConnectorByCategories(categories) {
    return axios.post(endpoint.baseURL+`categories/connectors`,{
        "categories" : categories
    },
    {
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
}
}
  export default new CategoryService();
