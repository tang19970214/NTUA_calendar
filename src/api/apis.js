import req from "./https"

// 全域 api 掛載於 Vue.prototype
// 使用方式 this.$api
// api 命名原則 首字大寫爾後駝峰
const api = {
  // login
  GetToken(params) {
    return req("get", `Login/GetClientToken`, params)
  },
  GetInfoByToken(params) {
    return req("get", "Login/GetCalendarInfoByToken", params)
  },
  GetNavigationBar(params) {
    return req("get", "Permission/GetNavigationBar", params)
  },
  CheckTokenExpire(params) {
    return req("get", "Login/GetExpireByToken", params)
  },

  // events
  GetUnitListItem() {
    return req("get", "Events/GetUnitListItem")
  },
  GetLocationListItem() {
    return req("get", "Events/GetLocationListItem")
  },
  GetEvents(params) {
    return req("get", "Events/GetEvents", params)
  },
  GetDetail(params) {
    return req("get", "Events/GetDetail", params)
  },

  GetEventsPage(params) {
    return req("get", "CalendarEvent/GetClient", params)
  },
  GetEventById(params) {
    return req("get", "Client/GetEventById/Id", params)
  },

  //unit
  GetUnits() {
    return req("get", "School/GetUnitList")
  },
}

export default api
