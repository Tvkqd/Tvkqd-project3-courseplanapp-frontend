import http from "../http-common";

class SpecialListDataService {
  getAll() {
    return http.get("specialList/");
  }
  get(id) {
    return http.get(`specialList/${id}`);
  }
  create(data) {
    return http.post("specialList/", data);
  }
  update(id, data) {
    return http.put(`specialList/${id}`, data);
  }
  delete(id) {
    return http.delete(`specialList/${id}`);
  }
  deleteAll() {
    return http.delete(`specialList/`);
  }
}
export default new SpecialListDataService();
