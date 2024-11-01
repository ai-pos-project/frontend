import {
  Header,
  Container,
  HeaderItem,
  linkStyle,
  Button,
} from "./HomePage.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Header>
        <HeaderItem className="name">獵人雜貨店</HeaderItem>
        <HeaderItem className="setting">
          <Link to="/Login" style={linkStyle}>
            <FontAwesomeIcon icon={faGear} />
          </Link>
        </HeaderItem>
      </Header>
      <Container>
        <Link to="/Register" style={linkStyle}>
          <Button className="register">註冊會員</Button>
        </Link>
        <Link to="/Identify" style={linkStyle}>
          <Button className="checkout">物品結帳</Button>
        </Link>
      </Container>
    </>
  );
}

export default HomePage;
