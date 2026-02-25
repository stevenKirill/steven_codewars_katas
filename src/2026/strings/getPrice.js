function getPrice(item) {
  const group = item.match(/\$\d+\.\d+/);
  return group[0] ?? '';
}

console.log(getPrice("Ice ($4.20)"));
console.log(getPrice("Sandwich ($3.50)"));
console.log(getPrice("Milk ($0.99)"));

// /Ice ($4.20) => $4.20
