import styled from "styled-components";

export const AppContainer = styled.div`
  text-align: center;
  background-color: #dde5b6;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; /* 將內容置中 */
`;

export const Header = styled.h1`
  margin: 20px 0;
`;

export const Button = styled.button`
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
export const BackButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

export const TableContainer = styled.div`
  width: 90%;
  height: 60%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  overflow-y: auto;
`;

export const Table = styled.table`
  margin: 20px auto;
  border-collapse: collapse;
  width: 80%;
  border-radius: 10px;
`;

export const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: rgba(192, 192, 192);
  color: white;
`;

export const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: rgba(250, 240, 230);
`;

export const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 60%;
  max-width: 400px;
`;

export const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 400px;
  text-align: left;
  overflow-y: auto;
`;

export const Close = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
`;
