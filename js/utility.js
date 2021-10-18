const stringifyDate = (date) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const newDate = !date
      ? "undefined"
      : new Date(Date.parse(date)).toLocaleDateString("en-GB", options);
    return newDate;
  }
  const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(name)) throw 'Name is Incorrect!';
}
const checkStartDate = (startDate) => {
  let thirtyDaysInMiliSec = 30*24*60*60*1000;
  if(!(startDate <= new Date() &&  Date.now()-startDate < thirtyDaysInMiliSec))
      throw 'startDate is Incorrect';
}