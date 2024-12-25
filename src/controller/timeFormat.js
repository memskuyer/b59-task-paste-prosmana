const formatDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Marc",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agus",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  let day = date.getDate().toString().padStart(2, "0");
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  // let second = date.getSecond().toString();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");

  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;
  return formattedDate;
};

const getRelativeTime = (targetDate) => {
  let now = new Date();
  let diffInSeconds = Math.floor((now - targetDate) / 1000);
  let diffInMinutes = Math.floor(diffInSeconds / 60);
  let diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} Seconds Ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} Minutes Ago`;
  } else if (diffInHours < 60) {
    return `${diffInHours} Hours Ago`;
  }
};

module.exports = { formatDate, getRelativeTime };
