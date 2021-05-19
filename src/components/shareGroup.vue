<template>
  <div class="shareGroupPage">
    <div class="shareGroupPage__block" v-for="item in shareList" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shareList: [
        {
          id: 1,
          icon: "",
          title: "twitter",
        },
        {
          id: 2,
          icon: "",
          title: "facebook",
        },
        {
          id: 3,
          icon: "",
          title: "pinter",
        },
        {
          id: 4,
          icon: "",
          title: "email",
        },
        {
          id: 5,
          icon: "",
          title: "more",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.shareGroupPage {
  position: absolute;
  left: 0;
  top: 100px;
  z-index: 10;

  &__block {
    padding: 8px;
    background: green;
  }
}
</style>
