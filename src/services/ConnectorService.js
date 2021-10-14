import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));
class ConnectorService {

  getConnectors(id) {
      return axios.get(endpoint.baseURL+`${id}/connectors`,{
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
        "customFields":connector.customFields,
    },{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  getConnectorClasses(id) {
    return axios.get(endpoint.baseURL+`${id}/connector-classes`,
    {
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  getConvertors(id) {
    return axios.get(endpoint.baseURL+`${id}/convertors`,
    {
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  startConnector(id,workerId){
    return axios.post(endpoint.baseURL+`${workerId}/connectors/start/${id}`,{
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
  validateConnector(connector,id){
    return axios.put(endpoint.baseURL+`${id}/connectors-validate`,{
      "name": connector.name,
      "connector.class": connector.connectorClass,
      "tasks.max": connector.tasksMax,
      "key.converter": connector.keyConverter,
      "value.converter": connector.valueConverter,
      "topics": connector.topics,
      "file": connector.file,
      "type": connector.type,
      "status": connector.status,
      "customFields":connector.customFields,

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
  stopConnector(name,id){
    return axios.post(endpoint.baseURL+`${id}/connectors/stop/${name}`,{
      headers:{
          'Authorization': 'Bearer ' + user.data.token
      },
  });
  }
  postConnectorPlugin(formData,id){
  return axios.post(endpoint.baseURL+`${id}/connectors-plugins/upload`,formData,{
      headers:{
          'Authorization': 'Bearer ' + user.data.token,
          'Content-Type': 'multipart/form-data'
      }})

  }
}
export default new ConnectorService();
