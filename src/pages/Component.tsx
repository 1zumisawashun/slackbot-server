import { Component as ComponentTemplate } from "../components/templates/Component";
import { Header } from "../components/layouts";
import { BaseBox } from "../themes";

export const Component: React.FC = () => {
  return (
    <>
      <Header />
      <BaseBox>
        <ComponentTemplate />
      </BaseBox>
    </>
  );
};
