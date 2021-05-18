<template>
  <div class="detailPage">
    <div class="detailPage__title">
      <h4>{{ detailList.title }}</h4>
    </div>

    <div class="detailPage__image">
      <img :src="detailList.pics" :alt="detailList.pics" />
    </div>
    <!-- 整頁複製鈕 -->
    <div class="share" v-if="!!detailList.insId">
      <a @click="copyHref(detailList.insId)">
        <el-tooltip
          class="item"
          effect="dark"
          content="複製連結"
          placement="bottom"
        >
          <i class="el-icon-share"></i>
        </el-tooltip>
      </a>
    </div>

    <div class="detailPage__summary">
      <h4>主題 ：</h4>
      <p>{{ detailList.summary }}</p>
    </div>

    <div class="detailPage__contents">
      <h4>活動內容 ：</h4>
      <p>{{ detailList.contents }}</p>
    </div>

    <div class="detailPage__links">
      <h4>相關連結 ：</h4>
      <a :href="detailList.links" target="_blank" class="dialog__links"
        >{{ detailList.links }}
      </a>
    </div>

    <div class="detailPage__activDate">
      <h4>活動時間 ：</h4>
      <p>{{ detailList.activDate }}</p>
    </div>

    <div class="detailPage__activLocation">
      <h4>活動地點 ：</h4>
      <p>{{ detailList.activLocation }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: {},
    };
  },
  methods: {
    getCalendarDetail() {
      const idQuery = {
        insid: this.$route.query.id,
      };
      this.$api.GetDetail(idQuery).then((res) => {
        this.detailList = res.data;
      });
    },
  },
  mounted() {
    this.getCalendarDetail();
  },
};
</script>

<style lang="scss">
.detailPage {
  padding: 8px;
  line-height: 28px;
  margin-bottom: 8px;
  h4 {
    font-size: 18px;
    border-bottom: 1px solid #e7e7e7;
    padding: 0 0 10px 0;
    margin: 20px 0 20px 0;
  }

  .share {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    i {
      font-size: 36px;
      transition: 0.4s;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
