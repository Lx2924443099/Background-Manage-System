<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="rules"
      label-width="70px"
      label-position="left"
      class="login-container"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item label="密 码 :" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          >>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="margin-left: 38px; margin-top: 15px"
          @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    login() {
      if (this.form.username != "" && this.form.password != "") {
        axios
          .get("http://localhost:3000/Login", {
            params: {
              username: this.form.username,
              password: this.form.password,
            },
          })
          .then((data) => {
            let token = JSON.stringify(data.data[0])
            Cookie.set("token", token);
            this.$router.push("/home");
          });
      }
    },
  },
};
</script>

<style lang="less">
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login-title {
    text-align: center;
    margin-bottom: 30px;
    color: #505458;
  }
}
</style>