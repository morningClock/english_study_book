<template>
  <div>
    <!-- 第一行：主内容 -->
    <el-row :gutter="24">
      <el-col :xs="24" :md="18" class="chart-box">
        <!-- 头部四数据 -->
        <el-row :gutter="24" class="stats">
          <el-col class="stats-card-wrap" :xs="24" :md="12" :lg="6" v-for="(item, index) in stats" :key="'Statistics'+index">
            <el-card class="stats-card">
              <div class="d-flex ai-center">
                <div class="icon"><i class="iconfont icontime"></i></div>
                <div class="stats-desc">
                  <p>{{item.desc}}</p>
                  <p>{{item.value}}</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- Echart -->
        <div class="chart-promote" ref="chartPromote"></div>
      </el-col>
      <!-- Rank -->
      <el-col :xs="24" :md="6" class="rank-box">
        <el-card>
          <h2 class="rank-header">
            WORD RANK
          </h2>
          <ul class="rank-list">
            <li class="d-flex rank-item" v-for="(item, index) of this.rank" :key="'rank'+index">
              <img :src="item.avatar" :alt="item.name" width="20%" height="20%">
              <div class="rank-item-message flex-1">
                <p class="fs-lg"><span class="highlight">{{item.name}}</span> 同学</p>
                <p class="fs-lg">完成{{item.sum}}积累</p>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第二行：推送类 -->
    <el-row :gutter="24" style="margin-top:20px;">
      <el-col :xs=24 :md="8">
        <el-card>
          <div style="height: 250px;">长期任务完成进度 - 柱状图</div>
        </el-card>
      </el-col>
      <el-col :xs=24 :md="8">
        <el-card>
          <div style="height: 250px;">能力几何 - 多边形图</div>
        </el-card>
      </el-col>
      <el-col :xs=24 :md="8">
        <el-card>
          <div style="height: 250px;">积累途径 - 圆饼图</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:20px;">
      <el-col :xs=24 :md="16">
        <el-card>
          <div style="height: 700px;">单词卡片推送</div>
        </el-card>
      </el-col>
      <el-col :xs=24 :md="8">
        <el-card>
          <div style="height: 300px;">用户日历</div>
        </el-card>
        <el-card style="margin-top:20px;">
          <div style="height: 300px;">签到日历</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Echarts from 'echarts'
import avatar from '../../assets/img/avatar.jpg'
export default {
  data () {
    return {
      promoteChart: '',
      // 学习统计
      stats: {
        // 学习时长
        duration: { desc:'学习时长', value: '24min' },
        // 积累单词数量
        sum: { desc:'积累单词', value: '30' },
        // 阅读文章数量
        article: { desc:'阅读文章', value: '2' },
        // 测试准确率
        accuracy: { desc:'自测准确率', value: '80%' }
      },
      // 排名
      rank: [
        { name: '小红', sum: '200', avatar: avatar },
        { name: '小明', sum: '255', avatar: avatar },
        { name: '小王', sum: '188', avatar: avatar },
        { name: '小芳', sum: '150', avatar: avatar },
        { name: '小蓝', sum: '122', avatar: avatar },
        { name: '小绿', sum: '90', avatar: avatar },
      ]
    }
  },
  methods: {
    drawChartPromote () {
      this.promoteChart = Echarts.init(this.$refs.chartPromote)
      let option = {
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [40, 30, 50, 10, 0, 10, 40],
           itemStyle: {
              normal: {
                  color: '#68dff0'
              }
          },
          type: 'line',
          smooth: true
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.promoteChart.setOption(option)
    }
  },
  mounted () {
    this.drawChartPromote()
    window.onresize = () => {
      this.promoteChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/_variable.scss';
.card-box {
  display: inline-block;
  width: 25%;
  padding: 0 0.7143rem;
}
.chart-box{
  .stats{
    .stats-card-wrap{
      .stats-card{
        color:#fff;
        .icon{
          width: 2.1429rem;
          height: 2.1429rem;
          margin: 0 1.4286rem;
          i{
            font-size: 2.1429rem;
          }
        }
        .stats-desc{
          p {
            height: 1.7857rem;
            line-height: 1.7857rem;
          }
        }
      }
    }
    .stats-card-wrap:nth-child(1)>.stats-card {
      background-color: map-get($colors, 'success');
    }
    .stats-card-wrap:nth-child(2)>.stats-card {
      background-color: map-get($colors, 'warning');
    }
    .stats-card-wrap:nth-child(3)>.stats-card {
      background-color: map-get($colors, 'danger');
    }
    .stats-card-wrap:nth-child(4)>.stats-card {
      background-color: map-get($colors, 'info');
    }
  }
  // 暂时设置，等待改行有内容，则设置为auto
  .chart-promote{
    margin-top: 1.0714rem;
    width:100%;
    height: 35.7143rem;
    background: #fff;
  }
}
.rank-box{
  padding-right: 1.4286rem;
  .rank-header{
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    font-size: map-get($fontSize, 'lg') * $base-font-size;
    color: map-get($colors, 'white');
    background: map-get($colors, 'primary-4');
  }
  .rank-list{
    .rank-item{
      padding: 1.4286rem 0.7143rem 0;
      .rank-item-message{
        p{
          height: 1.7857rem;
          line-height: 1.7857rem;
          span.highlight {
            font-weight: bold;
            color: map-get($colors, 'tips');
          }
        }
      }
    }
  }
}

</style>
