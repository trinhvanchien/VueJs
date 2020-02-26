<template>
  <div class="section">
    <div class="section--row p_3">
      <vue-apex-charts
        type="line"
        height="350"
        :options="newRegisteredUserChartOptions"
        :series="newRegisteredUserSeries"
      ></vue-apex-charts>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    VueApexCharts
  },
  computed: {
    newRegisteredUserChartOptions() {
      const dateTimeArr = this.registerAccountStatistics.map(item => {
        return item.date;
      });
      return {
        chart: {
          type: "line",
          shadow: {
            enabled: false,
            color: "#bbb",
            top: 3,
            left: 2,
            blur: 3,
            opacity: 1
          },
          toolbar: {
            show: false
          },
          locales: [
            {
              name: "vn",
              options: {
                months: [
                  "Tháng 1",
                  "Tháng 2",
                  "Tháng 3",
                  "Tháng 4",
                  "Tháng 5",
                  "Tháng 6",
                  "Tháng 7",
                  "Tháng 8",
                  "Tháng 9",
                  "Tháng 10",
                  "Tháng 11",
                  "Tháng 12"
                ],
                shortMonths: [
                  "Thg 1",
                  "Thg 2",
                  "Thg 3",
                  "Thg 4",
                  "Thg 5",
                  "Thg 6",
                  "Thg 7",
                  "Thg 8",
                  "Thg 9",
                  "Thg 10",
                  "Thg 11",
                  "Thg 12"
                ],
                days: [
                  "Chủ Nhật",
                  "Thứ Hai",
                  "Thứ Ba",
                  "Thứ Tư",
                  "Thứ Năm",
                  "Thứ Sáu",
                  "Thứ Bảy"
                ],
                shortDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                toolbar: {
                  exportToSVG: "Tải xuống SVG",
                  exportToPNG: "Tải xuống PNG",
                  menu: "Menu",
                  selection: "Vùng chọn",
                  selectionZoom: "Phóng to vùng chọn",
                  zoomIn: "Phóng to",
                  zoomOut: "Thu nhỏ",
                  pan: "Panning",
                  reset: "Đặt lại"
                }
              }
            }
          ],
          defaultLocale: "vn"
        },
        tooltip: {
          theme: "light"
        },
        stroke: {
          width: 7,
          curve: "smooth"
        },
        colors: ["#16afd4"],
        grid: {
          borderColor: "#e4e4e4"
        },
        xaxis: {
          type: "datetime",
          categories: dateTimeArr,
          labels: {
            style: {
              colors: ["#444", "#444", "#444", "#444", "#444", "#444"]
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              color: "#444"
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#57d45a"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        markers: {
          size: 4,
          opacity: 0.9,
          colors: ["#ffab29"],
          strokeColor: "#fff",
          strokeWidth: 2,

          hover: {
            size: 7
          }
        },
        title: {
          text: "Thống kê số lượng người dùng đăng kí trong 7 ngày",
          align: "left",
          margin: 5,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "17px",
            fontWeight: "bold",
            color: "#444"
          }
        }
      };
    },
    newRegisteredUserSeries() {
      const arr = this.registerAccountStatistics.map(item => {
        return item.amount;
      });
      return [
        {
          name: "SL đăng ký",
          data: arr
        }
      ];
    },
    registerAccountStatistics() {
      return this.$store.getters.registerAccountStatistics;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  &--row {
    background-color: #fff;
    border-radius: 0.625rem;
  }
}
</style>
