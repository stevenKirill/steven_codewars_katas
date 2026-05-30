const receiptFormatter = {
  currencySymbol: "$",

  // Method to print a single item line
  printLine(itemName, price) {
    console.log(`${this.currencySymbol}${price.toFixed(2)} | ${itemName}`);
  },

  // Method to print a full receipt with multiple items
  printTotalReceipt(taxRate, discount) {
    // 'this.items' will need to exist on whatever context is passed in!
    let subtotal = this.items.reduce((sum, item) => sum + item.price, 0);
    let total = (subtotal * (1 + taxRate)) - discount;

    console.log(`--- ${this.storeName || "Store"} Receipt ---`);
    this.items.forEach(item => {
      // We borrow printLine internally using 'this'
      receiptFormatter.printLine.call(this, item.name, item.price);
    });
    console.log(`Tax: ${(taxRate * 100)}%`);
    console.log(`Discount: ${this.currencySymbol}${discount}`);
    console.log(`TOTAL: ${this.currencySymbol}${total.toFixed(2)}`);
  }
};

const euroCart = {
  storeName: "EuroTech Berlin",
  currencySymbol: "€",
  items: [
    { name: "Mechanical Keyboard", price: 89.99 },
    { name: "Wireless Mouse", price: 45.50 }
  ],
};

receiptFormatter.printLine.call(euroCart, 'Custom Cable', 15.00)
receiptFormatter.printTotalReceipt.apply(euroCart, [0.19, 10])


const printEuroTotal = receiptFormatter.printTotalReceipt.bind(euroCart, 0.19);

printEuroTotal(5)
