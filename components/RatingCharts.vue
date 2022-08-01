<template>
  <div class="section-container">
    <h3>Chart</h3>
    <div id="rating-chart"></div>
  </div>
</template>

<script>
import functionPlot from 'function-plot'
import { Distribution } from '@/assets/js/distributions'

export default {
  name: 'RatingCharts',
  props: {
    rating: {
      type: Number,
      required: true,
    },
    primaryDistribution: {
      type: Distribution,
      required: true,
    },
    secondaryDistributions: {
      type: Array,
      default: () => [],
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
      functionPlot({
        target: '#rating-chart',
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
