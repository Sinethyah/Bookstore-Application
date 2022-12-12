import http from "../http-common";
//const API_URL = 'http://localhost:3300/api/';

class AuthorDataService {


    findByAuthorFullName(authorfname, authorlname){
        return http.get((`/authors?authorfname=${authorfname}&authorlname=${authorlname}`))
    }

    
    get(id) {
        return http.get(`/authors/${id}`);
    }

    create(data) {
        return http.post("/authors", data);
    }

    update(id, data) {
        return http.put(`/authors/${id}`, data);
    }

}
export default new AuthorDataService();