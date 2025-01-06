export const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  // const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour format and pad with leading zero if needed
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hoursStr = hours < 10 ? `0${hours}` : hours.toString();
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${hoursStr}:${minutesStr}`;
};



export const formatFullDate = (fullDate: Date) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date = fullDate;

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  // 

  return `${day}${getDaySuffix(day)} ${month}, ${year}`;
};

export const getDaySuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};