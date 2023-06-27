import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { Jdenticon } from "../jdenticon/jdenticon";

interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg";
  square?: boolean;
  value: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  value,
  square,
}) => {
  return (
    <ChakraAvatar size={size} borderRadius={square ? "4" : "50%"}>
      <Jdenticon value={value} />
    </ChakraAvatar>
  );
};
