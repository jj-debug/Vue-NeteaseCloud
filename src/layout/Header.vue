<template>
  <div :class="headClass">
    <div :class="program + 'header-title'">
      <div :class="program + 'header-title-left'">
        <div class="item" @click="handleHomeButton">
          <transition name="header-side">
            <i class="iconfont icon-home" />
          </transition>
        </div>
        <div class="item" @click="handleExistMaxScreen">
          <transition name="header-side">
            <i class="iconfont icon-zuixiaohua" />
          </transition>
        </div>
        <div class="item" @click="handleMaxScreen">
          <transition name="header-side">
            <i class="iconfont icon-zuidahua" />
          </transition>
        </div>
      </div>
      <div :class="program + 'header-title-right'">
        <div :class="[
            `item vbestui-iconfont icon-hou`,
            `${'header-' + theme + '-title-icon'}`,
          ]" @click="go(-1)"></div>
        <div :class="[
            `item vbestui-iconfont icon-qian`,
            `${'header-' + theme + '-title-icon'}`,
          ]" @click="go(1)"></div>
      </div>
    </div>
    <div :class="program + 'header-main'">
      <div class="left">
        <Search />
      </div>
      <div class="right">


        <el-dropdown :disabled="!isLogin">
          <span class="el-dropdown-link">
            <b-avatar size="35px" class="avatar" :src="isAvatar" @click.native="handleAvatarClick" />
            <div class="nickname">
              <span v-if="getNickname">{{ getNickname }}</span>
              <i v-if="getNickname" class="el-icon-arrow-down el-icon--right"></i>
            </div>

          </span>
          <el-dropdown-menu slot="dropdown" ref="elDropdownMenu">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="item">
          <b-poptip max-length="180px" placement="bottom-start" :theme="getTheme">
            <b-button :class="[
                `iconfont icon-icon-huanfu`,
                `${theme + '-huanfu-icon'}`,
              ]" width="60px" height="30px" type="text" transparent />
            <div slot="title" class="poptip-title">主题</div>
            <div class="huanfu" slot="content">
              <div class="theme-item" @click="handleThemeLight">优雅白</div>
              <div class="theme-item" @click="handleThemeDark">炫酷黑</div>
              <div class="theme-item" @click="handleThemeGreen">清新绿</div>
            </div>
          </b-poptip>
        </div>
        <!-- <a href="https://gitee.com/fudaosheng">
          <b-tooltip :theme="getTheme">
            <div :class="['item', `${theme + '-item'}`]">G</div>
            <div slot="content">Gitee</div>
          </b-tooltip>
        </a>
        <a href="https://gitee.com/fudaosheng">
          <b-tooltip :theme="getTheme">
            <div
              :class="[`${theme + '-item'}`, 'item iconfont icon-github']"
            ></div>
            <div slot="content">Github</div>
          </b-tooltip>
        </a> -->
      </div>
    </div>
    <transition name="login">
      <login v-show="isShow" class="login" />
    </transition>
  </div>
</template>
<script>
import { _logout } from "network/user";
import { theme } from "mixin/global/theme.js";
import { requestFullScreen, exitFullscreen } from "utils/window.js";
import Login from "content/user/Login";
import Search from "content/search";
import { mapGetters, mapState } from "vuex";
export default {
  name: "LayoutHeader",
  mixins: [theme],
  components: { Login, Search },
  data() {
    return {
      isShow: false,
      isLogin: false,
      isAvatar: localStorage.getItem('cookie')? this.isAvatar = this.getAvatar: this.isAvatar = ''
    };
  },
  beforeUpdate() {
    console.log("this.isShow", this.isShow);
    console.log("this.isLogin", this.isLogin);
  },
  computed: {
    haveCookie() {
      if (localStorage.getItem('cookie')) {
        return false
      }else{
        return true
      }
      // return localStorage.getItem('cookie');
    },
    headClass() {
      return [`${this.program + this.theme + "-header"}`, "dance-music-header"];
    },
    // getAvatar() {
    //   return this.$store.getters.getAvatar;
    // },
    ...mapGetters(['getAvatar', 'getNickname']),
    ...mapState(['disable']),
    
  },
  methods: {
    /**主题 */
    handleThemeLight() {
      this.$store.commit("setTheme", "light");
    },
    handleThemeDark() {
      this.$store.commit("setTheme", "dark");
    },
    handleThemeGreen() {
      this.$store.commit("setTheme", "green");
    },
    handleAvatarClick() {
      console.log(this.haveCookie);
      if (localStorage.getItem('cookie')) return
      this.$bus.$emit('erweima')
      this.isShow = true;
    },
    hiddleLogin(boolean) {
      console.log(boolean);
      // this.isLogin = boolean;
      this.isShow = false
      console.log("this.isShow", this.isShow);
    },
    /**窗口 */
    handleMaxScreen() {
      requestFullScreen();
    },
    handleExistMaxScreen() {
      exitFullscreen();
      this.$Toast.info("您已退出全屏模式");
    },
    /**返回主页面 */
    handleHomeButton() {
      this.$router.push("/individuation");
    },
    /**路由 */
    go(index) {
      this.$router.go(index);
    },

    async logout() {
      console.log(this.nickname);
      this.$store.commit("deleteUser");
      this.isLogin = !this.isLogin
      localStorage.removeItem('cookie');
      localStorage.removeItem('avatar');
      localStorage.removeItem('uid')
      localStorage.removeItem('playList')
      localStorage.removeItem('nickname')
      localStorage.getItem('cookie')? this.isAvatar = this.getAvatar: this.isAvatar = ''
      this.$router.push({
        path: '/individuation'
      })
    }
  },
  mounted() {
    
    localStorage.getItem('cookie')? this.isLogin = true : this.isLogin = false
    localStorage.getItem('cookie')? this.isAvatar = this.getAvatar: this.isAvatar = ''
    this.$bus.$on('successLogin', () => {
      console.log('successLogin');
      this.isLogin = true
      localStorage.getItem('cookie')? this.isAvatar = this.getAvatar: this.isAvatar = ''
    })
    this.$bus.$on('noLogin', () => {
      this.isLogin = false
    })
  }
};
</script>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  display: flex;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.dance-music-header {
  display: flex;
  align-items: center;
  height: 58px;
  width: 100%;

  &-title {
    width: 18%;
    height: 100%;
    text-align: center;
    display: flex;

    &-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .item {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        line-height: 18px;
        overflow: hidden;
        cursor: pointer;

        i {
          display: inline-block;
        }
      }

      // .item:nth-child(1) {
      //   background: #ed655a;
      // }
      // .item:nth-child(2) {
      //   background: #e0c04c;
      // }
      // .item:nth-child(3) {
      //   background: #72be47;
      // }
    }

    &-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .item {
        flex: 1;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  &-main {
    width: 82%;
    height: 100%;
    display: flex;

    .left {
      flex: 2;
      text-align: center;
      line-height: 58px;

      ::v-deep .vbestui-bubble {
        padding: 0px;
      }
    }

    .right {
      flex: 7;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .avatar {
        margin-right: 20px;
        cursor: pointer;
      }

      .nickname {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #444;
      }

      a {
        text-decoration: none;
      }

      .item {
        width: 60px;
        text-align: center;
        font-size: 22px;
      }

      .iconfont {
        font-size: 26px;
      }

      .poptip-title {
        font-size: 16px;
        text-align: left;
      }

      .huanfu {
        display: flex;
        height: 60px;
        width: 100%;
        cursor: pointer;

        .theme-item {
          flex: 1px;
          line-height: 60px;
          text-align: center;
          font-size: 13px;
        }

        .theme-item:nth-child(1) {
          background: var(--light-bg-color);
          color: var(--dark-bg-color);
        }

        .theme-item:nth-child(2) {
          background: #292c32;
          color: #fff;
        }

        .theme-item:nth-child(3) {
          background: #449e60;
        }
      }
    }
  }
}

.iconfont {
  font-size: 12px;
}

.header-side-enter-active {
  animation: slideInDown 0.4s;
}

.header-side-leave-active {
  animation: slideInDown 0.4s reverse;
}

// light主题
.dance-music-light-header {
  background: var(--light-bg-color);
}

// dark主题
.dance-music-dark-header {
  background: var(--dark-header-bg-color);
}

//green主题
.dance-music-green-header {
  background: var(--green-bg-color);
}

// 换肤图标主题
.light-huanfu-icon {
  color: var(--dark-bg-color) !important;
}

.dark-huanfu-icon {
  color: #ccc !important;
}

// header 右边图标主题
.light-item {
  color: var(--light-text-color);
}

.dark-item {
  color: #ccc;
}

.green-item {
  color: #f6f6f6;
}

// header 左边图标主题
.header-dark-title-icon {
  color: #ccc;
}

.header-green-title-icon {
  color: #f6f6f6;
}

.login {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
}

.login-enter-active {
  animation: fadeInDown var(--animation-base-time);
}

.login-leave-active {
  animation: zoomOutUp var(--animation-base-time);
}
</style>