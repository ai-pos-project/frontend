import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;

// const apiUrl = `${api}/manager/updateGoods`;
const apiUrl = `http://140.119.19.85:3000/api/1.0/manager/updateGoods`;
export async function updateGoodsAPI(body, token) {
  try {
    const response = await axios.put(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      title: "商品編輯成功!",
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
