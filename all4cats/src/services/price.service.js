import http from "../http-common";

class PriceDataService {
  //-----All Prices----//

  getAll() {
    return http.get("/price");
  }

  // ```data``` should be a json format instead of a single attribute
  createAll(data) {
    return http.post("/price", data);
  }

  deleteAll() {
    return http.delete(`/price`);
  }

  //-----Date + Zip Code----//
  getByDateAndZip(date, zip) {
    return http.get(`/price/${date}/${zip}`);
  }

  updateByDateAndZip(date, zip, data) {
    return http.put(`/price/${date}/${zip}`, data);
  }

  deleteByDateAndZip(date, zip) {
    return http.delete(`/price/${date}/${zip}`);
  }

  //-----Date + State + City----//
  getByDateAndStateAndCity(date, state, city) {
    return http.get(`/price/${date}/${state}/${city}`);
  }

  getStateAvgPrice(state) {
    return http.get(`/stateAvg/${state}`);
  }

  //-----University----//

  getUniversityAvgPrice(university) {
    return http.get(`/university/${university}`);
  }

}

export default new PriceDataService();