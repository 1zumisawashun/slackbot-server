import { styled } from "@mui/material/styles";

/**
 * prelineでマークダウンに対応させる
 */
export const BaseText = styled("p")`
  color: #4a4a4a;
  font-size: 14px;
  white-space: pre-line;
  word-break: break-all;
  a {
    color: #0066ff;
  }
  &.-orange {
    color: #f08e35;
  }
  &.-red {
    color: #cc3c4d;
  }
  &.-blue {
    color: #0066ff;
  }
  &.-grey {
    color: grey;
  }
  &.-white {
    color: #ffffff;
  }
  &.-left {
    text-align: left;
  }
  &.-end {
    text-align: end;
  }
  &.-center {
    text-align: center;
  }
  &.-inline {
    display: inline-block;
  }
  &.-underline {
    text-decoration: underline;
  }
  &.-bold {
    font-weight: bold;
  }
  &.-nowrap {
    white-space: nowrap;
  }
  &.-full {
    width: 100%;
  }
`;
