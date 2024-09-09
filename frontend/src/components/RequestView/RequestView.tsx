import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import getSingleRequest from "./GetSingleRequest";
// import getComments from "./GetComments";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// import deleteRequest from "./DeleteRequest";
import UpdateRequest from "./UpdateRequest/UpdateRequest";
import AddComment from "./AddComment/AddComment";
import RequestDetails from "./RequestDetails/RequestDetails";
import Comment from "../../interfaces/Comment";
import { UserContext } from "../../App";
import VacationRequest from "../../interfaces/VacationRequest";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import fetchData from "../../functions/fetchData";
import { ErrorContext } from "../Main/Main";

export default function RequestView() {
  const navigate = useNavigate();
  const { requestId } = useParams<{ requestId: string }>();
  const [request, setRequest] = useState<VacationRequest | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (requestId) {
      //Fetch request details
      // getSingleRequest(requestId, setRequest);
      //Fetch all comments
      // getComments(requestId, setComments);
      getRequest();
      getComments();
    }
  }, []);

  async function getRequest() {
    const response = await fetchData(
      `request/${requestId}`,
      "GET",
      null,
      "Failed to get vacation request."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      setRequest(response.data);
    }
  }

  async function getComments() {
    const response = await fetchData(
      `request/${requestId}/comment`,
      "GET",
      null,
      "Failed to get comments."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      setComments(response.data);
    }
  }

  async function deleteRequest() {
    const response = await fetchData(
      `request/${requestId}`,
      "DELETE",
      null,
      "Failed to delete vacation request."
    );
    if (response.status === "error" && response.message) {
      setErrorMessage(response.message);
    } else {
      //Toast deleted successfully
      navigate(`/requesthistory/${request!.userId}`);
    }
  }

  return (
    <>
      {request ? (
        <>
          {comments ? (
            <>
              <RequestDetails request={request} comments={comments} />

              {/* The request owner and Administrators may add comments */}
              {(user!.id === request.userId || user!.role === "admin") && (
                <AddComment requestId={request.id} setComments={setComments} />
              )}
            </>
          ) : (
            <LoadingSpinner />
          )}

          {/* Both the request owner and Administrators should be able to make changes to the request title and period */}
          {request.isApproved === "PENDING" && (
            <>
              <Button onClick={() => setModalOpen(true)}>Update request</Button>
              {modalOpen && (
                <UpdateRequest
                  request={request}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                />
              )}
            </>
          )}

          {/* An administrator should be able to delete a request unless it's their own request */}
          {user!.id !== request.userId && user!.role === "admin" && (
            <Button onClick={deleteRequest} variant="outline-danger">
              Delete request
            </Button>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
