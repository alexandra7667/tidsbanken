import { Card } from "react-bootstrap";
import CommentCard from "../comments/CommentCard/CommentCard";
import Comment from "../../../interfaces/Comment";
import VacationRequest from "../../../interfaces/VacationRequest";
import AddComment from "../comments/AddComment/AddComment";
import { UserContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import fetchData from "../../../functions/fetchData";
import { ErrorContext } from "../../../App";

interface RequestDetailsProps {
  request: VacationRequest;
}

export default function RequestDetails({
  request,
}: RequestDetailsProps) {
  const { user } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (request.id) {
      getComments();
    }
  }, []);

  async function getComments() {
    const response = await fetchData(
      `comment/${request.id}/comment`,
      "GET",
      null,
      "Failed to get comments."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      setComments(response.data);
      console.log("MESSAGES= ", response.data);
    }
  }

  return (
    <Card style={{ width: "60%" }}>
      <Card.Body>
        <Card.Title>{request.isApproved}</Card.Title>
        <Card.Text>
        {request.description}
          <br />
          Start date: {request.startDate.substring(0, 10)}  
          <br />  
          End date: {request.endDate.substring(0, 10)}
          <div style={{ border: "1px solid #ccc", borderRadius: "5px" }}>
            {comments &&
              comments.length > 0 &&
              comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
              ))}
              {/* The request owner and Administrators may add comments */}
              {(user!.id === request.userId || user!.role === 1) && (
                <AddComment requestId={request.id} setComments={setComments} />
              )}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
