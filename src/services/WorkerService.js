import axios from "axios";
import endpoint from  "../http-common";

class WorkerService {
    getWorkers() {
        return axios.get(endpoint.baseURL+`workers`);
    }
    postStopKafkaConnect(id) {
        return axios.post(endpoint.baseURL+`workers/${id}/stop`);
    }
    postStartKafkaConnect(id) {
        return axios.post(endpoint.baseURL+`workers/${id}/start`);
    }
    getWorker(id){
        return axios.get(endpoint.baseURL+`worker/${id}`,{
        });
    }
}

export default new WorkerService();
