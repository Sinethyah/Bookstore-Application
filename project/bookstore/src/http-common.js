import axios from "axios";

//baseURL: "https://localhost:8080/api"

//console.log(`${process.env.REACT_APP_SERVER_PORT}`)

export default axios.create({
  baseURL: "http://localhost:3300/api",
  headers: {
    "Content-type": "application/json"
  }
});