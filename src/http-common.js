import axios from "axios";

var baseurl = "";
if(process.env.NODE_ENV === "development") {
  baseurl = "http://localhost/course-t1/";
}
else
{
  baseurl = "/course-t1/";
}

export default axios.create({
  baseURL: baseurl,
  headers: {
    "Content-type": "application/json"
  }
});