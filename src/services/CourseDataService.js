import http from "../http-common";

class CourseDataService {
  getAll() {
    return http.get("course/");
  }
  get(id) {
    return http.get(`course/${id}`);
  }
  create(data) {
    return http.post("course/", data);
  }
  update(id, data) {
    return http.put(`course/${id}`, data);
  }
  delete(id) {
    return http.delete(`course/${id}`);
  }
  deleteAll() {
    return http.delete(`course/`);
  }
  findName(name) {
    return http.get(`course/name/${name}`);
  }
  findDept(dept) {
    return http.get(`course/dept/${dept}`);
  }
}
export default new CourseDataService();
