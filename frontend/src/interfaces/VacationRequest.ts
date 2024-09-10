export default interface VacationRequest {
  id: string;
  startDate: Date;
  endDate: Date;
  description: string;
  isApproved: string;
  userId: number;
}
