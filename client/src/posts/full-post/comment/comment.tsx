import { User } from "@/generated/graphql";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
interface CommentProps {
  id: number;
  content: string;
  isOwner: boolean;
  creator: User;
}
export const Comment: React.FC = () => {
  return (
    <Container>
      <Text fontSize={"xs"}>Posted by u/testuser55</Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
        eligendi non excepturi culpa quasi magni iste maxime. Molestiae tenetur
        accusantium non at obcaecati ex nobis velit saepe vero repellat!
      </Text>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid #eaeaea",
});
