import styled from "@emotion/styled";
import { Theme } from "@mui/system";
import { memo } from "react";
import { Button } from ".";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";

const FilterContainer = styled("div")`
  width: 100%;
`;
const FilterNav = styled("nav")`
  display: block;
`;

const CustomButton = styled(Button)<CustomButtonProps>`
  margin: 5px;
  &.active {
    background-color: ${({ theme, color }) => {
      return color && theme.palette[color].main;
    }};
    color: white;
    transition: 0.1s ease;
    transition-delay: 0.1s;
  }
`;

type CustomButtonProps = {
  color: MuiButtonProps["color"];
  theme?: Theme;
};

interface FilterButtonProps {
  className?: string;
  currentFilter: string;
  changeFilter: (newFilter: string) => void;
  items: Array<string>;
  color?: MuiButtonProps["color"];
  size?: "small" | "medium" | "large";
}

export const FilterButton: React.FC<FilterButtonProps> = memo(
  ({
    className,
    currentFilter,
    changeFilter,
    items,
    color = "primary",
    size = "small",
  }) => {
    return (
      <FilterContainer>
        <FilterNav>
          {items.map((item) => (
            <CustomButton
              key={item}
              onClick={() => changeFilter(item)}
              className={
                currentFilter === item ? `active ${className}` : className
              }
              color={color}
              size={size}
              variant="outlined"
            >
              {item}
            </CustomButton>
          ))}
        </FilterNav>
      </FilterContainer>
    );
  }
);
