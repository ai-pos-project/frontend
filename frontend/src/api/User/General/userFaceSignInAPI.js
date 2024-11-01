import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = `/face/recognize_and_get_result`;
// const apiUrl = `${api}/user/faceSignin`;

export async function userFaceSigninAPI() {
  try {
    const response = await axios.get(api);
    
    Swal.fire({
      title: "登入成功!",
      text: "您可以開始掃描商品了",
      icon: "success",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      Swal.fire(`${error.response.data.error}`, `${error}`, "error");
    }
  }
}
