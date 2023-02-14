/*
 * @Descripttion: 空白的layout，一些通用样式可以在这里设置
 * @Author: linkenzone
 * @Date: 2020-09-06 21:24:32
 */

import React from 'react';

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ConfigProvider } from 'antd';

const Layout: React.FC = ({ children }) => (
  <ConfigProvider locale={locale}>{children}</ConfigProvider>
);

export default Layout;
