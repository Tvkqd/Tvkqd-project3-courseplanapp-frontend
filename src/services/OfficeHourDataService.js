import http from "../http-common";

class OfficeHourDataService {
  getAll() {
    return http.get("officeHour/");
  }
  get(id) {
    return http.get(`officeHour/${id}`);
  }
  create(data) {
    return http.post("officeHour/", data);
  }
  update(id, data) {
    return http.put(`officeHour/${id}`, data);
  }
  delete(id) {
    return http.delete(`officeHour/${id}`);
  }
  deleteAll() {
    return http.delete(`officeHour/`);
  }
}
export default new OfficeHourDataService();
