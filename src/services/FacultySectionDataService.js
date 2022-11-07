import http from "../http-common";

class FacultySectionDataService {
  getAll() {
    return http.get("facultySection/");
  }
  get(id) {
    return http.get(`facultySection/${id}`);
  }
  create(data) {
    return http.post("facultySection/", data);
  }
  update(id, data) {
    return http.put(`facultySection/${id}`, data);
  }
  delete(id) {
    return http.delete(`facultySection/${id}`);
  }
  deleteAll() {
    return http.delete(`facultySection/`);
  }
}
export default new FacultySectionDataService();
