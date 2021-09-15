import axios from "axios";
import endpoint from  "../http-common";

class ConnectorService {

getConnectors() {
    return axios.get(endpoint.baseURL+`connectors`);
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

    });
}
getConnectorClasses() {
  return axios.get(endpoint.baseURL+`connector-classes`);
}
getConvertors() {
  return axios.get(endpoint.baseURL+`convertors`);
}
startConnector(id){
  return axios.post(endpoint.baseURL+`connectors/start/${id}`,{
  });
}
getConnector(id){
  return axios.get(endpoint.baseURL+`connectors/${id}`,{
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

  });
}
deleteConnector(id){
  return axios.delete(endpoint.baseURL+`connectors/${id}`,{
  });
}
stopConnector(name){
  return axios.post(endpoint.baseURL+`connectors/stop/${name}`,{
  });
}
postConnectorPlugin(formData){
return axios.post(endpoint.baseURL+`connectors-plugins/upload`,formData,{
    headers:{
        'Content-Type': 'multipart/form-data'
    }})

}
}
export default new ConnectorService();
