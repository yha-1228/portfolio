import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export function formatISODate(dateStr: string) {
  const dateObj = parseISO(dateStr);
  return format(dateObj, 'yyyy/MM/dd HH:mm:ss');
}
