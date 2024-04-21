import { getInfo, login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  username: '',
  userId: '',
  roleId: '',
  apartments: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLEID: (state, roleId) => {
    state.roleId = roleId
  },
  SET_PRIVILEGES: (state, privileges) => {
    state.privileges = privileges
  },
  SET_APARTMENTS: (state, apartments) => {
    state.apartments = apartments
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roleId, username, userId, privileges, apartments } = data

        // roles must be a non-empty array
        commit('SET_ROLEID', roleId)
        commit('SET_USERNAME', username)
        commit('SET_USERID', userId)
        commit('SET_PRIVILEGES', privileges)
        // 当前登录用户所有的公寓
        commit('SET_APARTMENTS', wapperApartments(apartments))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLEID', '')
        commit('SET_PRIVILEGES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

function wapperApartments(apartments) {
  const res = []
  apartments.forEach(x => {
    const item = {}
    item.key = x.apartmentId
    item.value = x.apartmentName
    res.push(item)
  })
  return res
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
