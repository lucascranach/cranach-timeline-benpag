let yearAmounts = {};
const step = 1;

export default {
  increaseYearAmountFor(year) {
    if (yearAmounts[year]) {
      yearAmounts[year] += step;
    } else {
      yearAmounts[year] = step;
    }
  },
  getYearAmountFor(year) {
    return yearAmounts[year] || step;
  },
  getHighestValue() {
    return Object.keys(yearAmounts).reduce((acc, current) => {
      if (yearAmounts[current] > acc) return yearAmounts[current];
      return acc;
    }, 0);
  },
  resetYearAmount() {
    yearAmounts = {};
  },
};
