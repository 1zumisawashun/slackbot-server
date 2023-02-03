import styled from "@emotion/styled";
import { BaseText } from "./BaseText";

/**
 * =================================
 * styledの拡張（スニペット）
 * =================================
 */
export const DottedOneLine = styled(BaseText)`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const DottedTwoLine = styled(BaseText)`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
export const DottedThreeLine = styled(BaseText)`
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
