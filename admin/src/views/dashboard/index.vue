<template>
  <div class="dashboard">
    <div style="display: flex;justify-content: space-between;margin-bottom: 20px;">
      <el-radio-group v-model="radio1" @change="getSeat">
        <el-radio-button :label="1">一楼</el-radio-button>
        <el-radio-button :label="2">二楼</el-radio-button>
        <el-radio-button :label="3">三楼</el-radio-button>
      </el-radio-group>
      <el-button @click="handleAdd" type="primary">添加座位</el-button>
    </div>
    <el-table border :data="list" style="width: 100%" height="80vh">
      <el-table-column prop="id" label="座位"> </el-table-column>
      <!-- <el-table-column prop="floor" label="楼层"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSeat, setSeat } from "@/api/user";

export default {
  name: "Dashboard",
  data() {
    return {
      list: [],
      radio1: 1,
    };
  },
  async created() {
    this.getSeat();
  },
  methods: {
    handleAdd() {
      this.$confirm("是否添加座位", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = this.list[this.list.length - 1].id;
          console.log("id", id);
          this.list.push({
            id: id + 1,
          });
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClick(row) {
      this.$confirm("此操作将永久删除该座位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const index = this.list.findIndex((item) => item.id == row.id);
          this.$delete(this.list, index);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async getSeat() {
      const { data } = await getSeat({ floor: this.radio1 });
      this.list = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
  .ball {
    padding: 0 25px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .tips {
    width: 30%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 20px 0;
    span {
      margin-right: 50px;
      margin-left: 5px;
    }
  }
  .box {
    height: 50vh;
    display: flex;
    justify-content: space-between;
    .box_div {
      width: 30%;
      height: 100%;
      border: 1px solid #000000;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .box_div_item {
        flex: 0 0 11%;
        height: calc(50vh / 8);
        margin-right: calc(1% / 7);
        margin-bottom: calc(1% / 7);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .box_div_item:nth-child(4n) {
        margin-right: 0;
      }
      .box_div_item:last-child {
        margin-right: auto;
      }
      .box_div_item:nth-last-child(-n + 4) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
