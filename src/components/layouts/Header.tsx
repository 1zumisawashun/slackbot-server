import { styled, Theme } from "@mui/material/styles";
import { AppBar, Toolbar } from "@mui/material";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { useAuth } from "../../hooks";

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
const LinkWrapper = styled("div")`
  display: flex;
  gap: 10px;
`;

const styledIcon = css`
  height: 40px;
  width: 40px;
`;

export const Header: React.FC = () => {
  const { uid, logout } = useAuth();
  return (
    <CustomAppbar position="fixed">
      <CustomToolbar>
        <div>
          <Link to="/">
            <img src={logo} alt="" className={styledIcon} />
          </Link>
        </div>

        <LinkWrapper>
          <Link to="/vote">Vote</Link>
          <Link to="/checkout">Checkout</Link>
          {uid ? (
            <span onClick={logout}>logout</span>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
          <Link to="/component">Component</Link>
        </LinkWrapper>
      </CustomToolbar>
    </CustomAppbar>
  );
};
