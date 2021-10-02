import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));

class WorkerService {
    getWorkers() {
        return axios.get(endpoint.baseURL+`workers`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }
    postStopKafkaConnect(id) {
        return axios.post(endpoint.baseURL+`workers/${id}/stop`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        });
    }
    postStartKafkaConnect(id) {
        return axios.post(endpoint.baseURL+`workers/${id}/start`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        });
    }
    getWorker(id){
        return axios.get(endpoint.baseURL+`worker/${id}`,
        {
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        });
    }
    postWorker(worker){
        return axios.post(endpoint.baseURL+`worker`,{
          "name": worker.name,
          "teamId": worker.team,
          "ip": worker.ip,
          "path": worker.path,
          "environment": worker.environment,
          "type": worker.type
      },{
        headers:{
            'Authorization': 'Bearer ' + user.data.token
        },
    });
    }
}

export default new WorkerService();
