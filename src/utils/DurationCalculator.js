export const DurationCalculator = (duration) => {
  const hours = duration.match(/(\d+)H/)?.[1];
  const mins = duration.match(/(\d+)M/)?.[1];
  const seconds = duration.match(/(\d+)S/)?.[1];
  //   console.log(duration, "kook", hours, mins, seconds);
  if (hours) {
    if (mins) {
      if (seconds) {
        return `${hours}:${mins}:${seconds}`;
      } else {
        return `${hours}:${mins}:00`;
      }
    } else {
      if (seconds) return `${hours}:00:${seconds}`;
      else return `${hours}:00:00`;
    }
  } else {
    if (mins) {
      if (seconds) return `${mins}:${seconds}`;
      else return `${mins}:00`;
    } else {
      return `0:${seconds}`;
    }
  }
};

// The regular expression /(\d+)H/ ka explanation: (agar baad me smajh na aaye to docs refer karna hai)

// 1. `(\d+)`: This part of the regular expression is enclosed in parentheses ( ... ), which creates a capturing group. It's used to capture a sequence of one or more digits. The \d+ part matches one or more numeric digits (0-9).
// 2. `H`: This is a literal character match for the letter "H".

// So, when you use match(/(\d+)H/), it searches the durationString for a sequence of digits followed by the letter "H". If it finds a match, the matched digits are captured and stored in the hoursMatch array.

// Let's break down what happens with the given duration string "PT1H52M18S":

// - (\d+) matches the digits "1".
// - H matches the letter "H".
// - The hoursMatch array will contain one element: "1H". To extract the numeric value, you can access the captured group using hoursMatch[1], - - which retrieves the value "1".
