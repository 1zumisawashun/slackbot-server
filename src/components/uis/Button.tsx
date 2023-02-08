import { ReactNode } from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface ButtonProps
  extends Pick<MuiButtonProps, Exclude<keyof MuiButtonProps, "color">> {
  variant?: "text" | "contained" | "outlined";
  color?: MuiButtonProps["color"];
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  startIcon,
  endIcon,
  type = "button",
  color = "primary",
  size = "medium",
  variant = "outlined",
  isDisabled,
  isLoading = false,
  onClick,
  fullWidth = false,
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      type={type}
      className={className}
      onClick={onClick}
      disabled={isDisabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {!isLoading && <p>{children}</p>}
      {isLoading && <CircularProgress size={20} />}
    </MuiButton>
  );
};
