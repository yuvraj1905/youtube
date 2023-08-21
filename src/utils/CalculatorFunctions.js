export const DurationCalculator = (duration) => {
  if (duration === "P0D") return "Live";
  const hours = duration.match(/(\d+)H/)?.[1];
  const mins = duration.match(/(\d+)M/)?.[1];
  const seconds = duration.match(/(\d+)S/)?.[1];
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

// So, when we use match(/(\d+)H/), it searches the durationString for a sequence of digits followed by the letter "H". If it finds a match, the matched digits are captured and stored in the hoursMatch array.

// Let's break down what happens with the given duration string "PT1H52M18S":

// - (\d+) matches the digits "1".
// - H matches the letter "H".
// - The hoursMatch array will contain one element: "1H". To extract the numeric value, you can access the captured group using hoursMatch[1], - - which retrieves the value "1".

export const ViewsCounter = (views) => {
  // 1422
  // 12555
  // 986655
  if (views?.length <= 3) return views;
  if (views?.length === 4) {
    let result = views?.slice(0, 2).split("").join(".");
    if (result[2] == 0) result = Math.trunc(result);
    return result + "K";
  }
  if (views?.length <= 6) return Math.trunc(Number(views) / 1000) + "K";
  if (views?.length === 7) {
    let result = views.slice(0, 2).split("").join(".");
    if (result[2] == 0) result = Math.trunc(result);
    return result + "M";
  }
  if (views?.length <= 9) return Math.trunc(Number(views) / 1000000) + "M";
  if (views?.length === 10) {
    let result = views.slice(0, 2).split("").join(".");
    if (result[2] == 0) result = Math.trunc(result);
    return result + "B";
  }
  if (views?.length <= 9) return Math.trunc(Number(views) / 1000000) + "B";
};

export const TimeCounter = (postDate) => {
  const datePosted = new Date(postDate); //11-08-2023
  const timeNow = new Date();
  const millisec = Math.floor(timeNow - datePosted);
  const sec = Math.floor(millisec / 1000);
  if (sec > 59) {
    const min = Math.floor(sec / 60);
    if (min > 59) {
      const hours = Math.floor(min / 60);
      if (hours > 23) {
        const days = Math.floor(hours / 24);
        if (days > 30) {
          const months = Math.floor(days / 30);
          if (months > 11) {
            return datePosted.toLocaleDateString("en-us", {
              day: "numeric",
              year: "numeric",
              month: "short",
            });
          } else {
            return `${months} month ago`;
          }
        } else {
          return `${days} d ago`;
        }
      } else {
        return `${hours} hours ago`;
      }
    } else {
      return `${min} min ago`;
    }
  } else {
    return `few seconds ago`;
  }
};

export function formatSubscriberCount(count) {
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(2) + "B ";
  } else if (count >= 1000000) {
    return (count / 1000000).toFixed(2) + "M ";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(2) + "K ";
  } else {
    return "";
  }
}
