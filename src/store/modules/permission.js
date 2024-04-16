import { constantRoutes } from '@/router'
import Layout from '@/layout/index.vue'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_SIDEBAR_ROUTERS: (state, routes) => {
    state.sidebar = routes
  }
}

const actions = {
  generateRoutes({ commit }, privileges) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRouter(privileges)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

function filterAsyncRouter(privileges) {
  return privileges.map(item => {
    if (item.children && item.children.length > 0) {
      const children = item.children.map(child => ({
        path: `/${child.path.split('/')[0]}`,
        component: loadView(child.component),
        children: [
          {
            path: 'index',
            component: loadView(child.component),
            name: child.name,
            meta: { title: child.name, icon: child.icon }
          }
        ]
      }))
      return {
        path: item.path,
        component: Layout,
        meta: { title: item.name, icon: item.icon },
        children: children
      }
    } else {
      return {
        path: `/${item.path.split('/')[1]}`,
        component: Layout,
        children: [
          {
            path: 'index',
            component: loadView(item.component),
            name: item.name,
            meta: { title: item.name, icon: item.icon }
          }
        ]
      }
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}
