import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Авторизация',
      component: () => import('@/views/Login/Login'),
      meta: {layout: 'Public'}
    },
    {
      path: '/test',
      name: 'Test',
      component:() => import('../views/Constructor/FormMultiTextBox/FormMultiTextBox'),
      meta: {layout: 'Private'}
    },
    {
      path: '/register',
      name: 'Авторизация',
      component: () => import('@/views/Register/Register'),
      meta: {layout: 'Public'}
    },
    {
      path: '/',
      name: 'Loading',
      component: () => import('@/views/Loader/Loader'),
      meta: {layout: 'Public'}
    },
    {
      path: '/constructor',
      name: 'Constructor',
      component: () => import('@/views/Constructor/Constructor'),
      meta: {layout: 'Private'}
    },
    {
      path: '/dashboard',
      name: 'Главная',
      component: () => import('@/views/Dashboard/Dashboard'),
      meta: {layout: 'Private'},
      children: [
        {
          path: 'profile',
          component: () => import('@/views/Dashboard/Dashboard')
        },
        {
          path: 'posts',
          component: () => import('@/views/Dashboard/Dashboard')
        }
      ]
    },
    {
      path: '/Settings',
      name: 'Настройки',
      component: () => import(/*webpackChunkName: "settings"*/'@/views/Settings/settings'),
      meta: {layout: 'Private'}
    },
    {
      path: '/viewer',
      name: 'Просмотр',
      component: () => import('@/views/Reports/Viewer/viewer'),
      meta: {layout: 'Private'}
    },
    {
      path: '/designer',
      name: 'Дизайнер',
      component: () => import('@/views/Reports/Designer/designer'),
      meta: {layout: 'Private'}
    },
    {
      path: '/diag',
      name: 'Диаграммы',
      component: () => import('@/components/Diag/diag'),
      meta: {layout: 'Private'}
    },
    {
      path: '/testing',
      name: 'Тестирование',
      component: () => import('@/views/Testing/Testing'),
      meta: {layout: 'Testing'}
    },
    {
      path: '/application',
      name: 'Заявка на вакансию',
      component: () => import('@/views/Application/Application'),
      meta: {layout: 'Application'}
    }
  ]
})
