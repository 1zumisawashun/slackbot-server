import { styled } from "@mui/material/styles";
import { Box, Theme } from "@mui/material";

export const BaseBox = styled(Box)<{ theme?: Theme }>`
  padding: 20px;
  background: #f7f7f7;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
`;
