import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = `http://140.119.19.85:3000/api/1.0`;
const apiUrl = `${api}/user/shoppingCart`;

export async function addToCartAPI(body, token) {
  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(`${body.name} 已加入購物車`, {
      position: "bottom-left",
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        Swal.fire(`${error.response.data.error}`, `${error}`, "error");
      }
    }
  }
}
