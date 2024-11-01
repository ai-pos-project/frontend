import { Container, Text, Bottom, linkStyle } from "./SuccessCreditPage.style";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetTotalPrice } from "../../store/reducer";

function SuccessCreditPage() {
  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          今天您總共消費了 {totalPrice} 元<div>已將此消費紀錄為賒帳</div>
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

export default SuccessCreditPage;
