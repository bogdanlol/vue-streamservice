import axios from "axios";
import endpoint from  "../http-common";

class ConnectorService {

getConnectors() {
    return axios.get(endpoint.baseURL+`connectors`);
}

postConnector(connector){
    return axios.post(endpoint.baseURL+`appointment/`,{
      kind: connector.name,
      connectorclass: connector.connectorclass,
      tasksMax: connector.tasksMax,
      keyConverter: connector.keyConverter,
      valueConverter: connector.valueConverter,
      topics: connector.topics,
      file: connector.file,
      type: connector.type,
      status: connector.status,

    });
}
}
export default new ConnectorService();
