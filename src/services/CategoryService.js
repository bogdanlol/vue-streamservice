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
postCategories(category) {
  return axios.post(endpoint.baseURL+`category/create`,{
      "category": category
  },
  {
    headers:{
        'Authorization': 'Bearer ' + user.data.token
    },
});
}
putCategoriesForConnector(connector_id,category) {
  return axios.put(endpoint.baseURL+`conn/${connector_id}/categories`,{
      "category": category
  },
  {
    headers:{
        'Authorization': 'Bearer ' + user.data.token
    },
});
}
}
  export default new CategoryService();
