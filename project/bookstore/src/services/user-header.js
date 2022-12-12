import http from "../http-common";
//const API_URL = 'http://localhost:3300/api/';

class UserDataService {

    getAll(user){
        return http.get(`/users/allusers?user=${user}`)
    }
    
    get(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post("/users", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    findByUserFullName(userfname, userlname){
        return http.get(`/users?userfname=${userfname}&userlname=${userlname}`);
    }

}
export default new UserDataService();