import VacationRequest from "../../../../interfaces/VacationRequest";

export default function setList(
  vacationRequests: VacationRequest[],
  userId: number,
) {
  const requests = [];

  for (const vacationRequest of vacationRequests) {
    if (vacationRequest.isApproved === 'APPROVED') {
        requests.push(vacationRequest);
    } else if (vacationRequest.userId === userId) {
        requests.push(vacationRequest);
    }
  }

  return requests;
}
