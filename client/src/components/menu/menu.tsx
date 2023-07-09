import { MeDocument, MeQuery, SignOutDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";

export const Menu = () => {
  const [signOut] = useMutation(SignOutDocument);
  const logout = async () => {
    localStorage.clear();
    await signOut({
      update: (cache) => {
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
      refetchQueries: [MeDocument],
    });
  };
  return (
    <ChakraMenu>
      <MenuButton
        as={Button}
        variant="ghost"
        rightIcon={<ChevronDownIcon color={"#f7f7f7"} />}
      />
      <StyledMenuList>
        <StyledMenuItem>
          <Link href="/clubs/create">Create a bookclub</Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <Link href="/posts/create">Create a post</Link>
        </StyledMenuItem>
        <StyledMenuItem onClick={logout}>Log Out</StyledMenuItem>
      </StyledMenuList>
    </ChakraMenu>
  );
};

const StyledMenuList = styled(MenuList)(({ theme }) => ({
  background: theme.palette.background.secondary,
  border: "none",
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  background: theme.palette.background.secondary,
  border: "none",
  paddingLeft: "10px",
}));
