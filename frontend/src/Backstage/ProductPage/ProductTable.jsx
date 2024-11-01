import { useContext, useEffect } from "react";
import { TableContainer, Table, Th, Td, Button } from "../Common/Common.style";
import { DeleteButton } from "./ProductPage.style";
import { deleteGoodsAPI } from "../../api/Manager/Goods/deleteGoodsAPI";
import { searchGoodsAPI } from "../../api/Manager/Goods/searchGoodsAPI";
import { ProductTableContext } from "./ProductPage";
import Cookies from "js-cookie";

function ProductTable() {
  const { products, setProducts, setShowModal, setCurrentProduct } =
    useContext(ProductTableContext);
  const token = Cookies.get("token");

  //一開始先取得所有商品
  useEffect(() => {
    const displayGoods = async () => {
      const response = await searchGoodsAPI("", token);
      setProducts(response?.data.goods);
    };
    displayGoods();
  }, [token, setProducts]);

  const handleEditProduct = (index) => {
    setCurrentProduct(products[index]);
    setShowModal(true);
  };

  const handleDeleteProduct = async (index) => {
    await deleteGoodsAPI(products[index].id, token);
    const response = await searchGoodsAPI("", token);
    setProducts(response?.data.goods);
  };
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>商品名稱</Th>
            <Th>庫存</Th>
            <Th>售價</Th>
            <Th>條碼</Th>
            <Th>操作</Th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={index}>
              <Td>{product.name}</Td>
              <Td>{product.stock}</Td>
              <Td>{product.price}</Td>
              <Td>{product.barcode}</Td>
              <Td>
                <Button onClick={() => handleEditProduct(index)}>編輯</Button>
                <DeleteButton onClick={() => handleDeleteProduct(index)}>
                  刪除
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
