import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = `http://140.119.19.85:80/api/1.0`;
export async function searchGoodsAPI(body, token) {
  try {
    const response = await axios.get(
      `${api}/manager/searchGoods?keywords=${body}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response) {
        Swal.fire(`${error.response.data.error}`, `${error}`, "error");
      }
    }
  }
}