import {
  Container,
  Scan,
  Buttons,
  Button,
  linkStyle,
} from "../Common/Common.style";
import {
  ProductInfo,
  ProductNameTitle,
  ProductName,
  ProductInfoContainer,
  GoCart,
} from "./ScanningProductPage.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addToCartAPI } from "../../../api/User/Cart/addToCartAPI";
import { getGoodsAPI } from "../../../api/Manager/Goods/getGoodAPI.js";
import { useSelector, useDispatch } from "react-redux";
import { changeTotalPrice } from "../../../store/reducer";
import Cookies from "js-cookie";

function ScanningProductPage() {
  const [product, setProduct] = useState(null);
  const token = Cookies.get("token");
  const orderId = useSelector((store) => store.cart.orderId);
  const dispatch = useDispatch();
  const barcode = useRef("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 13 && barcode.current.length > 3) {
        handleBarcodeScan(barcode.current);
        return;
      }
      if (e.keyCode === 16) {
        return;
      }

      barcode.current += e.key;

      setTimeout(() => {
        barcode.current = "";
      }, 100);
    };

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleBarcodeScan = async (barcode) => {
    const response = await getGoodsAPI(barcode, token);
    setProduct(response?.data?.good);
  };

  const handleAddToCart = async () => {
    const productInfo = {
      name: product.name,
      barcode: product.barcode,
      price: product.price,
      orderId: orderId,
    };
    await addToCartAPI(productInfo, token);

    dispatch(
      changeTotalPrice({
        subtotal: product.price,
        operation: 1,
      })
    );
  };

  return (
    <>
      <Container>
        <Scan>掃條碼</Scan>
        <ProductInfoContainer>
          <ProductInfo>
            <ProductNameTitle>商品名稱: </ProductNameTitle>
            <ProductName>{product?.name}</ProductName>
          </ProductInfo>
          <br></br>
          <ProductInfo>
            <ProductNameTitle>商品價格: </ProductNameTitle>
            <ProductName>{product?.price}</ProductName>
          </ProductInfo>
          <br></br>
          <ProductInfo>
            <ProductNameTitle>商品條碼: </ProductNameTitle>
            <ProductName>{product?.barcode}</ProductName>
          </ProductInfo>
        </ProductInfoContainer>

        <Buttons>
          <Button
            className="again"
            onClick={handleAddToCart}
            disabled={!product}
          >
            加入購物車
          </Button>
        </Buttons>
        <GoCart>
          <Link to="/Cart" style={linkStyle}>
            <Button className="confirm">
              <FontAwesomeIcon icon={faArrowRightLong} />
              前往購物車
            </Button>
          </Link>
        </GoCart>
      </Container>
    </>
  );
}

export default ScanningProductPage;
