<template>
  <div class="app-container">
    <el-card
      style="width: 80%; height: 900px; margin: 0 auto; margin-bottom: 50px"
    >
      <!-- <div class="info_div">姓名：{{ info.nickname }}</div>
      <div class="info_div">学号：{{ info.studentId }}</div>
      <div class="info_div">专业：{{ info.major }}</div>
      <div class="info_div">班级：{{ info.class }}</div>
      <div class="info_div">邮箱：{{ info.email }}</div> -->
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ info.nickname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            学号
          </template>
          {{ info.studentId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            专业
          </template>
          {{ info.major }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            班级
          </template>
          {{ info.class }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            邮箱
          </template>
          {{ info.email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            修改个人信息
          </template>
          <el-button type="primary" @click="isShow = true" size="mini"
            >点击修改</el-button
          >
        </el-descriptions-item>
      </el-descriptions>
      <div style="width: 100%; height: 100%;display: flex;justify-content: space-between;">
        <div style="width: 40%; height: 600px" id="LinChart"></div>
        <div style="width: 40%; padding-top: 60px;">
          <el-tag type="success" style="margin-bottom: 30px;" v-if="reverseTableData.length> 0">🥰亲爱的同学，您在未来几天内还有以下预约记录，请记得准时赴约 💓</el-tag>
          <el-tag type="success" style="margin-bottom: 30px;" v-else>💯 亲，您还没有预约记录，请前往座位预约菜单进行预约❤️‍🔥</el-tag>
          <el-table
            :data="reverseTableData"
            style="width: 60%"
            height="400px"
            border
          >
            <el-table-column prop="start_time" label="开始时间">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间"> </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <el-dialog
      title="修改个人信息"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      width="30%"
    >
      <div class="form_box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="姓名" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="ruleForm.studentId"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="ruleForm.major"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="ruleForm.class"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo, setUser, setPassword, getList } from "@/api/user";
import * as echarts from "echarts";

export default {
  data() {
    const validateQQEmail = (rule, value, callback) => {
      // QQ邮箱正则表达式
      const qqEmailPattern = /^[a-zA-Z0-9._%+-]+@qq\.com$/;
      if (!value) {
        return callback(new Error("请输入邮箱地址"));
      }
      if (!qqEmailPattern.test(value)) {
        return callback(new Error("请输入正确的QQ邮箱地址"));
      }
      callback();
    };
    return {
      isShow: false,
      isShow2: false,
      info: {},
      ruleForm: {},
      ruleForm2: {
        oldPwd: "",
        newPwd: "",
      },
      rules: {
        nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        email: [
          {
            required: true,
            message: "请检查邮箱格式",
            trigger: "blur",
            validator: validateQQEmail,
          },
        ],
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
      reverseTableData: [],
    };
  },
  async created() {
    const { data } = await getInfo();
    this.info = data;
    this.ruleForm = JSON.parse(JSON.stringify(this.info));
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data } = await getList();
      const dates = [];
      const today = this.$dayjs();
      for (let i = -3; i <= 3; i++) {
        const date = today.add(i, "day");
        dates.push(date.format("MM-DD"));
      }
      this.list = data;
      this.reverseTableData = data.filter(
        (item) => item.reservation_status === 3
      );
      const reverNum = [];
      dates.forEach((e, index) => {
        const res = this.countDataForDate(data, e);
        reverNum[index] = res;
      });
      this.setLineChart(dates, reverNum);
    },
    countDataForDate(data, targetDate) {
      // 使用 filter 方法筛选出与目标日期匹配的数据
      const filteredData = data.filter((item) => {
        // 假设 start_time 是一个表示日期的字符串
        // 如果 start_time 是时间戳，你需要进行相应的转换
        return this.$dayjs(item.start_time).format("MM-DD") === targetDate;
      });
      // 返回匹配的数据数量
      return filteredData.length;
    },
    handleEdit2() {
      this.$refs["ruleForm2"].validate(async (valid) => {
        if (valid) {
          const { message } = await setPassword(this.ruleForm2);
          this.$message.success(message);
          this.isShow2 = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const { message } = await setUser(this.ruleForm);
          this.$message.success(message);
          this.isShow = false;
          const { data } = await getInfo();
          this.info = data;
          this.ruleForm = JSON.parse(JSON.stringify(this.info));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setLineChart(dates, data) {
      console.log(data, dates);
      var chartDom = document.getElementById("LinChart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: dates,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "预约次数",
            type: "line",
            stack: "Total",
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: data,
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>

<style scoped>
.app-container {
  /* display: flex; */
}

.btn_div {
  width: 500px;
  text-align: right;
  margin-bottom: 30px;
  /* margin-left: 30px; */
}

.info_div {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
