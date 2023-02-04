import { Signup as SignupTemplate } from "../components/templates/Signup";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Signup: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <SignupTemplate />
      </BaseBox>
    </>
  );
};
