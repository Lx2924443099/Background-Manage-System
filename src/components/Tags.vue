<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tabList"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
      @click="toggleTab(item)"
      @close="closeMenu(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Tags",
  computed: {
    ...mapState("tab", ["tabList"]),
  },
  methods: {
    toggleTab(item) {
      this.$router.push(item.path);
    },
    closeMenu(item, index) {
      this.deleteList(item);
      if (item.name !== this.$route.name) {
        return;
      }
      console.log(index, this.tabList.length);
      if (index === this.tabList.length) {
        this.$router.push(this.tabList[index - 1].path);
      } else {
        this.$router.push(this.tabList[index].path);
      }
    },
    ...mapMutations("tab", ["deleteList"]),
  },
};
</script>

<style lang="less">
.tabs{
  padding: 20px;
  padding-bottom: 0;
  .el-tag{
    cursor: pointer;
    margin-left: 15px;
  }
}
</style>