import http from "../http-common";
//const API_URL = 'http://localhost:3300/api/';

class BookDataService {

    
    get(id) {
        return http.get(`/books/${id}`);
    }

    create(data) {
        return http.post("/books", data);
    }

    update(id, data) {
        return http.put(`/books/${id}`, data);
    }

    findByBookName(bookName){
        return http.get(`/books?bookname=${bookName}`);
    }

    findByAuthorFullName(authorfname,authorlname){
        return http.get(`/books/author?authorfname=${authorfname}&authorlname=${authorlname}`);
    }

    /*
    findByAuthorfname(authorfname) {
        return http.get(`/books/author?authorfname=${authorfname}`);
    }

    findByAuthorlname(authorlname){
        return http.get(`/books/author?authorlname=${authorlname}`)
    }
    */

    findByGenre(genre){
        return http.get(`/books/genre?genre=${genre}`)
    }

    findByISBN(isbn){
        return http.get(`/books/isbn?isbn=${isbn}`)
    }

    deleteFromDatabase(id){
        return http.delete(`/books/${id}`)
    }
}
export default new BookDataService();