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
  resetYearAmount() {
    yearAmounts = {};
  },
};
