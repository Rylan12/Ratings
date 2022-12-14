<template>
  <div>
    <div class="section-container">
      <h3>Choose a rating</h3>
      <el-slider
        v-model="rating"
        :min="1"
        :max="allowDecimals ? 10.9 : 10"
        :step="allowDecimals ? 0.1 : 1"
        :show-stops="!allowDecimals"
        :show-tooltip="false"
      />
      <el-input-number
        v-model="rating"
        :min="1"
        :max="allowDecimals ? 10.9 : 10"
        :step="allowDecimals ? 0.1 : 1"
        size="small"
      />
      <el-switch v-model="allowDecimals" active-text="Allow decimal ratings">
      </el-switch>
    </div>
    <el-row class="hidden-sm-and-down">
      <el-col :span="12">
        <CalculationSummary
          type="rating"
          :rating="rating"
          :distribution="primaryDistribution"
        />
        <RatingExplanation
          :rating="rating"
          :primary-distribution="primaryDistribution"
          :secondary-distributions="secondaryDistributions"
        />
      </el-col>
      <el-col :span="12">
        <RatingCharts
          chart-id="side-rating-chart"
          :rating="rating"
          :primary-distribution="primaryDistribution"
        />
      </el-col>
    </el-row>
    <el-row class="hidden-md-and-up">
      <el-col :span="24">
        <CalculationSummary
          type="rating"
          :rating="rating"
          :distribution="primaryDistribution"
        />
        <RatingExplanation
          :rating="rating"
          :primary-distribution="primaryDistribution"
          :secondary-distributions="secondaryDistributions"
        />
        <RatingCharts
          chart-id="full-col-rating-chart"
          :rating="rating"
          :primary-distribution="primaryDistribution"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { distributions } from '@/assets/js/distributions'

export default {
  name: 'RatingToPercentileCalculator',
  props: {
    distributionType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rating: 0,
      allowDecimals: false,
    }
  },
  computed: {
    primaryDistribution() {
      return distributions[this.distributionType]
    },
    secondaryDistributions() {
      return Object.values(distributions).filter(
        (dist) => dist.type !== this.distributionType
      )
    },
    percentile() {
      return Math.floor(
        this.primaryDistribution.percentileFromRating(this.rating)
      )
    },
    percentileOrdinal() {
      const roundedPercentile = this.percentile
      const lastDigit = roundedPercentile % 10
      const lastTwoDigits = roundedPercentile % 100
      if (
        lastTwoDigits === 11 ||
        lastTwoDigits === 12 ||
        lastTwoDigits === 13
      ) {
        return 'th'
      } else if (lastDigit === 1) {
        return 'st'
      } else if (lastDigit === 2) {
        return 'nd'
      } else if (lastDigit === 3) {
        return 'rd'
      } else {
        return 'th'
      }
    },
    frequency() {
      return this.primaryDistribution.frequencyStringFromRating(
        this.rating,
        false
      )
    },
    previousMultiplier() {
      return (
        this.primaryDistribution.frequencyFromRating(this.rating) /
        this.primaryDistribution.frequencyFromRating(this.rating - 1)
      )
    },
    nextMultiplier() {
      return (
        this.primaryDistribution.frequencyFromRating(this.rating) /
        this.primaryDistribution.frequencyFromRating(this.rating + 1)
      )
    },
  },
  methods: {
    multiplierText(multiplier) {
      if (multiplier === 1) {
        return 'equal to'
      } else if (multiplier > 1) {
        return `${Math.round(100 * multiplier) / 100} times`
      } else {
        return `${Math.round(100 * multiplier) / 100} times`
      }
    },
  },
}
</script>

<style scoped></style>
