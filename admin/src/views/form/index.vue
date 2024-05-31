<template>
  <div class="app-container">
    <el-table
      border
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="studentId"
        label="学号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="seat_id"
        label="座号号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="reservation_date"
        label="预约日期"
      >
        <template slot-scope="scope">
          {{filterTime2(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="reservation_time"
        label="预约时长"
      >
      </el-table-column>
      <el-table-column
        prop="reservation_time"
        label="预约结束时间"
      >
        <template slot-scope="scope">
          {{filterTime(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        <el-table-column
        prop="reservation_time"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleBox1(scope.row)"
            type="text"
            size="mini"
          >通过</el-button>
          <el-button
            @click="handleBox2(scope.row)"
            type="text"
            size="mini"
          >拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBox,refuse, accept } from '@/api/user'

export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    filterTime2 (row) {
      const now = new Date(row.reservation_date)
      return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T ${now.getHours()}:${now.getMinutes()}`
    },
    filterTime (row) {
      const time = new Date(row.reservation_date).getTime();
      const time2 = Number(row.reservation_time) * 60 * 1000;
      const newTime = time + time2;
      const now = new Date(newTime)
      return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T ${now.getHours()}:${now.getMinutes()}`
    },
    async handleBox1 (row) {
      try {
        const { message } = await accept({
        reservation_time: row.reservation_time,
        seat_id: row.seat_id,
        user_id: row.user_id
      })
      this.$message.success('接受成功')
      } catch (error) {
        this.$message.success('接受成功')
      }
      this.getList()
    },
    async handleBox2 (row) {
      try {
        const { message } = await refuse({
        user_id: row.user_id
      })
      this.$message.success('拒绝成功')
      } catch (error) {
        this.$message.success('拒绝成功')
      }
      this.getList()
     },
    handleBox3 (row) { },
    async getList () {
      const { data } = await getBox()
      this.list = data
      console.log(this.list);
    }
  }
}
</script>

<style scoped>
</style>

