<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" label-width="100px">
        <el-form-item label="学生学号">
          <el-input v-model="form.studentid"></el-input>
        </el-form-item>
        <el-form-item label="预约状态">
          <el-select
            v-model="form.reservation_status"
            placeholder="请选择预约状态"
          >
            <el-option label="已过期" :value="1"></el-option>
            <el-option label="已取消" :value="2"></el-option>
            <el-option label="已预约" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
          <el-button type="success" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border :data="list" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="studentid" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="seat_id" label="座位号" width="180">
      </el-table-column>
      <el-table-column prop="start_time" label="预约开始时间">
      </el-table-column>
      <el-table-column prop="end_time" label="预约结束时间"> </el-table-column>
      <el-table-column prop="reservation_status" label="预约状态">
        <template slot-scope="scope">
          <span v-if="scope.row.reservation_status == 3">
            <span><el-tag type="success">已预约</el-tag></span>
            <span
              ><el-button
                type="danger"
                size="mini"
                style="margin-left: 30px"
                @click="cancelReserve(scope.row)"
                >取消预约</el-button
              ></span
            >
          </span>
          <span v-else-if="scope.row.reservation_status == 2"
            ><el-tag type="warning">已取消</el-tag></span
          >
          <span v-else-if="scope.row.reservation_status == 1"
            ><el-tag type="info">已过期</el-tag></span
          >
          <span v-else-if="scope.row.reservation_status == 4"
            ><el-tag type="danger">已占座</el-tag></span
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="dataTotal"
      :page-size="30"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBox, cancelAppointment, accept } from "@/api/user";
import { resetRouter } from "@/router";

export default {
  data() {
    return {
      list: [],
      form: {
        studentid: "",
        reservation_status: null,
      },
      currentPage: 1,
      dataTotal: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const params = {
        page: this.currentPage,
        size: 30,
        ...this.form,
      };
      const { total, data } = await getBox(params);
      this.list = data;
      this.dataTotal = total;
      console.log(this.list);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    cancelReserve(row) {
      this.$confirm("此操作将强制取消该学生的预约, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cancelAppointment({ id: row.id }).then((res) => {
          if (res.status == 0) {
            this.$message.success("修改预约状态成功");
            this.getList();
          }
        });
      });
    },
    queryList() {
      this.currentPage = 1;
      this.getList();
    },
    reset() {
      this.currentPage = 1;
      this.form = {};
      this.getList();
    },
  },
};
</script>

<style scoped>
.app-container {
  height: calc(100vh - 50px);
}
.app-container /deep/ .el-pagination {
  text-align: center;
}
.app-container /deep/ .el-table--border {
  width: 100%;
  height: calc(100% - 120px);
  overflow: auto;
  margin-bottom: 20px;
}
</style>

