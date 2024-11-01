import styled from "styled-components";

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 40px;
  width: 500px;
`;

export const ProductNameTitle = styled.span``;

export const ProductName = styled.span`
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 300px;
  height: 53px;
  text-align: center;
`;

export const ProductInfoContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-around;
  font-size: 40px;
`;

export const GoCart = styled.div`
  position: absolute;
  bottom: -20px;
  right: 15px;
`;
