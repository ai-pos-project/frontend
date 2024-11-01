import styled from "styled-components";

export const DetailButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
`;

export const StatusSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fefefe;
`;

export const PaymentSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const PaymentMethod = styled.div`
  width: calc(100% - 20px);
`;

export const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

export const DetailsTh = styled.th`
  border: 1px solid #ddd;
  padding: 5px;
  background-color: #f2f2f2;
  text-align: center;
`;

export const DetailsTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;

  &:nth-child(1) {
    width: 30%; /* Product name takes up 60% of the row */
  }

  &:nth-child(2) {
    width: 20%; /* Quantity takes up 20% of the row */
  }

  &:nth-child(3) {
    width: 20%; /* Buttons take up 20% of the row */
    text-align: center;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-item: center;
  justify-content: center;
`;
