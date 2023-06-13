import Image from "next/image";
import logoPic from "../../../public/book.png";
import { Text } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Image src={logoPic} alt="BookClub Logo" height={40} width={40} />
      <Text fontSize="sm" color="#0f3057">
        Bookclub
      </Text>
    </div>
  );
};
