<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <h4>Choose a rating</h4>
      <el-slider
        v-model="rating"
        :min="1"
        :max="allowDecimals ? 10.9 : 10"
        :step="allowDecimals ? 0.1 : 1"
        :show-stops="!allowDecimals"
        :show-tooltip="false"
        show-input
      />
      <el-checkbox v-model="allowDecimals">Allow decimal ratings</el-checkbox>
    </el-col>
    <el-col :span="12">
      <h4>What does a rating of {{ rating }} mean?</h4>
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
      <p>{{ distribution.description }}</p>
    </el-col>
  </el-row>
</template>

<script>
import { Distribution } from '@/assets/js/distributions'

export default {
  name: 'RatingToPercentileCalculator',
  props: {
    distribution: {
      type: Distribution,
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
    percentile() {
      return Math.floor(this.distribution.percentileFromRating(this.rating))
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
