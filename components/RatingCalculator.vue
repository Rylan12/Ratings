<template>
  <div>
    <div class="section-container">
      <h3>Choose a distribution type</h3>
      <el-radio-group v-model="distributionType">
        <el-radio-button label="custom"> Custom </el-radio-button>
        <el-radio-button label="normal"> Normal </el-radio-button>
        <el-radio-button label="logistic"> Logistic </el-radio-button>
      </el-radio-group>
    </div>
    <RatingToPercentileCalculator :distribution-type="distributionType" />
    <StandardValues />
  </div>
</template>

<script>
export default {
  name: 'RatingCalculator',
  data() {
    return {
      distributionType: 'custom',
    }
  },
}
</script>

<style scoped></style>
