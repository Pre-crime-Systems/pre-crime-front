import dayjs from 'dayjs';

export const formatDate = (date: any) => {
  return dayjs(date).format('DD/MM/YYYY');
};
