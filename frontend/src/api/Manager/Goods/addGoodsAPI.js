import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = `http://140.119.19.85:80/api/1.0`;
const apiUrl = `${api}/manager/addGoods`;

export async function addGoodsAPI(body, token) {
  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      title: "商品新增成功!",
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