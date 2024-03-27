import { constantRoutes } from '@/router'
import Layout from '@/layout/index.vue'
import { listApartment } from '@/api/apartment'
import store from '@/store'

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
  const res = []
  privileges.forEach(item => {
    const route = {}
    if (item.parent === 0) {
      route.component = Layout
      // 找到第一个斜杠的位置
      const firstSlashIndex = item.path.indexOf('/')
      // 找到第二个斜杠的位置
      const secondSlashIndex = item.path.indexOf('/', firstSlashIndex + 1)
      if (firstSlashIndex !== -1 && secondSlashIndex !== -1) {
        const firstPart = item.path.substring(0, secondSlashIndex).trim()
        const secondPart = item.path.substring(secondSlashIndex + 1).trim()
        route.path = firstPart
        item.path = secondPart
      }
      item.meta = {
        title: item.name, icon: item.icon
      }
      item.component = loadView(item.component)
    }
    route.children = [item]
    res.push(route)
  })
  return res
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
