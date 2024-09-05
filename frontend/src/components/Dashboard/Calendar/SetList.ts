import Request from "../../../interfaces/Request";
import getDatesBetween from "./GetDatesBetween";

export default function setList(
  fetchedVacationRequests,
  setVisibleVacationRequests,
  userId,

) {
  const requests = [];

  for (const request of fetchedVacationRequests) {
    if (request.status === 'approved') {
        requests.push(request);
    } else if (request.userId === userId) {
        requests.push(request);
    }
  }

  setVisibleVacationRequests(requests);
}
