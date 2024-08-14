import Request from "../../Interfaces/Request";
import RequestItem from "./RequestItem";

interface RequestListProps {
  requests: Request[];
  hasFullView: boolean;
}

export default function RequestList({ requests, hasFullView }: RequestListProps) {
  return (
    <>
      {requests
        .slice()
        .reverse()
        .map((request: Request, index: number) => (
          (request.status === 'approved' || hasFullView) && (
            <RequestItem key={index} request={request} />
          )
        ))}
    </>
  );
}
