<template>
  <div id="Calendar2">
    <Header @getShowMenu="getShowMenu"></Header>
    <div class="filterBox" :class="{ showMenu: showMenu }">
      <div class="filterBox__tag">
        <template v-for="item in eventTypeData">
          <label :for="item.Id" :key="item.Id">
            <input
              class="typeCheckBox"
              :value="item.typeName"
              v-model="typeCheckBox"
              type="checkbox"
              :id="item.Id"
            />
            <span
              :style="`background:${item.color}`"
              :class="{ isNotActive: checkIncludes(item.typeName) }"
              class="checkedType"
            >
              {{ item.typeName }}
              <i class="fas fa-times-circle cross"></i>
            </span>
          </label>
        </template>
      </div>

      <div class="filterBox__type">
        <!-- 新增單位 -->
        <div class="filterBox__type--unit">
          <el-select
            v-model="listQuery.unit"
            placeholder="請選擇單位"
            @change="chooseUnit"
            :clearable="true"
          >
            <el-option
              v-for="item in getUnitListItemData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 新增地點 -->
        <div class="filterBox__type--local">
          <el-select
            v-model="listQuery.local"
            placeholder="請選擇地點"
            @change="chooseLocal"
            :clearable="true"
          >
            <el-option
              v-for="item in getLocationListItemData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 搜尋欄 -->
        <div class="filterBox__type--keyword">
          <el-input
            @keydown.native.enter="searchHandler"
            placeholder="請輸入關鍵字"
            v-model="searchInput"
            :clearable="true"
          >
            <i
              @click="searchHandler"
              slot="suffix"
              class="el-input__icon el-icon-search"
            ></i>
          </el-input>
          <el-button @click="exportDialogVisible = true" type="primary"
            >匯出Excel</el-button
          >
          <el-button
            @click="$router.push('/AdvancedSearch')"
            type="primary"
            v-if="isLogin"
            >進階搜尋</el-button
          >
        </div>
      </div>
    </div>

    <!-- calendar -->
    <!-- weekends: 顯示週末？
    eventLimit：限制一天中顯示的事件數。其餘的將顯示在彈出窗口中
    eventTimeFormat：確定將在每個事件上顯示的時間格式
    allDaySlot：確定“全天”廣告位是否顯示在日曆的頂部。 -->
    <div id="fullCalendar">
      <FullCalendar
        v-if="calendarEvents"
        locale="zh-tw"
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        :weekends="true"
        :eventLimit="true"
        :events="eventFilter"
        height="parent"
        :eventTimeFormat="eventTimeFormat"
        :allDaySlot="false"
        ref="fullCalendar"
        :allDayDefault="false"
        @eventRender="this.eventRender"
        @datesRender="this.datesRender"
        :header="{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }"
      />
    </div>

    <!-- new dialog -->
    <el-dialog
      append-to-bodycustom-class="eventDailog"
      :visible.sync="eventDailog"
      :title="dialogEvent.title"
      width="60%"
    >
      <div class="dialog__image" v-if="!!dialogEvent.pics">
        <img :src="dialogEvent.pics" :alt="dialogEvent.title" width="100%" />
      </div>
      <!-- 整頁複製鈕 -->
      <el-badge is-dot class="item" v-if="false">
        <el-button
          class="share-button"
          icon="el-icon-share"
          type="Info"
        ></el-button>
      </el-badge>

      <!-- 所有內容 -->
      <div class="dialog">
        <div v-if="!!dialogEvent.summary">
          <h4>主題 :</h4>
          <p class="dialog__summary">{{ dialogEvent.summary }}</p>
        </div>
        <div v-if="!!dialogEvent.contents">
          <h4>活動內容 :</h4>
          <p class="dialog__contents">{{ dialogEvent.contents }}</p>
        </div>
        <div v-if="!!dialogEvent.links">
          <h4>相關連結 :</h4>
          <a :href="dialogEvent.links" target="_blank" class="dialog__links"
            >{{ dialogEvent.links }}
          </a>
        </div>
        <div v-if="!!dialogEvent.activDate">
          <h4>活動時間 :</h4>
          <p class="dialog__activDate">{{ dialogEvent.activDate }}</p>
        </div>
        <div v-if="!!dialogEvent.activLocation">
          <h4>相關地點</h4>
          <p class="dialog__activLocation">{{ dialogEvent.activLocation }}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="eventDailog = false">取 消</el-button>
        <el-button type="primary" @click="addToGoogleCalendar()"
          >新增到GOOGLE行事曆</el-button
        >
      </span>
    </el-dialog>

    <!-- exportDailog -->
    <el-dialog
      class="exportDialog"
      title="匯出提示"
      :visible.sync="exportDialogVisible"
      width="30%"
    >
      <!-- <span>請選擇匯出類別</span> -->
      <el-row>
        <el-col :span="12">
          <el-select v-model="outExcelData.unit" placeholder="請選擇單位">
            <el-option
              v-for="item in getUnitListItemData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-select v-model="outExcelData.local" placeholder="請選擇地點">
            <el-option
              v-for="item in getLocationListItemData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <!-- 時間 -->
      <div class="daterange">
        <!-- <span class="demonstration">默认</span> -->
        <el-date-picker
          class="daterange__date"
          v-model="daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
        >
        </el-date-picker>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="exportDialogVisible = false">取 消</el-button>
        <el-button type="primary">
          <a
            :href="
              'https://www.ntua.edu.tw/calendar/api/Events/OutExcel?location=' +
                outExcelData.local +
                '&unit=' +
                outExcelData.unit +
                '&startDate=' +
                setDateFormat(daterange[0]) +
                '&endDate=' +
                setDateFormat(daterange[1])
            "
            >確 定</a
          >
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from "../components/Header"
import FullCalendar from "@fullcalendar/vue"
import dayGridPlugin from "@fullcalendar/daygrid"
import moment from "moment"
import { VueEditor } from "vue2-editor"
import { Calendar } from "@fullcalendar/core"
import twLocale from "@fullcalendar/core/locales/zh-tw"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import axios from "axios"
export default {
  name: "Calendar",
  components: {
    Header,
    FullCalendar,
    VueEditor,
  },
  data() {
    return {
      daterange: "",
      outExcelData: {
        local: "",
        unit: "",
      },
      calendarEvents: [],
      // list
      listQuery: {
        unit: "",
        local: "",
        startDate: moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: moment()
          .endOf("month")
          .format("YYYY-MM-DD"),
      },
      // export
      exportDialogVisible: false,
      exportType: [],

      // baseUrl
      baseUrl: "",
      // 是否僅顯示活動
      onlyActivity: false,
      //globle data
      eventTypeData: "",
      eventData: [],

      //filter box
      searchInput: "",
      typeCheckBox: [],
      startDate: "",
      endDate: "",
      showMenu: false,

      //calendar
      // Plugin 功能
      // interactionPlugin:提供事件拖放，調整大小，dateClick和可選操作的功能
      // timeGridPlugin：在時隙網格上顯示事件
      // dayGridPlugin：在月視圖或日網格視圖上顯示事件
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: false,
        meridiem: "narrow",
        hour12: false,
      },

      //  dialog event
      eventDailog: false,
      dialogEvent: {},

      // google calendar
      isLogInG: false,
      startG: "",
      endG: "",
      titleG: "",

      // getUnitListItem
      getUnitListItemData: [],

      //getLocationListItem
      getLocationListItemData: [],
    }
  },
  computed: {
    isLogin() {
      return window.localStorage.Token ? true : false
    },
    setDateFormat() {
      return (date) => {
        return moment(date).format("YYYY-MM-DD")
      }
    },
    eventFilter() {
      const vm = this
      return vm.calendarEvents.filter((event) => {
        return vm.typeCheckBox.includes(event.cName)
      })
    },
  },
  methods: {
    // copyDialog() {},
    // calendar list
    getEventData({ unit, location, startDate, endDate }) {
      const vm = this
      // 只接收當月的
      let params = {
        unit: unit || this.listQuery.unit,
        location: location || this.listQuery.local,
        startDate: startDate || this.listQuery.startDate,
        endDate: endDate || this.listQuery.endDate,
      }
      vm.$api.GetEvents(params).then((res) => {
        let arr = res.data.map((event) => {
          // 進入點：前端把後端回傳資料轉換成前端格式
          // 左邊自定義 ＝右邊資料回傳
          event.backgroundColor = this.getCalendarColor(event.cName)
          // 判斷當天日期，沒有時間
          let a = moment(event.end).format("YYYY-MM-DD")
          let b = moment(event.start).format("YYYY-MM-DD")
          // console.log(a, b)
          let c
          c = a === b ? true : false
          event.className = c ? "isNotAllday" : ""
          event.end = moment(event.end).format("YYYY-MM-DDTHH:mm:ss")
          event.start = moment(event.start).format("YYYY-MM-DDTHH:mm:ss")
          return event
        })
        console.log("arr", arr)
        this.calendarEvents = arr

        // push new data
        // let newD = {
        //   backgroundColor: "#00cec9",
        //   cName: "行政",
        //   className: "isNotAllday",
        //   end: "2021-05-02T10:00:00",
        //   id: "",
        //   start: "2021-05-02T12:00:00",
        //   title: "test--2",
        // }
        // this.calendarEvents.push(newD)
        this.$store.dispatch("loadingHandler", false)
      })
    },

    // get color
    getCalendarColor(typeName) {
      // console.log(typeName)
      let colorStr = ""
      switch (typeName) {
        case "行政":
          colorStr = "#EE6B6B"
          break
        case "展覽":
          colorStr = "#E28F15"
          break
        case "表演":
          colorStr = "#B600F5"
          break
        case "播映":
          colorStr = "#9C2626"
          break
        case "學術":
          colorStr = "#2093D3"
          break
      }
      // console.log("colorStr", colorStr)
      return colorStr
    },

    getEventType() {
      const vm = this
      vm.eventTypeData = vm.$store.state.tagGroup
      // console.log(vm.eventTypeData)
      if (!vm.onlyActivity) {
        vm.typeCheckBox = vm.eventTypeData.map((item) => {
          return item.typeName
        })
      } else {
        vm.typeCheckBox = ["行政"]
      }
    },
    chooseUnit() {
      this.$store.dispatch("loadingHandler", true)
      this.getEventData("", "", "", "")
    },
    chooseLocal() {
      this.$store.dispatch("loadingHandler", true)
      this.getEventData("", "", "", "")
    },
    searchHandler() {
      // console.log("search");
      const vm = this
      let unit = vm.listQuery.unit
      let location = vm.listQuery.local
      let startDate = vm.listQuery.startDate
      let endDate = vm.listQuery.endDate
      // let key = vm.searchInput
      vm.getEventData({ unit, location, startDate, endDate })
    },
    checkIncludes(type) {
      return !this.typeCheckBox.includes(type)
    },
    addToGoogleCalendar() {
      const vm = this
      if (vm.isLogInG) {
        //已登入則設定參數並執行 post()
        vm.$swal({
          title: "新增提示",
          text: `確認新增 ${vm.dialogEvent.EventName} 至Google行事曆?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#2f3e52",
          cancelButtonColor: "#522f2f",
          confirmButtonText: "確定",
          cancelButtonText: "取消",
        }).then((result) => {
          if (result.value) {
            vm.$store.dispatch("loadingHandler", true)
            vm.startG = moment(vm.dialogEvent.EventStartDate).format()
            vm.endG = moment(vm.dialogEvent.EventEndDate).format()
            vm.titleG = vm.dialogEvent.EventName
            vm.postGoogleCalendar()
          } else {
            vm.$store.dispatch("loadingHandler", false)
            vm.$alertT.fire({
              icon: "info",
              title: `已取消添加`,
            })
          }
        })
      } else {
        //尚未登入執行authenticate
        vm.$alertT.fire({
          icon: "info",
          title: "請先登入Google帳號",
        })
        vm.authenticate()
      }
    },
    authenticate() {
      //若尚未登入則跳出登入視窗
      const vm = this
      vm.$store.dispatch("loadingHandler", true)
      return gapi.auth2
        .getAuthInstance()
        .signIn({
          scope:
            "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
        })
        .then(
          function() {
            vm.loadClient()
          },
          function(err) {
            console.error("Error signing in", err)
            vm.$store.dispatch("loadingHandler", false)
          }
        )
    },
    postGoogleCalendar() {
      const vm = this
      return gapi.client.calendar.events
        .insert({
          calendarId: "primary",
          resource: {
            end: { dateTime: vm.endG },
            start: { dateTime: vm.startG },
            summary: vm.titleG,
          },
        })
        .then(
          function(response) {
            vm.$store.dispatch("loadingHandler", false)
            vm.$alertT.fire({
              icon: "success",
              title: `已新增 ${vm.dialogEvent.EventName} 至Google行事曆`,
            })
            vm.eventDailog = false
          },
          function(err) {
            vm.$alertT.fire({
              icon: "error",
              title: `發生錯誤`,
            })
            vm.$store.dispatch("loadingHandler", false)
          }
        )
    },
    loadClient() {
      // 設定api key 並登入
      const vm = this
      gapi.client.setApiKey(process.env.VUE_APP_API_KEY)
      return gapi.client
        .load(
          "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        )
        .then(
          function() {
            vm.$store.dispatch("loadingHandler", false)
            vm.$alertM.fire({
              icon: "success",
              title: "已成功登入Google帳號",
            })
            // console.log("GAPI client loaded for API");
            // console.log(gapi.client.hasOwnProperty("calendar"));
            vm.logInCheck()
          },
          function(err) {
            console.error("Error loading GAPI client for API", err)
          }
        )
    },
    logInCheck() {
      //檢查是否為登入狀態
      let check = gapi.hasOwnProperty("client")
      let check2 = gapi.client.hasOwnProperty("calendar")
      // console.log(check2);
      check2 ? (this.isLogInG = true) : (this.isLogInG = false)
    },
    eventRender(info) {
      const vm = this
      info.el.addEventListener("click", function() {
        console.log("info", info)
        let insid = info.event.id
        if (insid == "") {
          vm.dialogEvent = {
            title: info.event.title,
            activDate:
              moment(info.event.start).format("YYYY-MM-DD") +
              " ～ " +
              moment(info.event.end).format("YYYY-MM-DD"),
          }

          vm.$nextTick(() => {
            vm.eventDailog = true
          })
        } else {
          let params = { insid }
          vm.$api.GetDetail(params).then((res) => {
            console.log("res", res)
            vm.dialogEvent = res.data
            vm.$nextTick(() => {
              vm.eventDailog = true
            })
          })
        }
      })
    },
    datesRender(info) {
      // console.log("info", info)
      const vm = this
      // let type = info.view.viewSpec.type
      let startDate = moment(info.view.activeStart).format("yyyy-MM-DD")
      let endDate = moment(info.view.activeEnd).format("yyyy-MM-DD")
      // let key = vm.searchInput
      vm.listQuery.startDate = startDate
      vm.listQuery.endDate = endDate
      let unit = vm.listQuery.unit
      let location = vm.listQuery.local
      // console.log(vm.startDate, vm.endDate, vm.getEventData)
      // 當頁日曆第一格顯示跟最後一個顯示
      // console.log("startDate", vm.listQuery.startDate)
      // console.log("endDate", vm.listQuery.endDate)
      vm.getEventData({ unit, location, startDate, endDate })
    },
    typeName(eid) {
      const vm = this
      // console.log("eventTypeData", eventTypeData)
      return vm.eventTypeData
        .map((event) => {
          return event.Id === eid ? event.typeName : ""
        })
        .join("")
    },
    dateFilter(date) {
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
    getShowMenu(boolean) {
      this.showMenu = boolean
    },
    async getUnitListItemFun() {
      const vm = this
      await vm.$api.GetUnitListItem().then((res) => {
        vm.getUnitListItemData = res.data
        // console.log("getUnitListItemData", vm.getUnitListItemData)
      })
    },
    async getLocationListItemFun() {
      const vm = this
      await vm.$api.GetLocationListItem().then((res) => {
        vm.getLocationListItemData = res.data
        // console.log("getLocationListItemData", vm.getLocationListItemData)
      })
    },
  },
  async mounted() {
    if (this.$route.params && this.$route.params.type) {
      this.onlyActivity = true
    }
    this.$store.dispatch("loadingHandler", true)
    await gapi.load("client:auth2", function() {
      gapi.auth2.init({
        client_id: process.env.VUE_APP_CLIENT_ID,
      })
      // console.log(gapi.client.hasOwnProperty("calendar"));
    })
    const vm = this
    vm.getEventType()
    vm.getEventData("", "", "", "")
    await vm.getUnitListItemFun()
    await vm.getLocationListItemFun()
    // await this.logInCheck();
    this.$store.dispatch("loadingHandler", false)

    // this.typeCheckBox = this.typeFilter;
  },
}
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
</style>
