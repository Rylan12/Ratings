<template>
  <div ref="boundingDiv" class="section-container">
    <h3>Chart</h3>
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
  watch: {
    rating() {
      this.drawChart()
    },
    primaryDistribution() {
      this.drawChart()
    },
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const width = this.$refs.boundingDiv.clientWidth

      functionPlot({
        target: `#${this.chartId}`,
        data: [
          { graphType: 'polyline', fn: this.primaryDistribution.pdfEquation },
          { graphType: 'polyline', fn: this.primaryDistribution.cdfEquation },
          {
            fnType: 'parametric',
            graphType: 'polyline',
            range: [0, 1],
            skipTip: true,
            x: this.rating.toString(),
            y: 't',
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
