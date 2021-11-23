import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));

class WorkerService {
    
    getWorkers() {
        try {
            user = JSON.parse(localStorage.getItem("user"))
          } catch {
            return
          }
        return axios.get(endpoint.baseURL+`workers`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }
    postStopKafkaConnect(id) {
        try {
            user = JSON.parse(localStorage.getItem("user"))
          } catch {
            return
          }
        return axios.post(endpoint.baseURL+`workers/${id}/stop`,{},{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        });
    }
    postStartKafkaConnect(id) {
        return axios.post(endpoint.baseURL+`workers/${id}/start`,{},{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        });
    }
    getWorker(id){
        try {
            user = JSON.parse(localStorage.getItem("user"))
          } catch {
            return
          }
        return axios.get(endpoint.baseURL+`worker/${id}`,
        {
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        });
    }
    postWorker(worker){
        try {
            user = JSON.parse(localStorage.getItem("user"))
          } catch {
            return
          }
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
    editWorker(worker,id){
        try {
            user = JSON.parse(localStorage.getItem("user"))
          } catch {
            return
          }
        return axios.put(endpoint.baseURL+`worker/${id}`,{
            "sshKey":worker.sshKey,
            "ip": worker.ip,
            "environment": worker.environment,
            
        },{
          headers:{
              'Authorization': 'Bearer ' + user.data.token
          },
      });
  
    }
}

export default new WorkerService();
