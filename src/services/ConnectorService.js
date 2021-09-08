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
}
export default new ConnectorService();
