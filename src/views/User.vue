<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        inline
      >
        <el-form-item prop="name" label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birth" label="出生日期">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="addr" label="地址">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit('add')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="AddUser">+新增</el-button>
    </div>
    <div class="userList">
      <el-table :data="userList" style="width: 100%" height="465">
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="年龄" prop="age"> </el-table-column>
        <el-table-column label="性别" prop="sex"> </el-table-column>
        <el-table-column label="出生日期" prop="birth"> </el-table-column>
        <el-table-column label="地址" prop="addr"> </el-table-column>
        <el-table-column align="center">
          <template slot="header"> 操作 </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "User",
  data() {
    return {
      search: "",
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请输入性别" }],
        birth: [{ required: true, message: "请输入出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      userList: [],
      diaLogState: 0, //0代表新增，1代表编辑
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    handleClose() {
      this.$confirm("关闭将不会保存已填写信息,确认关闭？")
        .then((_) => {
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        })
        .catch((_) => {});
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          if (this.diaLogState) {
            axios
              .put(`http://localhost:3000/User/${this.form.id}`, this.form)
              .then(() => {
                this.getUserList();
              });
          } else {
            axios({
              url: "http://localhost:3000/User",
              method: "POST",
              data: this.form,
            }).then(() => {
              this.$refs.form.resetFields();
              this.getUserList();
            });
          }
        }
      });
    },
    handleEdit(row) {
      this.diaLogState = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete("http://localhost:3000/User/" + row.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    AddUser() {
      this.dialogVisible = true;
      this.diaLogState = 0;
      this.$refs.form.resetFields();
    },
    getUserList() {
      axios({
        url: "http://localhost:3000/User",
        method: "GET",
      })
        .then((data) => {
          this.userList = data.data;
          this.total = this.userList.length || 0;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less">
.manage {
  height: 90%;
}
</style>