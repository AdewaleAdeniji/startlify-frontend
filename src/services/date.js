import moment from "moment";

export function formatDate(dateString) {
  const formattedDate = moment(dateString).format('DD MMMM [at] hh.mm A');
  return formattedDate;
}
