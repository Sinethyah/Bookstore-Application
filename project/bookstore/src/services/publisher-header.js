import http from "../http-common";
//const API_URL = 'http://localhost:3300/api/';

class UserDataService {

    
    get(id) {
        return http.get(`/publishers/${id}`);
    }

    create(data) {
        return http.post("/publishers", data);
    }

    update(id, data) {
        return http.put(`/publishers/${id}`, data);
    }

    findByPublisherName(pname){
        return http.get(`/publishers?pname=${pname}`);
    }

}
export default new UserDataService();