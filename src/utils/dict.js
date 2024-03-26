import store from '@/store'

export const DICT_TYPE = {
  SIGNATURE: 'signature',
  WATER_MONEY: 'waterMoney',
  INTERNET_MONEY: 'internetMoney',
  ELEC_PRICE: 'elecPrice'
}

export function getSignatureDic(dictType) {
  return store.getters.dictDatas[dictType]
}

export function getWaterMoneyDic(dictType) {
  return store.getters.dictDatas[dictType]
}

export function getInternetMoneyDic(dictType) {
  return store.getters.dictDatas[dictType]
}

export function getElecPriceDic(dictType) {
  return store.getters.dictDatas[dictType]
}
