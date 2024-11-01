import styled from "styled-components";

export const AppContainer = styled.div`
  text-align: center;
  background-color: #dde5b6;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background-color: #dde5b6;
  padding: 10px;
  color: black;
  text-align: left;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
`;

export const InputContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-left: 35%;
  padding: 40px;
  width: 400px; /* 寬度 */
  height: 300px; /* 高度，使其成為正方形 */
  border: 1px solid #8ed392;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加陰影效果 */
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  padding: 20px 25px;
  margin: 10px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #45a049;
  }
`;

export const BackButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: 41px;
  test-align: center;
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 150px;

  &:hover {
    background-color: #45a049;
  }
`;
