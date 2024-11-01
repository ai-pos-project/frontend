import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = "http://140.119.19.85:80/api/1.0";
export const loginManager = async (phone, password) => {
  try {
    const response = await axios.post(`${api}/manager/signin`, {
      phone,
      password,
    });

    Swal.fire({
      title: "登入成功!",
      text: "",
      icon: "success",
    });
    return response.data;
  } catch (error) {
    Swal.fire(`${error.response.data.error}`, `${error}`, "error");
  }
};
