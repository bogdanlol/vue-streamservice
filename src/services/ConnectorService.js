import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));
class ConnectorService {

  getConnectors() {
      return axios.get(endpoint.baseURL+`connectors`,{
        headers:{
            'Authorization': 'Bearer ' + user.data.token
        },
    });
  }

  postConnector(connector){
      return axios.post(endpoint.baseURL+`connectors`,{
        "name": connector.name,
        "connector.class": connector.connectorClass,
        "tasks.max": connector.tasksMax,
        "key.converter": connector.keyConverter,
        "value.converter": connector.valueConverter,
        "topics": connector.topics,
        "file": connector.file,
        "type": connector.type,
        "status": connector.status,
    },{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  getConnectorClasses() {
    return axios.get(endpoint.baseURL+`connector-classes`,
    {
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  getConvertors() {
    return axios.get(endpoint.baseURL+`convertors`,
    {
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  startConnector(id){
    return axios.post(endpoint.baseURL+`connectors/start/${id}`,{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  getConnector(id){
    return axios.get(endpoint.baseURL+`connectors/${id}`,{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  putConnector(connector,id){
    return axios.put(endpoint.baseURL+`connectors/${id}`,{
      "name": connector.name,
      "connector.class": connector.connectorClass,
      "tasks.max": connector.tasksMax,
      "key.converter": connector.keyConverter,
      "value.converter": connector.valueConverter,
      "topics": connector.topics,
      "file": connector.file,
      "type": connector.type,
      "status": connector.status,

    },{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  validateConnector(connector){
    return axios.put(endpoint.baseURL+`connectors-validate`,{
      "name": connector.name,
      "connector.class": connector.connectorClass,
      "tasks.max": connector.tasksMax,
      "key.converter": connector.keyConverter,
      "value.converter": connector.valueConverter,
      "topics": connector.topics,
      "file": connector.file,
      "type": connector.type,
      "status": connector.status,

    },{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  deleteConnector(id){
    return axios.delete(endpoint.baseURL+`connectors/${id}`,{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  stopConnector(name){
    return axios.post(endpoint.baseURL+`connectors/stop/${name}`,{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  postConnectorPlugin(formData){
  return axios.post(endpoint.baseURL+`connectors-plugins/upload`,formData,{
      headers:{
          'Authorization': 'Bearer ' + user.data.token,
          'Content-Type': 'multipart/form-data'
      }})

  }
}
export default new ConnectorService();
