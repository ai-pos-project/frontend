import { DetailsTable, DetailsTd, DetailsTh } from "./RecordPage.style";
import { Modal, ModalContent, Close } from "../Common/Common.style";
import { useContext } from "react";
import { RecordDetailContext } from "./RecordPage";

function RecordDetail() {
  const { currentRecord, setShowDetailsModal } =
    useContext(RecordDetailContext);

  return (
    <Modal>
      <ModalContent>
        <Close onClick={() => setShowDetailsModal(false)}>&times;</Close>
        <h2>訂單細項</h2>
        <DetailsTable>
          <thead>
            <tr>
              <DetailsTh>商品名稱</DetailsTh>
              <DetailsTh>購買數量</DetailsTh>
              <DetailsTh>金額</DetailsTh>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentRecord?.orderDetail) &&
            currentRecord?.orderDetail.length > 0 ? (
              currentRecord?.orderDetail.map((orderDetail, index) => (
                <tr key={index}>
                  <DetailsTd>{orderDetail.name}</DetailsTd>
                  <DetailsTd>{orderDetail.quantity}</DetailsTd>
                  <DetailsTd>{orderDetail.subtotal}</DetailsTd>
                </tr>
              ))
            ) : (
              <tr>
                <DetailsTd colSpan="3"></DetailsTd>
              </tr>
            )}
          </tbody>
        </DetailsTable>
      </ModalContent>
    </Modal>
  );
}

export default RecordDetail;
