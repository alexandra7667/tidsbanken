export default function getDatesBetween(request, vacationMapFiller) {
  let currentDate = new Date(request.startDate);
  currentDate.setHours(0, 0, 0, 0);
  const endDate = new Date(request.endDate);

  while (currentDate <= endDate) {
    if (vacationMapFiller.has(currentDate)) {
      vacationMapFiller.get(currentDate)!.push(request.userId);
    } else {
      const newDate = new Date(currentDate);
      vacationMapFiller.set(newDate, [request.userId]);
    }

    // Increment the currentDate by 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }
}
