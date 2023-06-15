<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/photo.png" alt="" />
            <div class="user-info">
              <p class="name">{{ userInfo.name }}</p>
              <p class="access">{{ userInfo.access }}</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2021-7-19</span></p>
            <p>上次登录地点：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 260px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              :key="key"
              v-for="(val, key) in labelList"
              :prop="key"
              :label="val"
            />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="num">
          <el-card
            v-for="count in countData"
            :key="count.name"
            :body-style="{ display: 'flex', height: '60px' }"
          >
            <i
              class="icon"
              :class="`el-icon-${count.icon}`"
              :style="{ background: count.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ count.value }}</p>
              <p class="desc">{{ count.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 220px">
          <div ref="echarts1" style="height: 220px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 100px"> <div ref="echart2"></div></el-card>
          <el-card style="height: 100px"> <div ref="echart3"></div></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { homeData } from "../api";
import * as echarts from "echarts";
import Cookie from "js-cookie";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      labelList: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "本日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本日收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb880",
        },
        {
          name: "本日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#58ade8",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb880",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#58ade8",
        },
      ],
    };
  },
  mounted() {
    homeData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      // 初始化echarts实例
      // 折线图
      const echarts1 = echarts.init(this.$refs.echarts1);
      let echarts1Option = {};

      const { orderData } = data.data;
      const echarts1xAxis = Object.keys(orderData.data[0]);
      echarts1Option.xAxis = { data: echarts1xAxis };
      echarts1Option.yAxis = {};
      echarts1Option.legend = {
        data: echarts1xAxis,
      };
      echarts1Option.series = [];
      echarts1xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      echarts1.setOption(echarts1Option);
    });
  },
  computed: {
    userInfo() {
      let token = JSON.parse(Cookie.get("token"))
      return token
    },
  },
};
</script>

<style lang="less">
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #ccc;
    span {
      margin-left: 60px;
      color: #666;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  .icon {
    font-size: 30px;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: space-between;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 31%;
    margin-bottom: 10px;
    margin-right: 15px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  .el-card {
    width: 48%;
  }
}
</style>