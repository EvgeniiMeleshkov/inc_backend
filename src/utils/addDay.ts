export const addDays = function(str: Date, days: number) {
  let myDate = new Date(str);
  myDate.setDate(myDate.getDate() + days);
  return myDate;
}
