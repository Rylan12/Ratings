<template>
  <div class="section-container">
    <h3>What does a rating of {{ rating }} mean?</h3>
    <p>
      An item with a rating of <strong>{{ rating }}</strong> is in the
      <strong>{{ percentile }}{{ percentileOrdinal }} percentile</strong>. This
      means that this item is ranked higher than
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
    <p>
      A <strong>{{ rating }}</strong> in a
      <strong>{{ primaryDistribution.type }}</strong> distribution is
      <strong>{{ distributionComparisons[0] }} frequent</strong> compared to a
      <strong>{{ secondaryDistributions[0].type }}</strong> distribution and
      <strong>{{ distributionComparisons[1] }} frequent</strong> compared to a
      <strong>{{ secondaryDistributions[1].type }}</strong> distribution.
    </p>
  </div>
</template>

<script>
import { Distribution } from 'assets/js/distributions'

export default {
  name: 'RatingExplanation',
  props: {
    rating: {
      type: Number,
      required: true,
    },
    primaryDistribution: {
      type: Distribution,
      required: true,
    },
    secondaryDistributions: {
      type: Array,
      required: true,
    },
  },
  computed: {
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
    distributionComparisons() {
      const comparisons = []
      const frequency = this.primaryDistribution.frequencyFromRating(
        this.rating
      )
      this.secondaryDistributions.forEach((distribution) => {
        const comparisonFrequency = distribution.frequencyFromRating(
          this.rating
        )
        if (frequency > comparisonFrequency) {
          comparisons.push('more')
        } else if (frequency < comparisonFrequency) {
          comparisons.push('less')
        } else {
          comparisons.push('equally as')
        }
      })
      return comparisons
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
