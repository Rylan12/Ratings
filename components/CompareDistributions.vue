<template>
  <div class="section-container">
    <h3>Compare Distributions</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="rating" label="Rating"></el-table-column>
      <el-table-column
        prop="customPercentile"
        label="Custom Percentile"
      ></el-table-column>
      <el-table-column
        prop="normalPercentile"
        label="Normal Percentile"
      ></el-table-column>
      <el-table-column
        prop="logisticPercentile"
        label="Logistic Percentile"
      ></el-table-column>
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
    const data = []
    for (let i = 1; i <= 10; i++) {
      data.push({
        rating: i,
        customPercentile: round(distributions.custom.percentileFromRating(i)),
        normalPercentile: round(distributions.normal.percentileFromRating(i)),
        logisticPercentile: round(
          distributions.logistic.percentileFromRating(i)
        ),
      })
    }
    return {
      tableData: data,
    }
  },
}
</script>

<style scoped></style>
