import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = `http://140.119.19.85:80/api/1.0`;
const apiUrl = `${api}/user/signup`;

export async function userSignupAPI(body) {
  try {
    const response = await axios.post(apiUrl, { name: body });
    Swal.fire({
      title: "註冊成功!",
      text: "",
      icon: "success",
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      Swal.fire(`${error.response.data.error}`, `${error}`, "error");
    }
  }
}
