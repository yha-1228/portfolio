import { format, parseISO } from "date-fns";

export function formatISODate(dateStr: string | undefined) {
  if (!dateStr) return null;

  const dateObj = parseISO(dateStr);
  return format(dateObj, "yyyy/MM/dd HH:mm:ss");
}
