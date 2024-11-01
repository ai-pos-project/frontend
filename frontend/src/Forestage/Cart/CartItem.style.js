import styled from "styled-components";

export const Item = styled.div`
  width: 675px;
  height: 140px;
  background-color: #f0ead2;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 50px;
  margin: 20px 0;
  border: 1px solid;
  border-color: #ffb8b8;
  .xmark {
    width: 43px;
    height: 43px;
    color: white;
    background-color: red;
    border-radius: 50%;
    margin-top: -130px;
    margin-right: -15px;
  }
`;

export const ItemName = styled.div`
  font-size: 30px;
`;

export const Button = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: 60px;
  &.add {
    background-color: #adc178;
  }
  &.minus {
    background-color: #a98467;
  }
`;
