import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import UpdateRequest from "./UpdateRequest/UpdateRequest";
import RequestDetails from "./RequestDetails/RequestDetails";
import { UserContext } from "../../App";
import VacationRequest from "../../interfaces/VacationRequest";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import fetchData from "../../functions/fetchData";
import { ErrorContext } from "../../App.tsx";

export default function RequestView() {
  const navigate = useNavigate();
  const { requestId } = useParams<{ requestId: string }>();
  const [request, setRequest] = useState<VacationRequest | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (requestId) {
      getRequest();
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

  const goToRequestHistory = () => {
    navigate(`/requesthistory/${requestId}`);
  };

  return (
    <>
      {request ? (
        <>
          <RequestDetails request={request} />

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

          <Button variant="outline-primary" onClick={() => goToRequestHistory}>
            Go to Request history
          </Button>

          {/* An administrator should be able to delete a request unless it's their own request */}
          {user!.id !== request.userId && user!.role === 1 && (
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
