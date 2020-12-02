import http from "../http-common";

class HouseDataService {

    getByBed(bed) {
    return http.get(`/housebybedrooms/${bed}`);
  }

    getByPrice(price) {
    return http.get(`/housebyprice/${price}`);
  }

}

export default new HouseDataService();