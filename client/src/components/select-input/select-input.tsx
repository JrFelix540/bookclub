import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { InputProps } from "../Input/Input";

type SelectProps = Pick<
  InputProps,
  "id" | "name" | "value" | "error" | "touched"
> & {
  label?: string;
  placeholder: string;
  onChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

export const SelectInput: React.FC<SelectProps> = ({
  id,
  name,
  label,
  children,
  onChange,
  onBlur,
  value,
  error,
  touched,
  placeholder,
}) => {
  return (
    <FormControl isInvalid={!!error && touched}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Select
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        variant="filled"
        placeholder={placeholder}
      >
        {children}
      </Select>
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
