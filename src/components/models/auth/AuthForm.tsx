import styled from "@emotion/styled";
import { useState, BaseSyntheticEvent } from "react";
import { useAuth } from "../../../hooks";
import { InputText, Button } from "../../uis";

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid gainsboro;
  box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.15);
  padding: 5rem 0;
  * {
    box-sizing: border-box;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 1rem;
  justify-items: center;
`;

const FormContainer = styled.form`
  display: grid;
  gap: 1rem;
  width: 50%;
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
        <h1>{title}</h1>
        <FormContainer onSubmit={handleSubmit}>
          <div>
            <InputText
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <InputText
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">{button}</Button>
        </FormContainer>
      </Content>
    </Wrapper>
  );
};
