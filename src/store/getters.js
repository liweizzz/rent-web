const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  apartments: state => state.user.apartments,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  // 数据字典
  dictDatas: state => state.dict.dictDatas

}
export default getters
