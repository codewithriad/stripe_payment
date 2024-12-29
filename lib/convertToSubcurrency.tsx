function convertToSubcurrency(price: number, factor = 100) {
  return Math.round(price * factor);
}

export default convertToSubcurrency;
