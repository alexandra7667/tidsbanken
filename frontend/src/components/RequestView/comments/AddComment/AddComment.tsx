import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Comment from "../../../../interfaces/Comment.ts";
import { UserContext } from "../../../../App.tsx";
import fetchData from "../../../../functions/fetchData.ts";
import { ErrorContext } from "../../../../App.tsx";

interface AddCommentProps {
  requestId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function AddComment({
  requestId,
  setComments,
}: AddCommentProps) {
  const { user } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const [newComment, setNewComment] = useState<Comment>({
    id: 0,
    userId: user!.id,
    requestId: requestId,
    content: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment((prevComment) => ({
      ...prevComment,
      content: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New comment: ", newComment);
    postComment();
  };

  async function postComment() {
    const response = await fetchData(
      `comment/${requestId}/comment`,
      "POST",
      {vacationRequestId: requestId, userId: newComment.userId, content: newComment.content},
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
      <Form.Group className="my-3" controlId="formComment">
        <Form.Control
          type="text"
          placeholder="Enter new comment..."
          name="comment"
          value={newComment.content}
          onChange={handleChange}
        />
      </Form.Group>
      <Button as="input" type="submit" value="Post new comment"></Button>
    </Form>
  );
}
