import VacationRequest from "../../../interfaces/VacationRequest";

export default function setList(
  fetchedVacationRequests: VacationRequest[],
  setVisibleVacationRequests: React.Dispatch<React.SetStateAction<VacationRequest[] | undefined>>,
  userId: string,

) {
  const requests = [];

  for (const vacationRequest of fetchedVacationRequests) {
    if (vacationRequest.isApproved === 'APPROVED') {
        requests.push(vacationRequest);
    } else if (vacationRequest.userId === userId) {
        requests.push(vacationRequest);
    }
  }

  setVisibleVacationRequests(requests);
}
