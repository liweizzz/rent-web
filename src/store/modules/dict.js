import { listDictionary } from '@/api/system'

const state = {
  /**
   * 数据字典 MAP
   * itemKey：数据字典key
   * itemValue：数据字典value
   */
  dictDatas: {}
}

const mutations = {
  SET_DICT_DATAS: (state, dictDatas) => {
    state.dictDatas = dictDatas
  }
}

const actions = {
  getDictDatas({ commit }) {
    return new Promise((resolve, reject) => {
      listDictionary().then(response => {
        // 如果未加载到数据，则直接返回
        if (!response || !response.data) {
          return
        }
        // 设置数据
        const dictDataMap = {}
        response.data.forEach(dictData => {
          // 获得 itemKey 层级
          const itemKey = dictDataMap[dictData.itemKey]
          if (!itemKey) {
            dictDataMap[dictData.itemKey] = []
          }
          // 处理 itemValue 层级
          dictDataMap[dictData.itemKey].push({
            key: dictData.id,
            value: dictData.itemValue
          })
        })
        // 存储到 Store 中
        commit('SET_DICT_DATAS', dictDataMap)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
