/**
 *
 * @param hours
 */
export function convertHourToMinutes(hour: string) {
  const [hours, minutes] = hour.split(":").map(Number);
  return hours * 60 + minutes;
}
