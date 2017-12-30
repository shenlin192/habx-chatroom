/**
 * Created by shenlin on 28/12/2017.
 */
export function dateTransform(date) {
  const now = new Date();
  const messageDate = new Date(date);
  const diffMs = (now - messageDate); // milliseconds between now
  const diffDays = Math.floor(diffMs / 86400000); // days
  if (diffDays < 1) {
    return `${messageDate.getHours()}:${messageDate.getMinutes()}, Today`;
  }
  return messageDate.toLocaleDateString();
}