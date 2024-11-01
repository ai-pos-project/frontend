import styled from "styled-components";
import backgroundImg from "../assets/Hero.png";

export const Header = styled.header`
  background-color: #dde5b6;
  height: 104px;
  margin: 0;
  font-size: 50px;
  text-shadow: 2px 6px 6px #6d6b6b;
`;

export const HeaderItem = styled.div`
  &.name {
    float: left;
    padding: 18.5px;
    font-weight: bold;
  }
  &.setting {
    float: right;
    padding: 23px 18.5px;
  }
`;

export const linkStyle = {
  color: "black",
  textDecoration: "none",
};

export const Container = styled.div`
  margin: auto;
  background-image: url(${backgroundImg});
  width: 100%;
  height: calc(100vh - 104px);
  background-size: cover;
  display: grid;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.span`
  font-size: 30px;
  padding: 9px 20px;
  border-radius: 33.5px;
  font-weight: 600;
  margin: 0 auto;
  &.register {
    background-color: #adc178;
  }
  &.checkout {
    background-color: #a98467;
  }
`;
