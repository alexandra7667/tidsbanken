
import RequestItem from "./RequestItem";

//Definiera Request
interface Request {
  id: number;
  name: string;
  status: string;
  //etc....
}

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
