<template>
  <div>
    <el-container>
      <el-aside width="auto"><Aside :menudata="menudata"></Aside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <Tags></Tags>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import Tags from "@/components/Tags.vue";
import Cookie from "js-cookie";
export default {
  name: "Main",
  components: {
    Aside,
    Header,
    Tags,
  },
  data() {
    return {
      menudata: [],
    };
  },
  mounted() {
    let token = JSON.parse(Cookie.get("token"));
    if (token.access == "超级管理员") {
      this.menudata = [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home ",
        },
        {
          path: "/mail",
          name: "mail",
          label: "商品管理",
          icon: "video-play",
          url: "Mail/Mail ",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "User/User ",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面一",
              icon: "setting",
              url: "Other/Page1 ",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面二",
              icon: "setting",
              url: "Other/Page2",
            },
          ],
        },
      ];
    }else{
      this.menudata = [
      {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home ",
        },
        {
          path: "/mail",
          name: "mail",
          label: "商品管理",
          icon: "video-play",
          url: "Mail/Mail ",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面一",
              icon: "setting",
              url: "Other/Page1 ",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面二",
              icon: "setting",
              url: "Other/Page2",
            },
          ],
        },
      ]
    }
  },
};
</script>

<style>
.el-header {
  padding: 0;
}
</style>