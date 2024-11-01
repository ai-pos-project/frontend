import { Container, Text, Bottom, linkStyle } from "./SuccessCreditPage.style";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetTotalPrice } from "../../store/reducer";
import Cookies from "js-cookie";
import { confirmLinePayAPI } from "../../api/User/Payment/confirmLinePay";
function SuccessLinePayPage() {
  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const orderId = searchParams.get("orderId");
  const token = Cookies.get("token");
  useEffect(() => {
    const confirmPayment = async () => {
      if (!transactionId || !orderId) {
        // 如果缺少必要的參數，重定向或顯示錯誤
        console.error("Missing transactionId or orderId in URL");
        navigate("/");
      } else {
        try {
          const data = await confirmLinePayAPI(
            { orderId, transactionId, total: totalPrice },
            token
          );
          console.log(data);
          // 您可以在此處根據需要進行其他操作，例如顯示成功訊息或進一步導航
        } catch (error) {
          console.error("Payment confirmation failed", error);
          // 根據需要處理錯誤，例如導航到錯誤頁面或顯示錯誤訊息
          navigate("/error");
        }
      }
    };

    confirmPayment();
  }, [transactionId, orderId, navigate, totalPrice, token]);

  //若用戶使用完沒有按回首頁，10秒後會自動跳回首頁
  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    // 現在時間大於上次動作的10秒後就會認定inactivity
    if (expireTime < Date.now()) {
      navigate("/");
      dispatch(resetTotalPrice({}));
    }
  };

  const updateExpireTime = () => {
    // 10秒會timeout
    const expireTime = Date.now() + 10000;

    localStorage.setItem("expireTime", expireTime);
  };

  useEffect(() => {
    // 給expireTime初始值
    updateExpireTime();

    // 有任何動作都會更新expireTime
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    // clean up
    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  useEffect(() => {
    // 每秒檢查是否inactivity
    const interval = setInterval(() => {
      checkForInactivity();
    }, 1000);

    // clean up
    return () => clearInterval(interval);
  });

  return (
    <>
      <Container>
        <Text>
          <div>已將此消費紀錄為LINE PAY</div>
        </Text>
      </Container>
      <Bottom>
        <Link
          to="/"
          style={linkStyle}
          onClick={() => dispatch(resetTotalPrice({}))}
        >
          <div className="text">回首頁</div>
        </Link>

        <Link
          to="/Identify"
          style={linkStyle}
          onClick={() => dispatch(resetTotalPrice({}))}
        >
          <div className="text">繼續購物</div>
        </Link>
      </Bottom>
    </>
  );
}

export default SuccessLinePayPage;
