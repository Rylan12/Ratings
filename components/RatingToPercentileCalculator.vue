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
        show-input
      />
      <el-switch v-model="allowDecimals" active-text="Allow decimal ratings">
      </el-switch>
    </div>
    <CalculationSummary
      type="rating"
      :rating="rating"
      :distribution="primaryDistribution"
    />
    <RatingCharts
      :rating="rating"
      :primary-distribution="primaryDistribution"
      :secondary-distributions="secondaryDistributions"
    />
    <div class="section-container">
      <h3>What does a rating of {{ rating }} mean?</h3>
      <p>
        An item with a rating of <strong>{{ rating }}</strong> is in the
        <strong>{{ percentile }}{{ percentileOrdinal }} percentile</strong>.
        This means that this item is ranked higher than
        <strong>{{ percentile }}%</strong> of all items in the set that is being
        compared.
      </p>
      <p>
        About <strong>{{ frequency }}</strong> items has a rating of
        <strong>{{ rating }}</strong
        >. This is
        <span v-if="rating >= 2">
          <strong>{{ multiplierText(previousMultiplier) }}</strong>
          the number of items with a rating of
          <strong>{{ rating - 1 }}</strong> </span
        ><span v-if="rating >= 2 && rating < 10">, and </span
        ><span v-if="rating < 10">
          <strong>{{ multiplierText(nextMultiplier) }}</strong>
          the number of items with a rating of
          <strong> {{ rating + 1 }}</strong></span
        ><span>.</span>
      </p>
    </div>
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
      return Object.entries(distributions).filter(
        ([key]) => key !== this.distributionType
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
