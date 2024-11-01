import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppContainer,
  Header,
  Button,
  BackButton,
  SearchInput,
} from "../Common/Common.style";
import { searchRecordsAPI } from "../../api/Manager/Records/searchRecordsAPI";
import Cookies from "js-cookie";
import RecordTable from "./RecordTable";
import AddRecord from "./AddRecord";
import RecordDetail from "./RecordDetail";

const PurchaseRecord = () => {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [currentRecord, setCurrentRecord] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleSearch = async (e) => {
    setKeyWord(e.target.value);
    const response = await searchRecordsAPI(e.target.value, token);
    setRecords(response?.data.orders);
  };

  return (
    <AppContainer>
      <Header>消費紀錄管理</Header>

      <SearchInput
        type="text"
        placeholder="搜尋購買人..."
        onChange={handleSearch}
      />

      <Button
        onClick={() => {
          setCurrentRecord({
            name: "",
            paymentMethod: "line",
            isPaid: false,
          });
          setShowModal(true);
        }}
      >
        新增紀錄
      </Button>

      <RecordContext.Provider
        value={{
          keyWord,
          records,
          setRecords,
          setCurrentRecord,
          setShowDetailsModal,
        }}
      >
        <RecordTable></RecordTable>
      </RecordContext.Provider>

      {showModal && (
        <AddRecordContext.Provider
          value={{
            showModal,
            currentRecord,
            setShowModal,
            setRecords,
            setCurrentRecord,
          }}
        >
          <AddRecord></AddRecord>
        </AddRecordContext.Provider>
      )}

      {showDetailsModal && (
        <RecordDetailContext.Provider
          value={{ currentRecord, setShowDetailsModal }}
        >
          <RecordDetail></RecordDetail>
        </RecordDetailContext.Provider>
      )}

      <BackButton onClick={() => navigate(-1)}>返回</BackButton>
    </AppContainer>
  );
};

export default PurchaseRecord;
export const RecordContext = createContext();
export const AddRecordContext = createContext();
export const RecordDetailContext = createContext();
