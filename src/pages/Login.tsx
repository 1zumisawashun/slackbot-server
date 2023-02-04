import { Login as LoginTemplate } from "../components/templates/Login";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Login: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <LoginTemplate />
      </BaseBox>
    </>
  );
};
