import styled from "@emotion/styled";
import { useState, BaseSyntheticEvent } from "react";
import { useAuth } from "../../../hooks";
import { InputText, Button } from "../../uis";
import line from "../../../assets/btn_login_base.png";
import { css } from "@emotion/css";

const Wrapper = styled("div")`
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.15);
  padding: 50px 0;
`;
const Content = styled("div")`
  display: grid;
  gap: 20px;
  justify-items: center;
`;
const FormContainer = styled("form")`
  display: grid;
  gap: 20px;
  width: 100%;
  padding: 0 30px;
`;
const Title = styled("h1")`
  font-size: 20px;
`;
const styledImage = css`
  display: block;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

type AuthFormProps = {
  type: "signup" | "login";
  handleLine?: () => void;
};

export const AuthForm: React.FC<AuthFormProps> = ({ type, handleLine }) => {
  const { login, signup } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const params = { email, password };
    if (type === "login") await login(params);
    if (type === "signup") await signup(params);
  };

  const title = type === "login" ? "Welcome Back!" : "Welcome!";
  const button = type === "login" ? "Log In" : "Sign Up";

  return (
    <Wrapper>
      <Content>
        <Title>{title}</Title>
        <FormContainer onSubmit={handleSubmit}>
          <InputText
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputText
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {type === "login" && (
            <img
              src={line}
              alt="line_login_icon"
              className={styledImage}
              onClick={handleLine}
            />
          )}
          <Button type="submit">{button}</Button>
        </FormContainer>
      </Content>
    </Wrapper>
  );
};
