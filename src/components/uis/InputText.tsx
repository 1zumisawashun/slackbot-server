import styled from "@emotion/styled";
import { TextField, InputAdornment, IconButton } from "@mui/material";

const Wrapper = styled("div")`
  display: grid;
  gap: 5px;
`;
const SubText = styled("p")`
  font-size: 12px;
`;
const MainText = styled("p")`
  font-size: 15px;
  font-weight: bold;
`;
const LabelWrapper = styled("div")`
  align-items: center;
  display: flex;
  gap: 5px;
`;
const Label = styled("label")`
  font-size: 15px;
  font-weight: 600;
`;
const CustomTextField = styled(TextField)<{ placeholdercolor?: string }>`
  width: 100%;
  .MuiOutlinedInput-root {
    background: white;
  }
  .MuiInputBase-input {
    color: ${({ placeholdercolor }) => placeholdercolor || ""};
  }
`;
const CustomInputAdornment = styled(InputAdornment)`
  padding: 0;
  position: absolute;
  right: 10px;
  top: 50%;
`;

export interface InputTextProps {
  // NOTE:アクション
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  // NOTE:エラーハンドリング
  error?: boolean;
  helperText?: string;
  // NOTE:必須項目
  label?: string;
  value?: string | number;
  isDisabled?: boolean;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  //NOTE:追加項目
  autoFocus?: boolean;
  name?: string;
  pattern?: string;
  maxLength?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  size?: "small";
  mainText?: string;
  subTexts?: string[]; //複数入ることを想定
  isRequired?: boolean;
  icon?: JSX.Element;
  readOnly?: boolean;
  variant?: "filled" | "outlined" | "standard";
  placeholderColor?: string;
  isLeftIcon?: boolean;
}

export const InputText: React.FC<InputTextProps> = ({
  onChange,
  onKeyDown,
  onBlur,
  onFocus,
  onClick,
  error = false,
  helperText = "",
  label,
  value,
  isDisabled = false,
  placeholder,
  type = "text",
  autoFocus = false,
  name,
  pattern,
  maxLength = 255,
  inputRef = null,
  size,
  mainText,
  subTexts = [],
  isRequired = true,
  icon = null,
  readOnly = false,
  variant = "outlined",
  placeholderColor,
  isLeftIcon = false,
}) => {
  /*eslint-disable react/jsx-no-duplicate-props*/
  return (
    <Wrapper onClick={onClick}>
      {label ? (
        <LabelWrapper>
          <Label htmlFor={label}>{label}</Label>
        </LabelWrapper>
      ) : null}
      {mainText ? <MainText>{mainText}</MainText> : null}
      {subTexts.length !== 0
        ? subTexts.map((subText) => <SubText key={subText}>{subText}</SubText>)
        : null}
      <CustomTextField
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        type={type}
        name={name}
        id={label}
        disabled={isDisabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        error={error}
        helperText={helperText}
        inputRef={inputRef}
        size={size}
        variant={variant}
        placeholdercolor={placeholderColor}
        InputProps={{
          startAdornment:
            icon && isLeftIcon ? (
              <InputAdornment position="start">
                <IconButton>{icon}</IconButton>
              </InputAdornment>
            ) : null,
          endAdornment:
            icon && !isLeftIcon ? (
              <CustomInputAdornment position="end">
                <IconButton>{icon}</IconButton>
              </CustomInputAdornment>
            ) : null,
        }}
        inputProps={{
          maxLength,
          readOnly,
        }}
      />
    </Wrapper>
  );
};
