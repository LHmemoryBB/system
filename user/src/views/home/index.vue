<template>
  <div class="chart-page">
    <div id="pieChart" class="chart"></div>
    <div id="lineChart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { seatStatistic, reserveDays } from "@/api/user";
export default {
  mounted() {
    this.getData();
    // this.setLineChart();
    // this.setPieChart();
  },
  methods: {
    async getData() {
      const res = await seatStatistic();
      if (res.status == 0) {
        this.setPieChart(res.data);
      }
      const res2 = await reserveDays();
      console.log(res2);
      if (res2.status == 0) {
        console.log(res2.status);
        const dates = [];
        const today = this.$dayjs();
        for (let i = -3; i <= 3; i++) {
          const date = today.add(i, "day");
          dates.push(date.format("MM-DD"));
        }

        this.setLineChart(dates, res2.data);
      }
    },
    setLineChart(dates, data) {
      console.log(data, dates);
      var chartDom = document.getElementById("lineChart");
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
        legend: {
          show: true,
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
            name: "一楼",
            type: "line",
            stack: "Total",
            smooth: true,
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
            data: data[0],
          },
          {
            name: "二楼",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: data[1],
          },
          {
            name: "三楼",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: data[2],
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    setPieChart(data) {
      var chartDom = document.getElementById("pieChart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "座位使用情况",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: data[0], name: "空闲" },
              { value: data[1], name: "已预约" },
              { value: data[2], name: "已占座" },
            ],
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
.chart-page {
  display: flex;
  justify-content: space-around;
  width: calc(100vw - 210px);
  height: calc(100vh - 50px);
  align-items: center;
  overflow: hidden;
  background-image: url("../../assets/img/library.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.chart {
  width: 40%;
  height: 60%;
  background-color: #ffffffa1;
  border-radius: 20px;
}
</style>