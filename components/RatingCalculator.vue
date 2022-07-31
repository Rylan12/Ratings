<template>
  <div>
    <el-radio-group v-model="distributionType">
      <el-radio-button label="custom"> Custom </el-radio-button>
      <el-radio-button label="normal"> Normal </el-radio-button>
      <el-radio-button label="logistic"> Logistic </el-radio-button>
    </el-radio-group>
    <RatingToPercentileCalculator :distribution="primaryDistribution" />
  </div>
</template>

<script>
import { distributions } from '@/assets/js/distributions'

export default {
  name: 'RatingCalculator',
  data() {
    return {
      distributionType: 'custom',
    }
  },
  computed: {
    primaryDistribution() {
      return distributions[this.distributionType]
    },
  },
}
</script>

<style scoped></style>
