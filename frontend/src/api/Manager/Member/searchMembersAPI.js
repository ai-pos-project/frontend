import axios from "axios";
import Swal from "sweetalert2";

// const api = import.meta.env.VITE_REACT_APP_API;
const api = `http://140.119.19.85:80/api/1.0`;
export async function searchMembersAPI(body, token) {
  try {
    const response = await axios.get(`${api}/user/members?keywords=${body}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // params: body,
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