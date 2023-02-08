import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export type ButtonIconProps = {
  onClick: () => void;
  isDisabled?: boolean;
};

export const ButtonIconDelete: React.FC<ButtonIconProps> = ({
  onClick,
  isDisabled = false,
}) => {
  return (
    <IconButton onClick={onClick} disabled={isDisabled}>
      <DeleteIcon />
    </IconButton>
  );
};

export const ButtonIconRemove: React.FC<ButtonIconProps> = ({
  onClick,
  isDisabled = false,
}) => {
  return (
    <IconButton onClick={onClick} disabled={isDisabled}>
      <RemoveCircleOutlineIcon />
    </IconButton>
  );
};

export const ButtonIconAdd: React.FC<ButtonIconProps> = ({
  onClick,
  isDisabled = false,
}) => {
  return (
    <IconButton onClick={onClick} disabled={isDisabled}>
      <AddCircleOutlineIcon />
    </IconButton>
  );
};
