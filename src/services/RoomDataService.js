import http from "../http-common";

class RoomDataService {
  getAll() {
    return http.get("room/");
  }
  get(id) {
    return http.get(`room/${id}`);
  }
  create(data) {
    return http.post("room/", data);
  }
  update(id, data) {
    return http.put(`room/${id}`, data);
  }
  delete(id) {
    return http.delete(`room/${id}`);
  }
  deleteAll() {
    return http.delete(`room/`);
  }
}
export default new RoomDataService();
