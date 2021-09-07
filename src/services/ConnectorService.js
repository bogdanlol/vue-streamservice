import axios from "axios";
import endpoint from  "../http-common";

class ConnectorService {

getConnectors() {
    return axios.get(endpoint.baseURL+`connectors`);
}
}
export default new ConnectorService();
