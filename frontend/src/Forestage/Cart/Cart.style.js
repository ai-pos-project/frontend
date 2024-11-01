import styled from "styled-components";

export const Container = styled.div`
  background-color: #dde5b6;
  min-height: 100vh;
  display: flex;
`;

export const CartLeft = styled.div`
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
  .camera {
    font-size: 30px;
    text-align: center;
  }
  .last-page {
    font-size: 20px;
    padding: 10px;
    color: #555353bb;
    width: 150px;
  }
`;

export const CartRight = styled.div`
  display: grid;
  width: 70%;
  .shopping-list {
    text-align: center;
    font-size: 30px;
    padding: 20px 0 10px 0;
  }
`;

export const CameraArea = styled.div`
  background-color: #adc178;
  border-radius: 40px;
  width: 202px;
  height: 116px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  font-size: 100px;
`;

export const linkStyle = {
  color: "black",
  textDecoration: "none",
};

export const CartRightBottom = styled.div`
  display: flex;
  margin: 20px 0;
  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const TotalPrice = styled.div`
  background-color: #ffde5c;
  width: 70%;
  height: 100px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 30px;
`;

export const CheckoutBtn = styled.div`
  background-color: #adc178;
  width: 50%;
  height: 100px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;

export const CartItemContainer = styled.div`
  width: 90%;
  height: 300px;
  display: grid;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  overflow-y: scroll;
`;
