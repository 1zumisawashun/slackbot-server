import styled from "@emotion/styled";
import { useState, useCallback } from "react";
import { useAuth } from "../../hooks";
import { Button, FilterButton } from "../uis";
import { MypageCreditCard, MypageLogout } from "../models";

const GapWrapper = styled("div")`
  display: grid;
  gap: 20px;
  padding: 20px 0;
`;
const ComponentContainer = styled("div")`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-top: 10px;
  padding: 16px;
  position: relative;
`;
const Title = styled("p")`
  background-color: #f4f4f4;
  font-size: 20px;
  left: 16px;
  padding: 0 8px;
  position: absolute;
  top: -16px;
`;

const items = [
  "creditCard",
  "address",
  "updateEmail",
  "updatePassword",
  "logout",
];

export const Mypage = () => {
  const { uid } = useAuth();
  const [currentFilter, setCurrentFilter] = useState("creditCard");

  const changeFilter = useCallback((newFilter: string) => {
    setCurrentFilter(newFilter);
  }, []);

  return (
    <GapWrapper>
      <FilterButton
        currentFilter={currentFilter}
        changeFilter={changeFilter}
        items={items}
      />
      {currentFilter === "creditCard" && <MypageCreditCard></MypageCreditCard>}
      {currentFilter === "address" && (
        <ComponentContainer>
          <Title>Slack Notification</Title>
          <Button onClick={() => console.log("test")}>
            Slack Notification
          </Button>
        </ComponentContainer>
      )}
      {currentFilter === "updateEmail" && (
        <ComponentContainer>
          <Title>Slack Notification</Title>
          <Button onClick={() => console.log("test")}>
            Slack Notification
          </Button>
        </ComponentContainer>
      )}
      {currentFilter === "updatePassword" && (
        <ComponentContainer>
          <Title>Slack Notification</Title>
          <Button onClick={() => console.log("test")}>
            Slack Notification
          </Button>
        </ComponentContainer>
      )}
      {currentFilter === "logout" && <MypageLogout></MypageLogout>}
    </GapWrapper>
  );
};
