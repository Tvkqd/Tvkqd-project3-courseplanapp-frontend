import http from "../http-common";

class SemesterDataService {
  getAll() {
    return http.get("semester/");
  }
  get(id) {
    return http.get(`semester/${id}`);
  }
  create(data) {
    return http.post("semester/", data);
  }
  update(id, data) {
    return http.put(`semester/${id}`, data);
  }
  delete(id) {
    return http.delete(`semester/${id}`);
  }
  deleteAll() {
    return http.delete(`semester/`);
  }
}
export default new SemesterDataService();
