<template>
  <div class="header-container">
    <div class="l-container">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="CollapseMenu"
        style="margin-right: 20px"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabList"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-container">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/photo.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item><span @click="exit">退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  methods: {
    ...mapMutations("tab", ["CollapseMenu", "clearTabList"]),
    exit() {
      this.clearTabList();
      Cookie.remove("token");
      this.$router.push("/Login");
    },
  },
  computed: {
    ...mapState("tab", ["tabList"]),
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  height: 60px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 14px;
    margin-left: 10px;
    color: #fff;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.r-container {
  img {
    width: 40px;
    height: 40px;
  }
}
.l-container {
  display: flex;
  align-items: center;
  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      &.is-link {
        color: #666;
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }
}
</style>