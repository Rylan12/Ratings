export abstract class Distribution {
  abstract type: string
  abstract description: string
  mean: number = 6

  abstract pdf(x: number): number
  abstract cdf(x: number): number

  pdfEquation = (scope: any): number => {
    return this.pdf(scope.x)
  }

  cdfEquation = (scope: any): number => {
    return this.cdf(scope.x)
  }

  percentileFromRating(rating: number): number {
    return this.cdf(rating) * 100
  }

  frequencyFromRating(rating: number): number {
    return this.pdf(rating) * 100
  }

  frequencyStringFromRating(rating: number, includePercentage = true): string {
    const fraction = this.pdf(rating)
    const denominator = Math.round(1 / fraction)
    let result = `1 in ${denominator}`
    if (includePercentage) {
      result += ` (${Math.round(fraction * 100)}%)`
    }
    return result
  }

  frequencyFractionFromRating(rating: number): [number, number] {
    return [1, Math.round(1 / this.pdf(rating))]
  }
  // abstract ratingFromPercentile(percentile: number): number

  ratingChartData() {
    return {
      labels: [...Array(11).keys()].map((x) => x + 1),
      datasets: [
        {
          label: 'CDF',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [...Array(11).keys()].map((x) => this.cdf(x + 1)),
          tension: 0.4,
        },
        {
          label: 'PDF',
          backgroundColor: 'rgba(54,162,235,0.2)',
          borderColor: 'rgba(54,162,235,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54,162,235,0.4)',
          hoverBorderColor: 'rgba(54,162,235,1)',
          data: [...Array(11).keys()].map((x) => this.pdf(x + 1)),
          tension: 0.4,
        },
      ],
    }
  }
}

export class CustomDistribution extends Distribution {
  type = 'custom'
  description =
    'A symmetric distribution where the frequency of each rating doubles as it increases. ' +
    'For example, a rating of 4 is twice as frequent as a rating of 3 and half as ' +
    'likely as a rating of 5. Likewise, a rating of 8 is half as likely as a rating ' +
    'of 7 and twice as likely as a rating of 9.'

  d = 2

  pdf(x: number): number {
    return Math.pow(this.d, 4 - this.shift(x)) / this.total
  }

  cdf(x: number): number {
    if (x === this.mean) {
      return 0.5
    }
    const sign = x < this.mean ? -1 : 1
    const numerator = Math.pow(this.d, 5 - this.shift(x)) - 1
    const denominator = this.total * (this.d - 1)
    return sign * (0.5 - numerator / denominator) + 0.5
  }

  private get total(): number {
    return (
      2 *
      (1 +
        this.d +
        Math.pow(this.d, 2) +
        Math.pow(this.d, 3) +
        Math.pow(this.d, 4))
    )
  }

  private shift(x: number): number {
    return Math.abs(x - this.mean)
  }
}

// https://en.wikipedia.org/wiki/Normal_distribution
export class NormalDistribution extends Distribution {
  type = 'normal'
  description =
    'A normal distribution with a mean of 6 and a standard deviation of 1.6.' +
    'This standard deviation was chosen because it closely mimics the custom ' +
    "distribution. I don't know if this is a good idea or not..."

  standardDeviation: number = 1.6 // This is just a number that seems to work nicely

  pdf(x: number): number {
    const denominator = this.standardDeviation * Math.sqrt(2 * Math.PI)
    const exponent =
      -0.5 * Math.pow((x - this.mean) / this.standardDeviation, 2)
    return (1 / denominator) * Math.exp(exponent)
  }

  cdf(x: number): number {
    return (
      0.5 *
      (1 + this.erf((x - this.mean) / (this.standardDeviation * Math.sqrt(2))))
    )
  }

  // https://stackoverflow.com/a/14873282/10865303
  private erf(x: number): number {
    // save the sign of x
    const sign = x >= 0 ? 1 : -1
    x = Math.abs(x)

    // constants
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    // A&S formula 7.1.26
    const t = 1.0 / (1.0 + p * x)
    const y =
      1.0 -
      ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
    return sign * y // erf(-x) = -erf(x);
  }
}

// https://en.wikipedia.org/wiki/Logistic_distribution
export class LogisticDistribution extends Distribution {
  type = 'logistic'
  description =
    'A logistic distribution with a mean of 6 and a scale of 0.9. ' +
    'This scale was chosen because it closely mimics the custom ' +
    "distribution. I don't know if this is a good idea or not..."

  standardDeviation = 0.9 // This is just a number that seems to work nicely

  pdf(x: number): number {
    const exponent = this.exponent(x)
    return exponent / (this.standardDeviation * Math.pow(1 + exponent, 2))
  }

  cdf(x: number): number {
    return 1 / (1 + this.exponent(x))
  }

  private exponent(x: number): number {
    return Math.exp((-1 * (x - this.mean)) / this.standardDeviation)
  }
}

export const distributions = {
  custom: new CustomDistribution(),
  normal: new NormalDistribution(),
  logistic: new LogisticDistribution(),
}
