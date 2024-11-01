import { Item, ItemName, Button } from "./CartItem.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { changeTotalPrice } from "../../store/reducer";
import { updateOrderDetailAPI } from "../../api/User/Order/updateOrderDetailAPI";
import { deleteOrderDetailAPI } from "../../api/User/Order/deleteOrderDetailAPI.JS";
import { shoppingCartAPI } from "../../api/User/Cart/shoppingCartAPI";
import Cookies from "js-cookie";

function CartItem() {
  const token = Cookies.get("token");
  const orderId = useSelector((store) => store.cart.orderId);
  const [cartItem, setCartItem] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCartItems = async () => {
      const response = await shoppingCartAPI(orderId, token);
      setCartItem(response.data.cartItems);
    };
    getCartItems();
  }, [orderId, token]);

  const handleMinusQuantity = async (item) => {
    const subtotal = item.subtotal / item.quantity;
    const minusQuantity = item.quantity - 1;
    const orderInfo = { orderDetailId: item.id, quantity: minusQuantity };

    if (minusQuantity > 0) {
      await updateOrderDetailAPI(orderInfo, token);
    } else {
      await deleteOrderDetailAPI(item.id, token);
    }
    const response = await shoppingCartAPI(orderId, token);
    setCartItem(response.data.cartItems);

    dispatch(
      changeTotalPrice({
        subtotal: subtotal,
        operation: -1,
      })
    );
  };

  const handlePlusQuantity = async (item) => {
    const plusQuantity = item.quantity + 1;
    const orderInfo = { orderDetailId: item.id, quantity: plusQuantity };
    const subtotal = item.subtotal / item.quantity;

    await updateOrderDetailAPI(orderInfo, token);

    const response = await shoppingCartAPI(orderId, token);
    setCartItem(response.data.cartItems);

    dispatch(
      changeTotalPrice({
        subtotal: subtotal,
        operation: 1,
      })
    );
  };

  const handleRemoveFromCart = async (item) => {
    await deleteOrderDetailAPI(item.id, token);
    const response = await shoppingCartAPI(orderId, token);
    setCartItem(response.data.cartItems);

    dispatch(
      changeTotalPrice({
        subtotal: item.subtotal,
        operation: -1,
      })
    );
  };

  return (
    <>
      {cartItem.map((item, index) => (
        <Item key={index}>
          <ItemName>{item.name}</ItemName>
          <Button className="add" onClick={() => handleMinusQuantity(item)}>
            -
          </Button>
          <div>{item.quantity}</div>
          <Button className="minus" onClick={() => handlePlusQuantity(item)}>
            +
          </Button>
          <div>${item.subtotal}</div>
          <FontAwesomeIcon
            className="xmark"
            icon={faXmark}
            onClick={() => handleRemoveFromCart(item)}
          />
        </Item>
      ))}
    </>
  );
}

export default CartItem;
