import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSingleRequest from "./GetSingleRequest";
import getComments from "./GetComments";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import deleteRequest from "./DeleteRequest";
import UpdateRequest from "./UpdateRequest/UpdateRequest";
import AddComment from "./AddComment/AddComment";
import RequestDetails from "./RequestDetails/RequestDetails";
import Comment from "../Interfaces/Comment";
import Request from "../Interfaces/Request";


export default function RequestView() {
  const user = { id: '', role: "admin" };
  const navigate = useNavigate();
  const { requestId } = useParams<{ requestId: string }>();
  const [request, setRequest] = useState<Request | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (requestId) {
      //Fetch request details
      getSingleRequest(requestId, setRequest);
      //Fetch all comments
      getComments(requestId, setComments);
    }
  }, []);

  useEffect(() => {
    //If the viewer and the request owner is the same person
    if (request && user.id === request.userId) setIsOwner(true);
  }, [request]);

  const deleteThisRequest = () => {
    deleteRequest(request.id);
    navigate(`/requesthistory/${request.userId}`);
  };

  return (
    <>
      {request && (
        <>
          {request.status === "approved" ||
            isOwner ||
            (user.role === "admin") && (
                <RequestDetails request={request} isOwner={isOwner} userRole={user.role} comments={comments} />
            )}

          {/*  The request owner and Administrators may add comments */}
          {(isOwner || user.role === "admin") && (
            <>
              <AddComment
                userId={user.id}
                requestId={request.id}
                setComments={setComments}
              />

              {/* Both the request owner and Administrators should be able to make changes to the request title and period */}
              {request.status === "pending" && (
                <>
                  <Button onClick={() => setModalOpen(true)}>
                    Update request
                  </Button>
                  {modalOpen && (
                    <UpdateRequest
                      request={request}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                    />
                  )}
                </>
              )}
            </>
          )}

          {/* An administrator should be able to delete a request unless it's their own request */}
          {user.role === "admin" && !isOwner && (
            <Button onClick={deleteThisRequest} variant="outline-danger">
              Delete request
            </Button>
          )}
        </>
      )}
    </>
  );
}
