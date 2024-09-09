import VacationRequest from "../../../interfaces/VacationRequest";
import RequestItem from "./RequestItem";

interface RequestListProps {
  requests: VacationRequest[];
}

export default function RequestList({ requests }: RequestListProps) {
  return (
    <>
      {requests
        .map((request, index) => (
          (request.isApproved === 'APPROVED') && (
            <RequestItem key={index} request={request} />
          )
        ))}
    </>
  );
}
