export const getFormattedDateTime = () => {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1; // months are 0-indexed
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const date = `${day}-${month}-${year}`;
  const time = `${hours}:${minutes}${ampm}`;

  return { date, time };
};
