import { Mypage as MypageTemplate } from "../components/templates/Mypage";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Mypage: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <MypageTemplate />
      </BaseBox>
    </>
  );
};
