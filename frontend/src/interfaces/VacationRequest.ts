export default interface VacationRequest {
  id: number;
  startDate: Date;
  endDate: Date;
  description: string;
  isApproved: string;
  userId: number;
}
