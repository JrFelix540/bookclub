import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { Jdenticon } from "../jdenticon/jdenticon";

interface AvatarProps {
  size?: "sm" | "md" | "lg";
  value: string;
}

export const Avatar: React.FC<AvatarProps> = ({ size = "md", value }) => {
  return (
    <ChakraAvatar size={size}>
      <Jdenticon value={value} />
    </ChakraAvatar>
  );
};
