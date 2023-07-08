import {
  Input as ChakraInput,
  Textarea as ChakraTextarea,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import ResizeTextArea from "react-textarea-autosize";

export interface InputProps {
  label?: string;
  onChange: (_e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_e: ChangeEvent<HTMLInputElement>) => void;
  touched?: boolean;
  id: string;
  name: string;
  type: string;
  value: any;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  label,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <ChakraInput
        id={id}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        variant="filled"
      />
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

type TextareaProps = Omit<InputProps, "onChange" | "onBlur" | "type"> & {
  onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLTextAreaElement>) => void;
};
export const Textarea: React.FC<TextareaProps> = forwardRef<
  TextareaProps,
  "textarea"
>((props, ref) => {
  const { id, name, value, label, error, touched, onChange, onBlur } = props;
  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <ChakraTextarea
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        variant="filled"
        as={ResizeTextArea}
        ref={ref}
        transition="height none"
      />
      {touched && error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
});
