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
        About <strong>1 in 62</strong> items has a rating of
        <strong>{{ rating }}</strong> or higher. There are twice as many items
        with a rating of {{ Math.floor(rating) }} as there are with a rating of
        {{ Math.floor(rating < 6 ? rating - 1 : rating + 1) }}.
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
  },
}
</script>

<style scoped></style>
