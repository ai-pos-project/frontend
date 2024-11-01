import { useState } from "react";
import { Container, Scan, Buttons, Button } from "../Common/Common.style";
import { userFaceSigninAPI } from "../../../api/User/General/userFaceSignInAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeOrderID } from "../../../store/reducer";
import Cookies from "js-cookie";

function IdentifyPages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const setCookies = (data) => {
    const maxAge = { expires: 5 / 24 };
    Cookies.set("token", data.access_token, maxAge);
    Cookies.set("user_name", data.user.name, maxAge);
  };

  const handleIdentify = async () => {
    try {
      setLoading(true);
      const response = await userFaceSigninAPI();
      console.log("response",response);
      const access_token = response?.data.accessToken;

      const user = response?.data.user;
      setCookies({ access_token, user });
      console.log(response.data);

      if (response) {
        dispatch(storeOrderID(response.data.user.orderId));
        navigate("/ScanningProduct");
      }
    } catch (err) {
      console.error("Error accessing the API: ", err);
      // Handle error appropriately, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Scan>身份辨識</Scan>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Buttons>
          <Button onClick={handleIdentify} className="confirm">
            開始身份辨識
          </Button>
        </Buttons>
      )}
    </Container>
  );
}

export default IdentifyPages;
