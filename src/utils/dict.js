import store from '@/store'

export const DICT_TYPE = {
  SIGNATURE: 'signature',
  WATER_MONEY: 'waterMoney',
  INTERNET_MONEY: 'internetMoney',
  ELEC_PRICE: 'elecPrice'
}

export function getDictData(dictType) {
  return store.getters.dictDatas[dictType]
}
