import { Link } from "react-router-dom";
import {
  Container,
  Top,
  Middle,
  Bottom,
  linkStyle,
  PayMethodBtns,
  Button,
} from "./CheckoutPage.style";
import { useSelector } from "react-redux";

function CheckoutPage() {
  const totalPrice = useSelector((store) => store.cart.totalPrice);

  return (
    <>
      <Container>
        <Top>
          <div className="hello">
            您好！<br></br>歡迎光臨獵人雜貨店
          </div>
        </Top>
        <Middle>
          <div className="chose-method">總共是: {totalPrice} 元</div>
          <PayMethodBtns>
            <Link to="/PayMethod2" style={linkStyle}>
              <Button className="credit">確認付款</Button>
            </Link>
            <Link to="/ScanningProduct" style={linkStyle}>
              <Button className="settle">繼續購物</Button>
            </Link>
          </PayMethodBtns>
        </Middle>
        <Bottom></Bottom>
      </Container>
    </>
  );
}

export default CheckoutPage;
