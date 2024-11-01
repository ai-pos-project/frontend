import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppContainer,
  Header,
  BackButton,
  SearchInput,
} from "../Common/Common.style";
import { useEffect } from "react";
import { searchMembersAPI } from "../../api/Manager/Member/searchMembersAPI";
import { createContext } from "react";
import MemberTable from "./MemberTable";
import Cookies from "js-cookie";

const MemberManagement = () => {
  const token = Cookies.get("token");
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const displayMembers = async () => {
      const response = await searchMembersAPI("", token);
      setMembers(response?.data.users);
    };

    displayMembers();
  }, [token]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    const response = await searchMembersAPI(e.target.value, token);
    setMembers(response?.data.users);
  };

  return (
    <AppContainer>
      <Header>會員管理</Header>

      <SearchInput
        type="text"
        placeholder="搜尋姓名或電話..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <MemberTableContext.Provider value={{ members }}>
        <MemberTable></MemberTable>
      </MemberTableContext.Provider>

      <BackButton onClick={() => navigate("/dashboard")}>返回</BackButton>
    </AppContainer>
  );
};

export default MemberManagement;
export const MemberTableContext = createContext();
