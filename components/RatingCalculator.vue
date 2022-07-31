<template>
  <div>
    <div class="section-container">
      <h3>Choose a distribution type</h3>
      <el-radio-group v-model="distributionType">
        <el-radio-button label="custom"> Custom </el-radio-button>
        <el-radio-button label="normal"> Normal </el-radio-button>
        <el-radio-button label="logistic"> Logistic </el-radio-button>
      </el-radio-group>
      <p class="distribution-description">{{ distributionDescription }}</p>
    </div>
    <RatingToPercentileCalculator :distribution-type="distributionType" />
    <CompareDistributions />
  </div>
</template>

<script>
import { distributions } from 'assets/js/distributions'

export default {
  name: 'RatingCalculator',
  data() {
    return {
      distributionType: 'custom',
    }
  },
  computed: {
    distributionDescription() {
      return distributions[this.distributionType].description
    },
  },
}
</script>

<style scoped>
.distribution-description {
  color: #909399;
}
</style>
