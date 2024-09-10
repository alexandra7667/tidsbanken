export default function matchDays(day: number | null, month: number, year: number, vacationMap: Map<Date, string[]>) {
  if (day !== null) {
    const dateKey = `${year}-${month + 1}-${day}`; //The date about to be rendered as a Cell
    const date = new Date(dateKey);
    date.setHours(0, 0, 0, 0);

    const allUserIds: string[] = [];

    for (let key of vacationMap.keys()) {
      if (key.getTime() === date.getTime()) {
        const userIds = vacationMap.get(key);
        allUserIds.push(...userIds!);
      }
    }

    return {
      allUserIds: allUserIds,
    };
  }

  //If day is null
  return { allUserIds: [] };
}
