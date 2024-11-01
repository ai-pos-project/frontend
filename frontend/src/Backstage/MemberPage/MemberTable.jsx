import { TableContainer, Table, Th, Td } from "../Common/Common.style";
import { Img } from "./MemberPage.style";
import { MemberTableContext } from "./MemberPage";
import { useContext } from "react";

function MemberTable() {
  const { members } = useContext(MemberTableContext);

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>姓名</Th>
            <Th>電話</Th>
            <Th>照片</Th>
          </tr>
        </thead>
        <tbody>
          {members?.map((member, index) => (
            <tr key={index}>
              <Td>{member.name}</Td>
              <Td>{member.phone}</Td>
              <Td>
                {member.photo ? (
                  <Img src={member.photo} alt="會員照片" />
                ) : (
                  "無照片"
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default MemberTable;
