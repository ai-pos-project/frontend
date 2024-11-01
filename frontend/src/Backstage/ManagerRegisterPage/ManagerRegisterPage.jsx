import { useNavigate } from "react-router-dom";
import {
  AppContainer,
  Header,
  HeaderTitle,
  InputContainer,
  Form,
  InputRow,
  Label,
  Input,
  Button,
} from "./ManagerRegisterPage.style";
import { BackButton } from "../Common/Common.style";
import { useState } from "react";
import { registerManager } from "../../api/Manager/General/ManagerRegisterapi";
import Swal from "sweetalert2";

function ManagerRegisterPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      Swal.fire({
        title: "電話或密碼不得為空!",
        text: "",
        icon: "error",
      });
      return;
    }

    const response = await registerManager(phone, password);
    if (response) {
      navigate("/Login");
    }
  };

  return (
    <AppContainer>
      <Header>
        <HeaderTitle>獵人雜貨店後臺管理</HeaderTitle>
      </Header>
      <InputContainer>
        <Form onSubmit={handleSubmit}>
          <h1>店長註冊</h1>
          <InputRow>
            <Label>電話號碼</Label>
            <Input
              type="tel"
              id="phone"
              placeholder="請輸入電話號碼"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputRow>
          <InputRow>
            <Label>密碼</Label>
            <Input
              type="password"
              id="password"
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputRow>
          <Button type="submit">註冊</Button>
        </Form>
      </InputContainer>
      <BackButton onClick={() => navigate("/Login")}>返回</BackButton>
    </AppContainer>
  );
}

export default ManagerRegisterPage;
