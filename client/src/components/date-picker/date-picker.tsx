import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { InputProps } from "../Input/Input";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

type DateInputProps = Omit<InputProps, "onChange" | "type"> & {
  onChange: (_date: Date) => void;
};

export const DateInput: React.FC<DateInputProps> = ({
  onBlur,
  value,
  onChange,
  id,
  name,
  error,
  label,
  touched,
}) => {
  const currentDate = value ? new Date(value) : new Date();
  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <DatePicker
        id={id}
        name={name}
        selected={currentDate}
        onChange={onChange}
        onBlur={onBlur}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
        showTimeSelect
      />

      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
