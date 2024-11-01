import {
  Container,
  CartLeft,
  CartRight,
  CameraArea,
  linkStyle,
  CartRightBottom,
  TotalPrice,
  CheckoutBtn,
  CartItemContainer,
} from "./Cart.style";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Cart() {
  const totalPrice = useSelector((store) => store.cart.totalPrice);

  return (
    <>
      <Container>
        <CartLeft>
          <div className="hello">
            您好！<br></br>歡迎光臨獵人雜貨店
          </div>
          <Link to="/ScanningProduct" style={linkStyle}>
            <CameraArea>
              <FontAwesomeIcon icon={faBarcode} />
            </CameraArea>
            <div className="camera">
              按此返回前頁<br></br>掃條碼
            </div>
          </Link>
        </CartLeft>

        <CartRight>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CartItemContainer>
              <div className="shopping-list">購物清單</div>
              <CartItem></CartItem>
            </CartItemContainer>
          </div>

          <CartRightBottom>
            <div style={{ width: "50%" }} className="btns">
              <TotalPrice>
                <span>總計</span>
                <span>{totalPrice}</span>
                <span>元</span>
              </TotalPrice>
            </div>
            <div style={{ width: "50%" }} className="btns">
              <Link
                to="/PayMethod"
                style={{
                  color: "black",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <CheckoutBtn style={{ marginLeft: "100px" }}>結帳</CheckoutBtn>
              </Link>
            </div>
          </CartRightBottom>
        </CartRight>
      </Container>
    </>
  );
}

export default Cart;
