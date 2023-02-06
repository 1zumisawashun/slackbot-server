import { styled, Theme } from "@mui/material/styles";
import { AppBar, Toolbar } from "@mui/material";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { useAuth, useDisclosure } from "../../hooks";
import { BasicModal, Button } from "../uis";
import { BaseText } from "../../themes";
import { useNavigate } from "react-router-dom";

const CustomAppbar = styled(AppBar)<{ theme?: Theme }>`
  background: white;
  z-index: ${({ theme }) => theme.zIndex.drawer + 2};
`;
const CustomToolbar = styled(Toolbar)`
  color: black;
  display: flex;
  justify-content: space-between;
  @media all {
    min-height: 60px;
  }
`;
const FlexGapWrapper = styled("div")`
  display: flex;
  gap: 20px;
`;
const CustomSpan = styled("span")`
  cursor: pointer;
`;
const styledIcon = css`
  height: 40px;
  width: 40px;
`;

export const Header: React.FC = () => {
  const { uid, logout } = useAuth();
  const logoutModal = useDisclosure();
  const loginModal = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <CustomAppbar position="fixed">
        <CustomToolbar>
          <div>
            <Link to="/">
              <img src={logo} alt="" className={styledIcon} />
            </Link>
          </div>

          <FlexGapWrapper>
            {uid ? (
              <>
                <Link to="/cart">Cart</Link>
                <Link to="/vote">Vote</Link>
                <Link to="/component">Component</Link>
                <CustomSpan onClick={logoutModal.open}>Logout</CustomSpan>
              </>
            ) : (
              <>
                <CustomSpan onClick={loginModal.open}>Cart</CustomSpan>
                <CustomSpan onClick={loginModal.open}>Vote</CustomSpan>
                <CustomSpan onClick={loginModal.open}>Component</CustomSpan>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </FlexGapWrapper>
        </CustomToolbar>
      </CustomAppbar>

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
      <BasicModal
        title="警告"
        open={loginModal.isOpen}
        handleClose={loginModal.close}
        contents={<BaseText>ログインしてください。</BaseText>}
        footer={
          <FlexGapWrapper>
            <Button onClick={() => navigate("/login")}>ログインする</Button>
            <Button onClick={loginModal.close}>閉じる</Button>
          </FlexGapWrapper>
        }
      />
    </>
  );
};
