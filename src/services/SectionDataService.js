import http from "../http-common";

class SectionDataService {
  getAll() {
    return http.get("section/");
  }
  get(id) {
    return http.get(`section/${id}`);
  }
  create(data) {
    return http.post("section/", data);
  }
  update(id, data) {
    return http.put(`section/${id}`, data);
  }
  delete(id) {
    return http.delete(`section/${id}`);
  }
  deleteAll() {
    return http.delete(`section/`);
  }
}
export default new SectionDataService();
