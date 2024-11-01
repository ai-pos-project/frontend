import styled from "styled-components";

export const Container = styled.div`
  background-color: #dde5b6;
  height: calc(100vh - 40px);
  display: grid;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  font-size: 50px;
`;

export const Bottom = styled.div`
  background-color: #dde5b6;
  font-size: 30px;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  .text {
    color: gray;
    margin: 0 10px;
  }
`;

export const linkStyle = {
  color: "black",
  textDecoration: "none",
};
