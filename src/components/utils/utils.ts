export function getDatesInRange(startDate: Date, endDate: Date) {
    const date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
      dates.push(String(new Date(date)));
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
}