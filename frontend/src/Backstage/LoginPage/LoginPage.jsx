import { useNavigate } from "react-router-dom";
import {
  AppContainer,
  Header,
  HeaderTitle,
  Label,
  InputContainer,
  Form,
  Input,
  Button,
  InputRow,
  RegisterButton,
} from "./LoginPage.style";
import { BackButton } from "../Common/Common.style";
import { useState } from "react";
import { loginManager } from "../../api/Manager/General/ManagerLoginapi";
import Cookies from "js-cookie";

function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const setCookies = (data) => {
    const maxAge = { expires: 5 / 24 }; // Expires in 5 hours
    Cookies.set("token", data.access_token, maxAge);
    Cookies.set("user_phone", data.user.phone, maxAge);
    Cookies.set("user_password", data.user.password, maxAge);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginManager(phone, password);
    if (response) {
      navigate("/dashboard");
      const access_token = response.data.accessToken;
      const user = response.data.user;
      setCookies({ access_token, user });
    }
  };

  return (
    <AppContainer>
      <Header>
        <HeaderTitle>獵人雜貨店後臺管理</HeaderTitle>
      </Header>
      <InputContainer>
        <Form onSubmit={handleSubmit}>
          <h1>店長登入</h1>
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
          <Button type="submit">確認登入</Button>
          <RegisterButton
            type="button"
            onClick={() => navigate("/ManagerRegister")}
          >
            店長註冊
          </RegisterButton>
        </Form>
      </InputContainer>
      <BackButton onClick={() => navigate("/")}>返回</BackButton>
    </AppContainer>
  );
}

export default LoginPage;
