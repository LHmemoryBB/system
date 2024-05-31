<template>
  <div class="app-container">
    <el-table border :data="list" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"> </el-table-column>
      <el-table-column prop="seat_id" label="座号号" width="180">
      </el-table-column>
      <el-table-column prop="start_time" label="预约开始时间">
      </el-table-column>
      <el-table-column prop="end_time" label="预约结束时间"> </el-table-column>
      <el-table-column prop="reservation_status" label="预约状态">
        <template slot-scope="scope">
          <span v-if="scope.row.reservation_status == 1"> 预约已过期</span>
          <span v-else-if="scope.row.reservation_status == 2"> 预约已取消</span>
          <div v-else-if="scope.row.reservation_status == 3">
            <span style="color: rgb(31, 187, 31)"> 预约成功 </span>
            <el-button
              size="mini"
              style="margin-left: 20px"
              @click="cancelAppoinment(scope.row)"
              >取消预约</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, cancelAppointment } from "@/api/user";

export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data } = await getList();
      this.list = data;
      console.log(this.list);
    },
    cancelAppoinment(row) {
      console.log(row);
      this.$alert("确认取消预约吗？", {
        confirmButtonText: "确定",
        callback: (action) => {
          cancelAppointment({id: row.id}).then(res =>{
            if (res.status == 0) {
              this.$message.success('取消预约成功');
              this.getList();
            }else{
              this.$message.error(res.message);
            }
          })
        },
      });
    },
  },
};
</script>

<style scoped>
</style>

