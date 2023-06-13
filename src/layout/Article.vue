<template>
  <div :class="articleClass"
    @scroll="handleScroll">
    <!-- <keep-alive>  -->
      <router-view />
    <!-- </keep-alive> -->
    <b-loading
      icon="vbestui-iconfont icon-loading2"
      size="large"
      fix
      v-show="isLoading"
      :color="getLoadingColor"
    />
  </div>
</template>
<script>
import { theme } from "mixin/global/theme.js";
import variableWhite from "@/styles/variables/variable-white";
import variableGreen from "@/styles/variables/variable-green";
import variableDark from "@/styles/variables/variable-dark";
/**三种主题 */
const themes = {
  white: "light",
  dark: "dark",
  green: "green",
};
export default {
  name: "LayoutArticle",
  mixins: [theme],
  created() {
    /**初始化主题表 */
    this.themeMap = {
      [themes.white]: {
        title: "浅色",
        file: variableWhite,
      },
      [themes.green]: {
        title: "绿色",
        file: variableGreen,
      },
      [themes.dark]: {
        title: "深色",
        file: variableDark,
      },
    };
    // 默认浅色
    this.changeTheme(this.getTheme);
  },
  computed: {
    articleClass() {
      return [
        `${this.program + "article"}`,
        `${this.program + "article-" + this.theme}`,
      ];
    },
    isLoading() {
      return this.$store.state.isloading;
    },
    getLoadingColor() {
      let color = "";
      color =
        this.theme == "dark"
          ? "var(--main-color)"
          : this.theme == "green"
          ? "var(--green-main-color)"
          : "";
      return color;
    },
    getRequestType() {
      return this.$store.getters.getRequestType;
    },
  },
  methods: {
    // 防抖
    debounce(fn, time) {
      let temp = null;

      return function() {
        if(temp != null){
          clearInterval(temp)
        }
        temp = setTimeout(() => {
          console.log("debounce");
          fn.call(this)
        }, time)
      }
    },
    scroll(){
      // console.log(this.debounce(this.handleScroll, 500));
      this.debounce(this.handleScroll, 500)
    },
    handleScroll(e) {
      let path = this.$route.path
      let pathArr = path.split('/')
      var scrollTop = e.target.scrollTop
      // 变量windowHeight是可视区的高度
      var windowHeight = e.target.clientHeight
      // 变量scrollHeight是滚动条的总高度
      var scrollHeight = e.target.scrollHeight
      console.log(scrollTop, windowHeight, scrollHeight);
      // 触底判定
      if (scrollTop + windowHeight >= scrollHeight - 1) {
        switch (pathArr[1]) {
          case "artist-detail":
            this.$bus.$emit('artistDetailScroll')
            break;
          case "new-songs":
            this.$bus.$emit('newSongsScroll')
            break;
          case "musiclistdetail":
            this.$bus.$emit('musicListDetailScroll')
            break;
        }
      }
    },

    /**设置主题 */
    changeTheme(themeKey) {
      console.log(themeKey);
      /**style里面定义的各种样式---一个样式数组 */
      const theme = this.themeMap[themeKey].file;
      /**将theme定义的样式key转化为数组 */
      Object.keys(theme).forEach((key) => {
        /**得到值 */
        const value = theme[key];
        /**设置属性 */
        document.documentElement.style.setProperty(key, value);
      });
    },
  },
  watch: {
    theme() {
      this.changeTheme(this.theme);
    },
  },
};
</script>
<style lang="less" scoped>
.dance-music-article {
  width: 82%;
  height: calc(100% - 58px - 60px);
  float: left;
  overflow-y: auto;
  &-dark {
    background: var(--dark-bg-color);
    color: var(--dark-article-color);
  }
}
</style>