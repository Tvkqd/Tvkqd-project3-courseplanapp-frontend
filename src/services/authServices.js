import apiClient from "@/services/services.js";

export default {
  loginUser(user) {
    return apiClient.post("schedule-t1/login", user);
  },
  authorizeUser(code) {
    return apiClient.post("schedule-t1/authorize", code);
  },
  logoutUser(token) {
    return apiClient.post("schedule-t1/logout", token);
  }
};