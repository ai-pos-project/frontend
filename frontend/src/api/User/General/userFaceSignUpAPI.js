import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
// const api = `http://140.119.19.85:80/api/1.0`;
const apiUrl = `/face/register`;

export async function userFaceSignUpAPI(body) {
  try {
   
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      title: "註冊成功!",
      icon: "success",
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      Swal.fire(`${error.response.data.error}`, `${error}`, "error");
    }
  }
}
