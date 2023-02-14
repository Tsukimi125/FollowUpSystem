/*
 * @Author: linkenzone
 * @Date: 2021-05-17 17:30:13
 * @Descripttion: Do not edit
 */

import Cookies from 'js-cookie';
import moment from 'moment';

const COOKIES_NAME = 'UnchangedListNotificationsDate';

/**
 * @description: 新增日期到 cookies
 * @param {*}
 * @return {*}
 */
const addDateToCookies = () => {
  // 获取当前日期
  const nowDate = moment().format('YYYY-MM-DD');
  // console.log('提醒日期:', nowDate);
  Cookies.set(COOKIES_NAME, nowDate, { expires: 1, path: '/' });
};

/**
 * @description: 判断当日是否已经提醒过
 * @param {*}
 * @return {*}
 */
const IsNotifications = () => {
  // 获取当前日期
  const nowDate = moment().format('YYYY-MM-DD');
  const date = Cookies.get(COOKIES_NAME);
  if (date === null) return false;
  return date === nowDate;
};

export { addDateToCookies, IsNotifications };
