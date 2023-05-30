<template>
  <div class="album-list">
    <artist-hot50
      :id="id"
      @refresh="handleRefresh"
      @mouseenter.native="handleEnter"
      @mouseleave.native="handleLeave"
    />
    <album-detail
      v-for="(item, index) in hotAlbums"
      :key="index"
      :album="item"
      @refresh="handleAlbumsRefresh(index)"
    />
  </div>
</template>
<script>
import { _getArtistAlbum } from "network/artist";
import ArtistHot50 from "../childsComps/artist-hot50";
import AlbumDetail from "../childsComps/album-detail";
export default {
  name: "AlbumList",
  components: { ArtistHot50, AlbumDetail },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      hotAlbums: [],
      newHotAlbums: [], // 请求新的专辑数组需要封装成响应式的，这是一个媒介数组
      offset: 0
    };
  },
  created() {
    // this.initRequest();
  },
  mounted() {
    this.$bus.$on("artistDetailScroll", () => {   // 获取需要滚动的距离
      this.initRequest()
      this.offset += 5
    })
  },
  methods: {
    /**鼠标进入热门50首 */
    handleEnter() {
      this.$emit('enter');
    },
    handleLeave() {
      this.$emit('leave');
    },
    handleRefresh() {
      this.$emit("refresh");
    },
    /**专辑列表scroll刷新 */
    handleAlbumsRefresh(index){
      if(index==this.hotAlbums.length-1){
        this.$emit("refresh");
      }
    },
    /**artist-detail网络请求 */
    initRequest() {
      _getArtistAlbum(this.id, this.offset).then((res) => {
        /**热门专辑 */
        if (this.hotAlbums == []) {
          this.hotAlbums = res.data.hotAlbums;
        }else{
          this.newHotAlbums = res.data.hotAlbums
          this.hotAlbums.push(...this.newHotAlbums)
        }
        console.log(this.hotAlbums);
        let len = this.hotAlbums.length
        for(let i = 0; i < len; i++){
          console.log(this.hotAlbums[i].id);
        }
      });
    },
    /**重置数据 */
    reset(){
      this.hotAlbums=[]
    },
  },
  watch:{
    id(){
      this.reset();
      this.initRequest();
      this.offset = 0
    }

  }
};
</script>
<style lang="less" scoped>
.album-list {
  width: 100%;
  padding: 10px 20px;
}
</style>