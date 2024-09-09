import { useContext, useEffect, useState } from "react";
import getRequestHistory from "./GetRequestHistory";
import RequestList from "./RequestList/RequestList";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { Col, Container, Row } from "react-bootstrap";
import fetchData from "../../functions/fetchData";
import VacationRequest from "../../interfaces/VacationRequest";
import { ErrorContext } from "../Main/Main";
import { UserContext } from "../../App";

export default function RequestHistory() {
  const [requestHistory, setRequestHistory] = useState<VacationRequest[]>([]);
  const { setErrorMessage } = useContext(ErrorContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // getRequestHistory(setRequestHistory);
    async function fetchRequestHistoryData() {
      const response = await fetchData(
        `user/${user!.id}/requests`,
        "POST",
        null,
        "Failed to get user's request history."
      );
      if (response.status === "error" && response.message)
        setErrorMessage(response.message);
      else {
        setRequestHistory(response.data);
      }
    }

    fetchRequestHistoryData();
  }, []);

  return (
    <>
      <p>The total number of vacation days has available to date.</p>
      <p>The total number of vacation days remaining.</p>

      {requestHistory.length > 0 ? (
        <RequestList requests={requestHistory} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
