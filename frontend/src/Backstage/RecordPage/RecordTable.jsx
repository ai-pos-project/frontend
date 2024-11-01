import { TableContainer, Table, Th, Td, Button } from "../Common/Common.style";
import { PaymentMethod, StatusSelect } from "./RecordPage.style";
import { confirmPaymentAPI } from "../../api/Manager/Records/confirmPaymentAPI";
import { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { searchRecordsAPI } from "../../api/Manager/Records/searchRecordsAPI";
import { RecordContext } from "./RecordPage";

function RecordTable() {
  const {
    keyWord,
    records,
    setRecords,
    setShowDetailsModal,
    setCurrentRecord,
  } = useContext(RecordContext);
  const token = Cookies.get("token");

  useEffect(() => {
    const displayRecords = async () => {
      const response = await searchRecordsAPI("", token);
      setRecords(response.data.orders);
    };
    displayRecords();
  }, [token, setRecords]);

  const handleViewDetails = (index) => {
    setCurrentRecord({
      ...records[index],
    });
    setShowDetailsModal(true);
  };

  const handleStatusChange = async (index, status) => {
    if (status === "paid") {
      const orderInfo = {
        orderId: records[index].id,
        isPaid: true,
      };
      await confirmPaymentAPI(orderInfo, token);
    } else if (status === "delay") {
      const orderInfo = {
        orderId: records[index].id,
        isPaid: false,
      };
      await confirmPaymentAPI(orderInfo, token);
    }

    if (keyWord === "") {
      const response = await searchRecordsAPI("", token);
      setRecords(response?.data.orders);
    } else {
      const response = await searchRecordsAPI(keyWord, token);
      setRecords(response?.data.orders);
    }
  };

  const covertTime = (time) => {
    const date = new Date(time);

    const taiwanTime = date.toLocaleString("zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return taiwanTime;
  };
  return (
    <>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>時間</Th>
              <Th>購買人</Th>
              <Th>訂單金額</Th>
              <Th>交易方式</Th>
              <Th>訂單細項</Th>
              <Th>狀態</Th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(records) && records.length > 0 ? (
              records
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((record, index) => (
                  <tr key={index}>
                    <Td>{covertTime(record.createdAt)}</Td>
                    <Td>{record.name}</Td>
                    <Td>{record.total}</Td>
                    <Td>
                      <PaymentMethod>
                        {record.orderStatus.paymentMethod}
                      </PaymentMethod>
                    </Td>
                    <Td>
                      <Button onClick={() => handleViewDetails(index)}>
                        查看
                      </Button>
                    </Td>
                    <Td>
                      <StatusSelect
                        value={record.orderStatus.isPaid ? "paid" : "delay"}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                      >
                        <option value="paid">結清</option>
                        <option value="delay">未結清</option>
                      </StatusSelect>
                    </Td>
                  </tr>
                ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RecordTable;
