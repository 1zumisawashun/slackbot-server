import styled from "@emotion/styled";
import { useState, BaseSyntheticEvent } from "react";
import { useAuth } from "../../../hooks";
import { InputText, Button } from "../../uis";

const Wrapper = styled("div")`
  background-color: white;
  border-radius: 8px;
  box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.15);
  padding: 5rem 0;
`;

const Content = styled("div")`
  display: grid;
  gap: 1rem;
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

type AuthFormProps = {
  type: "signup" | "login";
};
export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
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
          <Button type="submit">{button}</Button>
        </FormContainer>
      </Content>
    </Wrapper>
  );
};
