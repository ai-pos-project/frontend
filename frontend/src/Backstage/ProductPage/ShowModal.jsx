import {
  Modal,
  ModalContent,
  Close,
  Label,
  Button,
} from "../Common/Common.style";
import { Input } from "./ProductPage.style";
import { addGoodsAPI } from "../../api/Manager/Goods/addGoodsAPI";
import { updateGoodsAPI } from "../../api/Manager/Goods/updateGoodsAPI";
import { searchGoodsAPI } from "../../api/Manager/Goods/searchGoodsAPI";
import { ShowModalContext } from "./ProductPage";
import { useContext } from "react";
import Cookies from "js-cookie";

function ShowModal() {
  const {
    keyWords,
    currentProduct,
    setCurrentProduct,
    setProducts,
    setShowModal,
  } = useContext(ShowModalContext);
  const token = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    setCurrentProduct(null);
    setShowModal(false);
    const productInfo = {
      name: currentProduct.name,
      stock: currentProduct.stock,
      price: currentProduct.price,
      barcode: currentProduct.code,
    };
    await addGoodsAPI(productInfo, token);
    const response = await searchGoodsAPI("", token);
    setProducts(response?.data.goods);
  };

  const handleUpdateProduct = async () => {
    setShowModal(false);
    const productInfo = {
      name: currentProduct.name,
      stock: currentProduct.stock,
      price: currentProduct.price,
      goodId: currentProduct.id,
    };
    await updateGoodsAPI(productInfo, token);

    if (keyWords === "") {
      const response = await searchGoodsAPI("", token);
      setProducts(response?.data.goods);
    } else {
      const response = await searchGoodsAPI(currentProduct.name, token);
      setProducts(response?.data.goods);
    }
  };
  return (
    <Modal>
      <ModalContent>
        <Close onClick={() => setShowModal(false)}>&times;</Close>
        <h2>{currentProduct?.id !== undefined ? "編輯商品" : "新增商品"}</h2>
        <Label>商品名稱:</Label>
        <Input
          type="text"
          name="name"
          value={currentProduct?.name}
          onChange={handleChange}
        />
        <Label>庫存:</Label>
        <Input
          type="number"
          name="stock"
          value={currentProduct?.stock}
          onChange={handleChange}
        />
        <Label>售價:</Label>
        <Input
          type="number"
          name="price"
          value={currentProduct?.price}
          onChange={handleChange}
        />
        <Label>條碼:</Label>
        <Input
          type="text"
          name="code"
          value={currentProduct?.barcode}
          onChange={handleChange}
        />

        <Button
          onClick={
            currentProduct?.id !== undefined
              ? handleUpdateProduct
              : handleAddProduct
          }
        >
          確認
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default ShowModal;
