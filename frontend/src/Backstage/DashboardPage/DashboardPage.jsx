import { useNavigate } from "react-router-dom";
import {
  ButtonContainer,
  Button,
  InputContainer,
  AppContainer,
  Header,
  HeaderTitle,
  BackButton,
} from "./DashboardPage.style";
function DashboardPage() {
  const navigate = useNavigate();
  return (
    <AppContainer>
      <Header>
        <HeaderTitle>獵人雜貨店後臺管理</HeaderTitle>
      </Header>
      <InputContainer>
        <h2>請選擇管理項目</h2>
        <ButtonContainer>
          <Button onClick={() => navigate("/product")}>商品管理</Button>
          <Button onClick={() => navigate("/member")}>會員管理</Button>
          <Button onClick={() => navigate("/record")}>消費紀錄</Button>
        </ButtonContainer>
      </InputContainer>

      <BackButton onClick={() => navigate("/")}>返回</BackButton>
    </AppContainer>
  );
}

export default DashboardPage;
