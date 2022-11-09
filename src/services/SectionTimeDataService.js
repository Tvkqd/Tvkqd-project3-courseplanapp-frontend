import http from "../http-common";

class SectionTimeDataService {
  getAll() {
    return http.get("sectionTime/");
  }
  get(id) {
    return http.get(`sectionTime/${id}`);
  }
  create(data) {
    return http.post("sectionTime/", data);
  }
  update(id, data) {
    return http.put(`sectionTime/${id}`, data);
  }
  delete(id) {
    return http.delete(`sectionTime/${id}`);
  }
  deleteAll() {
    return http.delete(`sectionTime/`);
  }
}
export default new SectionTimeDataService();
