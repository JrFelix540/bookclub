import {
  FeedPostsDocument,
  MeDocument,
  MeQuery,
  SignOutDocument,
} from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu as ChakraMenu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";

export const Menu = () => {
  const [signOut] = useMutation(SignOutDocument);
  const logout = async () => {
    localStorage.clear();
    await signOut({
      refetchQueries: [MeDocument],
    });
  };
  return (
    <ChakraMenu>
      <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />} />
      <MenuList>
        <MenuItem>
          <Link href="/clubs/create">Create a book Club</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/posts/create">Create a post</Link>
        </MenuItem>
        <MenuItem>
          <Button variant={"ghost"} onClick={logout}>
            Log Out
          </Button>
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};
