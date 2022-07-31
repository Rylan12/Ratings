<template>
  <div class="section-container">
    <h3>Calculation Summary</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="rating" label="Rating"></el-table-column>
      <el-table-column prop="percentile" label="Percentile"></el-table-column>
      <el-table-column
        prop="frequency"
        label="Frequency (per 100)"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Distribution } from '@/assets/js/distributions'

export default {
  name: 'CalculationSummary',
  props: {
    type: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    percentile: {
      type: Number,
      default: 0,
    },
    distribution: {
      type: Distribution,
      required: true,
    },
  },
  computed: {
    tableData() {
      const rating = this.rating
      const percentile = this.distribution.percentileFromRating(rating)
      const frequency = this.distribution.frequencyFromRating(rating)
      return [
        {
          rating,
          percentile: Math.round(100 * percentile) / 100,
          frequency: Math.round(100 * frequency) / 100,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
