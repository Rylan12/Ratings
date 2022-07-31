<template>
  <div class="section-container">
    <h3>Chart</h3>
    <p class="secondary-text">
      The lines between points are smooth approximations and may not accurately
      reflect the values between ratings.
    </p>
    <client-only placeholder="Loading charts...">
      <LineChart
        :chart-options="chartOptions"
        :chart-data="chartData"
        :height="100"
        :width="300"
        chart-id="lineChart"
      ></LineChart>
    </client-only>
  </div>
</template>

<script>
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
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      },
    }
  },
  computed: {
    chartData() {
      return this.primaryDistribution.ratingChartData()
    },
  },
}
</script>

<style scoped></style>
