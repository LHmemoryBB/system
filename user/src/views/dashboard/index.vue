<template>
  <div class="dashboard">
    <div class="tips">
      <span
        >请选择楼层
        <el-select v-model="floorValue" placeholder="请选择" @change="getSeat">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></span>
      <svg
        t="1715441830848"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5174"
        width="32"
        height="32"
      >
        <path
          d="M1001.923704 369.186364l0 511.002276c0 44.646849-36.193317 80.84119-80.84119 80.84119l-80.82891 0c-44.647873 0-80.84119-36.19434-80.84119-80.84119l0-25.604144L264.650007 854.584496l0 25.604144c0 44.646849-36.19434 80.84119-80.84119 80.84119l-80.82891 0c-44.646849 0-80.84119-36.19434-80.84119-80.84119L22.138718 370.20967c0-44.646849 36.19434-80.84119 80.84119-80.84119l60.362786 0c44.646849 0 80.84119 36.19434 80.84119 80.84119L244.183883 612.073206l535.694655 0L779.878538 369.186364c0-44.646849 36.193317-80.84119 80.84119-80.84119l60.362786 0C965.730387 288.345174 1001.923704 324.539514 1001.923704 369.186364zM298.419112 358.953302 298.419112 562.954509l427.224198 0L725.64331 358.953302c0-44.646849 69.962421-114.610294 114.610294-114.610294l62.907749 0L903.161353 127.777175c0-41.256636-33.44574-74.701352-74.701352-74.701352L196.607308 53.075823c-41.256636 0-74.701352 33.444716-74.701352 74.701352l0 116.565832 61.902862 0C228.455667 244.343007 298.419112 314.306452 298.419112 358.953302z"
          fill="#bfbfbf"
          p-id="5175"
        ></path>
      </svg>
      <span>可预约</span>
      <svg
        t="1715441830848"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5174"
        width="32"
        height="32"
      >
        <path
          d="M1001.923704 369.186364l0 511.002276c0 44.646849-36.193317 80.84119-80.84119 80.84119l-80.82891 0c-44.647873 0-80.84119-36.19434-80.84119-80.84119l0-25.604144L264.650007 854.584496l0 25.604144c0 44.646849-36.19434 80.84119-80.84119 80.84119l-80.82891 0c-44.646849 0-80.84119-36.19434-80.84119-80.84119L22.138718 370.20967c0-44.646849 36.19434-80.84119 80.84119-80.84119l60.362786 0c44.646849 0 80.84119 36.19434 80.84119 80.84119L244.183883 612.073206l535.694655 0L779.878538 369.186364c0-44.646849 36.193317-80.84119 80.84119-80.84119l60.362786 0C965.730387 288.345174 1001.923704 324.539514 1001.923704 369.186364zM298.419112 358.953302 298.419112 562.954509l427.224198 0L725.64331 358.953302c0-44.646849 69.962421-114.610294 114.610294-114.610294l62.907749 0L903.161353 127.777175c0-41.256636-33.44574-74.701352-74.701352-74.701352L196.607308 53.075823c-41.256636 0-74.701352 33.444716-74.701352 74.701352l0 116.565832 61.902862 0C228.455667 244.343007 298.419112 314.306452 298.419112 358.953302z"
          fill="#1afa29"
          p-id="5175"
        ></path>
      </svg>
      <span>已预约</span>
      <svg
        t="1715441830848"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5174"
        width="32"
        height="32"
      >
        <path
          d="M1001.923704 369.186364l0 511.002276c0 44.646849-36.193317 80.84119-80.84119 80.84119l-80.82891 0c-44.647873 0-80.84119-36.19434-80.84119-80.84119l0-25.604144L264.650007 854.584496l0 25.604144c0 44.646849-36.19434 80.84119-80.84119 80.84119l-80.82891 0c-44.646849 0-80.84119-36.19434-80.84119-80.84119L22.138718 370.20967c0-44.646849 36.19434-80.84119 80.84119-80.84119l60.362786 0c44.646849 0 80.84119 36.19434 80.84119 80.84119L244.183883 612.073206l535.694655 0L779.878538 369.186364c0-44.646849 36.193317-80.84119 80.84119-80.84119l60.362786 0C965.730387 288.345174 1001.923704 324.539514 1001.923704 369.186364zM298.419112 358.953302 298.419112 562.954509l427.224198 0L725.64331 358.953302c0-44.646849 69.962421-114.610294 114.610294-114.610294l62.907749 0L903.161353 127.777175c0-41.256636-33.44574-74.701352-74.701352-74.701352L196.607308 53.075823c-41.256636 0-74.701352 33.444716-74.701352 74.701352l0 116.565832 61.902862 0C228.455667 244.343007 298.419112 314.306452 298.419112 358.953302z"
          fill="#d81e06"
          p-id="5175"
        ></path>
      </svg>
      <span>被占用</span>
    </div>
    <div class="box">
      <div class="box_div">
        <div
          class="box_div_item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleClick(item)"
        >
          <div class="img" :class="`reserve${item.status}`"></div>
          <div class="index">{{ item.id }}</div>
        </div>
      </div>
    </div>
    <el-dialog :title="'座位号: ' + id" :visible.sync="isShow" width="40%">
      <el-form label-width="180px">
        <el-form-item label="预约开始时间：">
          <el-date-picker
            v-model="date1"
            @change="setTimeRange"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-time-picker
            v-model="time1"
            :picker-options="pickerTime1"
            @change="changeTime1"
            placeholder="选择时间"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="预约结束时间：">
          <el-date-picker
            v-model="date2"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            disabled
          >
          </el-date-picker>
          <el-time-picker
            v-model="time2"
            :picker-options="pickerTime2"
            placeholder="选择时间"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>

      <div
        v-if="reservedTimeList.length > 0"
        style="text-align: center; margin-top: 30px"
      >
        <h4>该座位以下时间段已被预约</h4>
        <el-table border :data="reservedTimeList" style="width: 100%">
          <el-table-column prop="start" label="预约开始时间"> </el-table-column>
          <el-table-column prop="end" label="预约结束时间"> </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleEnter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSeat, setSeat, getSeatReserveList } from "@/api/user";
import dayjs from "dayjs";

import { dateIsToday } from "@/utils/dateUtil.js";
import isBetween from "dayjs/plugin/isBetween.js";
dayjs.extend(isBetween);
export default {
  name: "Dashboard",
  data() {
    return {
      floorValue: 1,
      list: [],
      isShow: false,
      id: "",
      dateStr: "",
      timeStr: "",
      options: [
        {
          value: 1,
          label: "一楼",
        },
        {
          value: 2,
          label: "二楼",
        },
        {
          value: 3,
          label: "三楼",
        },
      ],
      startTime: "",
      endTime: "",
      date1: "",
      time1: "",
      date2: "",
      time2: "",
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() <= new Date().getTime();
        },
      },
      pickerTime1: {
        selectableRange: ["10:00:00 - 20:00:00"],
      },
      pickerTime2: {
        selectableRange: ["10:00:00 - 20:00:00"],
      },
      resDate: {},
      reservedTimeList: [],
    };
  },
  created() {
    this.getSeat();
  },
  mounted() {
    console.log(
      dayjs("2024-05-20 18:11:00").isBetween(
        "2024-05-20 17:00:00",
        "2024-05-20 21:00:00",
        null,
        "()"
      )
    );
  },
  methods: {
    handleEnter() {
      const info = {
        seat_id: this.id + "",
        startTime: `${dayjs(this.date1).format("YYYY-MM-DD")} ${dayjs(
          this.time1
        ).format("HH:mm:ss")}`,
        endTime: `${dayjs(this.date2).format("YYYY-MM-DD")} ${dayjs(
          this.time2
        ).format("HH:mm:ss")}`,
      };
      this.setSeat(info);
    },
    async handleClick({ status, id }) {
      this.time1 = "";
      this.date1 = "";
      this.time2 = "";
      this.date2 = "";
      this.id = id;
      this.isShow = true;
      const res = await getSeatReserveList({ seatId: id });
      console.log(res.data);
      this.reservedTimeList = res.data.map((item) => {
        return {
          start: dayjs(item.start_time).format("YYYY-MM-DD HH:mm:ss"),
          end: dayjs(item.end_time).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      let unavailablePeriods = this.reservedTimeList;
      this.resDate = this.groupByDate(unavailablePeriods);
    },
    async setSeat(data) {
      const { message } = await setSeat(data);
      this.$message.success("预约成功");
      this.isShow = false;
      this.getSeat();
    },
    async getSeat() {
      try {
        const { data, message, status } = await getSeat({
          floor: this.floorValue,
        });
        this.list = data;
      } catch (error) {
        console.log("座位接口报错");
      }
    },
    setTimeRange(time) {
      const dateObj = this.resDate[time];
      console.log(dateObj, "dateObj");
      if (dateObj) {
        const aaa = this.calculateAvailablePeriods(time, dateObj);
        this.pickerTime1.selectableRange = aaa;
      } else {
        this.pickerTime1.selectableRange = ["10:00:00 - 20:00:00"];
      }

      this.date2 = time;
    },
    changeTime1(time) {
      this.time2 = null
      console.log(time, "changeTime1");
      if (time) {
        this.pickerTime1.selectableRange.forEach((e, index) => {
          console.log(e);
          const arr = e.split("-");
          console.log(arr);
          const formatTime = this.date1 + " " + dayjs(time).format("HH:mm:ss");
          console.log(formatTime);
          console.log(
            dayjs(formatTime).isBetween(
              this.date1 + " " + arr[0],
              this.date1 + " " + arr[1],
              null,
              "[]"
            )
          );
          if (
            dayjs(formatTime).isBetween(
              this.date1 + " " + arr[0],
              this.date1 + " " + arr[1],
              null,
              "[]"
            )
          ) {
            this.pickerTime2.selectableRange = `${dayjs(time).format(
              "HH:mm:ss"
            )}-${e.substring(e.length - 8)}`;
            console.log(
              this.pickerTime2.selectableRange,
              "this.pickerTime2.selectableRange"
            );
          }
        });
      }
    },
    groupByDate(reservations) {
      return reservations.reduce((acc, reservation) => {
        const date = dayjs(reservation.start).format("YYYY-MM-DD");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(reservation);
        return acc;
      }, {});
    },
    calculateAvailablePeriods(date, reservations) {
      const openTime = "10:00:00";
      const closeTime = "21:00:00";
      const dayStart = dayjs(`${date} ${openTime}`);
      const dayEnd = dayjs(`${date} ${closeTime}`);

      let availablePeriods = [{ start: dayStart, end: dayEnd }];

      reservations.forEach((reservation) => {
        const resStart = dayjs(reservation.start);
        const resEnd = dayjs(reservation.end);

        let newAvailablePeriods = [];

        availablePeriods.forEach((period) => {
          if (resStart.isAfter(period.end) || resEnd.isBefore(period.start)) {
            // No overlap
            newAvailablePeriods.push(period);
          } else {
            // Overlap handling
            if (resStart.isAfter(period.start)) {
              newAvailablePeriods.push({ start: period.start, end: resStart });
            }
            if (resEnd.isBefore(period.end)) {
              newAvailablePeriods.push({ start: resEnd, end: period.end });
            }
          }
        });

        availablePeriods = newAvailablePeriods;
      });
      const newTime = availablePeriods.map((e) => {
        e.end = dayjs(e.end).format("HH:mm:ss");
        e.start = dayjs(e.start).format("HH:mm:ss");
        return `${e.start}-${e.end}`;
      });
      return newTime;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
  .ball {
    padding: 0 25px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .tips {
    width: 50%;
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
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      // justify-content: space-between;
      justify-items: center;
      align-items: center;
      flex-wrap: wrap;
      font-size: 18px;
      font-weight: 600;
      .box_div_item {
        height: 80px;
        width: 60px;
        margin: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        :hover {
          color: #0f40b2;
          transform: scale(1.08);
        }
        .img {
          width: 60px;
          height: 60px;
        }
        .index {
          height: 20px;
        }
      }
      .reserve0 {
        background-image: url("../../assets/img/no-reserve.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .reserve1 {
        background-image: url("../../assets/img/ing-reserve.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .reserve2 {
        background-image: url("../../assets/img/ed-reserve.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
