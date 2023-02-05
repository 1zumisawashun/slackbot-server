import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export type ButtonIconProps = {
  onClick: () => void;
};

export const ButtonIconDelete: React.FC<ButtonIconProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
};

export const ButtonIconRemove: React.FC<ButtonIconProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <RemoveCircleOutlineIcon />
    </IconButton>
  );
};

export const ButtonIconAdd: React.FC<ButtonIconProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <AddCircleOutlineIcon />
    </IconButton>
  );
};
