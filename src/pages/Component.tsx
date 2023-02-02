import { Component as ComponentTemplate } from "../components/templates/Component";
import { Header } from "../components/layouts";

export const Component: React.FC = () => {
  return (
    <>
      <Header />
      <ComponentTemplate />
    </>
  );
};
