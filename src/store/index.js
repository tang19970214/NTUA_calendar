import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    tokenExpire: "",
    isLoading: false,
    tagGroup: [{
      id: 1,
      typeName: "行政",
      color: "#EE6B6B"
    }, {
      id: 2,
      typeName: "展覽",
      color: "#E28F15"
    }, {
      id: 3,
      typeName: "表演",
      color: "#B600F5"
    }, {
      id: 4,
      typeName: "播映",
      color: "#9C2626"
    }, {
      id: 5,
      typeName: "學術",
      color: "#2093D3"
    }],
    shareMethodList: [{
        network: 'baidu',
        name: 'Baidu',
        icon: 'fas fah fa-lg fa-paw',
        color: '#2529d8'
      },
      {
        network: 'buffer',
        name: 'Buffer',
        icon: 'fab fah fa-lg fa-buffer',
        color: '#323b43'
      },
      {
        network: 'email',
        name: 'Email',
        icon: 'far fah fa-lg fa-envelope',
        color: '#333333'
      },
      {
        network: 'evernote',
        name: 'Evernote',
        icon: 'fab fah fa-lg fa-evernote',
        color: '#2dbe60'
      },
      {
        network: 'facebook',
        name: 'Facebook',
        icon: 'fab fah fa-lg fa-facebook-f',
        color: '#1877f2'
      },
      {
        network: 'flipboard',
        name: 'Flipboard',
        icon: 'fab fah fa-lg fa-flipboard',
        color: '#e12828'
      },
      {
        network: 'hackernews',
        name: 'HackerNews',
        icon: 'fab fah fa-lg fa-hacker-news',
        color: '#ff4000'
      },
      {
        network: 'instapaper',
        name: 'Instapaper',
        icon: 'fas fah fa-lg fa-italic',
        color: '#428bca'
      },
      {
        network: 'line',
        name: 'Line',
        icon: 'fab fah fa-lg fa-line',
        color: '#00c300'
      },
      {
        network: 'linkedin',
        name: 'LinkedIn',
        icon: 'fab fah fa-lg fa-linkedin',
        color: '#007bb5'
      },
      {
        network: 'messenger',
        name: 'Messenger',
        icon: 'fab fah fa-lg fa-facebook-messenger',
        color: '#0084ff'
      },
      {
        network: 'odnoklassniki',
        name: 'Odnoklassniki',
        icon: 'fab fah fa-lg fa-odnoklassniki',
        color: '#ed812b'
      },
      {
        network: 'pinterest',
        name: 'Pinterest',
        icon: 'fab fah fa-lg fa-pinterest',
        color: '#bd081c'
      },
      {
        network: 'pocket',
        name: 'Pocket',
        icon: 'fab fah fa-lg fa-get-pocket',
        color: '#ef4056'
      },
      {
        network: 'quora',
        name: 'Quora',
        icon: 'fab fah fa-lg fa-quora',
        color: '#a82400'
      },
      {
        network: 'reddit',
        name: 'Reddit',
        icon: 'fab fah fa-lg fa-reddit-alien',
        color: '#ff4500'
      },
      {
        network: 'skype',
        name: 'Skype',
        icon: 'fab fah fa-lg fa-skype',
        color: '#00aff0'
      },
      {
        network: 'sms',
        name: 'SMS',
        icon: 'far fah fa-lg fa-comment-dots',
        color: '#333333'
      },
      {
        network: 'stumbleupon',
        name: 'StumbleUpon',
        icon: 'fab fah fa-lg fa-stumbleupon',
        color: '#eb4924'
      },
      {
        network: 'telegram',
        name: 'Telegram',
        icon: 'fab fah fa-lg fa-telegram-plane',
        color: '#0088cc'
      },
      {
        network: 'tumblr',
        name: 'Tumblr',
        icon: 'fab fah fa-lg fa-tumblr',
        color: '#35465c'
      },
      {
        network: 'twitter',
        name: 'Twitter',
        icon: 'fab fah fa-lg fa-twitter',
        color: '#1da1f2'
      },
      {
        network: 'viber',
        name: 'Viber',
        icon: 'fab fah fa-lg fa-viber',
        color: '#59267c'
      },
      {
        network: 'vk',
        name: 'Vk',
        icon: 'fab fah fa-lg fa-vk',
        color: '#4a76a8'
      },
      {
        network: 'weibo',
        name: 'Weibo',
        icon: 'fab fah fa-lg fa-weibo',
        color: '#e9152d'
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        icon: 'fab fah fa-lg fa-whatsapp',
        color: '#25d366'
      },
      {
        network: 'wordpress',
        name: 'Wordpress',
        icon: 'fab fah fa-lg fa-wordpress',
        color: '#21759b'
      },
      {
        network: 'xing',
        name: 'Xing',
        icon: 'fab fah fa-lg fa-xing',
        color: '#026466'
      },
      {
        network: 'yammer',
        name: 'Yammer',
        icon: 'fab fah fa-lg fa-yammer',
        color: '#0072c6'
      }
    ]
  },
  actions: {
    //loading
    loadingHandler(context, payload) {
      context.commit("LOADING", payload);
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    SAVE_TOKEN(state, data) {
      state.token = data;
      window.localStorage.setItem("Token", data);
    },
    SAVE_TOKEN_EXPIRE(state, data) {
      state.tokenExpire = data;
      window.localStorage.setItem("TokenExpire", data);
    },
  },

  modules: {},
});