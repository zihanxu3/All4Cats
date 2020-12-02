import http from "../http-common";

class PredictService {
  //-----All Prices----//
  predictCA(month, year) {
    return http.get(`/predictCA/${month}/${year}`, month, year);
  }

  // getByDateAndZip(date, zip) {
  //   return http.get(`/price/${date}/${zip}`);
  // }

}

export default new PredictService();