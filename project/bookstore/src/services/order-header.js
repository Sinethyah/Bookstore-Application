import order from "../components/order/order";
import http from "../http-common";
//const API_URL = 'http://localhost:3300/api/';

class UserDataService {


    get(orderid, bookid) {
        return http.get(`/orders/${orderid}/${bookid}`);
    }

    create(data) {
        return http.post("/orders", data);
    }


    searchByUserOrdId(orderid){
        return http.get(`/orders?orderid=${orderid}`)
    }


    showOrdersOfUser(userid){
        return http.get(`/orders/ordersummary/${userid}`);

    }

    showGenreSaleReport(){
        return http.get(`/orders/genresalereport`)
    }

    showAuthorSaleReport(){
        return http.get(`/orders/authorsalereport`)
    }

    showPublisherSaleReport(){
        return http.get(`/orders/publishersalereport`)
    }

}
export default new UserDataService();