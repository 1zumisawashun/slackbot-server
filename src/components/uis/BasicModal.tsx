import styled from "@emotion/styled";
import { Modal } from "@mui/material";

const ModalInner = styled("div")<{ size: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 10px 0 50px 0;
  position: relative;
  width: ${({ size }) => {
    if (size === "small") return "600px";
    if (size === "medium") return "800px";
    if (size === "large") return "1200px";
    return "600px";
  }};
`;

const Headline = styled("p")`
  font-size: 24px;
  padding: 0 30px;
  text-align: center;
  font-weight: bold;
`;

const ContentWrapper = styled("div")`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  margin: 30px;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
`;

const FooterWrapper = styled("div")`
  display: flex;
  gap: 30px;
  justify-content: center;
`;

export interface ModalProps {
  className?: string;
  title: string;
  contents?: JSX.Element;
  footer?: JSX.Element;
  open: boolean;
  size?: "small" | "medium" | "large";
  handleClose: () => void;
}

export const BasicModal: React.FC<ModalProps> = ({
  className,
  open = false,
  title,
  contents,
  footer,
  size = "small",
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <ModalInner size={size}>
        <Headline>{title}</Headline>
        <ContentWrapper>{contents}</ContentWrapper>
        <FooterWrapper>{footer}</FooterWrapper>
      </ModalInner>
    </Modal>
  );
};
