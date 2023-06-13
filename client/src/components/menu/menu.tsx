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
    await signOut({
      refetchQueries: [FeedPostsDocument],
      update(cache) {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: {
              id: null,
              username: null,
            },
          },
        });
      },
    });
    localStorage.clear();
  };
  return (
    <ChakraMenu>
      <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />} />
      <MenuList>
        <MenuItem>
          <Link href="/clubs/create">Create a Book Club</Link>
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
