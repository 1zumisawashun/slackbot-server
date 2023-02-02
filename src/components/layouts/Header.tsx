import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

export const Header = () => {
  const { uid, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="App">
      {uid ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
      <button onClick={() => navigate("/checkout")}>Checkout</button>
      <button onClick={() => navigate("/component")}>Component</button>
      <button onClick={() => navigate("/")}>Top</button>
      <button onClick={() => navigate("/vote")}>Vote</button>
    </div>
  );
};
