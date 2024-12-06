import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = `http://140.119.19.85:3000/api/1.0`;
export async function getGoodsAPI(body, token) {
  try {
    const response = await axios.get(`${api}/good/scanGoods/${body}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
