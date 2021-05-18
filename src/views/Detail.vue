<template>
  <div class="detailPage">
    {{detailList}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: null,
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
}
</style>