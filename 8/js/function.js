const convertTime = (time) => {
  const convertingTime = time.split(':');
  return parseInt(convertingTime[0], 10) * 60 + parseInt(convertingTime[1], 10);
};

const calculatetTime = (timeStart, timeEnd, timeMeet, meetMinutes) => {
  const timeMeetMin = convertTime(timeMeet);
  const timeStartMin = convertTime(timeStart);
  const timeEndMin = convertTime(timeEnd);
  return (timeStartMin <= timeMeetMin) && ((meetMinutes + timeMeetMin) <= timeEndMin);
};

calculatetTime('08:00', '17:30', '14:00', 90); // true
calculatetTime('8:0', '10:0', '8:0', 120);     // true
calculatetTime('08:00', '14:30', '14:00', 90); // false
calculatetTime('14:00', '17:30', '08:0', 90);  // false
calculatetTime('8:00', '17:30', '08:00', 900); // false
