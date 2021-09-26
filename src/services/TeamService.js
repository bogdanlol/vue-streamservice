import axios from "axios";
import endpoint from  "../http-common";
let user = JSON.parse(localStorage.getItem('user'));

class TeamService {
    getTeams() {
        return axios.get(endpoint.baseURL+`teams`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }

    getTeam(id) {
        return axios.get(endpoint.baseURL+`team/${id}`,{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }
    postTeam(team) {
        return axios.get(endpoint.baseURL+`team/create`,{
            "name": team.name,
        },{
            headers:{
                'Authorization': 'Bearer ' + user.data.token
            },
        })
    }

}
export default new TeamService();
