<template>
  <div class="section-container">
    <h3>Compare Distributions</h3>
    <el-radio-group v-model="show">
      <el-radio label="percentile">Show Percentile</el-radio>
      <el-radio label="frequency">Show Frequency</el-radio>
    </el-radio-group>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="rating" label="Rating"></el-table-column>
      <el-table-column v-if="show === 'percentile'" label="Percentile">
        <el-table-column prop="customPercentile" label="Custom">
        </el-table-column>
        <el-table-column prop="normalPercentile" label="Normal">
        </el-table-column>
        <el-table-column prop="logisticPercentile" label="Logistic">
        </el-table-column>
      </el-table-column>
      <el-table-column v-if="show === 'frequency'" label="Frequency">
        <el-table-column prop="customFrequency" label="Custom">
        </el-table-column>
        <el-table-column prop="normalFrequency" label="Normal">
        </el-table-column>
        <el-table-column prop="logisticFrequency" label="Logistic">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { distributions } from 'assets/js/distributions'

const round = (value) => {
  return Math.round(value * 100) / 100
}

export default {
  name: 'CompareDistributions',
  data() {
    return {
      show: 'percentile',
    }
  },
  computed: {
    tableData() {
      const data = []
      for (let i = 1; i <= 10; i++) {
        data.push({
          rating: i,
          customPercentile: round(distributions.custom.percentileFromRating(i)),
          normalPercentile: round(distributions.normal.percentileFromRating(i)),
          logisticPercentile: round(
            distributions.logistic.percentileFromRating(i)
          ),
          customFrequency: distributions.custom.frequencyStringFromRating(i),
          normalFrequency: distributions.normal.frequencyStringFromRating(i),
          logisticFrequency:
            distributions.logistic.frequencyStringFromRating(i),
        })
      }
      return data
    },
  },
}
</script>

<style scoped></style>
