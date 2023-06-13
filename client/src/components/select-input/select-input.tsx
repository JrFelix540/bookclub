import { Select } from "@chakra-ui/react";
import { InputProps } from "../Input/Input";

type SelectProps = Pick<InputProps, "id" | "name" | "value"> & {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

export const SelectInput: React.FC<SelectProps> = ({
  id,
  name,
  children,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <Select
      id={id}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    >
      {children}
    </Select>
  );
};
