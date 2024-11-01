import {
  Label,
  Modal,
  ModalContent,
  Close,
  Button,
} from "../Common/Common.style";
import {
  Input,
  StatusSelect,
  PaymentSelect,
  ButtonContainer,
} from "./RecordPage.style";
import { useState, useContext, createContext } from "react";
import { addRecordsAPI } from "../../api/Manager/Records/addRecordsAPI";
import { searchRecordsAPI } from "../../api/Manager/Records/searchRecordsAPI";
import { AddRecordContext } from "./RecordPage";
import AddRecordDetailTable from "./AddRecordDetailTable";
import Cookies from "js-cookie";

function AddRecord() {
  const { setRecords, setShowModal, currentRecord, setCurrentRecord } =
    useContext(AddRecordContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState([]);
  const token = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecord({
      ...currentRecord,
      [name]: value,
    });
  };

  const handleAddRecord = async () => {
    setCurrentRecord(null);
    setShowModal(false);

    const recordInfo = {
      name: currentRecord.name,
      total: totalAmount,
      paymentMethod: currentRecord.paymentMethod,
      isPaid: currentRecord.isPaid,
      orderDetails: items,
    };

    await addRecordsAPI(recordInfo, token);
    const response = await searchRecordsAPI("", token);
    setRecords(response.data.orders);

    setItems([{ name: "", quantity: "", price: "" }]);
    setTotalAmount(0);
  };

  // 新增一個訂單細項
  const addItem = () => {
    const newItem = { name: "", quantity: "", price: "" }; // 新細項的預設值
    setItems([...items, newItem]);
  };

  return (
    <Modal>
      <ModalContent>
        <Close onClick={() => setShowModal(false)}>&times;</Close>
        <h2>新增紀錄</h2>

        <Label>購買人:</Label>
        <Input type="text" name="name" onChange={handleChange} />

        <Label>訂單金額:</Label>
        <Input
          type="number"
          name="total"
          value={totalAmount}
          onChange={handleChange}
          readOnly
        />

        <Label>交易方式:</Label>
        <PaymentSelect name="paymentMethod" onChange={handleChange}>
          <option value="line">Linepay</option>
          <option value="delay">賒帳</option>
        </PaymentSelect>

        <Label>訂單細項:</Label>
        <AddRecordDetailTableContext.Provider
          value={{ items, setItems, setTotalAmount }}
        >
          <AddRecordDetailTable></AddRecordDetailTable>
        </AddRecordDetailTableContext.Provider>

        <ButtonContainer>
          <Button onClick={addItem}>+新增細項</Button>
        </ButtonContainer>

        <Label>狀態:</Label>
        <StatusSelect
          name="status"
          value={currentRecord?.isPaid ? "結清" : "未結清"}
          onChange={(e) =>
            setCurrentRecord({
              ...currentRecord,
              isPaid: e.target.value === "結清",
            })
          }
        >
          <option value="結清">結清</option>
          <option value="未結清">未結清</option>
        </StatusSelect>

        <Button onClick={handleAddRecord}>新增紀錄</Button>
      </ModalContent>
    </Modal>
  );
}

export default AddRecord;
export const AddRecordDetailTableContext = createContext();
