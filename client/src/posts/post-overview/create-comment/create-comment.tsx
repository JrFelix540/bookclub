import { Textarea } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import {
  CreateCommentDocument,
  PostCommentsDocument,
} from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";

interface CreateCommentProps {
  postId: number;
}

export const CreateComment: React.FC<CreateCommentProps> = ({ postId }) => {
  const [createComment, { loading }] = useMutation(CreateCommentDocument);
  const formik = useFormik({
    initialValues: {
      postId,
      content: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await createComment({
        variables: values,
        refetchQueries: [PostCommentsDocument],
      });
      resetForm();
    },
  });
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
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
