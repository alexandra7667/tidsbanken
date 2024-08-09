
import RequestItem from "./RequestItem";

//Definiera Request
interface Request {
  id: number;
  name: string;
  //etc....
}

interface RequestListProps {
  requests: Request[];
}

export default function RequestList({ requests }: RequestListProps) {
  return (
    <>
      {requests
        .slice()
        .reverse()
        .map((request: Request, index: number) => (
          <RequestItem key={index} request={request} />
        ))}
    </>
  );
}
