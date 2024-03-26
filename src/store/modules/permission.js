import { constantRoutes } from '@/router'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView'
import { toCamelCase } from '@/utils'

const state = {
  routes: [],
  addRoutes: [],
  sidebar: [], // 左侧边菜单的路由，被 Sidebar/index.vue 使用
  topbarRouters: [] // 顶部菜单的路由，被 TopNav/index.vue 使用
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
      // const accessedRoutes = filterAsyncRouter(privileges, false, true)
      const accessedRoutes = [
        {
          path: '/tenant',
          component: Layout,
          name: 'sss',
          children: [
            {
              path: 'index',
              component: () => import('@/views/tenant/index'),
              name: 'Tenant',
              meta: { title: 'tenant', icon: 'list' }
            }
          ]
        }
      ]
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

function ssss(privileges) {
  const res = []
  privileges.forEach(item => {
    const route = {}
    if (item.parent === 0) {
      route.path = item.path.substring(1)
      route.component = Layout
      route.children = [item]
      res.push(route)
      if (item.children != null && item.children.length > 1) {
        ssss(item.children)
      }
    }
  })
}

function dddd(privileges){
  privileges.forEach(item => {

  })
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(x => {
    x.meta = {
      title: x.name,
      icon: x.icon
    }
    // 路由地址转首字母大写驼峰，作为路由名称，适配 keepAlive
    x.name = toCamelCase(x.path, true)
    // 处理 component 属性
    if (x.children) {
      if (x.parent === 0) {
        x.component = Layout
      } else {
        x.component = ParentView
      }
    } else {
      x.component = loadView(x.component)
    }
    // filterChildren
    if (type && x.children) {
      x.children = filterChildren(x.children)
    }
    // 处理children
    if (x.children != null && x.children && x.children.length) {
      x.children = filterAsyncRouter(x.children, x, type)
    } else {
      delete x['children']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
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
