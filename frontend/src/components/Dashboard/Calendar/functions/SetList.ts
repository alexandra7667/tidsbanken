import VacationRequest from "../../../../interfaces/VacationRequest";

export default async function setList(
  vacationRequests: VacationRequest[],
  userId: number,
) {
  const requests = [];

  for (const vacationRequest of vacationRequests) {
    console.log(vacationRequest);
    
    if (vacationRequest.isApproved === 'APPROVED') {
        requests.push(vacationRequest);
    } else if (vacationRequest.userId === userId) {
        requests.push(vacationRequest);
    }
  }

  return requests;
}
