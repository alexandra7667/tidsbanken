import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
// import postComment from "./PostComment";
import Comment from "../../../interfaces/Comment";
import { UserContext } from "../../../App";
import fetchData from "../../../functions/fetchData";
import { ErrorContext } from "../../../App.tsx";

interface AddCommentProps {
  requestId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function AddComment({
  requestId,
  setComments,
}: AddCommentProps) {
  const { user } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const [newComment, setNewComment] = useState<Comment>({
    id: "",
    userId: user!.id,
    requestId: requestId,
    content: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment((prevComment) => ({
      ...prevComment,
      comment: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New comment: ", newComment);
    // postComment(newComment, setComments);
    postComment();
  };

  async function postComment() {
    const response = await fetchData(
      `request/${requestId}/comment`,
      "POST",
      {requestId: requestId, userId: newComment.userId, content: newComment.content},
      "Failed to create new comment."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      setComments((prevComments) => [...prevComments, response.data]);
    }
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formComment">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="comment"
          value={newComment.content}
          onChange={handleChange}
        />
      </Form.Group>
      <Button as="input" type="submit" value="Post comment"></Button>
    </Form>
  );
}
