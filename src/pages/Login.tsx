import { Login as LoginTemplate } from "../components/templates/Login";
import { Header } from "../components/layouts";

export const Login: React.FC = () => {
  return (
    <>
      <Header />
      <LoginTemplate />
    </>
  );
};
