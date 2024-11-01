import styled from "styled-components";

export const Container = styled.div`
  background-color: #dde5b6;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

export const Scan = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 600;
`;

export const CameraWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
`;

export const CameraArea = styled.div`
  height: 100%;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 332px;
  .camera {
    width: 100%;
  }
`;
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 700px;
`;

export const Button = styled.div`
  font-size: 30px;
  font-weight: 600;
  padding: 10px 40px;
  border-radius: 31.5px;
  text-align: center;
  width: 200px;
  margin-top: 20px;
  cursor: pointer;
  &.confirm {
    background-color: #a98467;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &.again {
    background-color: #adc178;
  }
`;

export const linkStyle = {
  color: "black",
  textDecoration: "none",
};
