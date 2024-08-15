import { ChangeEvent, FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import postComment from "./PostComment";
import Comment from "../../Interfaces/Comment";

interface AddCommentProps {
  userId: string;
  requestId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function AddComment({userId, requestId, setComments}: AddCommentProps) {
  const [newComment, setNewComment] = useState<Comment>({
    id: '',
    userId: userId,
    requestId: requestId,
    comment: "",
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
    postComment(newComment, setComments);
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formComment">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="comment"
          value={newComment.comment}
          onChange={handleChange}
        />
      </Form.Group>
      <Button as="input" type="submit" value="Post comment"></Button>
    </Form>
  );
}
