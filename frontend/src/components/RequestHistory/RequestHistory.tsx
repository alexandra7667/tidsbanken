import { useContext, useEffect, useState } from "react";
import RequestList from "./RequestList/RequestList";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import fetchData from "../../functions/fetchData";
import VacationRequest from "../../interfaces/VacationRequest";
import { ErrorContext } from "../../App.tsx";
import { UserContext } from "../../App";

export default function RequestHistory() {
  const [requestHistory, setRequestHistory] = useState<VacationRequest[]>([]);
  const { setErrorMessage } = useContext(ErrorContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchRequestHistoryData() {
      console.log("request history says user is ", user)
      const response = await fetchData(
        `user/${user!.id}/requests`,
        "GET",
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
