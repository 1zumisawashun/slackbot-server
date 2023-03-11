import styled from "@emotion/styled";
import { useAuth, useDisclosure } from "../../../../hooks";
import { Button, BasicModal } from "../../../uis";
import { BaseText } from "../../../../themes";

const GapWrapper = styled("div")`
  display: grid;
  gap: 20px;
  padding: 20px 0;
`;
const ComponentContainer = styled("div")`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-top: 10px;
  padding: 16px;
  position: relative;
`;
const Title = styled("p")`
  background-color: #f4f4f4;
  font-size: 20px;
  left: 16px;
  padding: 0 8px;
  position: absolute;
  top: -16px;
`;
const FlexGapWrapper = styled("div")`
  display: flex;
  gap: 20px;
`;

export const MypageLogout = () => {
  const { logout } = useAuth();
  const logoutModal = useDisclosure();

  return (
    <>
      <GapWrapper>
        <ComponentContainer>
          <Title>logout</Title>
          <Button onClick={logoutModal.open}>logout</Button>
        </ComponentContainer>
      </GapWrapper>

      <BasicModal
        title="警告"
        open={logoutModal.isOpen}
        handleClose={logoutModal.close}
        contents={<BaseText>本当にログアウトしますか？</BaseText>}
        footer={
          <FlexGapWrapper>
            <Button onClick={logout}>はい</Button>
            <Button onClick={logoutModal.close}>いいえ</Button>
          </FlexGapWrapper>
        }
      />
    </>
  );
};
