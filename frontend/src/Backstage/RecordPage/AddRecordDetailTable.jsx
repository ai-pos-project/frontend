import {
  DetailsTable,
  DetailsTd,
  DetailsTh,
  Input,
  DetailButton,
} from "./RecordPage.style";
import { useEffect, useContext } from "react";
import { AddRecordDetailTableContext } from "./AddRecord";

function AddRecordDetailTable() {
  const { items, setItems, setTotalAmount } = useContext(
    AddRecordDetailTableContext
  );

  //自動計算訂單總額
  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(total);
  }, [items, setTotalAmount]);

  // 移除訂單細項
  const removeItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  // 更新訂單細項
  const updateItem = (index, field, value) => {
    const updatedItems = items.map((item, idx) => {
      if (idx === index) {
        if (field === "quantity" || field === "price") {
          const parsedValue = parseInt(value, 10);
          return { ...item, [field]: isNaN(parsedValue) ? 0 : parsedValue }; // 如果是數量或金額，轉換為整數
        } else {
          return { ...item, [field]: value }; // 如果是商品名稱，直接更新字串
        }
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <DetailsTable>
      <thead>
        <tr>
          <DetailsTh>商品名稱</DetailsTh>
          <DetailsTh>購買數量</DetailsTh>
          <DetailsTh>金額</DetailsTh>
          <DetailsTh>操作</DetailsTh>
        </tr>
      </thead>
      <tbody>
        {items?.map((item, index) => (
          <tr key={index}>
            <DetailsTd>
              <Input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
              />
            </DetailsTd>
            <DetailsTd>
              <Input
                name="quantity"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", e.target.value)}
              />
            </DetailsTd>
            <DetailsTd>
              <Input
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
              />
            </DetailsTd>
            <DetailsTd>
              <DetailButton onClick={() => removeItem(index)}>
                刪除
              </DetailButton>
            </DetailsTd>
          </tr>
        ))}
      </tbody>
    </DetailsTable>
  );
}

export default AddRecordDetailTable;
