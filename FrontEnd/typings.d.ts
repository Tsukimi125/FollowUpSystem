/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2020-09-10 20:03:51
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

// 以下变量声明对应config.[env].ts文件内define的变量
// 下面的作用是让编译器校验通过，也可以通过process.env.xxx调用
declare const RBAC_URL: string;
declare const API_URL: string;
declare const API_AUTH_URL: string;
declare const API_SECRET_KEY: string;
declare const API_RECORD_URL: string;
declare const GGTJ_API: string;
declare const PROJECT_ID: number;
