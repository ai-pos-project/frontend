import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = `http://140.119.19.85:80/api/1.0`;
const apiUrl = `${api}/user/signin`;

export async function userSigninAPI(body) {
  try {
    const response = await axios.post(apiUrl, { name: body });
    Swal.fire({
      title: "登入成功!",
      text: "您可以開始掃描商品了",
      icon: "success",
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      Swal.fire(`${error.response.data.error}`, `${error}`, "error");
    }
  }
}
