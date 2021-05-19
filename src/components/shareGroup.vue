<template>
  <div class="shareGroupPage">
    <!-- <div class="shareGroupPage__block" v-for="item in shareList" :key="item.id">
      {{ item.title }}
    </div> -->

    <ShareNetwork
      class="shareGroupPage__block"
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :style="{ backgroundColor: network.color }"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitterUser="sharing.twitterUser"
    >
      <i :class="network.icon"></i>
    </ShareNetwork>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       shareList: [
//         {
//           id: 1,
//           icon: "",
//           title: "twitter",
//         },
//         {
//           id: 2,
//           icon: "",
//           title: "facebook",
//         },
//         {
//           id: 3,
//           icon: "",
//           title: "pinter",
//         },
//         {
//           id: 4,
//           icon: "",
//           title: "email",
//         },
//         {
//           id: 5,
//           icon: "",
//           title: "more",
//         },
//       ],
//     };
//   },
// };

export default {
  data() {
    return {
      sharing: {
        url: "https://news.vuejs.org/issues/180",
        title:
          "Say hi to Vite! A brand new, extremely fast development setup for Vue.",
        description:
          'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: "The hot reload is so fast it's near instant. - Evan You",
        hashtags: "vuejs,vite,javascript",
        twitterUser: "youyuxi",
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
          network: "email",
          name: "Email",
          icon: "far fah fa-lg fa-envelope",
          color: "#333333",
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
  top: 70px;
  z-index: 10;
  &__block {
    width: 28px;
    height: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }
  .share-network-twitter {
    color: #ffffff;
  }
  .share-network-facebook {
    color: #ffffff;
  }
  .share-network-pinterest {
    color: #ffffff;
  }
  .share-network-email {
    color: #ffffff;
  }
}
</style>
