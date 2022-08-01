<template>
  <div ref="boundingDiv" class="section-container">
    <h3>Chart</h3>
    <el-checkbox v-model="showPDF">Show PDF Curve (blue)</el-checkbox>
    <el-checkbox v-model="showCDF">Show CDF Curve (red)</el-checkbox>
    <div :id="chartId"></div>
  </div>
</template>

<script>
import functionPlot from 'function-plot'
import { Distribution } from '@/assets/js/distributions'

export default {
  name: 'RatingCharts',
  props: {
    chartId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    primaryDistribution: {
      type: Distribution,
      required: true,
    },
  },
  data() {
    return {
      showPDF: true,
      showCDF: true,
    }
  },
  watch: {
    rating() {
      this.drawChart()
    },
    primaryDistribution() {
      this.drawChart()
    },
    showPDF() {
      this.drawChart()
    },
    showCDF() {
      this.drawChart()
    },
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const width = this.$refs.boundingDiv.clientWidth
      const dataSets = []
      if (this.showPDF) {
        dataSets.push({
          graphType: 'polyline',
          fn: this.primaryDistribution.pdfEquation,
          color: '#409EFF',
        })
      }
      if (this.showCDF) {
        dataSets.push({
          graphType: 'polyline',
          fn: this.primaryDistribution.cdfEquation,
          color: '#F56C6C',
        })
      }

      functionPlot({
        target: `#${this.chartId}`,
        data: [
          ...dataSets,
          {
            fnType: 'parametric',
            graphType: 'polyline',
            range: [0, 1],
            skipTip: true,
            x: this.rating.toString(),
            y: 't',
            color: '#909399',
          },
        ],
        width,
        height: width * (5 / 8),
        grid: true,
        xAxis: { domain: [1, 11], label: 'Rating' },
        yAxis: { domain: [0, 1], label: 'Probability' },
        disableZoom: true,
      })
    },
  },
}
</script>

<style scoped></style>
