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
  width: 400px;
  height: 300px;
  border: 1px solid #8ed392;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 80%;
`;

export const Label = styled.label`
  font-size: 18px;
  margin-right: 10px;
  width: 150px; /* Set a fixed width for the label */
  text-align: left; /* Align the label text to the left */
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 220px;
  border-radius: 20px;
  border: 1px solid #ccc;
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
