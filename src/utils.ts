import { verify }  from 'jsonwebtoken';
import { Context } from './context';

export const APP_SECRET = 'appsecret321';

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}

/**
 *
 * @param {Date} date
 * @returns {{from: Date; to: Date}}
 */

export const getFromToSchoolYear = (date: Date = new Date()): { from: Date, to: Date } => {
  const nowDate = date;
  const septemberDate = new Date(new Date(date.getTime()).setMonth(8, 1));
  const julyDate = new Date(new Date(date.getTime()).setMonth(6, 1));

  if (nowDate < julyDate) {
    septemberDate.setFullYear(septemberDate.getFullYear() - 1);
  } else {
    julyDate.setFullYear(septemberDate.getFullYear() + 1);
  }
  while (septemberDate.getDay() !== 1) {
    septemberDate.setDate(septemberDate.getDate() + 1);
  }
  while (julyDate.getDay() !== 6) {
    julyDate.setDate(julyDate.getDate() + 1);
  }

  return { from: septemberDate, to: julyDate };
};