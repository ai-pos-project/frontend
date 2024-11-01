import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppContainer,
  Header,
  Button,
  BackButton,
  SearchInput,
} from "../Common/Common.style";
import { createContext } from "react";
import { searchGoodsAPI } from "../../api/Manager/Goods/searchGoodsAPI";
import ProductTable from "./ProductTable";
import ShowModal from "./ShowModal";
import Cookies from "js-cookie";

const Product = () => {
  const token = Cookies.get("token");
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [keyWords, setKeyWords] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    setKeyWords(e.target.value);
    const response = await searchGoodsAPI(e.target.value, token);
    setProducts(response?.data.goods);
  };

  return (
    <AppContainer>
      <Header>商品管理</Header>
      <SearchInput
        type="text"
        placeholder="搜尋商品名稱..."
        onChange={handleSearch}
      />
      <Button
        onClick={() => {
          setCurrentProduct({
            name: "",
            stock: "",
            price: "",
            code: "",
          });
          setShowModal(true);
        }}
      >
        新增商品
      </Button>

      <ProductTableContext.Provider
        value={{ products, setProducts, setShowModal, setCurrentProduct }}
      >
        <ProductTable></ProductTable>
      </ProductTableContext.Provider>

      {showModal && (
        <ShowModalContext.Provider
          value={{
            keyWords,
            currentProduct,
            setCurrentProduct,
            setProducts,
            setShowModal,
          }}
        >
          <ShowModal></ShowModal>
        </ShowModalContext.Provider>
      )}

      <BackButton onClick={() => navigate("/dashboard")}>返回</BackButton>
    </AppContainer>
  );
};

export default Product;
export const ProductTableContext = createContext();
export const ShowModalContext = createContext();
