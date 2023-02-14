/*
 * @Descripttion: 路由配置
 * @Author: linkenzone
 * @Date: 2020-09-04 00:20:59
 * 路由配置 : https://umijs.org/zh-CN/docs/routing
 */

export default [
  {
    path: '/login',
    component: '@/pages/Login',
    exact: true,
  },
  {
    path: '/',
    component: '@/layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '@/layouts/HeaderLayout',
        routes: [
          {
            path: '/',
            component: '@/pages/fuvList',
          },
          {
            path: '/detail',
            component: '@/layouts/CrfDetailLayout',
            exact: false,
            routes: [
              {
                path: '/detail/:id(\\d+)/baselineInfo',
                component: '@/pages/detail/BaselineInfoPage',
                exact: true,
              },
              // {
              //   path: '/detail/:id(\\d+)/TreatmentInfo/:id(\\d+)',
              //   component: '@/pages/detail/TreatmentInfoPage',
              //   exact: true,
              // },
              // {
              //   path: '/detail/:id(\\d+)/FollowUpInfo',
              //   component: '@/pages/detail/FollowUpInfoPage',
              //   exact: true,
              // },
              // {
              //   path: '/detail/:id(\\d+)/Remind',
              //   component: '@/pages/detail/RemindPage',
              //   exact: true,
              // },
            ],
          },
          {
            component: '404',
          },
        ],
      },
    ],
  },
];
