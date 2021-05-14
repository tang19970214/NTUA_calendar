<template>
  <div id="test">
    <div>{{ $route.meta.title }}</div>
    <!-- @dateClick="handleDateClick"
      @eventClick="handleEventClick" -->
    <FullCalendar
      defaultView="dayGridMonth"
      class="ntuaCalendar"
      locale="zh-tw"
      firstDay="1"
      weekNumberCalculation="ISO"
      :eventTimeFormat="eventTime"
      :plugins="calendarPlugins"
      :events="calendarEvents"
      :weekends="true"
      :eventLimit="true"
      :header="header"
    />
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import "@fullcalendar/core/main.css"
import timeGridPlugin from "@fullcalendar/timegrid"
import moment from "moment"

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      //表頭格式
      header: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },

      // 行事曆格式
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],

      // 事件上顯示時間格式
      eventTime: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: false,
      },

      // 顯示資料
      calendarEvents: [
        // {
        //   title: "event1",
        //   start: moment()
        //     .startOf("month")
        //     .format("2021-05-03 10:00"),
        //   end: moment()
        //     .endOf("month")
        //     .format("2021-05-09 10:00"),
        //   backgroundColor: "#0984e3",
        // },
      ],
      calendarEvents: {
        unit: "",
        local: "",
        cName: "",
        startDate: moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: moment()
          .endOf("month")
          .format("YYYY-MM-DD"),
        id: "",
        title: "",
      },
    }
  },

  methods: {
    // handleDateClick(arg) {
    //   // console.log(arg)
    //   if (confirm("您是否要在" + arg.dateStr + "新增一個新的事件?")) {
    //     this.calendarEvents.push({
    //       // add new event data
    //       title: "新的事件",
    //       start: arg.date,
    //       allDay: arg.allDay,
    //     })
    //   }
    // },
    // handleEventClick(info) {
    //   console.log("info", info)
    //   alert("Event: " + info.event.title)
    //   info.el.style.borderColor = "red"
    // },
    GetEvents({ unit, location, startDate, endDate }) {
      let params = {
        unit: unit || this.calendarEvents.unit,
        location: location || this.calendarEvents.local,
        startDate: startDate || this.calendarEvents.startDate,
        endDate: endDate || this.calendarEvents.endDate,
      }
      this.$api.GetEvents(params).then((res) => {
        console.log(res.data)
        this.calendarEvents = res.data
        let arr = res.data.map((item) => {
          console.log("item", item)
          // item.end = moment(item.end).format("YYYY-MM-DDTHH:mm:ss")
          // item.start = moment(item.start).format("YYYY-MM-DDTHH:mm:ss")
          return item
        })
        console.log("arr", arr)
      })
    },
  },
  mounted() {
    this.GetEvents("", "", "", "")
  },
}
</script>
