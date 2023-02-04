import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { Button } from "../uis";

export const Header = () => {
  const { uid, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="App">
      {uid ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={() => navigate("/login")}>Login</Button>
      )}
      <Button onClick={() => navigate("/checkout")}>Checkout</Button>
      <Button onClick={() => navigate("/component")}>Component</Button>
      <Button onClick={() => navigate("/")}>Top</Button>
      <Button onClick={() => navigate("/vote")}>Vote</Button>
    </div>
  );
};
