import styled from "styled-components";

export const Container = styled.div`
  background-color: #dde5b6;
  min-height: 100vh;
  display: grid;
`;

export const Top = styled.div`
  display: grid;
  width: 30%;
  align-items: center;
  justify-content: center;
  .hello {
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
  }
`;

export const Middle = styled.div`
  font-size: 30px;
  display: grid;
  align-items: center;
  justify-content: center;
  .chose-method {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Bottom = styled.div`
  .last-page {
    font-size: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    color: #555353bb;
    width: 150px;
  }
`;

export const PayMethodBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Button = styled.div`
  border-radius: 50px;
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  &.credit {
    background-color: #87b216;
  }
  &.settle {
    background-color: #adc178;
  }
`;

export const linkStyle = {
  color: "black",
  textDecoration: "none",
};
