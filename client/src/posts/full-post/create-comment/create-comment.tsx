import { Textarea } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { MeDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";

interface CreateCommentProps {
  postId: number;
}

export const CreateComment: React.FC<CreateCommentProps> = ({ postId }) => {
  const { data, loading } = useQuery(MeDocument);
  const formik = useFormik({
    initialValues: {
      postId,
      content: "",
    },
    onSubmit: (values) => {},
  });
  return (
    <StyledForm>
      <Textarea
        id="content"
        name="content"
        onChange={formik.handleChange}
        value={formik.values.content}
        onBlur={formik.handleBlur}
      />
      <ButtonContainer>
        <PrimaryButton type="submit" isLoading={loading}>
          Post Comment
        </PrimaryButton>
      </ButtonContainer>
    </StyledForm>
  );
};

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});
