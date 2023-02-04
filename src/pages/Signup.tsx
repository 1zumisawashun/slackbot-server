import { Signup as SignupTemplate } from "../components/templates/Signup";
import { Header } from "../components/layouts";

export const Signup: React.FC = () => {
  return (
    <>
      <Header />
      <SignupTemplate />
    </>
  );
};
