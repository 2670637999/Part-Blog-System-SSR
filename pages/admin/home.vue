<template>
    <div>
        <div id="echarts" ></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from '@nuxtjs/axios'
export default {
    mounted(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('echarts'))
      // 绘制图表
      myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
              data: ["文章数","评论数"]
          },
          yAxis: {},
          series: [{
              name: '阈值',
              type: 'bar',
              data: [2,2]
          }]
      });
    }
}
</script>

<style lang="scss" scoped>
.page-enter-active {
  animation: part-enter-2 1s;
}
.page-leave-active {
  animation: part-leave-1 0.71s;
}
#echarts {
  width: 100%;
  height: 100px;
}
</style>