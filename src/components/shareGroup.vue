<template>
  <div class="shareGroupPage">
    <!-- 側邊欄 -->
    <div v-for="item in networks" :key="item.network">
      <el-tooltip effect="dark" :content="item.name" placement="right">
        <ShareNetwork class="shareGroupPage__block" :style="{ backgroundColor: item.color }" :network="item.network" :url="sharing.url" :title="sharing.title" v-if="item.name !== 'more'">
          <i :class="item.icon"></i>
        </ShareNetwork>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sharing: {
        url:
          /* process.env.VUE_APP_LINK_URL + */ "https://www.ntua.edu.tw/NTUACalendar/#" +
          this.$route.fullPath,
        title: "台藝大行事曆管理系統",
      },
      networks: [
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "pinterest",
          name: "Pinterest",
          icon: "fab fah fa-lg fa-pinterest",
          color: "#bd081c",
        },
        {
          network: "line",
          name: "Line",
          icon: "fab fah fa-lg fa-line",
          color: "#00c300",
        },
        {
          network: "email",
          name: "Email",
          icon: "far fah fa-lg fa-envelope",
          color: "#333333",
        },
      ],
      allShareMethod: null,
    };
  },
  mounted() {
    this.allShareMethod = this.$store.state.shareMethodList;
  },
};
</script>

<style lang="scss">
.shareGroupPage {
  position: fixed;
  left: 0;
  top: 15%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__block {
    width: 28px;
    height: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    color: white;
    transition: 0.4s;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  &__modal {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &--shareMethod {
      width: 100%;
      display: flex;
      align-items: center;
      flex-flow: wrap;

      a {
        display: inline;
        align-items: center;
        flex-direction: row;
        margin: 0 4px 4px 0;

        &:last-child {
          margin: 0;
        }

        span {
          padding-left: 8px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
