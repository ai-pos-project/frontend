import { Link } from "react-router-dom";
import {
  Container,
  Top,
  Middle,
  Bottom,
  linkStyle,
  PayMethodBtns,
  Button,
} from "./PayMethodPage.style";
import { paymentAPI } from "../../api/User/Payment/paymentAPI";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function PayMethodPage() {
  const navigate = useNavigate();
  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const token = Cookies.get("token");
  const orderId = useSelector((store) => store.cart.orderId);

  const creditPaymentInfo = {
    orderId: orderId,
    paymentMethod: "delay",
    total: totalPrice,
  };

  const linepayPaymentInfo = {
    orderId: orderId,
    paymentMethod: "line",
    total: totalPrice,
  };

  const handleCreditPayment = async () => {
    const response = await paymentAPI(creditPaymentInfo, token);

    if (response) {
      navigate("/SuccessCredit");
    }
  };

  const handleLinepayPayment = async () => {
    const data = await paymentAPI(linepayPaymentInfo, token);
    console.log(data);

    console.log("data.redirectLinePayUrl", data.redirectLinePayUrl);
    console.log("data", data.data.redirectLinePayUrl);
    if (data.data.redirectLinePayUrl) {
      // 使用 window.location.href 进行页面跳转
      console.log("redirectLinePayUrl~~~", data.data.redirectLinePayUrl);
      window.location.href = data.data.redirectLinePayUrl;
    } else {
      // 处理未获取到 URL 的情况
      console.error("未獲取到重定向 URL");
    }
  };

  return (
    <>
      <Container>
        <Top>
          <div className="hello">
            您好！<br></br>歡迎光臨獵人雜貨店
          </div>
        </Top>
        <Middle>
          <div className="chose-method">請選擇結帳方式</div>
          <PayMethodBtns>
            <Button className="credit" onClick={handleCreditPayment}>
              賒帳
            </Button>

            <Link to="" style={linkStyle}>
              <Button className="settle" onClick={handleLinepayPayment}>
                以LINE<span>PAY</span>付款
              </Button>
            </Link>
          </PayMethodBtns>
        </Middle>
        <Bottom>
          <Link to="/Cart" style={linkStyle} className="last-page">
            <div className="last-page">上一頁</div>
          </Link>
        </Bottom>
      </Container>
    </>
  );
}

export default PayMethodPage;
